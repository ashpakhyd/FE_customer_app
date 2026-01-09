import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([
    {
      _id: "64f1a2b3c4d5e6f7g8h9i0j1",
      title: "Ticket Created",
      message: "Your ticket \"AC Not Cooling\" has been created",
      type: "TICKET_CREATED",
      isRead: false,
      createdAt: "2024-01-15T10:30:00.000Z"
    }
  ]);
}