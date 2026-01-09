import { NextResponse } from 'next/server';

export async function POST(request) {
  const ticketData = await request.json();
  return NextResponse.json({
    _id: "64f1a2b3c4d5e6f7g8h9i0j1",
    ...ticketData,
    status: "OPEN",
    customer: "64f1a2b3c4d5e6f7g8h9i0j1",
    createdAt: new Date().toISOString()
  });
}