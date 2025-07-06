import { NextRequest, NextResponse } from 'next/server';
import { searchAll } from '@/lib/db/backend/searchAll';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const decodedQuery = decodeURIComponent(query);
    const { profiles, posts } = await searchAll(decodedQuery);
    
    return NextResponse.json({ profiles, posts });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Failed to perform search' }, { status: 500 });
  }
} 