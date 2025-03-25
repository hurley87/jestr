import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { TokenList } from '@/components/token-list';
import { fetchAllTokens } from '@/lib/api';
import { getPublicKey } from '@/lib/utils';

export default async function Home() {
  const { tokens } = await fetchAllTokens();

  // Enrich tokens with their public keys
  const enrichedTokens = await Promise.all(
    tokens.map(async (token) => {
      try {
        const publicKey = await getPublicKey(token.agentId);
        return {
          ...token,
          publicKey,
        };
      } catch (error) {
        console.error(
          `Failed to fetch public key for token ${token.agentId}:`,
          error
        );
        return token;
      }
    })
  );

  console.log(enrichedTokens);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <TokenList initialTokens={enrichedTokens} />
      <Footer />
    </div>
  );
}
