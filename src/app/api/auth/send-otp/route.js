import { NextResponse } from 'next/server';

export async function POST(request) {
  const { phone } = await request.json();
  return NextResponse.json({ message: "OTP sent" });
}