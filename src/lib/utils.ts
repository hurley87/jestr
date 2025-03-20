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
