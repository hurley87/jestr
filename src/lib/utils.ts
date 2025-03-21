import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimeRemaining(endTime: Date): string {
  const now = new Date();
  const diff = endTime.getTime() - now.getTime();

  if (diff <= 0) {
    return 'Ended';
  }

  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  return `${minutes}m ${seconds}s`;
}

export function formatSOL(amount: number): string {
  return `${amount.toFixed(2)} SOL`;
}

export function shortenAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

export const getPublicKey = async (agentId: string): Promise<string> => {
  const url = `${process.env.CIRCUS_API_URL}/solana/agent/public-key?agent_id=${agentId}`;
  const response = await fetch(url, {
    headers: {
      'x-api-key': `${process.env.CIRCUS_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch public key: ${response.statusText}`);
  }

  const data = await response.json();
  return data.walletPublicKey;
};

/**
 * Checks the presale expiration status for a Solana agent
 * @param agentId - The ID of the agent to check
 * @returns An object containing expiration information
 */
export const checkPresaleExpiration = async (
  agentId: string
): Promise<{
  hasExpired: boolean;
  minutesLeft: number;
  totalMinutes: number;
  timeRemaining: string;
  error?: string;
}> => {
  if (!agentId) {
    return {
      hasExpired: true,
      minutesLeft: 0,
      totalMinutes: 0,
      timeRemaining: '0m',
      error: 'Missing agent ID',
    };
  }

  const url = `${process.env.CIRCUS_API_URL}/solana/agent/presale/check-expiration?agent_id=${agentId}`;

  console.log('url', url);

  try {
    const response = await fetch(url, {
      headers: {
        'x-api-key': `${process.env.CIRCUS_API_KEY}`,
      },
    });

    console.log('response', response);

    if (!response.ok) {
      const errorMessage = `Failed to check presale expiration: ${response.statusText}`;
      console.error(errorMessage);
      return {
        hasExpired: true,
        minutesLeft: 0,
        totalMinutes: 0,
        timeRemaining: '0m',
        error: errorMessage,
      };
    }

    const data = await response.json();
    const minutesLeft = data.minutesLeft || 0;

    // Return '0m' if expired or no time left
    const timeRemaining =
      data.expired || minutesLeft <= 0 ? '0m' : `${minutesLeft}m`;

    return {
      hasExpired: data.expired,
      minutesLeft: minutesLeft,
      totalMinutes: data.totalMinutes || 0,
      timeRemaining,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error checking presale expiration:', errorMessage);

    return {
      hasExpired: true,
      minutesLeft: 0,
      totalMinutes: 0,
      timeRemaining: '0m',
      error: errorMessage,
    };
  }
};
