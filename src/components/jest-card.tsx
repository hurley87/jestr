'use client';

import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { toast } from 'sonner';
import { Token } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import { ShakeWrapper } from '@/components/shake-wrapper';

interface MarketData {
  marketCap: number;
  volume: {
    h24: number;
  };
  priceChange: {
    h24: number;
  };
  pairCreatedAt: number;
}

const getMarketData = async (publicKey: string): Promise<MarketData | null> => {
  if (!publicKey || publicKey === '') return null;
  try {
    const response = await fetch(`/api/market-data?publicKey=${publicKey}`);
    if (!response.ok) {
      throw new Error('Failed to fetch market data');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

interface JestCardProps {
  jest: Token;
  shouldShake?: boolean;
}

export function JestCard({ jest, shouldShake }: JestCardProps) {
  const [marketData, setMarketData] = useState<MarketData | null>(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      const data = await getMarketData(jest?.publicKey || '');
      console.log('data', data);
      setMarketData(data);
    };
    fetchMarketData();
  }, [jest?.publicKey]);

  const handleCardClick = useCallback(async () => {
    try {
      if (!jest.publicKey) {
        toast.error('No CA available');
        return;
      }
      await navigator.clipboard.writeText(jest.publicKey);
      toast.success('CA copied to clipboard!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to copy to clipboard');
    }
  }, [jest.publicKey]);

  const formatMarketCap = useCallback((marketCap: number) => {
    return marketCap.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  }, []);

  const formatVolume = useCallback((volume: number) => {
    return volume.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  }, []);

  const getTimeAgo = useCallback((timestamp: number) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInMinutes / (24 * 60));

    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    }

    if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    }

    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  }, []);

  if (!marketData) return null;

  return (
    <ShakeWrapper shouldShake={shouldShake}>
      <Card
        onClick={handleCardClick}
        className="gameboy-container overflow-hidden transition-all duration-300 hover:scale-105 hover:rotate-1 hover:shadow-lg relative cursor-pointer"
      >
        <CardContent className="p-0.5">
          <div className="flex gap-4">
            {/* Left column - Image */}
            <div className="absolute top-3 right-3 z-10">
              <span className="text-xs text-gray-400">
                {getTimeAgo(marketData.pairCreatedAt)}
              </span>
            </div>
            <div className="w-1/2 flex items-center justify-center">
              <div className="relative aspect-square w-full rounded-none overflow-hidden border-2 border-black">
                <Image
                  src={
                    jest.metadata.image ||
                    `/placeholder.svg?height=256&width=256`
                  }
                  alt={jest.metadata.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 256px"
                />
              </div>
            </div>

            {/* Right column - Content */}
            <div className="w-1/2 flex flex-col justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center">
                  <span className="text-jestr-yellow font-medium truncate text-xs">
                    ${jest.metadata.symbol}
                  </span>
                </div>
                <h3 className="font-pixel text-lg sm:text-xl md:text-2xl text-white truncate">
                  {jest.metadata.name}
                </h3>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-2 w-full justify-between pb-2">
                  <div className="w-full flex flex-col pb-1">
                    <span className="text-gray-400 font-medium truncate text-xs">
                      Market Cap
                    </span>
                    <span className="text-white font-medium truncate text-xs">
                      {formatMarketCap(marketData?.marketCap || 0)}{' '}
                      <span
                        className={`${
                          marketData?.priceChange.h24 > 0
                            ? 'text-green-500'
                            : 'text-red-500'
                        }`}
                      >
                        ({marketData?.priceChange.h24}%)
                      </span>
                    </span>
                  </div>
                  <div className="w-full flex flex-col">
                    <span className="text-gray-400 font-medium truncate text-xs">
                      24h Volume
                    </span>
                    <span className="text-white font-medium truncate text-xs">
                      {formatVolume(marketData?.volume.h24 || 0)}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <img
                    src={jest.ownerTwitterPfpUrl}
                    className="h-5 w-5 rounded-full bg-gray-400"
                    alt={jest.ownerTwitterId}
                  />
                  <span className="text-gray-400 font-medium truncate text-sm">
                    {jest.ownerTwitterId}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </ShakeWrapper>
  );
}
