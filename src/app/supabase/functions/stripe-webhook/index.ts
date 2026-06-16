// ============================================================================
// PUBLIC STRIPE WEBHOOK - Supabase Edge Function
// ============================================================================
// This function is PUBLIC (no Supabase JWT required) so Stripe can call it.
// It verifies the Stripe signature and processes checkout.session.completed events.
//
// Stripe calls: https://<project>.supabase.co/functions/v1/stripe-webhook
// ============================================================================

import Stripe from 'npm:stripe';
import { createClient } from 'jsr:@supabase/supabase-js';

// ============================================================================
// ENVIRONMENT VARIABLES
// ============================================================================

const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY');
const STRIPE_WEBHOOK_SECRET = Deno.env.get('STRIPE_WEBHOOK_SECRET');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

if (!STRIPE_SECRET_KEY) throw new Error('❌ Missing STRIPE_SECRET_KEY');
if (!STRIPE_WEBHOOK_SECRET) throw new Error('❌ Missing STRIPE_WEBHOOK_SECRET');
if (!SUPABASE_URL) throw new Error('❌ Missing SUPABASE_URL');
if (!SUPABASE_SERVICE_ROLE_KEY) throw new Error('❌ Missing SUPABASE_SERVICE_ROLE_KEY');

const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// ============================================================================
// BUNDLE DEFINITIONS
// ============================================================================

const BUNDLE_THEMES: Record<string, string[]> = {
  'life-milestones': ['wedding', 'career', 'new_life', 'graduation', 'new_home'],
  'wanderlust-collection': ['adventure', 'voyage', 'expedition'],
  'wisdom-legacy': ['mentor', 'sage'],
  'complete-collection': [
    'wedding', 'career', 'new_life', 'graduation', 'new_home',
    'adventure', 'voyage', 'expedition', 'mentor', 'sage', 'friendship'
  ],
};

// ============================================================================
// HELPER: Save Theme Purchase
// ============================================================================

async function saveThemePurchase(
  userId: string,
  themeId: string,
  purchaseType: 'individual' | 'bundle',
  stripePaymentId: string,
  pricePaid: number
): Promise<void> {
  const { error } = await supabase
    .from('theme_purchases')
    .upsert({
      user_id: userId,
      theme_id: themeId,
      purchase_type: purchaseType,
      stripe_payment_id: stripePaymentId,
      price_paid: pricePaid,
    }, {
      onConflict: 'user_id,theme_id',
      ignoreDuplicates: false,
    });

  if (error) throw error;
}

// ============================================================================
// HELPER: Save Bundle Purchase
// ============================================================================

async function saveBundlePurchase(
  userId: string,
  bundleId: string,
  stripePaymentId: string,
  pricePaid: number
): Promise<void> {
  const { error } = await supabase
    .from('bundle_purchases')
    .upsert({
      user_id: userId,
      bundle_id: bundleId,
      stripe_payment_id: stripePaymentId,
      price_paid: pricePaid,
    }, {
      onConflict: 'user_id,bundle_id',
      ignoreDuplicates: false,
    });

  if (error) throw error;
}

// ============================================================================
// HELPER: Save Beneficiary Purchase
// ============================================================================

async function saveBeneficiaryPurchase(
  userId: string,
  productId: string,
  slotsCount: number,
  stripePaymentId: string,
  pricePaid: number
): Promise<void> {
  const { error } = await supabase
    .from('beneficiary_purchases')
    .insert({
      user_id: userId,
      product_id: productId,
      slots_purchased: slotsCount,
      stripe_payment_id: stripePaymentId,
      price_paid: pricePaid,
    });

  if (error) throw error;
}

// ============================================================================
// HANDLER: Process Theme Purchase
// ============================================================================

async function handleThemePurchase(
  userId: string,
  themeId: string,
  stripePaymentId: string,
  amountTotal: number
): Promise<void> {
  await saveThemePurchase(userId, themeId, 'individual', stripePaymentId, amountTotal / 100);
}

// ============================================================================
// HANDLER: Process Bundle Purchase
// ============================================================================

async function handleBundlePurchase(
  userId: string,
  bundleId: string,
  stripePaymentId: string,
  amountTotal: number
): Promise<void> {
  const pricePaid = amountTotal / 100;
  const themes = BUNDLE_THEMES[bundleId];
  
  if (!themes || themes.length === 0) throw new Error(`Unknown bundle: ${bundleId}`);
  
  await saveBundlePurchase(userId, bundleId, stripePaymentId, pricePaid);
  
  const pricePerTheme = pricePaid / themes.length;
  for (const themeId of themes) {
    await saveThemePurchase(userId, themeId, 'bundle', `${stripePaymentId}:${themeId}`, pricePerTheme);
  }
}

// ============================================================================
// HANDLER: Process Beneficiary Purchase
// ============================================================================

async function handleBeneficiaryPurchase(
  userId: string,
  beneficiaryType: string,
  quantity: string,
  stripePaymentId: string,
  amountTotal: number
): Promise<void> {
  const pricePaid = amountTotal / 100;
  const slotsCount = parseInt(quantity, 10);
  const finalSlots = slotsCount >= 99999 ? 99999 : Math.max(1, slotsCount);
  
  await saveBeneficiaryPurchase(userId, beneficiaryType, finalSlots, stripePaymentId, pricePaid);
}

// ============================================================================
// MAIN WEBHOOK HANDLER
// ============================================================================

Deno.serve(async (req) => {
  if (req.method === 'GET') return new Response('OK', { status: 200 });
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  const signature = req.headers.get('stripe-signature');
  if (!signature) return new Response('Missing signature', { status: 400 });

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(await req.text(), signature, STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return new Response(`Webhook Error: ${(err as Error).message}`, { status: 400 });
  }

  try {

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const { userId, purchaseType, themeId, bundleId, beneficiaryType, quantity } = session.metadata || {};
      const stripePaymentId = session.payment_intent as string;
      const amountTotal = session.amount_total || 0;

      if (!userId || !stripePaymentId) return new Response('Missing metadata', { status: 400 });

      if (purchaseType === 'theme' && themeId) {
        await handleThemePurchase(userId, themeId, stripePaymentId, amountTotal);
      } else if (purchaseType === 'bundle' && bundleId) {
        await handleBundlePurchase(userId, bundleId, stripePaymentId, amountTotal);
      } else if (purchaseType === 'beneficiary' && beneficiaryType && quantity) {
        await handleBeneficiaryPurchase(userId, beneficiaryType, quantity, stripePaymentId, amountTotal);
      } else {
        return new Response('Invalid metadata', { status: 400 });
      }
    }

    return new Response(JSON.stringify({ received: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(`Error: ${(err as Error).message}`, { status: 500 });
  }
});