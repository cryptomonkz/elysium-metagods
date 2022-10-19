import styled from 'styled-components';
import {
    Color,
    FLEX_CENTERED_CONTAINER,
    FontSize,
    fontSizeToPixels,
    FontWeight,
    FULL_HEIGHT,
    FULL_WIDTH,
    NO_USER_SELECT,
    OverflowYContainer,
    Spacing,
    Z_INDEX
} from "../../../Shared/Constants/StylesConstants";
import React, {CSSProperties, ReactNode} from "react";
import {getTitleForStakedGodsMode, StakeMode} from "../../../Shared/Models/Token/StakeMode";
import {WeaponToken} from "../../../Shared/Models/Token/WeaponToken";
import {GodToken} from "../../../Shared/Models/Token/GodToken";
import {AreaType, getStakedGodsArea} from "../../../Shared/State/GreatHall/AreaType";
import {StakedTokens, UnstakedTokens} from "./DroppableTokensArea";
import {ApplicationState} from "../../../Shared/State/ApplicationState";
import {useSelector} from 'react-redux';
import {ItemType} from "../../../Shared/State/GreatHall/ItemType";
import {getAreaStateFromApplication} from "../../../Shared/State/GreatHall/GreatHallDataService";
import {GenericToken} from "../../../Shared/Models/Token/GenericToken";
import {Separator, SeparatorType} from "../../../Shared/Components/Separator";
import {FullSizeImage} from "../../../Shared/Components/FullSizeImage";
import SectionBackground from "../../../../assets/Images/sectionBackground.png";
import {device} from "../../../Shared/Constants/MediaQueries";
import StakeModeIcon, {StakeModeImageSize} from "../../../Shared/Components/StakeModeIcon";

const UnstakedContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow: hidden;
    ${FULL_HEIGHT}
`

const StakedContainer = styled.div`
    ${FLEX_CENTERED_CONTAINER}
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    padding-right: ${Spacing.FIRST};
    ${OverflowYContainer}
    ${FULL_HEIGHT}
`

const VerticalTokens = styled.div`
    overflow: hidden;
    margin: 0 ${Spacing.SECOND};
    ${FLEX_CENTERED_CONTAINER}
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
`

const VerticalTokensTitle = styled.div`
    position: relative;
    ${FLEX_CENTERED_CONTAINER}
    padding: ${Spacing.SECOND};
    margin: ${Spacing.SECOND} 0;
    ${NO_USER_SELECT}
    font-size: ${fontSizeToPixels(FontSize.SMALL_TO_MEDIUM)};
`

const VerticalTokensCount = styled.span`
    flex: 1;
    text-align: right;
    z-index: ${Z_INDEX.RELATIVE_SECOND};
    font-size: ${fontSizeToPixels(FontSize.SMALL_TO_MEDIUM)};
`

const HorizontalTokens = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    
    @media ${device.laptop} { 
        grid-template-columns: 2fr 8fr;
    }
`

const HorizontalTokensTitleContainer = styled.div`
    padding-right: ${Spacing.THIRD};
    ${FLEX_CENTERED_CONTAINER}
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`

const RisksMessage = styled.div`
    padding-left: ${Spacing.FIRST};
    font-size: ${fontSizeToPixels(FontSize.SMALL)};
`

const HorizontalTokensTitle = styled.div`
    position: relative;
    ${FLEX_CENTERED_CONTAINER}
    padding: ${Spacing.SECOND};
    margin: ${Spacing.SECOND} 0;
    height: fit-content;
    ${FULL_WIDTH}
    ${NO_USER_SELECT}
    font-size: ${fontSizeToPixels(FontSize.SMALL_TO_MEDIUM)};
`

const HorizontalTokensCount = styled.span`
    flex: 1;
    margin-left: ${Spacing.SECOND};
    text-align: right;
    z-index: ${Z_INDEX.RELATIVE_SECOND};
    font-size: ${fontSizeToPixels(FontSize.SMALL_TO_MEDIUM)};
`

const TokensTitleIcon = styled.div`
    ${FLEX_CENTERED_CONTAINER}
    margin-right: ${Spacing.FIRST};
`

const TokensTitleText = styled.div`
    white-space: nowrap;
    text-overflow: ellipsis;
    z-index: ${Z_INDEX.RELATIVE_SECOND};
`

const TokensTitleImage = styled(FullSizeImage)`
    z-index: ${Z_INDEX.RELATIVE_FIRST};
`

const SuccessRate = styled.span`
    color: ${Color.GREEN_DARK};
    font-weight: ${FontWeight.EXTRA_LARGE};
`

const FailureRate = styled.span`
    color: ${Color.LIGHT_RED};
    font-weight: ${FontWeight.EXTRA_LARGE};
`

