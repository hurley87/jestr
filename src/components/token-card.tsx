import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Token } from '@/types';
import { getPublicKey } from '@/lib/utils';

export async function TokenCard({ token }: { token: Token }) {
  const publicKey = await getPublicKey(token.id);
  return (
    <Card className="gameboy-container overflow-hidden transition-all duration-300 hover:translate-y-[-4px]">
      <CardContent className="p-0">
        <div className="relative aspect-square w-full overflow-hidden rounded-t-md">
          <Image
            src={
              token.metadata.image || `/placeholder.svg?height=300&width=300`
            }
            alt={token.metadata.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority
          />
          <div className="absolute top-2 right-2 bg-jestr-background/80 backdrop-blur-sm rounded-full px-2 py-1 font-pixel">
            <span className="text-xl sm:text-2xl md:text-3xl font-pixel text-jestr-yellow font-bold">
              ${token.metadata.symbol}
            </span>
          </div>
        </div>

        <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
          <div>
            <h3 className="font-pixel text-xl sm:text-2xl md:text-3xl text-white truncate">
              {token.metadata.name}
            </h3>
            <div className="flex items-center mt-1">
              <span className="text-xs text-muted-foreground">by </span>
              <Link
                href={`#`}
                className="text-sm text-jestr-blue hover:underline ml-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                USERNAME
              </Link>
              <span className="ml-1 text-xs text-muted-foreground">on X</span>
            </div>
          </div>

          <div className="space-y-3">
            {/* <div className="flex -space-x-2">
              {contributors.slice(0, 5).map((contributor, index) => (
                <div
                  key={index}
                  className="relative h-6 w-6 rounded-full border-2 border-jestr-card overflow-hidden"
                >
                  <Image
                    src={
                      contributor.avatar ||
                      `/placeholder.svg?height=24&width=24`
                    }
                    alt={contributor.username}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
              {contributors.length > 5 && (
                <div className="relative h-6 w-6 rounded-full bg-jestr-purple border-2 border-jestr-card flex items-center justify-center">
                  <span className="text-[10px] text-white">
                    +{contributors.length - 5}
                  </span>
                </div>
              )}
            </div> */}

            {/* <div>
              <p className="text-xs text-muted-foreground">Marketcap</p>
              <p className="font-pixel text-sm text-jestr-green">
                ${marketcap.toLocaleString()}
              </p>
            </div> */}
            <Link
              href={`https://dexscreener.com/solana/${publicKey}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full bg-jestr-blue hover:bg-jestr-blue/80 font-pixel text-lg sm:text-xl md:text-2xl py-1 sm:py-2 text-black font-bold cursor-pointer">
                Buy
                <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 font-bold" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
