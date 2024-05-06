import { ApiProperty } from '@nestjs/swagger';

export class GetRandomPriceDto {
  @ApiProperty()
  min: number;

  @ApiProperty()
  max: number;
}
