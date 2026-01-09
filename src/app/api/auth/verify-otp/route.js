import { NextResponse } from 'next/server';

export async function POST(request) {
  const { phone, otp } = await request.json();
  return NextResponse.json({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." });
}