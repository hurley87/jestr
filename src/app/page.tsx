import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { TokenList } from '@/components/token-list';
import { fetchAllTokens } from '@/lib/api';

export default async function Home() {
  const { tokens } = await fetchAllTokens();
  const activeJests = tokens;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <TokenList initialTokens={activeJests} />
      <Footer />
    </div>
  );
}
