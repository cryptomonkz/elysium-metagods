import { MINTPASS_STAKING_CONTRACT_ABI, MINTPASS_STAKING_CONTRACT_ADDRESS } from '../config/mintpass-staking-contract.config';
import { web3HttpClient } from '../config/web3.config';

const contract = new web3HttpClient.eth.Contract(MINTPASS_STAKING_CONTRACT_ABI, MINTPASS_STAKING_CONTRACT_ADDRESS);

export async function callMethod(methodName: string, args: any[]) {
  return contract.methods[methodName](...args).call();
}

