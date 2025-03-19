'use client';

import { Button } from '@/components/ui/button';
import { usePrivy } from '@privy-io/react-auth';

export function Connect() {
  const { user, login } = usePrivy();

  console.log(user);

  if (user) {
    return (
      <Button
        size="lg"
        className="bg-jestr-purple hover:bg-jestr-purple/80 text-white font-pixel text-xs py-1 h-auto"
      >
        Connected
      </Button>
    );
  }

  return (
    <Button
      onClick={login}
      size="lg"
      className="bg-jestr-purple hover:bg-jestr-purple/80 text-white font-pixel text-xs py-1 h-auto"
    >
      Connect
    </Button>
  );
}
