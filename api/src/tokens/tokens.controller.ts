import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { TokensService } from './tokens.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { GetTokenBalanceDto } from './dto/get-token-balance.dto';
import { ApiTags } from '@nestjs/swagger';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@ApiTags('tokens')
@Controller('tokens')
export class TokensController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly tokensService: TokensService,
  ) {}

  @Post()
  create(@Body() createTokenDto: CreateTokenDto) {
    return this.tokensService.create(createTokenDto);
  }

  @Post('/getBalance')
  async getBalance(@Body() body: GetTokenBalanceDto) {
    console.log(body);
    const key = `balance-${body.walletAddress}-${body.timestamp}`;
    const valueInCache = await this.cacheManager.get(key);
    if (valueInCache) {
      return valueInCache;
    }

    const value = this.tokensService.getBalance(body);
    await this.cacheManager.set(key, value);

    return value;
  }

  @Get()
  findAll() {
    return this.tokensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tokensService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tokensService.remove(+id);
  }
}
