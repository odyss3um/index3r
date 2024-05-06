import { Injectable, Logger } from '@nestjs/common'; // Importing Injectable and Logger from NestJS for creating injectable service and logging
import { CreateTokenDto } from './dto/create-token.dto'; // Importing CreateTokenDto for defining token creation data structure
import { InjectRepository } from '@nestjs/typeorm'; // Importing InjectRepository from TypeORM for injecting repository
import { Token } from './entities/token.entity'; // Importing Token entity
import { DataSource, Repository } from 'typeorm'; // Importing DataSource and Repository from TypeORM for database interaction
import { ResponseDto } from 'src/dto/response.dto'; // Importing ResponseDto for defining response data structure

@Injectable() // Decorator to indicate NestJS injectable service
export class TokensService {
  private readonly logger = new Logger(TokensService.name, { timestamp: true }); // Creating logger instance

  constructor(
    @InjectRepository(Token) // Injecting Token repository
    private tokenRepository: Repository<Token>, // Token repository instance
    private dataSource: DataSource, // Data source instance
  ) {}

  async bulkInsert(
    tokens: Array<CreateTokenDto>, // Array of token data
  ): Promise<ResponseDto<string> | null> {
    try {
      this.logger.debug('started bulk inserting...'); // Logging start of bulk insertion
      const queryRunner = this.dataSource.createQueryRunner(); // Creating query runner
      await queryRunner.connect(); // Connecting to database
      await queryRunner.startTransaction(); // Starting transaction
      try {
        await this.tokenRepository.insert(tokens); // Inserting tokens into database
        await queryRunner.commitTransaction(); // Committing transaction
        return {
          data: '',
          error: false,
          message: 'Tokens inserted successfully',
        }; // Returning success response
      } catch (e) {
        await queryRunner.rollbackTransaction(); // Rolling back transaction in case of error
        this.logger.error(e.message); // Logging error message
        return {
          data: '',
          error: true,
          message: e.message,
        }; // Returning error response
      } finally {
        await queryRunner.release(); // Releasing query runner
      }
    } catch (e) {
      this.logger.error(e.message); // Logging error message
      return {
        data: '',
        error: true,
        message: e.message,
      }; // Returning error response
    }
  }
}
