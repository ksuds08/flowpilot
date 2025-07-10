import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: 'Not authenticated' });

  // ── Create or retrieve Stripe Customer linked to Clerk user ──
  const customers = await stripe.customers.search({
    query: `metadata["clerkUserId"]:"${userId}"`,
  });

  let customer = customers.data[0];
  if (!customer) {
    customer = await stripe.customers.create({
      metadata: { clerkUserId: userId },
    });
  }

  // ── Create Checkout Session ──
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: customer.id,
    line_items: [
      {
        price: process.env.STRIPE_PRICE_MONTHLY as string,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
  });

  res.status(200).json({ url: session.url });
}
