import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TokensModule } from './tokens/tokens.module';
import { PricesModule } from './prices/prices.module';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './tokens/entities/token.entity';
import { TokenPrice } from './prices/entities/price.entity';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [Token, TokenPrice],
      synchronize: true,
      autoLoadEntities: true,
    }),
    CacheModule.register({
      ttl: 300, // 5 minutes
      max: 100, // max of 100 items in cache
      isGlobal: true,
    }),
    TokensModule,
    PricesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
