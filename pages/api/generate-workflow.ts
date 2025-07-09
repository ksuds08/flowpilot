import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { goal } = req.body as { goal?: string };

  if (!goal) {
    return res.status(400).json({ error: 'Missing goal' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are Flowpilot, an AI workflow assistant for solopreneurs. Generate a clear, actionable step-by-step workflow to achieve the user\'s goal. Each step should include a short description and a suggested due date in ISO format relative to today.',
        },
        { role: 'user', content: goal },
      ],
    });

    const content = completion.choices[0].message.content;
    return res.status(200).json({ workflow: content });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to generate workflow' });
  }
}
