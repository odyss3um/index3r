import { ApiProperty } from '@nestjs/swagger';

export class CreateTokenDto {
  @ApiProperty({
    description: 'Name of the token',
  })
  tokenName: string;

  @ApiProperty({
    description: 'Address of the token',
  })
  tokenAddress: string;

  @ApiProperty({
    description: 'Block number',
  })
  blockNumber: number;

  @ApiProperty({
    description: 'Wallet address to be searched for',
  })
  walletAddress: string;

  @ApiProperty({
    description: 'Current balance for walletAddress',
  })
  balanceInWei: number;

  @ApiProperty({
    description: 'Total price for the current balance',
  })
  totalPrice: number;

  @ApiProperty()
  timestamp: Date;
}
