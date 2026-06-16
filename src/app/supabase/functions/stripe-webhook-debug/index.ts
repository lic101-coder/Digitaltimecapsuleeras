// ============================================================================
// STRIPE WEBHOOK DIAGNOSTIC - Shows safe debugging info without exposing secrets
// ============================================================================
// Deploy this to: https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/stripe-webhook-debug
// Then use "Send test webhook" from your EXACT Live endpoint in Stripe Dashboard
// ============================================================================

import Stripe from 'npm:stripe';
import { createHash } from 'node:crypto';

const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY');
const STRIPE_WEBHOOK_SECRET = Deno.env.get('STRIPE_WEBHOOK_SECRET');

if (!STRIPE_SECRET_KEY) {
  throw new Error('❌ Missing STRIPE_SECRET_KEY');
}

if (!STRIPE_WEBHOOK_SECRET) {
  throw new Error('❌ Missing STRIPE_WEBHOOK_SECRET');
}

const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });

console.info('🔍 Stripe Webhook Debug Function Started');
console.info('🆔 Project ID: apdfvpgaznpqlordkipw');
console.info('🌐 Expected URL: https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/stripe-webhook');

Deno.serve(async (req) => {
  console.log('\n' + '='.repeat(80));
  console.log('🔍 STRIPE WEBHOOK DEBUG REQUEST');
  console.log('='.repeat(80));
  
  const timestamp = new Date().toISOString();
  console.log('⏰ Timestamp:', timestamp);
  console.log('🔗 Method:', req.method);
  console.log('🔗 URL:', req.url);

  // GET request for health check
  if (req.method === 'GET') {
    const info = {
      status: 'active',
      projectId: 'apdfvpgaznpqlordkipw',
      expectedEndpoint: 'https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/stripe-webhook',
      secretPrefix: STRIPE_WEBHOOK_SECRET.substring(0, 7),
      timestamp: timestamp,
    };
    
    console.log('✅ Health check response:', info);
    
    return new Response(JSON.stringify(info, null, 2), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  // ============================================================================
  // DIAGNOSTIC SECTION 1: Headers
  // ============================================================================
  console.log('\n📋 HEADERS ANALYSIS:');
  console.log('-'.repeat(80));
  
  const headers: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    headers[key] = value;
    if (key.toLowerCase().includes('stripe')) {
      console.log(`  ✅ ${key}: ${value.substring(0, 60)}${value.length > 60 ? '...' : ''}`);
    }
  });

  const signature = req.headers.get('stripe-signature');
  
  if (!signature) {
    console.error('❌ CRITICAL: No stripe-signature header found!');
    console.log('Available headers:', Object.keys(headers));
    return new Response(JSON.stringify({
      error: 'Missing stripe-signature header',
      availableHeaders: Object.keys(headers),
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  console.log('✅ Signature header present');
  console.log('   Length:', signature.length);
  
  // Parse signature components
  const sigComponents = signature.split(',').reduce((acc, part) => {
    const [key, value] = part.split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);
  
  console.log('   Components:', Object.keys(sigComponents));
  if (sigComponents.t) {
    console.log('   Timestamp (t):', sigComponents.t);
    const sigTime = parseInt(sigComponents.t, 10) * 1000;
    const now = Date.now();
    const age = (now - sigTime) / 1000;
    console.log('   Signature age:', age.toFixed(2), 'seconds');
    if (age > 300) {
      console.warn('   ⚠️  Signature is older than 5 minutes!');
    }
  }

  // ============================================================================
  // DIAGNOSTIC SECTION 2: Webhook Secret
  // ============================================================================
  console.log('\n🔑 WEBHOOK SECRET ANALYSIS:');
  console.log('-'.repeat(80));
  console.log('   Prefix (first 7 chars):', STRIPE_WEBHOOK_SECRET.substring(0, 7));
  console.log('   Length:', STRIPE_WEBHOOK_SECRET.length);
  console.log('   Format valid:', STRIPE_WEBHOOK_SECRET.startsWith('whsec_') ? '✅ YES' : '❌ NO (should start with whsec_)');

  if (!STRIPE_WEBHOOK_SECRET.startsWith('whsec_')) {
    console.error('❌ CRITICAL: Webhook secret does not start with "whsec_"');
    console.error('   This is likely NOT a valid Stripe webhook signing secret!');
  }

  // ============================================================================
  // DIAGNOSTIC SECTION 3: Request Body
  // ============================================================================
  console.log('\n📦 BODY ANALYSIS:');
  console.log('-'.repeat(80));
  
  const body = await req.text();
  
  console.log('   Body length:', body.length, 'bytes');
  console.log('   Body SHA256:', createHash('sha256').update(body).digest('hex'));
  console.log('   First 100 chars:', body.substring(0, 100));
  console.log('   Last 50 chars:', body.substring(body.length - 50));
  
  // Check if body looks like valid JSON
  try {
    const parsed = JSON.parse(body);
    console.log('   ✅ Body is valid JSON');
    console.log('   Event type:', parsed.type || 'unknown');
    console.log('   Event ID:', parsed.id || 'unknown');
    console.log('   Live mode:', parsed.livemode ? '✅ LIVE' : '⚠️  TEST');
  } catch (e) {
    console.error('   ❌ Body is NOT valid JSON:', (e as Error).message);
  }

  // ============================================================================
  // DIAGNOSTIC SECTION 4: Signature Verification Attempt
  // ============================================================================
  console.log('\n🔐 SIGNATURE VERIFICATION ATTEMPTS:');
  console.log('-'.repeat(80));

  let verificationResult = {
    success: false,
    method: '',
    error: '',
    event: null as Stripe.Event | null,
  };

  // Attempt 1: Direct string (most common)
  console.log('\n🔬 Attempt 1: Using body as string (req.text())');
  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      STRIPE_WEBHOOK_SECRET
    );
    
    console.log('   ✅ SUCCESS!');
    console.log('   Event type:', event.type);
    console.log('   Event ID:', event.id);
    
    verificationResult = {
      success: true,
      method: 'req.text() directly',
      error: '',
      event: event,
    };
  } catch (err) {
    console.error('   ❌ FAILED:', (err as Error).message);
    verificationResult.error = (err as Error).message;
  }

  // ============================================================================
  // DIAGNOSTIC SECTION 5: Final Result
  // ============================================================================
  console.log('\n' + '='.repeat(80));
  console.log('📊 FINAL DIAGNOSTIC RESULT');
  console.log('='.repeat(80));

  if (verificationResult.success) {
    console.log('✅ Verification SUCCESSFUL!');
    console.log('   Method:', verificationResult.method);
    console.log('   Event:', verificationResult.event?.type, verificationResult.event?.id);
    
    return new Response(JSON.stringify({
      success: true,
      method: verificationResult.method,
      eventType: verificationResult.event?.type,
      eventId: verificationResult.event?.id,
      message: '✅ Webhook verification successful! Your main webhook should work now.',
    }, null, 2), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    console.error('❌ Verification FAILED!');
    console.error('   Error:', verificationResult.error);
    console.error('\n🔍 TROUBLESHOOTING STEPS:');
    console.error('   1. Go to: https://dashboard.stripe.com/webhooks');
    console.error('   2. Find the endpoint with URL:');
    console.error('      https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/stripe-webhook');
    console.error('   3. Click "Signing secret" → "Reveal"');
    console.error('   4. Copy the EXACT secret (starts with whsec_)');
    console.error('   5. Update in Supabase: supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...');
    console.error('   6. Redeploy and test again');
    
    return new Response(JSON.stringify({
      success: false,
      error: verificationResult.error,
      diagnostics: {
        signaturePresent: !!signature,
        secretPrefix: STRIPE_WEBHOOK_SECRET.substring(0, 7),
        secretLength: STRIPE_WEBHOOK_SECRET.length,
        secretFormat: STRIPE_WEBHOOK_SECRET.startsWith('whsec_') ? 'valid' : 'INVALID',
        bodyLength: body.length,
        bodyHash: createHash('sha256').update(body).digest('hex'),
      },
      troubleshooting: [
        'Check that STRIPE_WEBHOOK_SECRET matches the endpoint in Stripe Dashboard',
        'Verify endpoint URL: https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/stripe-webhook',
        'Use "Send test webhook" from the EXACT endpoint in Stripe Dashboard',
        'Make sure you\'re using the LIVE mode webhook secret (not test mode)',
      ],
    }, null, 2), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
