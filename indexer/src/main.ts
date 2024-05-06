import { HttpAdapterHost, NestFactory } from '@nestjs/core'; // Importing HttpAdapterHost and NestFactory from NestJS core for creating NestJS application instance
import { AppModule } from './app.module'; // Importing AppModule for bootstrapping the application
import { AllExceptionsFilter } from './filters/all-exception.filter'; // Importing AllExceptionsFilter for handling exceptions

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // Creating NestJS application instance
    logger: ['error', 'warn'], // Using console logger
  });
  const { httpAdapter } = app.get(HttpAdapterHost); // Getting HttpAdapter from application instance
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter.getInstance())); // Applying global exception filter
  await app.listen(3011); // Listening on port 3011
}
bootstrap(); // Bootstrapping the application
