import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface TokenCardProps {
  id: string;
  name: string;
  ticker: string;
  image: string;
  creator: {
    username: string;
    platform: 'x' | 'farcaster';
    profileUrl: string;
  };
  contributors: {
    avatar: string;
    username: string;
  }[];
  marketcap: number;
}

export function TokenCard({
  name,
  ticker,
  image,
  creator,
  contributors,
  marketcap,
}: TokenCardProps) {
  return (
    <Card className="gameboy-container overflow-hidden transition-all duration-300 hover:translate-y-[-4px]">
      <CardContent className="p-0">
        <div className="relative aspect-square w-full overflow-hidden rounded-t-md">
          <Image
            src={image || `/placeholder.svg?height=300&width=300`}
            alt={name}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2 bg-jestr-background/80 backdrop-blur-sm rounded-full px-2 py-1">
            <span className="text-xs font-pixel text-jestr-yellow">
              ${ticker}
            </span>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <h3 className="font-pixel text-sm text-white truncate">{name}</h3>
            <div className="flex items-center mt-1">
              <span className="text-xs text-muted-foreground">by </span>
              <Link
                href={creator.profileUrl}
                className="text-xs text-jestr-blue hover:underline ml-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                @{creator.username}
              </Link>
              {creator.platform === 'x' ? (
                <span className="ml-1 text-xs text-muted-foreground">on X</span>
              ) : (
                <span className="ml-1 text-xs text-muted-foreground">
                  on Farcaster
                </span>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex -space-x-2">
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
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Marketcap</p>
              <p className="font-pixel text-sm text-jestr-green">
                ${marketcap.toLocaleString()}
              </p>
            </div>

            <Button className="w-full bg-jestr-blue hover:bg-jestr-blue/80 font-pixel text-xl py-1 h-8 text-black">
              Buy
              <ArrowUpRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
