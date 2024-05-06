import { Module } from '@nestjs/common';
import { TokensModule } from 'src/tokens/tokens.module';
import { ContractService } from './contract.service';
import { PricesModule } from 'src/prices/prices.module';

@Module({
  imports: [PricesModule, TokensModule],
  providers: [ContractService],
})
export class ContractModule {}
