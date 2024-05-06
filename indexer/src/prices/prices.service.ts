import { Injectable, Logger } from '@nestjs/common'; // Importing Injectable and Logger from NestJS for creating injectable service and logging
import { HttpService } from '@nestjs/axios'; // Importing HttpService from NestJS Axios module for making HTTP requests
import { catchError, firstValueFrom } from 'rxjs'; // Importing catchError and firstValueFrom from RxJS for error handling and promise conversion
import { AxiosError } from 'axios'; // Importing AxiosError for handling Axios errors
import { ResponseDto } from 'src/dto/response.dto'; // Importing ResponseDto for defining response data structure

@Injectable() // Decorator to indicate NestJS injectable service
export class PricesService {
  private readonly logger = new Logger(PricesService.name, { timestamp: true }); // Creating logger instance

  private readonly url = 'http://localhost:3010/prices/getRandomPrice'; // URL for fetching token price

  constructor(private httpService: HttpService) {} // Constructor to inject HttpService for making HTTP requests

  async getTokenPrice() {
    try {
      const { data } = await firstValueFrom(
        // Converting observable to promise and extracting data
        this.httpService
          .post<ResponseDto<number>>(this.url, {
            // Making HTTP POST request to fetch token price
            min: 0.9, // Minimum value
            max: 1, // Maximum value
          })
          .pipe(
            catchError((error: AxiosError) => {
              // Handling error in case of HTTP request failure
              this.logger.error(error.response.data); // Logging error response data
              throw 'An error happened!'; // Throwing custom error message
            }),
          ),
      );

      return data; // Returning token price
    } catch (e) {
      let message = null; // Initializing error message
      if (e instanceof Error) {
        message = e.message; // Getting error message
      }
      this.logger.error(message); // Logging error message
    }
  }
}
