import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Connect } from '@/components/connect';
import Image from 'next/image';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-jestr-background/95 backdrop-blur supports-[backdrop-filter]:bg-jestr-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto">
        <div className="flex items-center gap-2">
          <Link href="/">
            <span className="font-pixel text-4xl text-jestr-yellow">
              JESTR.WORLD
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Link
              href="https://twitter.com/jestrworld"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-jestr-blue/80"
              >
                <Image
                  src="/twitter.svg"
                  alt="Twitter"
                  width={18}
                  height={18}
                />
              </Button>
            </Link>

            <Link
              href="https://warpcast.com/jestrworld"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="icon"
                className="text-jestr-purple hover:text-jestr-purple/80"
              >
                <Image
                  src="/warpcast.png"
                  alt="Farcaster"
                  width={24}
                  height={24}
                />
              </Button>
            </Link>
          </div>

          <Connect />
        </div>
      </div>
    </header>
  );
}
