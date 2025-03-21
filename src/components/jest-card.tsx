import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import Link from 'next/link';
import { Token } from '@/types';
import { checkPresaleExpiration } from '@/lib/utils';

export async function JestCard({ jest }: { jest: Token }) {
  console.log(jest);
  const expiration = await checkPresaleExpiration(jest.agentId);

  const progress = (Number(jest.balance) / 10) * 100;

  return (
    <Link href={`/jest/${jest.ownerPublicKey}/${jest.agentId}`}>
      <Card
        className={`gameboy-container overflow-hidden transition-all duration-300 hover:translate-y-[-4px]`}
      >
        <CardContent className="p-2 sm:p-3 space-y-2 sm:space-y-3">
          <div className="space-y-1">
            <div className="flex justify-between text-lg">
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

          <div className="flex items-center gap-2 text-lg">
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

          <div className="flex justify-between text-md">
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
            <div>
              <span className="text-muted-foreground text-md">Time left: </span>
              <span
                className={`font-pixel text-lg ${
                  expiration.error ? 'text-red-500' : 'text-jestr-yellow'
                }`}
              >
                {expiration.timeRemaining}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
