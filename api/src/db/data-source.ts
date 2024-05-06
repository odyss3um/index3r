import { TokenPrice } from 'src/prices/entities/price.entity';
import { Token } from 'src/tokens/entities/token.entity';
import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [Token, TokenPrice],
  synchronize: true,
  seeds: ['dist/db/seeds/**/*.js'],
  factories: ['dist/db/factories/**/*.js'],
};
