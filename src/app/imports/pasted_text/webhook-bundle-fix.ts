The issue: Your application logic is rejecting bundleId: "complete-library" with the error "Unknown bundle: complete-library".

This is an application logic error, not a Stripe webhook issue. Your code needs to handle this bundle ID.

Fix in your webhook handler:

if (event.type === 'checkout.session.completed') { const session = event.data.object const { userId, purchaseType, bundleId } = session.metadata

if (purchaseType === 'bundle') { // Add "complete-library" to your bundle handling logic if (bundleId === 'complete-library') { // Process complete library bundle } else if (bundleId === 'other-bundle') { // Process other bundles } else { console.error('Unknown bundle:', bundleId) return new Response(Unknown bundle: ${bundleId}, { status: 400 }) } } }'




Reasoned
Got it — this is app logic, not Stripe
Your DB has the complete-library bundle seeded correctly. The 400 error is coming from your webhook’s bundle switch rejecting that ID. Update your webhook handler to accept all valid bundle IDs from the database (including complete-library) instead of hardcoding a partial list.

Two robust options:

Minimal hotfix (add complete-library to your condition)
Quickest fix but still brittle.
Recommended: Look up the bundle by ID from Postgres
Eliminates hardcoded IDs and keeps app logic in sync with your bundles table.
Example (TypeScript, Supabase Edge Function/webhook), recommended approach:

import { createClient } 
from
 
'npm:@supabase/supabase-js'

const
 supabase = createClient(Deno.env.
get
(
'SUPABASE_URL'
)!, Deno.env.
get
(
'SUPABASE_SERVICE_ROLE_KEY'
)!)
Deno.serve(
async
 (req) => {
  
const
 
event
 = 
await
 req.json()
  
if
 (
event
.type !== 
'checkout.session.completed'
) {
    
return
 
new
 Response(
'ignored'
, { status: 
200
 })
  }
  
const
 session = 
event
.data.
object

  
const
 { userId, purchaseType, bundleId } = session.metadata || {}
  
if
 (purchaseType !== 
'bundle'
) {
    
return
 
new
 Response(
'ok'
, { status: 
200
 })
  }
  
// Fetch bundle by id to avoid hardcoding logic

  
const
 { data: bundle, error: bundleErr } = 
await
 supabase
    .
from
(
'bundles'
)
    .
select
(
'id, name, themes, price'
)
    .eq(
'id'
, bundleId)
    .single()
  
if
 (bundleErr || !bundle) {
    console.error(
'Unknown bundle:'
, bundleId, bundleErr)
    
return
 
new
 Response(`Unknown bundle: ${bundleId}`, { status: 
400
 })
  }
  
// Record the bundle purchase

  
const
 { error: insertBundleErr } = 
await
 supabase
    .
from
(
'bundle_purchases'
)
    .insert({
      user_id: userId,
      bundle_id: bundle.id,
      price_paid: session.amount_total ? session.amount_total / 
100
 : bundle.price, 
// fallback

      stripe_payment_id: session.payment_intent || session.id,
    })
  
if
 (insertBundleErr) {
    console.error(
'bundle_purchases insert failed'
, insertBundleErr)
    
return
 
new
 Response(
'insert failed'
, { status: 
500
 })
  }
  
// The DB trigger will unlock all bundle themes automatically.

  
return
 
new
 Response(
'ok'
, { status: 
200
 })
})

If you still prefer the quick patch using conditions, include complete-library:

if
 (purchaseType === 
'bundle'
) {
  
if
 (bundleId === 
'complete-library'
) {
    
// Process full library bundle

  } 
else
 
if
 (bundleId === 
'life-milestones'
 || bundleId === 
'celebration'
 || bundleId === 
'inner-journey'
) {
    
// Process other bundles

  } 
else
 {
    
console
.error(
'Unknown bundle:'
, bundleId)
    
return
 
new
 Response(
`Unknown bundle: 
${bundleId}
`
, { 
status
: 
400
 })
  }
}

Additional safety checks:

Ensure your Stripe Checkout Session metadata includes bundleId and purchaseType for bundle checkouts.
Use SERVICE_ROLE key server-side to bypass RLS for webhook inserts.
Keep bundle_purchases.bundle_id with a FK to bundles(id) so invalid IDs can’t be inserted.
With the trigger we created, theme unlocks happen automatically after the bundle purchase insert.