import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { X, ArchiveIcon } from 'lucide-react';
import { Connect } from '@/components/connect';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-jestr-background/95 backdrop-blur supports-[backdrop-filter]:bg-jestr-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto">
        <div className="flex items-center gap-2">
          <Link href="/">
            <span className="font-pixel text-sm md:text-base text-jestr-yellow">
              JESTR.WORLD
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="https://twitter.com/jestrworld"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="ghost"
              size="icon"
              className="text-jestr-blue hover:text-jestr-blue/80"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">X (Twitter)</span>
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
              <ArchiveIcon className="h-5 w-5" />
              <span className="sr-only">Farcaster</span>
            </Button>
          </Link>

          <Connect />
        </div>
      </div>
    </header>
  );
}
