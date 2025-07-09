import { google } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/google-oauth`
  );

  if (!code) {
    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/gmail.readonly',
        'https://www.googleapis.com/auth/calendar.events'
      ]
    });
    return res.redirect(url);
  }

  const { tokens } = await oauth2Client.getToken(code as string);

  // TODO: replace with real user ID from your auth middleware
  const userId = req.headers['x-user-id'] as string | undefined;
  if (!userId) return res.status(401).json({ error: 'Unauthenticated' });

  await prisma.userIntegration.upsert({
    where: { userId_provider: { userId, provider: 'google' } },
    update: {
      accessToken: tokens.access_token || '',
      refreshToken: tokens.refresh_token || '',
      expiresAt: new Date(Date.now() + (tokens.expires_in || 0) * 1000)
    },
    create: {
      provider: 'google',
      userId,
      accessToken: tokens.access_token || '',
      refreshToken: tokens.refresh_token || '',
      expiresAt: new Date(Date.now() + (tokens.expires_in || 0) * 1000)
    }
  });

  return res.redirect('/dashboard?connected=google');
}
