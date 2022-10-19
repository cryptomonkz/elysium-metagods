import {ClaimResult} from "../Service/StakingService";
import {showStakeTransactionFinished, showTokensClaimedMessage} from "./ToastUtils";

const getTotalClaim = (claims: ClaimResult[] = []): number => {
    return claims.reduce((currentAmount, claim) => currentAmount + claim.amount, 0)
}

const getClaimsWithoutRisk = (claims: ClaimResult[] = []): ClaimResult[] => {
    return claims.filter(claim => !claim.withRisk)
}

const getClaimsWithRisk = (claims: ClaimResult[] = []): ClaimResult[] => {
    return claims.filter(claim => claim.withRisk)
}

export const showClaims = (claims: ClaimResult[] = []) => {
    const totalClaim = getTotalClaim(claims)
    const claimsWithRisk = getClaimsWithRisk(claims)
    const claimsWithoutRisk = getClaimsWithoutRisk(claims)
    !!totalClaim ? showTokensClaimedMessage(totalClaim, claimsWithoutRisk, claimsWithRisk) :
        showStakeTransactionFinished()
}