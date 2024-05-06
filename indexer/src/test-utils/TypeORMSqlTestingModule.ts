import { TypeOrmModule } from '@nestjs/typeorm';

export const TypeORMSqlTestingModule = (entities: any[]) =>
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    entities: [...entities],
    synchronize: true,
  });
