import {Web3Provider} from "@ethersproject/providers";
import Web3 from "web3";
import {Contract} from 'web3-eth-contract';
import {WEB3_PROVIDER_POLLING_INTERVAL} from "../Constants/Web3Constants";
import {signalWeb3Change} from "../State/Web3/Web3Service";

export const getWeb3Provider = (provider: any): Web3Provider => {
    const libraryProvider = new Web3Provider(provider);
    libraryProvider.pollingInterval = WEB3_PROVIDER_POLLING_INTERVAL;
    signalWeb3Change(new Web3(provider));
    return libraryProvider;
}

export const buildContract = (web3: Web3, abi: any, address: string): Contract => new web3.eth.Contract(abi, address)

export const fromWei = (value?: string): number => Math.floor(Number(Web3.utils.fromWei(value || '0', 'ether')))

export const toWei = (value?: number): string => Web3.utils.toWei((value || 0).toString(), 'ether')