import Web3 from 'web3';
import {baseService} from "./BaseService";
import moment from "moment";
import {isFutureDate} from "../Utils/DateUtils";
import {signalAuthenticationEnd, signalAuthenticationStart} from "../State/Authentication/AuthenticationService";
import {getWeb3} from "../State/Web3/Web3Service";
import {extractResponseDataIfOk} from "../Utils/RequestUtils";

const AUTH_TOKEN_KEY = 'authKey'

const AUTHORIZE_CONTROLLER = '/api/public/authorize'
const NONCE_ENDPOINT = `${AUTHORIZE_CONTROLLER}/get-nonce`
const AUTHENTICATE_ENDPOINT = `${AUTHORIZE_CONTROLLER}/authenticate`

type NonceResponse = { nonce: number }
type AuthenticationResponse = { jwtToken: string, tokenExpiration: string }
type AuthenticationData = { jwtToken: string, tokenExpiration: string, walletAddress: string }

const interruptAuthentication = (): void => { throw Error("Authentication failed.") }

const getNonceToSign = async (walletAddress: string): Promise<NonceResponse | undefined> => {
    const response = await baseService.post<NonceResponse>(NONCE_ENDPOINT, {walletAddress})
    return extractResponseDataIfOk(response)
}

const generateAuthenticationToken = async (
    walletAddress: string, signature: string
): Promise<AuthenticationResponse | undefined> => {
    const response = await baseService.post<AuthenticationResponse>(AUTHENTICATE_ENDPOINT, { walletAddress, signature })
    return extractResponseDataIfOk(response)
}

const signNonce = async (walletAddress: string, provider: any, nonceToSign: number): Promise<string> => {
    return await provider?.request({
        method: 'personal_sign',
        params: [ Web3.utils.utf8ToHex(`${nonceToSign}`), walletAddress ]
    })
}

const setTokenInStorage = (tokenData: AuthenticationData): void => localStorage
    .setItem(AUTH_TOKEN_KEY, JSON.stringify(tokenData))

const doAuthentication = async (walletAddress: string): Promise<void> => {
    const provider = getWeb3()?.currentProvider
    const nonceToSign = await getNonceToSign(walletAddress)
    const signature = nonceToSign ? await signNonce(walletAddress, provider, nonceToSign.nonce) : undefined
    const authToken = signature ? await generateAuthenticationToken(walletAddress, signature) : undefined
    !!authToken ? setTokenInStorage({...authToken, walletAddress}) : interruptAuthentication()
}

const isPartiallyValidToken = (tokenData: AuthenticationData): boolean => {
    return !!tokenData?.jwtToken &&
        !!tokenData?.tokenExpiration && isFutureDate(moment(tokenData.tokenExpiration))
}

const isFullyValidToken = (tokenData: AuthenticationData, walletAddress: string): boolean => {
    return isPartiallyValidToken(tokenData) &&
        !!tokenData?.walletAddress && tokenData.walletAddress === walletAddress
}

const getTokenFromStorageWithValidation = (
    isValidToken: (tokenData: AuthenticationData) => boolean
): string | undefined => {
    try {
        const currentToken = localStorage.getItem(AUTH_TOKEN_KEY)
        const parsedToken = !!currentToken ? JSON.parse(currentToken) as AuthenticationData : undefined
        return !!parsedToken && isValidToken(parsedToken) ? parsedToken.jwtToken : undefined
    } catch {}
}

export const getTokenFromStorageWithPartialValidation = (): string | undefined =>
    getTokenFromStorageWithValidation(tokenData => isPartiallyValidToken(tokenData))

const getTokenFromStorageWithFullValidation = (walletAddress: string): string | undefined =>
    getTokenFromStorageWithValidation(tokenData => isFullyValidToken(tokenData, walletAddress))

const doAuthenticationAndSignal = async (walletAddress: string): Promise<void> => {
    try {
        signalAuthenticationStart()
        await doAuthentication(walletAddress)
    } finally {
        signalAuthenticationEnd()
    }
}

export const doAuthenticationIfNecessary = async (walletAddress: string): Promise<void> => {
    const existingToken = getTokenFromStorageWithFullValidation(walletAddress)
    !existingToken && await doAuthenticationAndSignal(walletAddress)
}



