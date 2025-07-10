import type { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import { prisma } from '@/lib/prisma'; // adjust path if needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;

  if (!code || Array.isArray(code)) {
    return res.status(400).send('Invalid code');
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GMAIL_REDIRECT_URI
  );

  const { tokens } = await oauth2Client.getToken(code as string);

  // TODO: replace with real user ID from session
  const userId = 'placeholder-user-id';

  await prisma.userIntegration.upsert({
    where: { provider_providerUserId: { provider: 'google', providerUserId: userId } },
    create: {
      provider: 'google',
      providerUserId: userId,
      accessToken: tokens.access_token ?? '',
      refreshToken: tokens.refresh_token ?? '',
      expiresAt: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
      user: { connect: { id: userId } },
    },
    update: {
      accessToken: tokens.access_token ?? '',
      refreshToken: tokens.refresh_token ?? '',
      expiresAt: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
    },
  });

  res.redirect('/dashboard');
}
