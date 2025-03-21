import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { JestTimer } from '@/components/jest-timer';
import Image from 'next/image';
import Link from 'next/link';
import { formatSOL } from '@/lib/utils';
import { ArrowLeft, ExternalLink } from 'lucide-react';
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

  const progress = (Number(token?.balance || 0) / 10) * 100;

  // Get current page URL for sharing
  const pageUrl = `https://jestr.vercel.app/jest/${key}/${id}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    pageUrl
  )}&text=${encodeURIComponent(
    `Check out ${token?.metadata.name || 'this Jest token'} presale!`
  )}`;

  return (
    <div className="flex min-h-screen flex-col bg-jestr-background">
      <Header />

      <main className="flex-1 container max-w-4xl py-6 md:py-8 px-4 md:px-6 mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-muted-foreground hover:text-white mb-6 text-sm"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          <span>Back to Home</span>
        </Link>

        <Card className="gameboy-container overflow-hidden shadow-lg">
          <CardContent className="p-6 md:p-8 space-y-6 md:space-y-8">
            {/* Token Header Section */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              {/* Token Image - Larger and more prominent */}
              <div className="relative h-48 w-48 mx-auto md:mx-0 rounded-xl overflow-hidden border-4 border-black shadow-md">
                <Image
                  src={token?.metadata.image || '/placeholder.svg'}
                  alt={token?.metadata.name || ''}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Token Details */}
              <div className="flex-1 space-y-4 md:space-y-5">
                {/* Token Name and Symbol */}
                <div className="text-center md:text-left">
                  <h1 className="font-pixel text-3xl md:text-4xl text-white mb-2">
                    {token?.metadata.name}
                  </h1>
                  <div className="flex flex-wrap items-center mt-2 justify-center md:justify-start">
                    <span className="text-base text-jestr-yellow font-medium">
                      ${token?.metadata.symbol}
                    </span>
                    <span className="mx-2 text-base text-muted-foreground">
                      by
                    </span>
                    <Link
                      href={`#`}
                      className="text-base text-jestr-blue hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      USERNAME
                    </Link>
                    <span className="ml-2 text-base text-muted-foreground">
                      on X
                    </span>
                  </div>
                </div>

                {/* Status Badge and Time Remaining - Side by side */}
                <div className="mt-3 flex flex-wrap items-center justify-center md:justify-start gap-3">
                  {/* Time Remaining */}
                  <div className="bg-jestr-background/70 rounded-lg p-2 flex-shrink-0 shadow-sm">
                    <p className="text-xs text-muted-foreground mb-1">
                      Time Remaining
                    </p>
                    {token?.agentId && <JestTimer agentId={token.agentId} />}
                  </div>

                  {/* Status Badge */}
                  {token && (
                    <span
                      className={`inline-flex px-3 py-1.5 text-sm font-bold rounded-md self-center ${
                        token.isPresaleActive && !token.isGraduated
                          ? 'bg-green-600/30 text-green-400'
                          : !token.isPresaleActive && token.isGraduated
                          ? 'bg-blue-600/30 text-blue-400'
                          : 'bg-red-600/30 text-red-400'
                      }`}
                    >
                      {token.isPresaleActive && !token.isGraduated
                        ? 'ACTIVE'
                        : !token.isPresaleActive && token.isGraduated
                        ? 'GRADUATED'
                        : 'FAILED'}
                    </span>
                  )}
                </div>

                {/* Progress Section - Moved under status */}
                <div className="mt-4 bg-jestr-background/50 rounded-xl p-4 space-y-3 shadow-sm">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-medium">
                      Progress
                    </span>
                    <span className="font-pixel text-jestr-green text-lg">
                      {progress.toFixed(0)}%
                    </span>
                  </div>
                  <Progress
                    value={progress}
                    className="h-8 bg-jestr-background/80 border-2 border-black"
                    indicatorClassName="bg-jestr-green"
                  />

                  <div className="flex justify-between text-sm pt-1">
                    <div>
                      <span className="text-muted-foreground">Raised: </span>
                      <span className="font-bold text-white">
                        {formatSOL(Number(token?.balance || 0))}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Goal: </span>
                      <span className="font-bold text-white">
                        {formatSOL(10)}
                      </span>
                    </div>
                  </div>

                  {/* Share Button */}
                  <div className="flex justify-end mt-6">
                    <Link
                      href={twitterShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        className="border-jestr-blue text-jestr-blue hover:bg-jestr-blue/10 cursor-pointer flex items-center gap-2 px-4 py-2 h-auto"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>Share on Twitter</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-jestr-background/50 rounded-xl p-5 shadow-sm">
              <h3 className="font-pixel text-xl text-white mb-4">
                About This Pre-sale
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This is a pre-sale for {token?.metadata.name} (
                {token?.metadata.symbol}). The goal is to raise {formatSOL(10)}{' '}
                within the time limit. If the goal is reached, the token will be
                launched and distributed to contributors proportionally to their
                contribution. If the goal is not reached, all contributions will
                be refunded.
              </p>

              <h4 className="font-pixel text-lg text-white mt-5 mb-3">
                How to Participate
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                To participate in the presale you must:
              </p>
              <ul className="text-sm text-muted-foreground list-disc pl-5 mt-2 space-y-1">
                <li>Be added to the whitelist</li>
                <li>Have an active, funded Jester wallet</li>
                <li>
                  Comment on the X presale post (
                  <Link href="#" className="text-jestr-blue hover:underline">
                    link
                  </Link>
                  ) {`with the word "contribute"`}
                </li>
              </ul>
              <p className="text-sm text-muted-foreground mt-2">
                Tag <span className="text-jestr-blue">@jestrbot</span> on X if
                you have any questions!
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
