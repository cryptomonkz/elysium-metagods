import {WEAPONS_CONTRACT_ABI, WEAPONS_CONTRACT_ADDRESS} from '../config/weapons-contract.config';
import {web3HttpClient} from '../config/web3.config';

const contract = new web3HttpClient.eth.Contract(WEAPONS_CONTRACT_ABI, WEAPONS_CONTRACT_ADDRESS);

export async function isOwnerOfBatch(tokenIds: string[], walletAddress: string) {
  return contract.methods.isOwnerOfBatch(tokenIds, walletAddress).call();
}

export async function balanceOf(walletAddress: string) {
  return contract.methods.balanceOf(walletAddress).call();
}

export async function totalSupply() {
  return contract.methods.totalSupply().call();
}

export async function callMethod(methodName: string, args: any[]) {
  return contract.methods[methodName](...args).call();
}

export async function getTokenEventsFromBlock(eventName: string, fromBlock: number) {
  return contract.getPastEvents(eventName, { fromBlock });
}
