Next steps to fix “Bad signature”
Since your signing secret is correct, the failure is almost certainly due to how the request body is handled before verification. Stripe requires verifying the exact raw bytes with the stripe-signature header.

Please either paste your current stripe-webhook function code here, or follow the corrected template below.

Correct Edge Function template (raw body + server SDK)
Key points:

Use npm:stripe (server SDK), not @stripe/stripe-js.
Read the raw body first via req.arrayBuffer() and pass the bytes to constructEvent.
Do not call req.json() before verification.
Return 2xx for unhandled event types to avoid retries.
Example handler:

// File: supabase/
functions
/stripe-webhook/
index
.ts
import
 Stripe 
from
 "npm:stripe";
const stripe = 
new
 Stripe(Deno.env.
get
("STRIPE_SECRET_KEY")!, {
  apiVersion: "2023-10-16",
});
Deno.serve(async (req: Request) => {
  
if
 (req.
method
 === "GET") {
    
return
 
new
 Response("ok", { status: 
200
 });
  }
  
if
 (req.
method
 !== "POST") {
    
return
 
new
 Response("Method Not Allowed", { status: 
405
 });
  }
  const sig = req.headers.
get
("stripe-signature");
  
if
 (!sig) {
    
return
 
new
 Response("Missing signature", { status: 
400
 });
  }
  const webhookSecret = Deno.env.
get
("STRIPE_WEBHOOK_SECRET");
  
if
 (!webhookSecret) {
    
return
 
new
 Response("Missing STRIPE_WEBHOOK_SECRET", { status: 
500
 });
  }
  let event: Stripe.Event;
  try {
    // IMPORTANT: 
read
 raw bytes, 
do
 
not
 parse 
JSON
 yet
    const rawBody = await req.arrayBuffer();
    // Buffer.
from
 
is
 available 
in
 Deno’s Node compat layer
    const payload = Buffer.
from
(rawBody);
    event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    
return
 
new
 Response("Bad signature", { status: 
400
 });
  }
  try {
    switch (event.
type
) {
      
case
 "checkout.session.completed": {
        const 
session
 = event.data.
object
 
as
 Stripe.Checkout.
Session
;
        // Example: 
read
 metadata you attached during checkout
        const userId = 
session
.metadata?.userId;
        const bundleId = 
session
.metadata?.bundleId;
        const purchaseType = 
session
.metadata?.purchaseType;
        // TODO: 
Validate
 fields, 
then
 
perform
 DB updates 
using
 service 
role
 key
        // Example (pseudo-code):
        // const client = createClient(Deno.env.
get
(
'SUPABASE_URL'
)!, Deno.env.
get
(
'SUPABASE_SERVICE_ROLE_KEY'
)!);
        // await client.
from
(
'purchases'
).
insert
({ user_id: userId, bundle_id: bundleId, ... });
        break;
      }
      
default
:
        // 
No
-op 
for
 unhandled events, but 
return
 
200
 
to
 stop retries
        console.log(`Unhandled event 
type
: ${event.
type
}`);
    }
    
return
 
new
 Response("ok", { status: 
200
 });
  } catch (err) {
    console.error("Webhook handler error:", err);
    // 
Return
 
200
 
for
 idempotency unless this 
is
 truly retriable 
work

    
return
 
new
 Response("ok", { status: 
200
 });
  }
});

Common pitfalls to double-check
No middleware that reads or modifies the body before constructEvent.
No JSON.stringify/encoding changes before verification.
Using stripe.webhooks.constructEvent with Buffer of raw bytes, not a string that’s been re-encoded.
Using the server SDK: import Stripe from "npm:stripe".
apiVersion on the Stripe client can be any server-supported version; it doesn’t affect signature verification, which relies on raw payload + header + secret.
If you’re already using raw body
If your code already matches the above pattern, share it here and I’ll pinpoint the issue. Also confirm:

Your deployment picked up the latest code (version bump in logs after deploy).
The function allows unauthenticated invocations (you resolved 401 earlier).
The webhook URL in Stripe matches exactly the deployed function path.
Once we get a 200 from Stripe, we can wire the DB insert/update to grant the bundle using SUPABASE_SERVICE_ROLE_KEY and ensure RLS is bypassed for the webhook logic.