import {Color, FontSize, fontSizeToPixels, Spacing} from "../Constants/StylesConstants";
import {ClaimResult} from "../Service/StakingService";
import {SEVERITY} from "../State/Toast/ToastState";
import {getTokenWithTrait} from "../Components/TokenWithTrait";
import {showToast} from "../State/Toast/ToastService";
import styled from "styled-components";
import {ACTION_SOUND} from "../State/Sound/SoundState";
import {simplifyAccount} from "./AccountUtils";

const ClaimMessage = styled.div`
    font-size: ${fontSizeToPixels(FontSize.SMALL_TO_MEDIUM)};
`

const TokenClaimMessage = styled.div`
    font-size: ${fontSizeToPixels(FontSize.SMALLER)};
    margin: ${Spacing.FIRST} 0;
    padding-left: ${Spacing.THIRD};
`

const HighlightedText = styled.b`
    color: ${Color.GREEN_DARK};
`

const YieldWithRisk = styled.b<{didWin: boolean}>`
    color: ${props => props.didWin ? Color.GREEN_DARK : Color.RED};
`

const getWithRiskMessage = (didWin: boolean) => <>
    {didWin && <>won and yielded</>}
    {!didWin && <>fought hard, but only yielded</>}
</>

const showClaimedMessage = (
    amount: number, claimsWithoutRisk: ClaimResult[], claimsWithRisk: ClaimResult[]
) => showToast({
    severity: SEVERITY.SUCCESS,
    content: <>
        <ClaimMessage>You have successfully claimed <HighlightedText>{amount}</HighlightedText> $GOD!</ClaimMessage>
        {!!claimsWithoutRisk.length && claimsWithoutRisk.map((claim, position) => <TokenClaimMessage key={position}>
            - {getTokenWithTrait(claim.token)} yielded <HighlightedText>{claim.amount}</HighlightedText> $GOD!
        </TokenClaimMessage>)}
        {!!claimsWithRisk.length && claimsWithRisk.map((claim, position) => <TokenClaimMessage key={position}>
            - {getTokenWithTrait(claim.token)} {getWithRiskMessage(claim.hasWon)} <YieldWithRisk didWin={claim.hasWon}>{claim.amount}</YieldWithRisk> $GOD!
        </TokenClaimMessage>)}
    </>,
}, ACTION_SOUND.MONEY)

export const showTokensClaimedMessage = (
    amount: number, claims: ClaimResult[] = [], claimsWithRisk: ClaimResult[] = []
) => amount && showClaimedMessage(amount, claims, claimsWithRisk)

export const showTokenTransactionFinished = () => showToast({
    severity: SEVERITY.SUCCESS,
    content: 'Your transaction has been processed. Your funds will be updated accordingly soon.',
}, ACTION_SOUND.MONEY)

export const showTokenMintFinished = () => showToast({
    severity: SEVERITY.SUCCESS,
    content: 'Your transaction has been processed. Your tokens will be updated accordingly soon.',
})

export const showStakeTransactionFinished = () => showToast({
    severity: SEVERITY.SUCCESS,
    content: 'Your request has been successfully processed.'
})

export const showGodsEnrollmentFinished = () => showToast({
    severity: SEVERITY.SUCCESS,
    content: 'Your gods have been successfully enrolled.'
})

export const showQuestAccepted = () => showToast({
    severity: SEVERITY.SUCCESS,
    content: 'Your have successfully accepted the quest.'
})

export const showBundleAcquired = () => showToast({
    severity: SEVERITY.SUCCESS,
    content: 'Bundle was acquired successfully.'
})

export const showRewardClaimed = () => showToast({
    severity: SEVERITY.SUCCESS,
    content: 'The reward was claimed successfully.'
})

export const showQuestAcceptFailed = () => showToast({
    severity: SEVERITY.ERROR,
    content: 'Quest accept action failed.'
})

export const showBundleAcquireFailed = () => showToast({
    severity: SEVERITY.ERROR,
    content: 'Bundle acquisition failed.'
})

export const showBoxOpenFailed = () => showToast({
    severity: SEVERITY.ERROR,
    content: 'Box opening failed.'
})

export const showRewardClaimFailed = () => showToast({
    severity: SEVERITY.ERROR,
    content: 'Reward claim failed.'
})

export const showClaimFailed = () => showToast({
    severity: SEVERITY.ERROR,
    content: 'Claim action failed.'
})

export const showMintPassApproveRequired = () => showToast({
    severity: SEVERITY.WARNING,
    content: 'Please go to the Celestials building and approve the contract first.'
})

export const showTokensTransferred = (amount: number, recipient: string) => showToast({
    severity: SEVERITY.SUCCESS,
    content: <div>
        <HighlightedText>{amount}</HighlightedText> $GOD tokens were successfully transferred to <HighlightedText>{simplifyAccount(recipient)}</HighlightedText>
    </div>
})

export const showTokensTransferFailed = (message?: string) => showToast({
    severity: SEVERITY.ERROR,
    content: message || 'Token transfer failed'
})

export const showMintWeaponsRequestFailed = (message?: string) => showToast({
    severity: SEVERITY.ERROR,
    content: message || 'Failed to mint weapons'
})

export const showGetBundlesFailed = () => showToast({
    severity: SEVERITY.ERROR,
    content: 'Failed to get bundles'
})

export const showGetOwnedBoxesFailed = () => showToast({
    severity: SEVERITY.ERROR,
    content: 'Failed to get owned boxes'
})