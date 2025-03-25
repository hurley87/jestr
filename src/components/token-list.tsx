'use client';

import { useState, useMemo } from 'react';
import { Token } from '@/types';
import { JestCard } from '@/components/jest-card';
import { SearchBar } from '@/components/search-bar';

interface TokenListProps {
  initialTokens: Token[];
}

export function TokenList({ initialTokens }: TokenListProps) {
  console.log(initialTokens);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTokens = useMemo(() => {
    if (!searchQuery) return initialTokens;

    const query = searchQuery.toLowerCase();
    return initialTokens.filter((token) => {
      const nameMatch = token.metadata.name.toLowerCase().includes(query);
      const symbolMatch = token.metadata.symbol.toLowerCase().includes(query);
      const publicKeyMatch = token.publicKey?.toLowerCase().includes(query);
      const ownerPublicKeyMatch = token.ownerPublicKey
        .toLowerCase()
        .includes(query);

      return nameMatch || symbolMatch || publicKeyMatch || ownerPublicKeyMatch;
    });
  }, [initialTokens, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <main className="flex-1 container px-4 py-6 mx-auto">
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {filteredTokens.map((jest) => (
          <JestCard key={jest.id} jest={jest} />
        ))}
      </div>
    </main>
  );
}
