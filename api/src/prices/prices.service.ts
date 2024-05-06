import { ResponseDto } from 'src/response.dto';
import { getRandom } from './../utils/random';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PricesService {
  constructor() {}

  getRandomPrice(min: number, max: number): ResponseDto<number> {
    return { data: getRandom(min, max), error: false };
  }
}
