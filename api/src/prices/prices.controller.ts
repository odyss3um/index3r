import { Controller, Post, Body } from '@nestjs/common';
import { PricesService } from './prices.service';
import { ApiTags } from '@nestjs/swagger';
import { GetRandomPriceDto } from './dto/get-price-random.dto';

@ApiTags('prices')
@Controller('prices')
export class PricesController {
  constructor(private readonly pricesService: PricesService) {}

  @Post('getRandomPrice')
  getRandomPrice(@Body() randomPriceDto: GetRandomPriceDto) {
    return this.pricesService.getRandomPrice(
      randomPriceDto.min,
      randomPriceDto.max,
    );
  }
}
