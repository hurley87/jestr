import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { TokenList } from '@/components/token-list';
import { fetchAllTokens } from '@/lib/api';

export default async function Home() {
  const { tokens } = await fetchAllTokens();

  console.log('tokens', tokens);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <TokenList initialTokens={tokens} />
      <Footer />
    </div>
  );
}
