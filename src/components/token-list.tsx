'use client';

import {
  useState,
  useMemo,
  //useEffect
} from 'react';
import { Token } from '@/types';
import { JestCard } from '@/components/jest-card';
import { SearchBar } from '@/components/search-bar';

interface TokenListProps {
  initialTokens: Token[];
}

export function TokenList({ initialTokens }: TokenListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  // const [shuffledTokens, setShuffledTokens] = useState(initialTokens);
  // const [shakeIndex, setShakeIndex] = useState<number | null>(null);
  // const [previousFirstTokenId, setPreviousFirstTokenId] = useState<
  //   string | null
  // >(null);

  const filteredTokens = useMemo(() => {
    // if (!searchQuery) return shuffledTokens;

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

  // useEffect(() => {
  //   const shuffleTokens = () => {
  //     const newTokens = [...shuffledTokens];
  //     let attempts = 0;
  //     const maxAttempts = 10; // Prevent infinite loop

  //     do {
  //       // Fisher-Yates shuffle
  //       for (let i = newTokens.length - 1; i > 0; i--) {
  //         const j = Math.floor(Math.random() * (i + 1));
  //         [newTokens[i], newTokens[j]] = [newTokens[j], newTokens[i]];
  //       }
  //       attempts++;
  //     } while (
  //       newTokens[0].id === previousFirstTokenId &&
  //       attempts < maxAttempts
  //     );

  //     setShuffledTokens(newTokens);
  //     setPreviousFirstTokenId(newTokens[0].id);
  //     setShakeIndex(0);

  //     // Reset shake index after animation completes
  //     setTimeout(() => {
  //       setShakeIndex(null);
  //     }, 500);
  //   };

  //   const intervalId = setInterval(shuffleTokens, 3000);

  //   return () => clearInterval(intervalId);
  // }, [shuffledTokens, previousFirstTokenId]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <main className="flex-1 container px-4 py-6 mx-auto">
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {filteredTokens.map((jest, index) => (
          <JestCard key={jest.id} jest={jest} shouldShake={1 === index} />
        ))}
      </div>
    </main>
  );
}
