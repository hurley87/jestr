import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { TokenCard } from '@/components/token-card';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { fetchAllTokens } from '@/lib/api';

export default async function TokensPage() {
  const { tokens } = await fetchAllTokens();

  const launchedTokens = tokens.filter((token) => token.isGraduated === true);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 container py-8 mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-muted-foreground hover:text-white mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span>Back to Home</span>
        </Link>
        <h1 className="font-pixel text-2xl text-white mb-8">
          All Launched Tokens
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {launchedTokens.map((token) => (
            <TokenCard key={token.id} token={token} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
