import Link from 'next/link';
import { Button } from '@/components/ui/button';
// import { Connect } from '@/components/connect';
import Image from 'next/image';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-jestr-background/95 backdrop-blur supports-[backdrop-filter]:bg-jestr-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <Link href="/">
            <span className="font-pixel text-xl sm:text-3xl md:text-4xl text-jestr-yellow">
              JESTR
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <SocialLinks />
          {/* <Connect /> */}
        </div>
      </div>
    </header>
  );
}

// Extracted social links to a separate component for reuse
function SocialLinks() {
  return (
    <div className="flex items-center gap-1">
      <Link
        href="https://twitter.com/jestrbot"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:text-jestr-blue/80 h-8 w-8 sm:h-10 sm:w-10 cursor-pointer"
        >
          <Image src="/twitter.svg" alt="Twitter" width={18} height={18} />
        </Button>
      </Link>

      <Link
        href="https://warpcast.com/jestr"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          variant="ghost"
          size="icon"
          className="text-jestr-purple hover:text-jestr-purple/80 h-8 w-8 sm:h-10 sm:w-10 cursor-pointer"
        >
          <Image src="/warpcast.png" alt="Farcaster" width={24} height={24} />
        </Button>
      </Link>
    </div>
  );
}
