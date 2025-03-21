import { checkPresaleExpiration } from '@/lib/utils';

interface JestTimerProps {
  agentId: string;
}

export async function JestTimer({ agentId }: JestTimerProps) {
  const expiration = await checkPresaleExpiration(agentId);
  console.log('expiration', expiration);

  return (
    <span
      className={`font-pixel text-lg ${
        expiration.error || expiration.hasExpired
          ? 'text-red-500'
          : 'text-jestr-yellow'
      }`}
    >
      {expiration.timeRemaining}
    </span>
  );
}
