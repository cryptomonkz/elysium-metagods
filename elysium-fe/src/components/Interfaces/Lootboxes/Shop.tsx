import styled from "styled-components";
import {SectionDescription, TitleWithSeparator} from "../../Shared/Components/Section";
import {SeparatorType} from "../../Shared/Components/Separator";
import {
    AbsoluteBorderRadius,
    Color,
    FLEX_CENTERED_CONTAINER,
    FontFamily,
    FontSize,
    fontSizeToPixels,
    FontWeight,
    FULL_HEIGHT,
    FULL_SIZE,
    FULL_WIDTH,
    GRADIENT,
    NO_USER_SELECT,
    NOT_SELECTABLE_AREA,
    Spacing,
    Z_INDEX
} from "../../Shared/Constants/StylesConstants";
import SectionBackground from "../../../assets/Images/sectionBackground.png";
import {ApplicationState} from "../../Shared/State/ApplicationState";
import VaultState from "../../Shared/State/Vault/VaultState";
import {getVaultStateFromApplication, refreshVaultState} from "../../Shared/State/Vault/VaultService";
import {useSelector} from "react-redux";
import {ReactNode, useCallback, useEffect, useState} from "react";
import {FullSizeImage} from "../../Shared/Components/FullSizeImage";
import {getAvailableBundles, getOwnedBoxes} from "../../Shared/Service/PublicLootboxesService";
import {Bundle} from "../../Shared/Models/Lootboxes/Bundle";
import {
    showBoxOpenFailed,
    showBundleAcquireFailed,
    showGetBundlesFailed,
    showGetOwnedBoxesFailed
} from "../../Shared/Utils/ToastUtils";
import {doWithMounted} from "../../Shared/Utils/ComponentUtils";
import {LargeSpinner} from "../../Shared/Components/ElysiumSpinner";
import {CenteredContainer} from "../../Shared/Components/CenteredContainer";
import {ClaimableValue} from "../TheGreatHall/StakeUnstake/Claimable";
import {Tooltip} from "@mui/material";
import {ThemeButton} from "../../Shared/Components/StyledButton";
import {getAbsolutePosition} from "../../Shared/Utils/StylesUtils";
import {buyBundle, openOwnedBox} from "../../Shared/Service/AggregationService";
import {OwnedLootBox} from "../../Shared/Models/Lootboxes/OwnedLootBox";
import {OpenedBoxResponse} from "../../Shared/Service/LootboxesService";
import {ElysiumDialog} from "../../Shared/Components/ElysiumDialog";
import {PrizeDefinition} from "../../Shared/Models/Lootboxes/PrizeDefinition";
import {playActionSound} from "../../Shared/State/Sound/SoundService";
import {ACTION_SOUND} from "../../Shared/State/Sound/SoundState";
import ConfirmationDialog, {
    ConfirmationHighlightedText,
    ConfirmationMainText
} from "../../Shared/Components/ConfirmationDialog";
import {LootBox} from "../../Shared/Models/Lootboxes/LootBox";
import RouletteContainer from "./RouletteContainer";
import StyledLink from "../../Shared/Components/StyledLink";

const TRANSITION_TIME = 500;
const ANIMATION_TIME = `${TRANSITION_TIME / 1000}s`

const CONTAINER_WIDTH = `
    min-width: 200px;
    max-width: 200px;
`

const ScrollableShop = styled.div`
    ${FULL_SIZE}
    overflow: hidden;
    position: relative;
    padding: ${Spacing.FIFTH} ${Spacing.THIRD};
`

const ShopTabsTransition = `
    transition: height ${ANIMATION_TIME};
    -moz-transition: height ${ANIMATION_TIME}; 
    -webkit-transition: height ${ANIMATION_TIME}; 
    -o-transition: height ${ANIMATION_TIME};
`

