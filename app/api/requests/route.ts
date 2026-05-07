import { NextRequest, NextResponse } from 'next/server';
import { getRequests, addRequest, getDashboardStats } from '@/lib/data';
import { RequestFilters } from '@/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  if (searchParams.get('stats') === 'true') {
    return NextResponse.json(getDashboardStats());
  }

  const filters: RequestFilters = {
    customerType: (searchParams.get('customerType') as RequestFilters['customerType']) || 'all',
    salesTeam: (searchParams.get('salesTeam') as RequestFilters['salesTeam']) || 'all',
    category: (searchParams.get('category') as RequestFilters['category']) || 'all',
    priority: (searchParams.get('priority') as RequestFilters['priority']) || 'all',
    status: (searchParams.get('status') as RequestFilters['status']) || 'all',
    search: searchParams.get('search') || undefined,
  };

  return NextResponse.json(getRequests(filters));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, customerType, salesTeam, category, priority, status, description } = body;

    if (!title || !customerType || !salesTeam || !category || !priority || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newRequest = addRequest({
      title,
      customerType,
      salesTeam,
      category,
      priority,
      status,
      description,
    });

    return NextResponse.json(newRequest, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
