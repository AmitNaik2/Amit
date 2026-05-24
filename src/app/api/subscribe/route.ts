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

    // Send confirmation email (Fallback for cached browsers hitting /api/subscribe)
    try {
      const nodemailer = await import('nodemailer');
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT) || 587,
        secure: Number(process.env.EMAIL_PORT) === 465,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "🎉 Welcome to GamesDealsHub! Your free game alerts are active",
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:12px;">
            <h1 style="color:#6366f1;margin-top:0;">🎮 GamesDealsHub</h1>
            <p style="font-size:18px;"><strong>Welcome to the club!</strong></p>
            <p style="font-size:16px;color:#ccc;">Your subscription was completely successful.</p>
            <p style="font-size:14px;color:#aaa;">
              You will now receive instant email alerts whenever an amazing game goes 100% free on Epic Games, Steam, or GOG — giving you plenty of time to claim it before it expires.
            </p>
            <a href="https://www.gamesdealshub.me" style="display:inline-block;margin-top:16px;padding:12px 24px;background:#6366f1;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;">
              View Latest Deals →
            </a>
            <hr style="border-color:#222;margin:24px 0;" />
            <p style="font-size:12px;color:#555;">
              Don't want these emails anymore? Simply reply to this email with the word "unsubscribe" and we will remove you from our database immediately.
            </p>
          </div>
        `
      });
      console.log("[subscribe] Welcome email sent to", email);
    } catch (emailErr) {
      console.error("[subscribe] Error sending welcome email:", emailErr);
    }

    return NextResponse.json({ success: true, message: saved ? 'Subscribed successfully' : 'Subscribed, but DB not configured' });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
