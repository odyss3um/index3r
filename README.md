
## Token Indexer

## Description

Token Indexer is a tool used to create an Indexer for the Ethereum blockchain which indexes the historical token balance and token total value in USD. The indexer stores historical data for a fixed set of Ethereum addresses for the given token.
The USD price of the token is fetched from an external API for each indexed block.
For this example will be using USDC token deployed at the following address: 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48.

## Startup

1. Please make sure you first start the api project.
   This will ensure that the database is created and the API is running which will later will be used by the indexer and client application.
2. After that please make sure to have started the indexer project which will populate the database with the data for the given addresses.
3. Run Client Application in order to query the data stored in the database.

   



