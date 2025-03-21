import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { TokenCard } from '@/components/token-card';
import { JestCard } from '@/components/jest-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { fetchAllTokens } from '@/lib/api';

export default async function Home() {
  const { tokens } = await fetchAllTokens();
  const launchedTokens = tokens
    .filter((token) => token.isGraduated === true)
    .slice(0, 4);
  // const activeJests = tokens.filter((token) => token.isPresaleActive === true);
  const activeJests = tokens;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 container px-4 py-6 mx-auto">
        {/* Launched Tokens Section */}
        <section className="mb-8 md:mb-12">
          {launchedTokens.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6">
              <h2 className="font-pixel text-3xl sm:text-4xl md:text-5xl text-white">
                Top Tokens
              </h2>
              <Link href="/tokens">
                <Button
                  variant="outline"
                  className="text-jestr-blue border-jestr-blue bg-black group"
                >
                  <span className="group-hover:text-white cursor-pointer">
                    View All
                  </span>
                </Button>
              </Link>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {launchedTokens.map((token) => (
              <TokenCard key={token.id} token={token} />
            ))}
          </div>
        </section>

        {/* Active Pre-sales Section */}
        <section>
          <h2 className="font-pixel text-3xl sm:text-4xl md:text-5xl text-white mb-4 sm:mb-6">
            Active Pre-sales
          </h2>

          <div className="space-y-3 md:space-y-4">
            {activeJests.map((jest) => (
              <JestCard key={jest.id} jest={jest} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
