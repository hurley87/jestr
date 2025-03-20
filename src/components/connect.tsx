'use client';

import { Button } from '@/components/ui/button';
import { usePrivy } from '@privy-io/react-auth';

export function Connect() {
  const { user, login } = usePrivy();

  console.log(user);

  if (user) {
    return (
      <Button
        size="sm"
        className="bg-jestr-purple hover:bg-jestr-purple/80 text-white font-pixel text-sm sm:text-base md:text-xl py-1 px-2 sm:px-3 md:px-4 h-auto"
      >
        Connected
      </Button>
    );
  }

  return (
    <Button
      onClick={login}
      size="sm"
      className="bg-jestr-purple hover:bg-jestr-purple/80 text-white font-pixel text-sm sm:text-base md:text-xl py-1 px-2 sm:px-3 md:px-4 h-auto cursor-pointer"
    >
      Connect
    </Button>
  );
}
