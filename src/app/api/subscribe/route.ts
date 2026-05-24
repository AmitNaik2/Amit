// C:/Users/Amit/antigravity/gamesdealshub-next/src/app/api/subscribe/route.ts
import { NextResponse } from 'next/server';

import { addSubscriber } from '@/lib/db';

// API route to handle email subscriptions
export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    // Save to our Redis database for internal notification crons
    const saved = await addSubscriber(email);

    // Optionally still try to send to Brevo if configured
    const apiKey = process.env.BREVO_API_KEY;
    if (apiKey) {
      try {
        await fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'api-key': apiKey,
          },
          body: JSON.stringify({
            email,
            updateEnabled: false,
            listIds: [2] // Replace with actual Brevo list ID
          })
        });
      } catch (err) {
        console.warn('Failed to add to Brevo, but saved to internal DB', err);
      }
    }

    return NextResponse.json({ success: true, message: saved ? 'Subscribed successfully' : 'Subscribed, but DB not configured' });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
