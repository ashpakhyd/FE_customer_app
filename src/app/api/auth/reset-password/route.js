import { NextResponse } from 'next/server';

export async function POST(request) {
  const { phone, otp, newPassword } = await request.json();
  return NextResponse.json({ message: "Password reset successful" });
}