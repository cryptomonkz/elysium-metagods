import {GODS_CONTRACT_ABI, GODS_CONTRACT_ADDRESS} from '../config/gods-contract.config';
import {web3HttpClient} from '../config/web3.config';

const contract = new web3HttpClient.eth.Contract(GODS_CONTRACT_ABI, GODS_CONTRACT_ADDRESS);

export async function isOwnerOfBatch(tokenIds: string[], walletAddress: string) {
  return contract.methods.isOwnerOfBatch(tokenIds, walletAddress).call();
}

export async function balanceOf(walletAddress: string) {
  return contract.methods.balanceOf(walletAddress).call();
}

export async function callMethod(methodName: string, args: any[]) {
  return contract.methods[methodName](...args).call();
}

