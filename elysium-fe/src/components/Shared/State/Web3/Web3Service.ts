import Web3 from "web3";
import {ActionEvent, ApplicationStore, signalAction} from "../ApplicationState";
import Web3State from './Web3State';
import {buildContract} from "../../Utils/Web3Utils";
import {
    GODS_ABI,
    GODS_ADDRESS, LOOTBOX_REWARD_ABI, LOOTBOX_REWARD_ADDRESS,
    MINT_PASS_ABI,
    MINT_PASS_ADDRESS,
    MINT_PASS_STAKING_ABI,
    MINT_PASS_STAKING_ADDRESS,
    TOKENS_ABI,
    TOKENS_ADDRESS,
    WEAPONS_ABI,
    WEAPONS_ADDRESS
} from "../../Constants/ContractConstants";
import {Contract} from 'web3-eth-contract'

export const signalWeb3Change = (web3?: Web3) => signalAction('WEB3_CHANGE', {web3})

export const getGodsContract = (): Contract | undefined => ApplicationStore?.getState()?.web3State?.godsContract

export const getWeaponsContract = (): Contract | undefined => ApplicationStore?.getState()?.web3State?.weaponsContract

export const getTokensContract = (): Contract | undefined => ApplicationStore?.getState()?.web3State?.tokensContract

export const getMintPassContract = (): Contract | undefined => ApplicationStore?.getState()?.web3State?.mintPassContract

export const getMintPassStakingContract = (): Contract | undefined => ApplicationStore?.getState()?.web3State?.mintPassStakingContract

export const getLootBoxRewardContract = (): Contract | undefined => ApplicationStore?.getState()?.web3State?.lootBoxRewardContract

export const getWeb3 = (): Web3 | undefined => ApplicationStore?.getState()?.web3State?.web3

export default function web3Reducer(state: Web3State = {}, action: ActionEvent<Web3State>): Web3State {
    switch (action?.type) {
        case 'WEB3_CHANGE':
            const web3 = action?.payload?.web3
            const godsContract = web3 ? buildContract(web3, GODS_ABI, GODS_ADDRESS) : undefined
            const weaponsContract = web3 ? buildContract(web3, WEAPONS_ABI, WEAPONS_ADDRESS) : undefined
            const tokensContract = web3 ? buildContract(web3, TOKENS_ABI, TOKENS_ADDRESS) : undefined
            const mintPassContract = web3 ? buildContract(web3, MINT_PASS_ABI, MINT_PASS_ADDRESS) : undefined
            const mintPassStakingContract = web3 ? buildContract(web3, MINT_PASS_STAKING_ABI, MINT_PASS_STAKING_ADDRESS) : undefined
            const lootBoxRewardContract = web3 ? buildContract(web3, LOOTBOX_REWARD_ABI, LOOTBOX_REWARD_ADDRESS) : undefined
            return {...state, web3, godsContract, weaponsContract, tokensContract, mintPassContract, mintPassStakingContract, lootBoxRewardContract }
        default:
            return state
    }
}