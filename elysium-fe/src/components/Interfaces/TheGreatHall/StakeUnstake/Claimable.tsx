import {useSelector} from "react-redux";
import styled from "styled-components";
import {GenericToken} from "../../../Shared/Models/Token/GenericToken";
import {ApplicationState} from "../../../Shared/State/ApplicationState";
import {getClaimableForToken, getTokensToClaimForState} from "../../../Shared/State/GreatHall/ClaimService";
import {
    AbsoluteBorderRadius,
    BRIGHTNESS_FILTER,
    Color,
    FLEX_CENTERED_CONTAINER,
    FontSize,
    fontSizeToPixels,
    FontWeight
} from "../../../Shared/Constants/StylesConstants";
import MoneyBagImage from "../../../../assets/Icons/moneyBag.png";
import {EditMode} from "../../../Shared/State/GreatHall/EditMode";
import {
    getEditModeFromState,
    signalClaimTokens,
    signalUnclaimTokens
} from "../../../Shared/State/GreatHall/GreatHallService";
import {findToken} from "../../../Shared/Utils/TokenUtils";
import {useCallback} from "react";
import {playActionSound} from "../../../Shared/State/Sound/SoundService";
import {ACTION_SOUND} from "../../../Shared/State/Sound/SoundState";

const CLAIMABLE_WIDTH = '95px'
const CLAIMABLE_MARGIN = '5px'

export const ClaimableTokenContainer = styled.div`
    width: ${CLAIMABLE_WIDTH};
    margin-left: ${CLAIMABLE_MARGIN};
    ${FLEX_CENTERED_CONTAINER}
    justify-content: flex-end;
`

const MoneyBagIcon = styled.img`
    width: 15px;
    height: 15px;
`

const ClaimableWrapper = styled.div`
`

const ClaimableContainer = styled.div<{isRedeemMode: boolean, isClaimed: boolean}>`
    padding: 3px;
    overflow: hidden;
    width: fit-content;
    color: ${Color.BLACK};
    ${FLEX_CENTERED_CONTAINER}
    align-items: center;
    justify-content: center;
    font-weight: ${FontWeight.EXTRA_LARGE};
    border-radius: ${AbsoluteBorderRadius.TINY};
    font-size: ${fontSizeToPixels(FontSize.SMALLER)};
    
    background-color: ${props => {
        if (props.isRedeemMode) {
            return props.isClaimed ? Color.GREEN_DARK : Color.YELLOW
        }
        return Color.BACKGROUND_DARKER
    }};
    &:hover {
        ${props => props.isRedeemMode ? BRIGHTNESS_FILTER : ''}
    }
`

export const ClaimableValue = ({claimable, isRedeemMode, isClaimed}: {
    claimable: number, isRedeemMode: boolean, isClaimed: boolean
}) => (
    <ClaimableContainer isRedeemMode={isRedeemMode} isClaimed={isClaimed}>
        <MoneyBagIcon src={MoneyBagImage} alt={"MoneyBag"}/>
        <span>{claimable}</span>
    </ClaimableContainer>
)

export const Claimable = ({token, pairedToken}: { token: GenericToken, pairedToken?: GenericToken }) => {
    const claimable = useSelector<ApplicationState, number>(applicationState => (
        getClaimableForToken(applicationState, token) +
        (pairedToken ? getClaimableForToken(applicationState, pairedToken) : 0)
    ))
    const isRedeemMode = useSelector<ApplicationState, boolean>(applicationState => {
        const editMode = getEditModeFromState(applicationState)
        return !!editMode && editMode === EditMode.REDEEM
    })
    const isClaimed = useSelector<ApplicationState, boolean>(applicationState => {
        const claimedTokens = getTokensToClaimForState(applicationState)
        return !!findToken(claimedTokens, token) && (!pairedToken || !!findToken(claimedTokens, pairedToken))
    })
    const onClick = useCallback(() => {
        playActionSound(ACTION_SOUND.MONEY)
        !isClaimed && signalClaimTokens([token, ...(!pairedToken ? [] : [pairedToken])])
        !!isClaimed && signalUnclaimTokens([token, ...(!pairedToken ? [] : [pairedToken])])
    }, [isClaimed, token, pairedToken])
    return <>{!!claimable && <ClaimableWrapper onClick={() => isRedeemMode && onClick()}>
        <ClaimableValue claimable={claimable} isRedeemMode={isRedeemMode} isClaimed={isClaimed}/>
    </ClaimableWrapper>}</>
}