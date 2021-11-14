require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider');

// console.log(process.env.PRIVATE_KEY);

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard OEC port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    testnet: {
      provider: () => new HDWalletProvider(process.env.PRIVATE_KEY, `https://exchaintestrpc.okex.org`),
      network_id: 65,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
        version: '0.8.0+commit.c7dfd78e',
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/'
}