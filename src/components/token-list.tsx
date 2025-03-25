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

    return initialTokens.filter((token) =>
      token.metadata.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [initialTokens, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {filteredTokens.map((jest) => (
          <JestCard key={jest.id} jest={jest} />
        ))}
      </div>
    </>
  );
}
