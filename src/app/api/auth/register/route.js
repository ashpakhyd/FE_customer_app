import { NextResponse } from 'next/server';

export async function POST(request) {
  const { name, phone, password, role, address } = await request.json();
  return NextResponse.json({ message: "Registered. OTP sent." });
}
