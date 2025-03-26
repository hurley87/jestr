import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const publicKey = searchParams.get('publicKey');

  if (!publicKey) {
    return NextResponse.json(
      { error: 'Public key is required' },
      { status: 400 }
    );
  }

  try {
    const dexScreenerResponse = await fetch(
      `https://api.dexscreener.com/token-pairs/v1/solana/${publicKey}`
    );
    const dexScreenerData = await dexScreenerResponse.json();

    if (dexScreenerData.length === 0) {
      return NextResponse.json(
        { error: 'No market data found for this token' },
        { status: 404 }
      );
    }

    return NextResponse.json(dexScreenerData[0]);
  } catch (error) {
    console.error('Error fetching market data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch market data' },
      { status: 500 }
    );
  }
}
