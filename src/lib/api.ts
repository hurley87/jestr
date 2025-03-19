import { Token } from '@/app/page';

/**
 * Fetches all tokens from the API with optional cursor for pagination
 */
export async function fetchAllTokens(
  cursor: string = ''
): Promise<{ tokens: Token[]; hasMore: boolean; nextCursor?: string }> {
  try {
    const response = await fetch(
      `${process.env.CIRCUS_API_URL}/solana/agent/get-all?cursor=${cursor}`,
      {
        headers: {
          'x-api-key': `${process.env.CIRCUS_API_KEY}`,
        },
        next: { revalidate: 60 }, // Cache for 60 seconds
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch tokens: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      tokens: data.agents.map((agent: Token) => ({
        id: agent.agentId,
        agentId: agent.agentId,
        ownerPublicKey: agent.ownerPublicKey,
        metadata: {
          name: agent.metadata.name || 'Unknown Token',
          image:
            !agent.metadata.image || agent.metadata.image === ''
              ? './vercel.svg'
              : agent.metadata.image,
          symbol: agent.metadata.symbol || 'UNKNOWN',
          description: agent.metadata.description || '',
          attributes: agent.metadata.attributes || [],
        },
        running: agent.running || false,
        isGraduated: agent.isGraduated || false,
        isPresaleActive: agent.isPresaleActive || false,
        status: agent.status || {},
        balance: agent.balance || '0',
        embeddedWallet: agent.embeddedWallet || '',
      })),
      hasMore: data.pagination.hasMore,
      nextCursor: data.pagination.nextCursor,
    };
  } catch (error) {
    console.error('Error fetching tokens:', error);
    return { tokens: [], hasMore: false };
  }
}