const ShopTabContainer = styled.div<{ isShown: boolean }>`
    ${FLEX_CENTERED_CONTAINER}
    overflow-y: auto;
    text-align: start;
    position: relative;
    align-items: stretch;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0 ${Spacing.FOURTH};
    ${FULL_WIDTH}
    ${ShopTabsTransition}
    ${props => props.isShown ? FULL_HEIGHT : 'height: 0;'}
`

const SectionWithVault = styled.div`
    ${FLEX_CENTERED_CONTAINER}
    justify-content: space-between;
`

const DetailsContainer = styled.div`
    flex: 1;
`

const VaultContainer = styled.div`
    margin-left: ${Spacing.FOURTH};
`

const Prize = styled.span`
    color: ${Color.GREEN_DARK};
    font-weight: ${FontWeight.EXTRA_LARGE};
`

const VaultStats = styled.div`
    ${FLEX_CENTERED_CONTAINER}
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;
`

const VaultStatsWithBackgroundContainer = styled.div`
    position: relative;
    ${FLEX_CENTERED_CONTAINER}
    ${NO_USER_SELECT}
    padding: ${Spacing.THIRD} ${Spacing.FOURTH};
    font-size: ${fontSizeToPixels(FontSize.SMALL_TO_MEDIUM)};
`

const ResultRowContainer = styled.div`
    ${FLEX_CENTERED_CONTAINER}
    justify-content: space-between;
    flex-wrap: nowrap;
`

const RowWithPaddingContainer = styled.div`
    padding: 0 ${Spacing.SECOND};
`

const ResultRowTitle = styled.div`
    white-space: nowrap;
    margin-right: ${Spacing.SECOND};
`

const ResultRowValue = styled.div`
    font-weight: ${FontWeight.EXTRA_LARGE};
`

const BackgroundImage = styled(FullSizeImage)`
    z-index: ${Z_INDEX.RELATIVE_FIRST};
`

const OverImageContainer = styled.div`
    z-index: ${Z_INDEX.RELATIVE_SECOND};
`

const BoxListContainer = styled.div`
    margin-top: ${Spacing.FIRST};
    margin-bottom: ${Spacing.THIRD};
    padding: ${Spacing.FIRST} 0;
    ${FLEX_CENTERED_CONTAINER}
    justify-content: flex-start;
    align-items: stretch;
    overflow-x: auto;
    ${FULL_WIDTH}
`

const NoBoxMessage = styled.div`
    font-family: ${FontFamily.HU_THE_GAME};
    font-size: ${fontSizeToPixels(FontSize.MEDIUM)};
`

const BoxContainer = styled.div`
    ${FULL_HEIGHT}
    margin: ${Spacing.SECOND};
    ${FLEX_CENTERED_CONTAINER}
    flex-direction: column;
    justify-content: flex-start;
    text-align: center;
    ${CONTAINER_WIDTH}
    position: relative;
    background-color: ${Color.BACKGROUND_BOX_IMAGE};
`

const BoxInfo = styled.i`
    ${getAbsolutePosition('10px', undefined, undefined, '10px')}
`

const BoxQuantity = styled.div`
    font-family: ${FontFamily.HU_THE_GAME};
    font-size: ${fontSizeToPixels(FontSize.SMALL_TO_MEDIUM)};
    padding: ${Spacing.FIRST} ${Spacing.SECOND};
    border-radius: ${AbsoluteBorderRadius.TINY};
    ${getAbsolutePosition('10px', '10px', undefined, undefined)}
`

const BundleQuantity = styled(BoxQuantity)`
    background-color: ${Color.SECOND_THEME_DARK};
`

const OwnedBoxQuantity = styled(BoxQuantity)`
    background-color: ${Color.GOLDEN_ROD};
`

const LootBoxName = styled.div`
    font-family: ${FontFamily.HU_THE_GAME};
    margin-bottom: ${Spacing.SECOND};
    font-size: ${fontSizeToPixels(FontSize.MEDIUM)};
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    ${FULL_WIDTH}
`

