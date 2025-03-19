export type TokenMetadata = {
  name: string;
  image: string;
  symbol: string;
  description: string;
  attributes: Array<{
    value: string;
    trait_type: string;
  }>;
};

export type Token = {
  id: string;
  agentId: string;
  ownerPublicKey: string;
  metadata: TokenMetadata;
  running: boolean;
  isGraduated: boolean;
  isPresaleActive: boolean;
  status: Record<string, string>;
  balance: string;
  embeddedWallet: string;
};
