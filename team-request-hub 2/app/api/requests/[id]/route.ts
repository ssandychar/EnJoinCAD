import { NextRequest, NextResponse } from 'next/server';
import { updateRequest, deleteRequest } from '@/lib/data';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updated = updateRequest(params.id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const deleted = deleteRequest(params.id);
  if (!deleted) {
    return NextResponse.json({ error: 'Request not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
