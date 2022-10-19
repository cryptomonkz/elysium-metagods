import {baseService} from "./BaseService";
import {extractResponseDataStrict} from "../Utils/RequestUtils";
import { StatusCodes } from "http-status-codes";

const WALLET_CONTROLLER = '/api/wallet'
const SIGN_WITHDRAW_ENDPOINT = `${WALLET_CONTROLLER}/sign-withdraw-request`
const SIGN_MINT_WEAPONS_ENDPOINT = `${WALLET_CONTROLLER}/sign-mint-weapons-request`
const TRANSFER_ENDPOINT = `${WALLET_CONTROLLER}/transfer`

export type SignAmountResponse = { amount: number, generationDate: number, signature: string, requestIdentifier: number }
export const signWithdrawRequest = async (amount: number): Promise<SignAmountResponse> => {
    try {
        const signatureResponse = await baseService.post<SignAmountResponse>(SIGN_WITHDRAW_ENDPOINT, amount);
        return extractResponseDataStrict(signatureResponse)
    } catch {
        throw new Error("Failed to sign the withdrawal request")
    }
};

export type SignMintWeaponsResponse = SignAmountResponse & { price: number; mintCount: number }
export const signMintWeaponsRequest = async (amount: number): Promise<SignMintWeaponsResponse> => {
    const signatureResponse = await baseService.post<SignMintWeaponsResponse | string | undefined>(SIGN_MINT_WEAPONS_ENDPOINT, amount);
    if (!signatureResponse?.ok) {
        const responseMessage = signatureResponse?.data as string
        if (signatureResponse.status === StatusCodes.BAD_REQUEST && responseMessage) {
            throw new Error(responseMessage)
        }
        throw new Error("Failed to sign the mint weapons request")
    }
    return extractResponseDataStrict(signatureResponse) as SignMintWeaponsResponse
};

export const callTransferTokens = async (amount: number, recipient: string): Promise<void> => {
    const transferResponse = await baseService.post<void>(TRANSFER_ENDPOINT, {amount, recipient});
    if (!transferResponse?.ok) {
        const responseMessage = transferResponse?.data
        if (transferResponse.status === StatusCodes.BAD_REQUEST && responseMessage) {
            throw new Error(responseMessage)
        }
        throw new Error("Token transfer failed")
    }
}