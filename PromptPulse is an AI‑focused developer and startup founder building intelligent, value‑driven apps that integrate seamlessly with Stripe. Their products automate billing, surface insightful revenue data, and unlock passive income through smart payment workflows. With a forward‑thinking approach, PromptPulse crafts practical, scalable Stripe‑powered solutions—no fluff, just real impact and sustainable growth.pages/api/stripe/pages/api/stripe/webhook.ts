import type { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export const config = { api: { bodyParser: false } };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const sig = req.headers['stripe-signature'] as string;
  const rawBody = await buffer(req);

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
  }

  switch (event.type) {
    // ── Successful checkout ──
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const clerkUserId = (session.customer_details?.metadata as any)?.clerkUserId;
      if (clerkUserId) {
        await supabase
          .from('users')
          .update({ plan: 'pro' })
          .eq('auth_id', clerkUserId);
      }
      break;
    }

    // ── Subscription cancelled ──
    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription;
      const clerkUserId = (sub.customer as any)?.metadata?.clerkUserId;
      if (clerkUserId) {
        await supabase
          .from('users')
          .update({ plan: 'free' })
          .eq('auth_id', clerkUserId);
      }
      break;
    }
  }

  res.json({ received: true });
}
