import { NextResponse } from 'next/server';

export async function POST(request) {
  const { name, phone, email, password, role } = await request.json();
  return NextResponse.json({ message: "Registered. OTP sent." });
}