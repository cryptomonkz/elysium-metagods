import {web3WssClient} from "../config/web3.config";
import {TOKEN_CONTRACT_ABI, TOKEN_CONTRACT_ADDRESS} from "../config/token-contract.config";
import {triggerHandleDeposit, triggerHandleMintWeapons, triggerHandleWithdraw} from "./processingService.service";
import {WEAPONS_CONTRACT_ABI, WEAPONS_CONTRACT_ADDRESS} from "../config/weapons-contract.config";

const EVENTS = {
  DATA: 'data',
  ERROR: 'error',
  CONNECTED: 'connected',
}

const CONTRACT_EVENTS = {
  TOKEN_DEPOSIT: 'TOKEN_DEPOSIT',
  TOKEN_WITHDRAW: 'TOKEN_WITHDRAW',
  WEAPON_MINT: 'WEAPON_MINT',
}

let tokenContract;
let weaponContract;

let tokenDepositsSubscription;
let tokenWithdrawalsSubscription;
let weaponMintSubscription;

const clearSubscription = (subscription) => {
  !!subscription && Object.keys(EVENTS)
    .forEach((eventType) => subscription.removeAllListeners(EVENTS[eventType]));
}

const initializeContract = (abi, address: string) => {
  return new web3WssClient.eth.Contract(abi, address)
}

const initializeSubscription = (
  contract,
  eventName: string,
  eventExtractor: (events) => any,
  onData: (event) => void
) => {
  return eventExtractor(contract.events).on(EVENTS.DATA, onData)
    .on(EVENTS.CONNECTED, (subscriptionId: string) => {
      console.log(`Successfully initialized contract ${eventName} websocket: ${subscriptionId}`);
    }).on(EVENTS.ERROR, err => {
      console.error(`Contract ${eventName} websocket threw error`, err);
    });
}

export const initializeSubscriptions = () => {
  tokenContract = initializeContract(TOKEN_CONTRACT_ABI, TOKEN_CONTRACT_ADDRESS);
  weaponContract = initializeContract(WEAPONS_CONTRACT_ABI, WEAPONS_CONTRACT_ADDRESS);

  clearSubscription(tokenDepositsSubscription);
  clearSubscription(tokenWithdrawalsSubscription);
  clearSubscription(weaponMintSubscription);

  tokenDepositsSubscription = initializeSubscription(
    tokenContract,
    CONTRACT_EVENTS.TOKEN_DEPOSIT,
      events => events.Deposit(),
    async depositRequest => await triggerHandleDeposit(depositRequest)
  )

  tokenWithdrawalsSubscription = initializeSubscription(
    tokenContract,
    CONTRACT_EVENTS.TOKEN_WITHDRAW,
    events => events.WithdrawalRequestFinished(),
    async withdrawRequest => await triggerHandleWithdraw(withdrawRequest)
  )

  weaponMintSubscription = initializeSubscription(
    weaponContract,
    CONTRACT_EVENTS.WEAPON_MINT,
    events => events.MintRequestFinished(),
    async mintWeaponsRequest => await triggerHandleMintWeapons(mintWeaponsRequest)
  )
}

initializeSubscriptions()
