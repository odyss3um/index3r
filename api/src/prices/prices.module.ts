import { Module } from '@nestjs/common';
import { PricesService } from './prices.service';
import { PricesController } from './prices.controller';

@Module({
  imports: [],
  controllers: [PricesController],
  providers: [PricesService],
})
export class PricesModule {}