const BoxImage = styled.img`
    ${FULL_WIDTH}
    ${NOT_SELECTABLE_AREA}
    min-height: 150px;
    max-height: 150px;
    ${CONTAINER_WIDTH}
    object-fit: contain;
    background: ${GRADIENT.ITEM_GRADIENT};      
`

const BundleValueContainer = styled.div`
    margin-left: ${Spacing.FIRST}
`

const SmallerActionButton = styled(ThemeButton)`
    font-size: ${fontSizeToPixels(FontSize.SMALLER)};
    padding: ${Spacing.SECOND};
`

const SummaryContainer = styled.div`
    ${FULL_WIDTH}
    background-color: ${Color.BACKGROUND_BOX_DETAILS};
    padding: ${Spacing.SECOND} ${Spacing.FIRST};
`

const BoxDetailsContainer = styled.div`
    ${FULL_WIDTH}
    ${FLEX_CENTERED_CONTAINER}
    margin: ${Spacing.THIRD} 0;
`

const BoxImageWithBorder = styled(BoxImage)`
    border: 3px solid ${Color.SILVER};
`

const BoxDetailsOnOpen = styled.div`
    flex: 1;
    align-self: stretch;
    ${FLEX_CENTERED_CONTAINER}
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-left: ${Spacing.FIFTH};
`

const BoxDetailsOnWin = styled(BoxDetailsOnOpen)`
    text-align: center;
    align-items: stretch;
`

const BoxDetailsOnOpenTitle = styled.div`
    margin-bottom: ${Spacing.THIRD};
    font-family: ${FontFamily.HU_THE_GAME};
    font-size: ${fontSizeToPixels(FontSize.MEDIUM_TO_LARGE)};
`

const BoxDetailsOnOpenDescription = styled.div`
    font-size: ${fontSizeToPixels(FontSize.ALMOST_MEDIUM)};
    color: ${Color.BACKGROUND_MINT_PASS};
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`

const WonItemWarning = styled.div`
    font-size: ${fontSizeToPixels(FontSize.SMALLER)};
    color: ${Color.DARK_GOLDEN};
    margin-top: ${Spacing.FOURTH};
`

const CreditsContainer = styled.div`
    margin-top: ${Spacing.FOURTH};
    font-size: ${fontSizeToPixels(FontSize.MORE_THAN_SMALL)}
`

const BackButtonContainer = styled.div`
    ${FLEX_CENTERED_CONTAINER}
`

const ResultRow = ({title, value}: { title: string, value: ReactNode }) => <ResultRowContainer>
    <ResultRowTitle>{title}</ResultRowTitle>
    <ResultRowValue>{value}</ResultRowValue>
</ResultRowContainer>

const VaultStatsValue = ({title, value}: { title: string, value: ReactNode }) => <RowWithPaddingContainer>
    <ResultRow title={title} value={value}/>
</RowWithPaddingContainer>

const VaultDetails = () => {
    const vaultState = useSelector<ApplicationState, VaultState>(applicationState => (
        getVaultStateFromApplication(applicationState)
    ))

    return <VaultStats>
        <VaultStatsWithBackgroundContainer>
            <BackgroundImage src={SectionBackground} alt={"SectionBackground"}/>
            <OverImageContainer>
                <VaultStatsValue
                    title={"In-Game Balance"}
                    value={vaultState.inGameBalance || 0}/>
                <VaultStatsValue
                    title={"Claimable Balance"}
                    value={vaultState.claimableBalance || 0 + vaultState.claimablePasses || 0}/>
                <VaultStatsValue
                    title={"External Wallet Balance"}
                    value={vaultState.externalWalletBalance || 0}/>
            </OverImageContainer>
        </VaultStatsWithBackgroundContainer>
    </VaultStats>
}

const LootBoxDetails = ({name, description}: { name: string, description: string }) => <>
    <Tooltip title={name} arrow>
        <LootBoxName>{name}</LootBoxName>
    </Tooltip>
    <Tooltip title={description} arrow>
        <BoxInfo className="pi pi-info-circle"/>
    </Tooltip>
