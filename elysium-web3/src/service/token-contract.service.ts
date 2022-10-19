import {TOKEN_CONTRACT_ABI, TOKEN_CONTRACT_ADDRESS} from '../config/token-contract.config';
import {web3HttpClient} from '../config/web3.config';
import {extractBlockDetails} from "./web3.service";

export const TOKEN_EVENT = {
  DEPOSIT: 'Deposit',
  WITHDRAW: 'WithdrawalRequestFinished',
  MINT_WEAPONS: 'MintRequestFinished',
}

const contract = new web3HttpClient.eth.Contract(TOKEN_CONTRACT_ABI, TOKEN_CONTRACT_ADDRESS);

export async function balanceOf(walletAddress: string) {
  return contract.methods.balanceOf(walletAddress).call();
}

export async function callMethod(methodName: string, args: any[]) {
  return contract.methods[methodName](...args).call();
}

export async function getTokenEventsFromBlock(eventName: string, fromBlock: number) {
  return contract.getPastEvents(eventName, { fromBlock });
}

export const extractDepositDetails = (depositEvent) => {
  const depositDetails = ((depositEvent || {}).returnValues || {})
  return {
    walletAddress: depositDetails.wallet,
    amount: depositDetails.amount,
    ...extractBlockDetails(depositEvent)
  }
}

export const extractSpendingDetails = (withdrawEvent) => {
  const withdrawDetails = ((withdrawEvent || {}).returnValues || {})
  return {
    walletAddress: withdrawDetails.wallet,
    requestIdentifier: withdrawDetails.internalIdentifier,
    wasRequestSuccessful: withdrawDetails.successful,
    ...extractBlockDetails(withdrawEvent)
  }
}


