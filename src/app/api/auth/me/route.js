import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    _id: "64f1a2b3c4d5e6f7g8h9i0j1",
    name: "John Doe",
    phone: "9876543210",
    email: "john@example.com",
    role: "CUSTOMER",
    isActive: true,
    isVerified: true
  });
}