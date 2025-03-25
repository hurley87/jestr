import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Token } from '@/types';

export function JestCard({ jest }: { jest: Token }) {
  return (
    <Link href={`/jest/${jest.ownerPublicKey}/${jest.agentId}`}>
      <Card
        className={`gameboy-container overflow-hidden transition-all duration-300 hover:scale-105 hover:rotate-1 hover:shadow-lg`}
      >
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
            <div className="w-1/2 space-y-2 sm:space-y-3">
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
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
