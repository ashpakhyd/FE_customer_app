import { NextResponse } from 'next/server';

const customers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1234567890' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+0987654321' },
];

export async function GET() {
  return NextResponse.json(customers);
}

export async function POST(request) {
  const customer = await request.json();
  const newCustomer = { ...customer, id: Date.now() };
  customers.push(newCustomer);
  return NextResponse.json(newCustomer, { status: 201 });
}