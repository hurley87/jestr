import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { formatSOL } from '@/lib/utils';
import { ArrowLeft, Share2, ExternalLink } from 'lucide-react';
import { Token } from '@/types';

interface Contributor {
  username: string;
  avatar?: string;
  contribution?: string;
  timestamp?: number;
}

interface JestDetailProps {
  params: Promise<{
    id: string;
    key: string;
  }>;
}

const getContributors = async (tokenId: string): Promise<Contributor[]> => {
  try {
    const url = `${process.env.CIRCUS_API_URL}/solana/agent/presale/get-contributions?agent_id=${tokenId}`;
    const response = await fetch(url, {
      headers: {
        'x-api-key': `${process.env.CIRCUS_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch inviters: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching inviters:', error);
    return [];
  }
};

const getToken = async (key: string, id: string): Promise<Token | null> => {
  const url = `${process.env.CIRCUS_API_URL}/solana/agent/get?agent_id=${key}&owner_public_key=${id}`;
  try {
    const response = await fetch(url, {
      headers: {
        'x-api-key': `${process.env.CIRCUS_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch token data');
    }

    const { agent } = await response.json();
    return agent;
  } catch (error) {
    console.error('Error fetching token:', error);
    return null;
  }
};

export default async function JestDetail({ params }: JestDetailProps) {
  const { key, id } = await params;
  const token = await getToken(id, key);
  const contributors = await getContributors(id);

  console.log('token', token);
  console.log('contributors', contributors);

  const progress = 50;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 container py-4 sm:py-6 md:py-8 px-4 sm:px-6 mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-muted-foreground hover:text-white mb-4 sm:mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span>Back to Home</span>
        </Link>

        <Card className={`gameboy-container overflow-hidden`}>
          <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              <div className="relative h-32 w-32 sm:h-40 sm:w-40 mx-auto md:mx-0 rounded-lg overflow-hidden border-4 border-black">
                <Image
                  src={token?.metadata.image || '/placeholder.svg'}
                  alt={token?.metadata.name || ''}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 space-y-3 sm:space-y-4">
                <div className="text-center md:text-left">
                  <h1 className="font-pixel text-2xl sm:text-3xl text-white">
                    {token?.metadata.name}
                  </h1>
                  <div className="flex flex-wrap items-center mt-2 justify-center md:justify-start">
                    <span className="text-sm text-jestr-yellow font-medium">
                      ${token?.metadata.symbol}
                    </span>
                    <span className="mx-2 text-sm text-muted-foreground">
                      by
                    </span>
                    <Link
                      href={`#`}
                      className="text-sm text-jestr-blue hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      USERNAME
                    </Link>
                    <span className="ml-2 text-sm text-muted-foreground">
                      on X
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                  <div className="bg-jestr-background/50 rounded-lg p-3 flex-1">
                    <p className="text-xs text-muted-foreground">
                      Time Remaining
                    </p>
                    {/* <JestTimer endTime={token?.endTime} /> */}
                  </div>

                  <div className="bg-jestr-background/50 rounded-lg p-3 flex-1">
                    <p className="text-xs text-muted-foreground">
                      Your Contribution
                    </p>
                    <p className="font-pixel text-jestr-green text-lg">
                      {formatSOL(100)}
                    </p>
                  </div>

                  <div className="bg-jestr-background/50 rounded-lg p-3 flex-1">
                    <p className="text-xs text-muted-foreground">
                      Total Raised
                    </p>
                    <p className="font-pixel text-white text-lg">
                      {formatSOL(100)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button className="w-full sm:flex-1 bg-jestr-purple hover:bg-jestr-purple/80 font-pixel text-xl sm:text-2xl font-bold text-black py-2 cursor-pointer">
                    Contribute {formatSOL(100)}
                  </Button>

                  <div className="flex justify-center gap-3 sm:gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-jestr-blue text-jestr-blue hover:bg-jestr-blue/10"
                    >
                      <Share2 className="h-5 w-5 sm:h-6 sm:w-6" />
                      <span className="sr-only">Share</span>
                    </Button>

                    <Link href={'#'} target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-jestr-blue text-jestr-blue hover:bg-jestr-blue/10"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">View Original Post</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-pixel text-jestr-green">
                  {progress.toFixed(0)}%
                </span>
              </div>
              <Progress
                value={progress}
                className="h-4 sm:h-6 bg-jestr-background border-2 border-black"
                indicatorClassName="bg-jestr-green"
              />

              <div className="flex justify-between text-xs sm:text-sm">
                <div>
                  <span className="text-muted-foreground">Raised: </span>
                  <span className="font-medium">{formatSOL(100)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Goal: </span>
                  <span className="font-medium">{formatSOL(100)}</span>
                </div>
              </div>
            </div>

            {/* <div>
              <h3 className="font-pixel text-sm text-white mb-3">
                Contributors
              </h3>
              <div className="flex flex-wrap gap-2">
                {contributors.map((contributor: Contributor, index: number) => (
                  <div
                    key={index}
                    className="relative h-8 w-8 rounded-full border-2 border-jestr-card overflow-hidden"
                    title={contributor.username}
                  >
                    <Image
                      src={contributor.avatar || '/placeholder.svg'}
                      alt={contributor.username}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div> */}

            <div className="bg-jestr-background/50 rounded-lg p-3 sm:p-4">
              <h3 className="font-pixel text-sm text-white mb-2">
                About This Pre-sale
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                This is a pre-sale for {token?.metadata.name} (
                {token?.metadata.symbol}). The goal is to raise {formatSOL(10)}{' '}
                within the time limit. If the goal is reached, the token will be
                launched and distributed to contributors proportionally to their
                contribution. If the goal is not reached, all contributions will
                be refunded.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
