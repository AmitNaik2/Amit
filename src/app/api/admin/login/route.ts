import { NextResponse } from 'next/server';
import { createAdminSessionToken, getAdminSessionCookieName } from '@/lib/admin-auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const expectedEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const expectedPassword = process.env.ADMIN_PASSWORD?.trim();

    if (!expectedEmail || !expectedPassword) {
      // Fallback for local development if env vars are missing, but ideally they should be set.
      // We will securely check against the provided env vars.
      console.warn("ADMIN_EMAIL or ADMIN_PASSWORD is not set in environment variables.");
      return NextResponse.json({ success: false, message: "Server configuration error. Admin env vars not set." }, { status: 500 });
    }

    if (email.trim().toLowerCase() === expectedEmail && password.trim() === expectedPassword) {
      const token = createAdminSessionToken(expectedEmail, "Owner");
      const response = NextResponse.json({ success: true, token, role: "Owner" });
      response.cookies.set(getAdminSessionCookieName(), token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 8 * 60 * 60,
      });
      return response;
    } else {
      return NextResponse.json({ success: false, message: "Invalid credentials." }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}
