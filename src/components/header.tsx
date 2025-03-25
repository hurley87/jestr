import Link from 'next/link';
import { Button } from '@/components/ui/button';
// import { Connect } from '@/components/connect';
import Image from 'next/image';
import { InfoIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

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

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-jestr-blue/80 cursor-pointer"
          >
            <InfoIcon className="h-8 w-8 sm:h-16 sm:w-16" />
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-jestr-background border-jestr-purple/20">
          <DialogHeader>
            <DialogTitle className="text-jestr-yellow font-pixel text-2xl">
              The Trenches are Now Public
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-white">
            <p className="text-lg">Launch a Solana token in your X feed.</p>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>
                <span className="font-semibold">POST:</span> Tag @jestrbot on X
                and provide a ticker, a token name, and an optional image and
                description
              </li>
              <li>
                <span className="font-semibold">CREATE:</span> @jestrbot will
                reply to your post with your newly created token
              </li>
              <li>
                <span className="font-semibold">TRADE:</span> Trade tokens like
                the trenches
              </li>
              <li>
                <span className="font-semibold">EARN:</span> Earn rewards on
                tokens you launch [coming soon]
              </li>
            </ol>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