</>

const BundleDetails = ({bundle, acquiringBundle, acquireBundle}: {
    bundle: Bundle, acquiringBundle?: Bundle, acquireBundle: (bundle: Bundle) => void
}) => {
    const isStockAvailable = useCallback(() => {
        return bundle.stock === undefined || bundle.stock === null || !!bundle.stock
    }, [bundle])

    return <BoxContainer>
        <BoxImage src={bundle.imageUrl}/>

        <BundleQuantity>
            {bundle.amount} BOX(ES)
        </BundleQuantity>

        <SummaryContainer>
            <LootBoxDetails name={bundle.lootBox.name} description={bundle.description}/>
            <SmallerActionButton
                disabled={!isStockAvailable() || !!acquiringBundle} label={isStockAvailable() ? "BUY" : "OUT OF STOCK"}
                loading={!!acquiringBundle && acquiringBundle.id === bundle.id}
                onClick={() => acquireBundle(bundle)}>
                {isStockAvailable() && <BundleValueContainer>
                    <ClaimableValue claimable={bundle.price} isRedeemMode={true} isClaimed={false}/>
                </BundleValueContainer>}
            </SmallerActionButton>
        </SummaryContainer>
    </BoxContainer>
}

const OwnedBoxDetails = ({ownedBox, openingBox, openBox}: {
    ownedBox: OwnedLootBox, openingBox?: LootBox, openBox: (lootBox: OwnedLootBox) => void
}) => {
    return <BoxContainer>
        <BoxImage src={ownedBox.lootBox.imageUrl}/>

        <OwnedBoxQuantity>
            {ownedBox.amount} BOX(ES)
        </OwnedBoxQuantity>

        <SummaryContainer>
            <LootBoxDetails name={ownedBox.lootBox.name} description={ownedBox.lootBox.description}/>
            <SmallerActionButton
                disabled={!!openingBox} label={"OPEN"}
                loading={!!openingBox && openingBox.id === ownedBox.lootBox.id}
                onClick={() => openBox(ownedBox)}/>
        </SummaryContainer>
    </BoxContainer>
}

const WonItem = ({wonItem}: { wonItem: PrizeDefinition }) => {
    return <BoxDetailsContainer>
        <BoxImageWithBorder src={wonItem.imageUrl}/>
        <BoxDetailsOnWin>
            <BoxDetailsOnOpenTitle>YOU WON: {wonItem.name}</BoxDetailsOnOpenTitle>
            <Tooltip title={wonItem.description} arrow>
                <BoxDetailsOnOpenDescription>{wonItem.description}</BoxDetailsOnOpenDescription>
            </Tooltip>
            <WonItemWarning>Please go to the history tab to claim your reward on-chain if necessary!</WonItemWarning>
        </BoxDetailsOnWin>
    </BoxDetailsContainer>
}

