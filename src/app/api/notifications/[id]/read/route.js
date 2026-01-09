import { NextResponse } from 'next/server';

export async function PATCH(request, { params }) {
  return NextResponse.json({ message: "Marked as read" });
}