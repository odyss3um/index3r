
## Token Indexer

## Description

Token Indexer is a tool used to create an Indexer for the Ethereum blockchain which indexes the historical token balance and token total value in USD. The indexer stores historical data for a fixed set of Ethereum addresses for the given token.
The USD price of the token is fetched from an external API for each indexed block.
For this example will be using USDC token deployed at the following address: 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48.

Using enviroment variables we can determine at which block in the past we want to fetch the data.

List of environment variables:
- USDC_CONTRACT_ADDRESS="0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
- WALLET_ADDRESSES="0x701258Feb11dda65956F6226b3eFF88cD5343226,0x588137e7c1Fce64a78e092611609B259bb524DaE, 0xA9D1e08C7793af67e9d92fe308d5697FB81d3E43,0x6F1cDbBb4d53d226CF4B917bF768B94acbAB6168,0x802920F421bE5873F53Ebdd8D88778FC94FD9186"
- RPC_ADDRESS="https://eth.llamarpc.com"
- BLOCKS_COUNT=100000

After starting the service, the system will extract the lastest block number processed on Ethereum Blockchain and will compute the block from where it will start indexing process (starting block is computed by extracting BLOCKS_COUNT from the lastest block number).
The service will start indexing the data for each block number and stores it in the database.



## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Improvements

1. Use worker threads 
   Using worker threads we can split the execution to multiple processes and process batches of data for each process.
2. Use getLogs 
   Using getLogs we can filter data by Transfer events. In this way will reduce the amount of blocks to be processed and also will store less data in the database.
3. Using a Kafka instance in order to store all the data which will be later processed and stored in a SQL/NoSql database. (producer/consumer pattern).

   