#!/bin/bash

# ============================================================================
# STRIPE WEBHOOK QUICK CHECK SCRIPT
# ============================================================================
# This script helps verify your Stripe webhook configuration
# ============================================================================

echo ""
echo "=========================================="
echo "🔍 STRIPE WEBHOOK CONFIGURATION CHECK"
echo "=========================================="
echo ""

# Project Information
PROJECT_ID="apdfvpgaznpqlordkipw"
WEBHOOK_URL="https://${PROJECT_ID}.supabase.co/functions/v1/stripe-webhook"
DEBUG_URL="https://${PROJECT_ID}.supabase.co/functions/v1/stripe-webhook-debug"

echo "📋 Your Configuration:"
echo "  Project ID: $PROJECT_ID"
echo "  Webhook URL: $WEBHOOK_URL"
echo "  Debug URL: $DEBUG_URL"
echo ""

# Check 1: Test webhook endpoint is accessible
echo "=========================================="
echo "✅ Check 1: Testing webhook endpoint accessibility"
echo "=========================================="
echo ""
echo "Testing: $WEBHOOK_URL"
echo ""

# Try to access the webhook endpoint (GET request for health check)
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$WEBHOOK_URL")

if [ "$HTTP_STATUS" = "200" ]; then
    echo "✅ SUCCESS: Endpoint is accessible (HTTP $HTTP_STATUS)"
else
    echo "⚠️  WARNING: Endpoint returned HTTP $HTTP_STATUS"
    echo "   (This is OK - webhooks may not respond to GET requests)"
fi

echo ""

# Check 2: Check debug endpoint
echo "=========================================="
echo "✅ Check 2: Testing debug endpoint"
echo "=========================================="
echo ""
echo "Testing: $DEBUG_URL"
echo ""

DEBUG_RESPONSE=$(curl -s "$DEBUG_URL")
DEBUG_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$DEBUG_URL")

if [ "$DEBUG_STATUS" = "200" ]; then
    echo "✅ SUCCESS: Debug endpoint is active"
    echo ""
    echo "Response:"
    echo "$DEBUG_RESPONSE" | jq '.' 2>/dev/null || echo "$DEBUG_RESPONSE"
else
    echo "❌ FAILED: Debug endpoint not accessible (HTTP $DEBUG_STATUS)"
    echo "   Make sure you've deployed the stripe-webhook-debug function"
fi

echo ""
echo ""

# Instructions
echo "=========================================="
echo "📋 NEXT STEPS"
echo "=========================================="
echo ""
echo "1. Verify in Stripe Dashboard:"
echo "   → Go to: https://dashboard.stripe.com/webhooks"
echo "   → Ensure you're in LIVE MODE (toggle in top-right)"
echo "   → Find endpoint with URL: $WEBHOOK_URL"
echo "   → Click on it → 'Signing secret' → 'Reveal'"
echo "   → Copy the secret (starts with whsec_)"
echo ""
echo "2. Update Supabase Secret:"
echo "   → Go to: https://supabase.com/dashboard/project/$PROJECT_ID"
echo "   → Navigate to: Edge Functions → Configuration → Secrets"
echo "   → Update STRIPE_WEBHOOK_SECRET with the secret from Stripe"
echo "   → Save and redeploy"
echo ""
echo "3. Test with Diagnostic Endpoint:"
echo "   → In Stripe Dashboard, temporarily update webhook URL to:"
echo "     $DEBUG_URL"
echo "   → Send test webhook: checkout.session.completed"
echo "   → Check response - should see detailed diagnostics"
echo "   → If successful, change URL back to: $WEBHOOK_URL"
echo ""
echo "4. Test Final Configuration:"
echo "   → Send test webhook to production URL"
echo "   → Should see HTTP 200 response"
echo "   → Check Supabase logs for success messages"
echo ""
echo "=========================================="
echo "🔧 TROUBLESHOOTING TIPS"
echo "=========================================="
echo ""
echo "If you still see 'Bad signature' error:"
echo ""
echo "❌ WRONG: Using test mode secret for live mode endpoint"
echo "✅ RIGHT: Use LIVE mode secret from LIVE mode endpoint"
echo ""
echo "❌ WRONG: Copying secret from different endpoint"
echo "✅ RIGHT: Copy from the EXACT endpoint URL"
echo ""
echo "❌ WRONG: Adding quotes around secret: 'whsec_xxx'"
echo "✅ RIGHT: Raw secret only: whsec_xxx"
echo ""
echo "❌ WRONG: Retrying old failed webhooks (signature expired)"
echo "✅ RIGHT: Send NEW test webhook (fresh signature)"
echo ""
echo "=========================================="
echo ""
