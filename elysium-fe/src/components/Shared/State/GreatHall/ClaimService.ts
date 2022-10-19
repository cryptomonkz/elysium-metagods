import {ItemType} from "./ItemType";
import {signalRefreshClaims} from "./GreatHallService";
import {ApplicationState, ApplicationStore} from "../ApplicationState";
import {GenericToken} from "../../Models/Token/GenericToken";
import ClaimState from "./ClaimState";
import {findToken} from "../../Utils/TokenUtils";
import {ClaimsStatusResponse, getClaimsStatus, TokenClaim} from "../../Service/PublicWalletService";

const getClaimsForTokens = (claims: TokenClaim[]): Map<number, number> => {
    return claims.reduce((currentClaims, tokenClaim) => {
        return currentClaims.set(tokenClaim.token.tokenId, tokenClaim.amount)
    }, new Map<number, number>())
}

const setClaimState = (claimsStatus: ClaimsStatusResponse): void => {
    const yields = new Map<ItemType, Map<number, number>>()
    yields.set(ItemType.GOD, getClaimsForTokens(claimsStatus.godsClaims))
    yields.set(ItemType.WEAPON, getClaimsForTokens(claimsStatus.weaponsClaims))
    signalRefreshClaims({yields, tokensToClaim: []})
}

export const getClaimableForToken = (applicationState: ApplicationState, token: GenericToken): number => applicationState
    ?.greatHallState?.claimState?.yields?.get(token.type)?.get(token.tokenId) || 0

export const addTokensToClaim = (claimState: ClaimState, tokens: GenericToken[]): ClaimState => {
    const tokensToAdd = tokens.filter(tokenToAdd => !findToken(claimState.tokensToClaim, tokenToAdd))
    return { yields: claimState.yields, tokensToClaim: [...claimState.tokensToClaim, ...tokensToAdd] }
}

export const removeTokensToClaim = (claimState: ClaimState, tokens: GenericToken[]): ClaimState => {
    const tokensToRemove = claimState.tokensToClaim.filter(tokenToRemove => !findToken(tokens, tokenToRemove))
    return { yields: claimState.yields, tokensToClaim: tokensToRemove }
}

export const getTokensToClaimForState = (applicationState: ApplicationState): GenericToken[] => applicationState?.greatHallState?.claimState?.tokensToClaim || []

export const getTokensToClaim = (): GenericToken[] => getTokensToClaimForState(ApplicationStore?.getState())

export const refreshClaimState = (account: string) => getClaimsStatus(account).then(setClaimState)