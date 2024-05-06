import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './tokens/entities/token.entity';
import { ContractModule } from './contract/contract.module';
import { ContractService } from './contract/contract.service';
import { TokensModule } from './tokens/tokens.module';
import { PricesModule } from './prices/prices.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [Token],
      synchronize: true,
      autoLoadEntities: true,
      // logging: true,
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      isGlobal: true,
    }),
    TokensModule,
    ContractModule,
    PricesModule,
  ],
  controllers: [],
  providers: [AppService, ContractService],
})
export class AppModule {}
