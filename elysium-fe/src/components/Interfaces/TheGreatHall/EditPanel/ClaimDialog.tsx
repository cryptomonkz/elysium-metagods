import React, {useCallback, useEffect, useState} from "react";
import styled from "styled-components";
import {
    AbsoluteBorderRadius,
    BRIGHTNESS_FILTER,
    Color,
    FLEX_CENTERED_CONTAINER,
    FontSize,
    fontSizeToPixels,
    FULL_HEIGHT,
    GRADIENT,
    Spacing
} from "../../../Shared/Constants/StylesConstants";
import {EditMode} from "../../../Shared/State/GreatHall/EditMode";
import {CancelButton, ThemeButton} from "../../../Shared/Components/StyledButton";
import {ElysiumDialog} from "../../../Shared/Components/ElysiumDialog";
import {claimTokens} from "../../../Shared/Service/AggregationService";
import {refreshTokenRelatedState, rollbackClaims} from "../../../Shared/State/GreatHall/GreatHallService";
import {
    getClaimableForToken,
    getTokensToClaim,
    getTokensToClaimForState
} from "../../../Shared/State/GreatHall/ClaimService";
import {findTokensByType} from "../../../Shared/Utils/TokenUtils";
import {ItemType} from "../../../Shared/State/GreatHall/ItemType";
import {ApplicationState} from "../../../Shared/State/ApplicationState";
import {useSelector} from "react-redux";
import {ClaimableValue} from "../StakeUnstake/Claimable";
import {doWithMounted} from "../../../Shared/Utils/ComponentUtils";
import {ActionsPanel} from "../../../Shared/Components/ActionsPanel";

const ClaimButton = styled(ThemeButton)`
    margin-left: ${Spacing.SECOND};
    margin-bottom: ${Spacing.SECOND};
    padding: 0 !important;
`

const MessageContainer = styled.div`
    ${FLEX_CENTERED_CONTAINER}
    flex-direction: column;
    padding: ${Spacing.THIRD}
`

const FinalizeButton = styled(ThemeButton)`
    margin: 0 ${Spacing.SECOND};
`

const FinalizeNoButton = styled(CancelButton)`
    margin: 0 ${Spacing.SECOND};
`

const ClaimableItems = styled.li`
    margin: ${Spacing.FIRST} 0;
`

const ClaimMainText = styled.div`
    text-align: center;
    margin: ${Spacing.FIRST} 0;
    font-size: ${fontSizeToPixels(FontSize.MEDIUM)};
`

const ClaimContainer = styled.div<{isCorrectEditMode: boolean}>`
    ${FULL_HEIGHT}
    ${FLEX_CENTERED_CONTAINER}
    padding: ${Spacing.SECOND};
    border-radius: ${AbsoluteBorderRadius.TINY};
    
    ${props => props.isCorrectEditMode ? `background: ${GRADIENT.FIRST_THEME};`: ''}
    ${props => !props.isCorrectEditMode ? `background-color: ${Color.BACKGROUND_DARKER};`: ''}
    &:hover {
        ${props => props.isCorrectEditMode ? BRIGHTNESS_FILTER : ''}
    }
`

const ClaimText = styled.span`
    font-size: ${fontSizeToPixels(FontSize.SMALL_TO_MEDIUM)};
`

const ClaimableValueContainer = styled.div`
    margin-left: ${Spacing.FIRST}
`

const TotalClaimableValue = () => {
    const claimableValue = useSelector<ApplicationState, number>(applicationState => {
        return getTokensToClaimForState(applicationState).reduce((currentClaimable, currentToken) => {
            return currentClaimable + getClaimableForToken(applicationState, currentToken)
        }, 0)
    })
    return <ClaimableValueContainer>
        <ClaimableValue claimable={claimableValue} isRedeemMode={true} isClaimed={false}/>
    </ClaimableValueContainer>
}

const renderTokensToClaim = (itemType: ItemType, title: string) => {
    const tokensToClaim = findTokensByType(getTokensToClaim(), itemType)
    return <>
        {!!tokensToClaim.length && <ClaimableItems>
            <b>{title}:</b> {tokensToClaim.map(token => `#${token.tokenId}`).join(', ')}
        </ClaimableItems>}
    </>
}


const ClaimDialog = ({account, editMode}: {account: string, editMode?: EditMode}) => {
    const [finalizeError, setFinalizeError] = useState(false)
    const [performingFinalize, setPerformingFinalize] = useState(false)
    const [showClaimConfirmation, setShowClaimConfirmation] = useState(false)
    const [isCorrectEditMode, setIsCorrectEditMode] = useState(false)

    useEffect(() => setIsCorrectEditMode(!!editMode && editMode === EditMode.REDEEM), [editMode, setIsCorrectEditMode])
    const showConfirmation = useCallback(() => {
        const wereTokensClaimed = !!getTokensToClaim().length
        isCorrectEditMode && wereTokensClaimed ? setShowClaimConfirmation(true) : rollbackClaims()
    }, [isCorrectEditMode, setShowClaimConfirmation])
    const onHide = useCallback(() => {
        setFinalizeError(false)
        setShowClaimConfirmation(false)
    }, [])

    const doAfterClaim = useCallback(() => {
        onHide()
        rollbackClaims()
        refreshTokenRelatedState(account)
    }, [account, onHide])

    const doClaim = useCallback(() => doWithMounted(isMounted => {
        setPerformingFinalize(true); setFinalizeError(false)
        claimTokens(account, getTokensToClaim()).then(() => {
            isMounted.isMounted && doAfterClaim()
        }).catch(() => isMounted.isMounted && setFinalizeError(true)).finally(() => isMounted.isMounted && setPerformingFinalize(false))
    }), [account, doAfterClaim])
    return <>
        <ClaimButton onClick={showConfirmation} disabled={!isCorrectEditMode}>
            <ClaimContainer isCorrectEditMode={isCorrectEditMode}>
                <ClaimText>CLAIM</ClaimText>
                <TotalClaimableValue/>
            </ClaimContainer>
        </ClaimButton>
        <ElysiumDialog visible={showClaimConfirmation} dismissableMask={!performingFinalize}
                       onHide={onHide} position="bottom">
            <MessageContainer>
                <ClaimMainText>
                    The yield will be claimed for the following tokens:
                </ClaimMainText>
                <ul>
                    {renderTokensToClaim(ItemType.GOD, 'MetaGods')}
                    {renderTokensToClaim(ItemType.WEAPON, 'Weapons')}
                </ul>
                <ClaimMainText>
                    Risks will be applied accordingly for this transaction! Do you want to proceed?
                </ClaimMainText>
            </MessageContainer>
            <ActionsPanel encounteredError={finalizeError} actionsList={<>
                <FinalizeButton label={"Claim"} disabled={performingFinalize}
                                loading={performingFinalize} onClick={doClaim}/>
                <FinalizeNoButton label={"Cancel"} disabled={performingFinalize} onClick={onHide}/>
            </>}/>
        </ElysiumDialog>
    </>
}

export default ClaimDialog