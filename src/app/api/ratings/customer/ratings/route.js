import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([
    {
      _id: "64f1a2b3c4d5e6f7g8h9i0j1",
      rating: 5,
      feedback: "Excellent service",
      technician: { name: "Tech Smith", phone: "9876543211" },
      ticket: { title: "AC Not Cooling" },
      createdAt: "2024-01-15T10:30:00.000Z"
    }
  ]);
}