const Shop = ({account}: { account: string }) => {
    const [ownedBoxes, setOwnedBoxes] = useState<OwnedLootBox[]>([])
    const [bundles, setBundles] = useState<Bundle[]>([])
    const [loadingBundles, setLoadingBundles] = useState(true)
    const [loadingOwnedBoxes, setLoadingOwnedBoxes] = useState(true)
    const [openingBox, setOpeningBox] = useState<LootBox | undefined>(undefined)
    const [acquiringBundle, setAcquiringBundle] = useState<Bundle | undefined>(undefined)

    const [showRoulette, setShowRoulette] = useState(false)
    const [showRouletteReward, setShowRouletteReward] = useState(false)
    const [rouletteSpinFinished, setRouletteSpinFinished] = useState(false)
    const [openedBox, setOpenedBox] = useState<LootBox | undefined>()
    const [rouletteData, setRouletteData] = useState<OpenedBoxResponse | undefined>()

    const refreshBundles = useCallback(() => {
        setLoadingBundles(true)
        getAvailableBundles()
            .finally(() => setLoadingBundles(false))
            .then(foundBundles => setBundles(foundBundles))
            .catch(() => showGetBundlesFailed())
    }, [])

    const refreshOwnedBoxes = useCallback(() => {
        setLoadingOwnedBoxes(true)
        getOwnedBoxes(account)
            .finally(() => setLoadingOwnedBoxes(false))
            .then(foundOwnedBoxes => setOwnedBoxes(foundOwnedBoxes))
            .catch(() => showGetOwnedBoxesFailed())
    }, [account])

    const acquireBundle = useCallback(() => {
        return !!acquiringBundle ? buyBundle(account, acquiringBundle.id).then(() => {
            refreshBundles()
            refreshOwnedBoxes()
            refreshVaultState(account).catch(() => {}).finally()
        }).catch(() => showBundleAcquireFailed()) : Promise.resolve()
    }, [account, acquiringBundle, refreshBundles, refreshOwnedBoxes])

    const openBox = useCallback(() => {
        return !!openingBox ? openOwnedBox(account, openingBox.id).then(openResponse => {
            refreshOwnedBoxes()
            setShowRoulette(true)
            setOpenedBox(openingBox)
            setRouletteData(openResponse)
            setRouletteSpinFinished(false)
        }).catch(() => showBoxOpenFailed()) : Promise.resolve()
    }, [account, openingBox, refreshOwnedBoxes])

    const onSpinEnd = useCallback(() => {
        setShowRouletteReward(true)
        setRouletteSpinFinished(true)
        playActionSound(ACTION_SOUND.MONEY)
        refreshVaultState(account).catch(() => {}).finally()
    }, [account])

    useEffect(() => doWithMounted(isMounted => {
        isMounted.isMounted && refreshBundles()
        isMounted.isMounted && refreshOwnedBoxes()
    }), [refreshBundles, refreshOwnedBoxes])

    return <>
        <ConfirmationDialog
            message={<ConfirmationMainText>Will buy bundle: <ConfirmationHighlightedText>
                {!!acquiringBundle ? acquiringBundle.lootBox.name : ''}
            </ConfirmationHighlightedText>. Proceed?</ConfirmationMainText>}
            showConfirmation={!!acquiringBundle}
            yesButtonText={"Yes"} noButtonText={"Cancel"}
            onConfirm={acquireBundle} onHide={() => setAcquiringBundle(undefined)}/>

        <ConfirmationDialog
            message={<ConfirmationMainText>Will open box: <ConfirmationHighlightedText>
                {!!openingBox ? openingBox.name : ''}
            </ConfirmationHighlightedText>. Proceed?</ConfirmationMainText>}
            showConfirmation={!!openingBox}
            yesButtonText={"Yes"} noButtonText={"Cancel"}
            onConfirm={openBox} onHide={() => setOpeningBox(undefined)}/>

        <ScrollableShop>
            <ShopTabContainer isShown={!showRoulette}>
                <TitleWithSeparator title={"LOOTBOXES"} separatorType={SeparatorType.THEME_LARGE}/>
                <SectionDescription>
                    <SectionWithVault>
                        <DetailsContainer>
                            Our lootboxes contain a large variety of prizes:
                            <Prize> NFTs</Prize>,
                            <Prize> ERC20s (including different amounts of $GOD)</Prize>,
                            <Prize> whitelists </Prize>
                            and so on. Feel free to explore here all our bundles.
                        </DetailsContainer>
                        <VaultContainer>
                            <VaultDetails/>
                        </VaultContainer>
                    </SectionWithVault>
                </SectionDescription>

                <TitleWithSeparator title={`BUNDLES (${bundles.length})`} separatorType={SeparatorType.THEME_LARGE}/>
                <SectionDescription>
                    <BoxListContainer>
                        {loadingBundles && <CenteredContainer>
                            <LargeSpinner loading={loadingBundles}/>
                        </CenteredContainer>}
                        {!bundles.length && !loadingBundles && <NoBoxMessage>
                            No bundle could be found.
                        </NoBoxMessage>}
                        {!!bundles.length && !loadingBundles && bundles
                            .map(bundle => <BundleDetails
                                key={`BUNDLE_${bundle.id}`} bundle={bundle}
                                acquireBundle={bundle => setAcquiringBundle(bundle)}
                                acquiringBundle={acquiringBundle}/>)}
                    </BoxListContainer>
                </SectionDescription>

                <TitleWithSeparator title={`OWNED BOXES (${ownedBoxes.length})`} titleStyles={{color: Color.WHITE}}
                                    separatorType={SeparatorType.WHITE_LARGE}/>
                <SectionDescription>
                    <BoxListContainer>
                        {loadingOwnedBoxes && <CenteredContainer>
                            <LargeSpinner loading={loadingOwnedBoxes}/>
                        </CenteredContainer>}
                        {!ownedBoxes.length && !loadingOwnedBoxes && <NoBoxMessage>
                            You do not own any boxes. Please take a look over our selection of bundles.
                        </NoBoxMessage>}
                        {!!ownedBoxes.length && !loadingOwnedBoxes && ownedBoxes
                            .map(ownedBox => <OwnedBoxDetails
                                key={`OWNED_${ownedBox.lootBox.id}`} ownedBox={ownedBox}
                                openBox={boxToOpen => setOpeningBox(boxToOpen.lootBox)}
                                openingBox={openingBox}/>)}
                    </BoxListContainer>
                </SectionDescription>

                <CreditsContainer>
                    * Credits: <StyledLink href="https://www.freepik.com/vectors/vintage">
                        Loot Boxes
                    </StyledLink> and <StyledLink href="https://www.freepik.com/vectors/gold-investment">
                        Gold
                    </StyledLink> images created by upklyak at <StyledLink href="https://www.freepik.com">
                        freepik
                    </StyledLink>
                </CreditsContainer>
            </ShopTabContainer>

            <ShopTabContainer isShown={showRoulette}>
                {!!rouletteData && !!openedBox && <>
                    <TitleWithSeparator title={"LOOT BOX"} separatorType={SeparatorType.THEME_LARGE}/>
                    <BoxDetailsContainer>
                        <BoxImageWithBorder src={openedBox.imageUrl}/>
                        <BoxDetailsOnOpen>
                            <BoxDetailsOnOpenTitle>{openedBox.name}</BoxDetailsOnOpenTitle>
                            <Tooltip title={openedBox.description} arrow>
                                <BoxDetailsOnOpenDescription>{openedBox.description}</BoxDetailsOnOpenDescription>
                            </Tooltip>
                        </BoxDetailsOnOpen>
                    </BoxDetailsContainer>
                    <TitleWithSeparator title={"REWARDS"}
                                        titleStyles={{color: Color.WHITE}} separatorType={SeparatorType.WHITE_LARGE}/>
                    <RouletteContainer rouletteData={rouletteData} onSpinEnd={onSpinEnd}/>
                    {rouletteSpinFinished && <BackButtonContainer>
                        <ThemeButton label={"BACK"} onClick={() => {
                            setShowRoulette(false)
                            setTimeout(() => {
                                setOpenedBox(undefined)
                                setRouletteData(undefined)
                            }, TRANSITION_TIME)
                        }}/>
                    </BackButtonContainer>}
                    <ElysiumDialog position={"center"} dismissableMask={true}
                                   visible={showRouletteReward} onHide={() => setShowRouletteReward(false)}>
                        <TitleWithSeparator title={"CONGRATULATIONS!"} titleStyles={{textAlign: "center"}}
                                            separatorType={SeparatorType.THEME_LARGE}/>
                        <WonItem wonItem={(rouletteData.rouletteItems || [])[rouletteData.wonItemIndex]}/>
                    </ElysiumDialog>
                </>}
            </ShopTabContainer>
        </ScrollableShop>
    </>
}

export default Shop