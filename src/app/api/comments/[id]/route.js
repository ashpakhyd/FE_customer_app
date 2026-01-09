import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
  const { message } = await request.json();
  return NextResponse.json({
    _id: "64f1a2b3c4d5e6f7g8h9i0j1",
    ticket: params.id,
    user: "64f1a2b3c4d5e6f7g8h9i0j1",
    role: "CUSTOMER",
    message,
    isInternal: false,
    createdAt: new Date().toISOString()
  });
}

export async function GET(request, { params }) {
  return NextResponse.json([
    {
      _id: "64f1a2b3c4d5e6f7g8h9i0j1",
      message: "Please check the compressor also",
      user: { name: "John Doe", role: "CUSTOMER" },
      createdAt: "2024-01-15T10:30:00.000Z"
    }
  ]);
}