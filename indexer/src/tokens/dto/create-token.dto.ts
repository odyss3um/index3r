export class CreateTokenDto {
  tokenName?: string;

  tokenAddress?: string;

  blockNumber: number;

  walletAddress: string;

  balanceWei: number;

  totalPrice: number;

  timestamp: Date;
}
