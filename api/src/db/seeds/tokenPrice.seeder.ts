import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { TokenPrice } from 'src/prices/entities/price.entity';

export default class PriceTokenSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('TRUNCATE "token_price" RESTART IDENTITY;');

    const tokenPriceFactory = factoryManager.get(TokenPrice);
    // save 1 factory generated entity, to the database
    await tokenPriceFactory.save();

    // save 5 factory generated entities, to the database
    await tokenPriceFactory.saveMany(5);

    // const repository = dataSource.getRepository(TokenPrice);
    // await repository.insert({
    //   price: getRandom(0.9, 1),
    //   timestamp: new Date().getTime(),
    // });
  }
}
