import { NextResponse } from 'next/server';
import { getActiveGames } from '@/lib/gamerpower';
import { getAllSubscribers, isNewGameAndMarkNotified } from '@/lib/db';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic'; // Prevent caching so cron always runs fresh

export async function GET(request: Request) {
  try {
    // Check security header if configured (Vercel Cron automatically sends a secure header)
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const games = await getActiveGames();
    if (!games || games.length === 0) {
      return NextResponse.json({ success: true, message: 'No active games found.' });
    }

    // We only check the 3 most recent games to prevent spamming if DB is empty
    const recentGames = games.slice(0, 3);
    const newGamesToNotify = [];

    for (const game of recentGames) {
      const isNew = await isNewGameAndMarkNotified(game.id);
      if (isNew) {
        newGamesToNotify.push(game);
      }
    }

    if (newGamesToNotify.length === 0) {
      return NextResponse.json({ success: true, message: 'No new games to notify.' });
    }

    const subscribers = await getAllSubscribers();
    if (subscribers.length === 0) {
      return NextResponse.json({ success: true, message: `Found ${newGamesToNotify.length} new games, but no subscribers exist.` });
    }

    // Setup Nodemailer
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Missing EMAIL_HOST / EMAIL_USER / EMAIL_PASS in env");
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: Number(process.env.EMAIL_PORT) === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let emailsSent = 0;

    // Send emails
    for (const game of newGamesToNotify) {
      const htmlBody = `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:12px;">
          <h1 style="color:#6366f1;margin-top:0;">🎮 New Free Game Alert!</h1>
          <p style="font-size:18px;"><strong>${game.title}</strong> is currently free!</p>
          <img src="${game.thumbnail}" alt="${game.title}" style="width:100%;border-radius:8px;margin-bottom:16px;" />
          <p style="font-size:14px;color:#aaa;">Grab it before the deal expires!</p>
          <a href="https://www.gamesdealshub.me" style="display:inline-block;margin-top:16px;padding:12px 24px;background:#6366f1;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;">
            Claim it on GamesDealsHub
          </a>
        </div>
      `;

      // We send them individually to BCC to protect privacy, or simply loop
      // Bcc is better so we don't have to await a thousand separate email calls
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        bcc: subscribers, // Send as BCC so recipients don't see each other
        subject: `🔥 FREE Game Alert: ${game.title}`,
        html: htmlBody,
      });

      emailsSent += subscribers.length;
    }

    return NextResponse.json({ 
      success: true, 
      message: `Sent ${emailsSent} emails for ${newGamesToNotify.length} new games.` 
    });

  } catch (error) {
    console.error('[cron] Error in check-new-games:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
