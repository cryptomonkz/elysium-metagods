const Web3 = require('web3');

export const PRIVATE_KEY = process.env.PRIVATE_KEY || ''

const INFURA_ENDPOINT = process.env.INFURA_ENDPOINT || ''
const INFURA_WSS_ENDPOINT = process.env.INFURA_WSS_ENDPOINT || ''

const web3WssProvider = new Web3.providers.WebsocketProvider(INFURA_WSS_ENDPOINT, {
  reconnect: { auto: true, delay: 5000, maxAttempts: 5, onTimeout: false },
});

export const web3HttpClient = new Web3(INFURA_ENDPOINT)
export const web3WssClient = new Web3(web3WssProvider)
