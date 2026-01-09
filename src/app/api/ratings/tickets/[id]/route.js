import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
  const { rating, feedback } = await request.json();
  return NextResponse.json({
    _id: "64f1a2b3c4d5e6f7g8h9i0j1",
    ticket: params.id,
    customer: "64f1a2b3c4d5e6f7g8h9i0j1",
    technician: "64f1a2b3c4d5e6f7g8h9i0j1",
    rating,
    feedback,
    createdAt: new Date().toISOString()
  });
}