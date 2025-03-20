'use client';

import { useEffect, useState } from 'react';
import { checkPresaleExpiration } from '@/lib/utils';

interface JestTimerProps {
  agentId: string;
}

export function JestTimer({ agentId }: JestTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<string>('Loading...');
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchExpiration = async () => {
      try {
        const expiration = await checkPresaleExpiration(agentId);
        setTimeRemaining(expiration.timeRemaining);
        setIsExpired(expiration.hasExpired);
        setError(expiration.error);
      } catch (err) {
        setError('Failed to fetch expiration time');
        console.error(err);
      }
    };

    fetchExpiration();

    // Update every minute if not expired
    const intervalId = setInterval(() => {
      fetchExpiration();
    }, 60000);

    return () => clearInterval(intervalId);
  }, [agentId]);

  return (
    <span
      className={`font-pixel text-lg ${
        error || isExpired ? 'text-red-500' : 'text-jestr-yellow'
      }`}
    >
      {timeRemaining}
    </span>
  );
}
