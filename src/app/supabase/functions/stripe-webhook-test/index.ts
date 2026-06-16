// ============================================================================
// STRIPE WEBHOOK DIAGNOSTIC TEST
// ============================================================================
// This is a diagnostic version to help debug the signature verification issue
// ============================================================================

import Stripe from 'npm:stripe';

const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY');
const STRIPE_WEBHOOK_SECRET = Deno.env.get('STRIPE_WEBHOOK_SECRET');

if (!STRIPE_SECRET_KEY) throw new Error('❌ Missing STRIPE_SECRET_KEY');
if (!STRIPE_WEBHOOK_SECRET) throw new Error('❌ Missing STRIPE_WEBHOOK_SECRET');

const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });

console.info('🔍 Stripe Webhook Diagnostic Test Function Started');
console.info('🔑 Webhook Secret (first 10 chars):', STRIPE_WEBHOOK_SECRET.substring(0, 10) + '...');

Deno.serve(async (req) => {
  console.log('\n========================================');
  console.log('📨 New Request Received');
  console.log('========================================');
  
  if (req.method === 'GET') {
    return new Response(JSON.stringify({
      status: 'ok',
      message: 'Stripe Webhook Diagnostic Endpoint',
      secretPrefix: STRIPE_WEBHOOK_SECRET!.substring(0, 10),
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  // Log all headers
  console.log('📋 Request Headers:');
  req.headers.forEach((value, key) => {
    if (key.toLowerCase().includes('stripe')) {
      console.log(`  ${key}: ${value.substring(0, 50)}...`);
    }
  });

  const signature = req.headers.get('stripe-signature');
  
  if (!signature) {
    console.error('❌ No stripe-signature header found');
    return new Response('Missing stripe-signature header', { status: 400 });
  }

  console.log('📝 Signature header:', signature.substring(0, 100) + '...');

  // Read body as text
  const body = await req.text();
  console.log('📦 Body length:', body.length, 'bytes');
  console.log('📄 Body preview (first 200 chars):', body.substring(0, 200));

  // Attempt 1: Using req.text() directly
  console.log('\n🔬 Attempt 1: Using body as string');
  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      STRIPE_WEBHOOK_SECRET!
    );
    console.log('✅ SUCCESS! Event verified:', event.type, event.id);
    return new Response(JSON.stringify({ 
      success: true, 
      method: 'text()',
      eventType: event.type,
      eventId: event.id,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('❌ Attempt 1 failed:', (err as Error).message);
  }

  // If we get here, signature verification failed
  console.error('\n⚠️  All verification attempts failed');
  console.error('🔍 Troubleshooting tips:');
  console.error('  1. Verify STRIPE_WEBHOOK_SECRET matches the endpoint in Stripe Dashboard');
  console.error('  2. Check if you\'re using the correct endpoint URL');
  console.error('  3. Ensure the webhook secret is for THIS specific endpoint');
  console.error('  4. Try creating a NEW webhook endpoint in Stripe and get a fresh secret');
  
  return new Response(JSON.stringify({
    error: 'Signature verification failed',
    tips: [
      'Check STRIPE_WEBHOOK_SECRET in Supabase dashboard',
      'Verify webhook endpoint URL in Stripe dashboard',
      'Create a new webhook endpoint and secret',
    ],
  }), {
    status: 400,
    headers: { 'Content-Type': 'application/json' },
  });
});
