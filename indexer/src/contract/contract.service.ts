import { PricesService } from './../prices/prices.service'; // Importing PricesService for fetching token prices
import { contract } from './contract.abi'; // Importing contract ABI for contract interaction
import { Injectable, Logger } from '@nestjs/common'; // Importing Injectable and Logger from NestJS
import { ConfigService } from '@nestjs/config'; // Importing ConfigService for accessing environment variables
import { CreateTokenDto } from 'src/tokens/dto/create-token.dto'; // Importing DTO for token creation
import { TokensService } from 'src/tokens/tokens.service'; // Importing TokensService for token-related operations
import { delay } from 'src/utils/delay'; // Importing delay utility function
import { formatBalance } from 'src/utils/usdc'; // Importing utility function for formatting balance
import { createPublicClient, http } from 'viem'; // Importing viem library for blockchain interaction
import { mainnet } from 'viem/chains'; // Importing mainnet configuration for viem

@Injectable() // Decorator to indicate NestJS injectable service
export class ContractService {
  private readonly logger = new Logger(ContractService.name, {
    timestamp: true,
  });
  private readonly client; // Viem client instance
  private contractAddress; // Contract address for USDC token
  private blocks_count; // Number of blocks to consider
  private wallet_addresses = []; // Array of wallet addresses to be processed

  constructor(
    private configService: ConfigService, // Injecting ConfigService for accessing environment variables
    private tokenService: TokensService, // Injecting TokensService for token-related operations
    private pricesService: PricesService, // Injecting PricesService for fetching token prices
  ) {
    const {
      wallet_addresses,
      rpc_address,
      blocks_count,
      usdc_contract_address,
    } = this.loadEnv(); // Loading environment variables
    this.wallet_addresses = wallet_addresses; // Assigning wallet addresses
    this.blocks_count = blocks_count; // Assigning blocks count
    this.contractAddress = usdc_contract_address; // Assigning contract address

    this.client = createPublicClient({
      // Creating Viem client instance
      chain: mainnet, // Using mainnet configuration
      transport: http(rpc_address), // Using HTTP transport with provided RPC address
    });
  }

  private loadEnv() {
    const wallet_addresses = this.configService // Loading wallet addresses from environment variables
      .get('WALLET_ADDRESSES')
      .split(',');
    const rpc_address = this.configService.get('RPC_ADDRESS'); // Loading RPC address from environment variables
    const blocks_count = this.configService.get('BLOCKS_COUNT'); // Loading blocks count from environment variables

    const usdc_contract_address = this.configService.get(
      'USDC_CONTRACT_ADDRESS',
    ); // Loading USDC contract address from environment variables

    return {
      wallet_addresses,
      rpc_address,
      blocks_count,
      usdc_contract_address,
    }; // Returning loaded environment variables
  }

  private async getBlocks() {
    const blockNumber = await this.client.getBlockNumber(); // Getting current block number from Viem client
    const lastBock = Number(blockNumber); // Converting block number to number
    const initialBlock = lastBock - this.blocks_count; // Calculating initial block number

    return { initialBlock, lastBock }; // Returning initial and last block numbers
  }

  async getBalanceOfWallets(blockNumber) {
    try {
      this.logger.debug(`\t -> blockNumber: ${blockNumber}`); // Logging block number
      const block = await this.client.getBlock({ blockNumber: blockNumber }); // Getting block details from Ethereum provider
      this.logger.debug(
        `\t -> block timestamp: ${block.timestamp}, date: ${new Date(
          Number(block.timestamp) * 1000,
        )}`,
      ); // Logging block timestamp
      const tokenPrice = await this.pricesService.getTokenPrice(); // Getting token price from PricesService
      this.logger.debug(`tokenPrice: ${JSON.stringify(tokenPrice)}`); // Logging token price
      const tokenBalances: Array<CreateTokenDto> = []; // Array to store token balances
      const promises = []; // Array to store promises for balance retrieval

      for (let i = 0; i < this.wallet_addresses.length; i++) {
        const address: string = this.wallet_addresses[i]; // Getting wallet address
        promises.push(
          this.client.readContract({
            // Pushing balance retrieval promise to array
            address: this.contractAddress, // Contract address
            abi: contract.abi, // Contract ABI
            functionName: 'balanceOf', // Function to call
            args: [address], // Arguments
            blockNumber: blockNumber, // Block number
          }),
        );
      }

      const results = await Promise.all(promises); // Waiting for all balance retrieval promises to resolve
      for (let i = 0; i < results.length; i++) {
        const balance = results[i]; // Getting balance
        const address = this.wallet_addresses[i]; // Getting wallet address
        this.logger.debug(`\t -> total balance for ${address}: ${balance}`); // Logging balance

        // Creating token object
        const token: CreateTokenDto = {
          blockNumber: blockNumber, // Block number
          balanceWei: balance, // Balance in wei
          walletAddress: address, // Wallet address
          timestamp: new Date(Number(block.timestamp) * 1000), // Timestamp
          totalPrice: formatBalance(balance) * Number(tokenPrice.data), // Total price
        };
        tokenBalances.push(token); // Adding token object to array
      }

      return tokenBalances; // Returning token balances
    } catch (e) {
      let message = null; // Initializing error message
      if (e instanceof Error) {
        message = e.message; // Getting error message
      }
      this.logger.error(message); // Logging error message

      return []; // Returning empty array
    }
  }

  async getBalanceAndSave() {
    try {
      const { initialBlock, lastBock } = await this.getBlocks(); // Getting initial and last block numbers
      const totalSteps = Math.floor(lastBock - initialBlock); // Calculating total steps
      this.logger.log('Total steps:', totalSteps); // Logging total steps
      let currentStep = 1; // Initializing current step
      for (let i = initialBlock; i < lastBock; i++) {
        console.time(`- [${currentStep}/${totalSteps}]`); // Starting timer
        const balances = await this.getBalanceOfWallets(i); // Getting balances for wallets
        await this.tokenService.bulkInsert(balances); // Saving balances
        await delay(200); // Delaying execution
        console.timeEnd(`- [${currentStep}/${totalSteps}]`); // Ending timer
        currentStep++; // Incrementing current step
      }
    } catch (e) {
      this.logger.error(e.message); // Logging error message
    }
  }
}
