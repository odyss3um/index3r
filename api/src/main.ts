import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// Define the bootstrap function
async function bootstrap() {
  // Create a NestJS application instance by passing the AppModule to the NestFactory
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });

  app.enableCors();

  // Use DocumentBuilder to create a new Swagger document configuration
  const config = new DocumentBuilder()
    .setTitle('TokenSight') // Set the title of the API
    .setDescription('API to be used for TokenSight Indexer') // Set the description of the API
    .setVersion('0.1') // Set the version of the API
    // .addTag('tokensight')
    .build(); // Build the document

  // Create a Swagger document using the application instance and the document configuration
  const document = SwaggerModule.createDocument(app, config);

  // Setup Swagger module with the application instance and the Swagger document
  SwaggerModule.setup('api', app, document);

  // Start the application and listen for requests on port 3010
  await app.listen(3010);
}

// Call the bootstrap function to start the application
bootstrap();
