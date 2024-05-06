import { TypeORMSqlTestingModule } from '../../src/test-utils/TypeORMSqlTestingModule';
import { Test, TestingModule } from '@nestjs/testing';
import { TokensService } from './tokens.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';

describe('TokensService', () => {
  let service: TokensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeORMSqlTestingModule([Token]),
        TypeOrmModule.forFeature([Token]),
      ],
      providers: [TokensService],
    }).compile();

    service = module.get<TokensService>(TokensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should insert successfully', async () => {
    const insertResult = await service.bulkInsert([
      {
        blockNumber: 123456789,
        walletAddress: '0xA9D1e08C7793af67e9d92fe308d5697FB81d3E43',
        balanceWei: 136952544422173,
        totalPrice: 127091961.2238,
        timestamp: new Date(),
      },
    ]);
    expect(insertResult).toMatchObject({
      data: '',
      error: false,
      message: 'Tokens inserted successfully',
    });
  });
});
