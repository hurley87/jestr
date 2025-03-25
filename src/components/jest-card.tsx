import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Token } from '@/types';

export function JestCard({ jest }: { jest: Token }) {
  const getTimeAgo = (timestamp?: string) => {
    if (!timestamp) return 'Just now';

    const date = new Date(timestamp);
    const now = new Date();
    const diffInDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  };

  return (
    <Link
      href={`https://dexscreener.com/solana/${jest.publicKey}`}
      target="_blank"
    >
      <Card
        className={`gameboy-container overflow-hidden transition-all duration-300 hover:scale-105 hover:rotate-1 hover:shadow-lg relative`}
      >
        <div className="absolute top-3 right-3 z-10">
          <span className="text-xs text-gray-400">
            {getTimeAgo(jest.createdAt)}
          </span>
        </div>
        <CardContent className="p-0.5">
          <div className="flex gap-4">
            {/* Left column - Image */}
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
                <div className="flex w-full justify-between">
                  <div className="w-full flex flex-col">
                    <span className="text-gray-400 font-medium truncate text-xs">
                      Market Cap
                    </span>
                    <span className="text-white font-medium truncate text-xs">
                      $400K
                    </span>
                  </div>
                  <div className="w-full flex flex-col">
                    <span className="text-gray-400 font-medium truncate text-xs">
                      24h Volume
                    </span>
                    <span className="text-white font-medium truncate text-xs">
                      $100K
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 items-center py-2 border-t-2 border-black/20">
                  <span className="h-5 w-5 rounded-full bg-gray-400" />
                  <span className="text-gray-400 font-medium truncate text-sm">
                    username
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
