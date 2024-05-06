import { ResponseDto } from './../response.dto';
import { GetTokenBalanceDto } from './dto/get-token-balance.dto';
import { Injectable, Logger } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { LessThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class TokensService {
  private readonly logger = new Logger(TokensService.name);

  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {}

  async getBalance(
    tokenBalanceDto: GetTokenBalanceDto,
  ): Promise<ResponseDto<Token> | null> {
    try {
      this.logger.log(
        `Calling getBalance with params: `,
        JSON.stringify(tokenBalanceDto),
      );
      const data = await this.tokenRepository.findOne({
        where: {
          walletAddress: tokenBalanceDto.walletAddress,
          timestamp: LessThanOrEqual(tokenBalanceDto.timestamp),
        },
        order: {
          timestamp: 'DESC',
        },
      });

      this.logger.log('Response:', JSON.stringify(data));
      if (data) {
        return {
          data: data,
          error: false,
          message: '',
        };
      } else {
        return {
          data: null,
          error: true,
          message: 'No data found for the query.',
        };
      }
    } catch (e) {
      this.logger.error('Error:', JSON.stringify(e));
      return {
        data: null,
        error: true,
        message: e.message,
      };
    }
  }

  create(createTokenDto: CreateTokenDto): Token {
    return this.tokenRepository.create(createTokenDto);
  }

  findAll(): Promise<Token[]> {
    return this.tokenRepository.find();
  }

  findOne(id: number): Promise<Token | null> {
    return this.tokenRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.tokenRepository.delete(id);
  }
}