const UnstakedTokensWithTitleAndCount = ({title, area, type, tokens = [], additionalStyles}: {
    title: string, area: AreaType, type: ItemType, tokens: GenericToken[], additionalStyles: CSSProperties
}) => <VerticalTokens style={additionalStyles}>
    <Separator type={SeparatorType.WHITE_SMALL}/>
    <VerticalTokensTitle>
        <TokensTitleImage src={SectionBackground} alt={"SectionBackground"}/>
        <TokensTitleText>{title}</TokensTitleText>
        <VerticalTokensCount>{tokens.length}</VerticalTokensCount>
    </VerticalTokensTitle>
    <UnstakedTokens area={area} type={type} tokens={tokens}/>
</VerticalTokens>

const StakedTokensWithTitleAndCount = ({icon, title, risks, withPair = false, area, type, tokens = []}: {
    icon?: ReactNode, title: string, risks?: ReactNode, withPair?: boolean, area: AreaType, type: ItemType, tokens: GenericToken[]
}) => <>
    <Separator type={SeparatorType.WHITE_LARGE}/>
    <HorizontalTokens>
        <HorizontalTokensTitleContainer>
            <HorizontalTokensTitle>
                <TokensTitleImage src={SectionBackground} alt={"SectionBackground"}/>
                {icon && <TokensTitleIcon>{icon}</TokensTitleIcon>}
                <TokensTitleText>{title}</TokensTitleText>
                <HorizontalTokensCount>{tokens.length}</HorizontalTokensCount>
            </HorizontalTokensTitle>
            {risks && <>
                <RisksMessage>
                    Note: The displayed yields are subject to risk
                </RisksMessage>
                {risks}
            </>}
        </HorizontalTokensTitleContainer>
        <StakedTokens withPair={withPair} area={area} type={type} tokens={tokens}/>
    </HorizontalTokens>
</>

const UnstakedGods = () => {
    const unstakedGods = useSelector<ApplicationState, GodToken[]>(applicationState => (
        getAreaStateFromApplication(AreaType.UNSTAKED_GODS, applicationState)
    ))
    return <UnstakedTokensWithTitleAndCount title={"Gods"} area={AreaType.UNSTAKED_GODS} type={ItemType.GOD}
                                            tokens={unstakedGods} additionalStyles={{marginLeft: '0'}}/>
}

const StakedGods = ({risks, mode}: { risks?: ReactNode, mode: StakeMode }) => {
    const stakedGods = useSelector<ApplicationState, GodToken[]>(applicationState => (
        getAreaStateFromApplication(getStakedGodsArea(mode), applicationState)
    ))
    return <StakedTokensWithTitleAndCount
        icon={<StakeModeIcon mode={mode} size={StakeModeImageSize.SMALL}/>}
        title={getTitleForStakedGodsMode(mode)} risks={risks} withPair={true}
        area={getStakedGodsArea(mode)} type={ItemType.GOD} tokens={stakedGods}/>
}

const UnstakedWeapons = () => {
    const unstakedWeapons = useSelector<ApplicationState, WeaponToken[]>(applicationState => (
        getAreaStateFromApplication(AreaType.UNSTAKED_WEAPONS, applicationState)
    ))
    return <UnstakedTokensWithTitleAndCount title={"Weapons"} area={AreaType.UNSTAKED_WEAPONS} type={ItemType.WEAPON}
                                            tokens={unstakedWeapons} additionalStyles={{marginRight: '0'}}/>
}

const UnlinkedStakedWeapons = () => {
    const unlinkedStakedWeapons = useSelector<ApplicationState, WeaponToken[]>(applicationState => (
        getAreaStateFromApplication(AreaType.UNLINKED_STAKED_WEAPONS, applicationState)
    ))
    return <StakedTokensWithTitleAndCount title={"Weapons"} area={AreaType.UNLINKED_STAKED_WEAPONS}
                                          type={ItemType.WEAPON} tokens={unlinkedStakedWeapons}/>
}

export const Unstaked = () => <UnstakedContainer>
    <UnstakedGods/>
    <UnstakedWeapons/>
</UnstakedContainer>

const RisksPanel = ({withWeaponAdd, withWeaponMinus, withoutWeaponAdd, withoutWeaponMinus}: {
    withWeaponAdd: number, withWeaponMinus: number, withoutWeaponAdd: number, withoutWeaponMinus: number
}) => <>
    <RisksMessage>
        With weapon: <SuccessRate>+{withWeaponAdd}%</SuccessRate> / <FailureRate>-{withWeaponMinus}%</FailureRate>
    </RisksMessage>
    <RisksMessage>
        Without weapon: <SuccessRate>+{withoutWeaponAdd}%</SuccessRate> / <FailureRate>-{withoutWeaponMinus}%</FailureRate>
    </RisksMessage>
</>

export const Staked = () => <StakedContainer>
    <StakedGods mode={StakeMode.FIRST}/>
    <StakedGods mode={StakeMode.SECOND} risks={<RisksPanel
        withWeaponAdd={30} withWeaponMinus={5} withoutWeaponAdd={20} withoutWeaponMinus={10}/>}/>
    <StakedGods mode={StakeMode.THIRD} risks={<RisksPanel
        withWeaponAdd={70} withWeaponMinus={20} withoutWeaponAdd={50} withoutWeaponMinus={50}/>}/>
    <UnlinkedStakedWeapons/>
</StakedContainer>