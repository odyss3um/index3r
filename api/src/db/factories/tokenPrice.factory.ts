import { TokenPrice } from 'src/prices/entities/price.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(TokenPrice, (faker) => {
  const tokenPrice = new TokenPrice();

  const price = faker.number.float({ min: 0.9, max: 1, fractionDigits: 3 });

  tokenPrice.price = price;
  tokenPrice.timestamp = faker.date.between({
    from: '2024-04-28T00:00:00.000Z',
    to: '2024-04-30T00:00:00.000Z',
  });

  return tokenPrice;
});
