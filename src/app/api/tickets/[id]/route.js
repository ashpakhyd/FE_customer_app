import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  return NextResponse.json({
    _id: params.id,
    title: "AC Not Cooling",
    description: "My AC is not cooling properly",
    status: "IN_PROGRESS",
    customer: { name: "John Doe", phone: "9876543210" },
    technician: { name: "Tech Smith", phone: "9876543211" }
  });
}