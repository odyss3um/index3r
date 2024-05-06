import { Injectable, Logger } from '@nestjs/common'; // Importing Injectable and Logger from NestJS for creating injectable service and logging
import { ContractService } from './contract/contract.service'; // Importing ContractService for contract-related operations

@Injectable() // Decorator to indicate NestJS injectable service
export class AppService {
  private readonly logger = new Logger(AppService.name); // Creating logger instance

  constructor(private contractService: ContractService) {
    // Constructor injecting ContractService
    this.contractService.getBalanceAndSave(); // Calling method to get balances for provided wallets and store them
  }
}
