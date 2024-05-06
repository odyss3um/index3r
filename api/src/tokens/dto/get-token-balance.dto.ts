import { ApiProperty } from '@nestjs/swagger';

export class GetTokenBalanceDto {
  @ApiProperty({
    description: 'Wallet address to be searched for',
  })
  walletAddress: string;

  @ApiProperty()
  timestamp: Date;
}
