'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Token } from '@/types';

export function JestCard({ jest }: { jest: Token }) {
  // const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [animate, setAnimate] = useState(false);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTimeRemaining(formatTimeRemaining(jest.endTime));
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, [endTime]);

  // const progress = (jest.balance / jest.launchAmount) * 100;

  console.log('jest', jest);

  const handleContribute = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 500);
  };

  const progress = (Number(jest.balance) / 10) * 100;

  return (
    <Link href={`/jest/${jest.ownerPublicKey}/${jest.agentId}`}>
      <Card
        className={`gameboy-container overflow-hidden transition-all duration-300 hover:translate-y-[-4px] ${
          animate ? 'animate-shake' : ''
        }`}
      >
        <CardContent className="p-2 sm:p-3 space-y-2 sm:space-y-3">
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-pixel text-jestr-green">
                {progress.toFixed(0)}%
              </span>
            </div>
            <Progress
              value={progress}
              className="h-2 sm:h-3 bg-jestr-background border border-black [&>[data-slot=progress-indicator]]:bg-jestr-green"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-full overflow-hidden border-2 border-black">
              <Image
                src={
                  jest.metadata.image || `/placeholder.svg?height=48&width=48`
                }
                alt={jest.metadata.name}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-pixel text-lg sm:text-xl md:text-2xl text-white truncate">
                {jest.metadata.name}
              </h3>
              <div className="flex items-center text-xs sm:text-sm">
                <span className="text-jestr-yellow font-medium truncate">
                  ${jest.metadata.symbol}
                </span>
                <span className="mx-1 text-muted-foreground">by</span>
                <span className="text-jestr-blue truncate">USERNAME</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between text-xs">
            <div>
              <span className="text-muted-foreground">Raised: </span>
              <span className="font-medium">{jest.balance} SOL</span>
            </div>
            <div>
              <span className="text-muted-foreground">Goal: </span>
              <span className="font-medium">10 SOL</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
            <div className="text-xs">
              <span className="text-muted-foreground">Time left: </span>
              {/* <span className="font-pixel text-jestr-yellow">
                {timeRemaining}
              </span> */}
            </div>

            <Button
              className="w-full sm:w-auto bg-jestr-purple hover:bg-jestr-purple/80 font-pixel text-lg sm:text-xl md:text-2xl py-1 sm:py-2 text-black font-bold cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleContribute();
              }}
            >
              Contribute {jest.balance} SOL
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
