'use client';

import { useState, useMemo, useEffect } from 'react';
import { Token } from '@/types';
import { JestCard } from '@/components/jest-card';
import { SearchBar } from '@/components/search-bar';
// import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

interface TokenListProps {
  initialTokens: Token[];
}

interface TokenWithMarketData extends Token {
  hasMarketData?: boolean;
}

export function TokenList({ initialTokens }: TokenListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyWithMarketData, setShowOnlyWithMarketData] = useState(false);
  const [tokens, setTokens] = useState<TokenWithMarketData[]>(initialTokens);

  // Fetch market data for all tokens
  useEffect(() => {
    const fetchMarketData = async () => {
      const updatedTokens = await Promise.all(
        tokens.map(async (token) => {
          if (!token.publicKey) {
            return { ...token, hasMarketData: false };
          }
          try {
            const response = await fetch(
              `/api/market-data?publicKey=${token.publicKey}`
            );
            const hasMarketData = response.ok;
            return { ...token, hasMarketData };
          } catch (error) {
            console.error(error);
            return { ...token, hasMarketData: false };
          }
        })
      );
      setTokens(updatedTokens);
    };

    fetchMarketData();
  }, [initialTokens]);

  const filteredTokens = useMemo(() => {
    let filtered = tokens;

    // Filter by market data if enabled
    if (showOnlyWithMarketData) {
      filtered = filtered.filter((token) => token.hasMarketData);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((token) => {
        const nameMatch = token.metadata.name.toLowerCase().includes(query);
        const symbolMatch = token.metadata.symbol.toLowerCase().includes(query);
        const publicKeyMatch = token.publicKey?.toLowerCase().includes(query);
        const ownerPublicKeyMatch = token.ownerPublicKey
          .toLowerCase()
          .includes(query);

        return (
          nameMatch || symbolMatch || publicKeyMatch || ownerPublicKeyMatch
        );
      });
    }

    return filtered;
  }, [tokens, searchQuery, showOnlyWithMarketData]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <main className="flex-1 container px-4 py-6 mx-auto">
      <div className="flex flex-col mb-6">
        <SearchBar onSearch={handleSearch} />
        <div className="flex items-center justify-center gap-2 bg-jestr-background/50 rounded-lg p-0 w-fit mx-auto">
          <Switch
            id="market-data-filter"
            checked={showOnlyWithMarketData}
            onCheckedChange={setShowOnlyWithMarketData}
            className="data-[state=checked]:bg-jestr-blue data-[state=unchecked]:bg-gray-600"
          />
          <label
            htmlFor="market-data-filter"
            className="text-sm text-gray-300 cursor-pointer font-medium"
          >
            premium jests
          </label>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {filteredTokens.map((jest, index) => (
          <JestCard key={jest.id} jest={jest} shouldShake={1 === index} />
        ))}
      </div>
    </main>
  );
}
