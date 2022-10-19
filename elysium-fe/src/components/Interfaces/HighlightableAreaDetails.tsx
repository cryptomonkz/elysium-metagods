import {useSelector} from "react-redux"
import {HighlightableArea} from "../Shared/Models/Map/MapHighlightableArea"
import {ApplicationState} from "../Shared/State/ApplicationState"
import {closeHighlightableArea} from "../Shared/State/OpenedInterface/OpenedInterfaceService";
import {useCallback} from "react";
import {
    AbsoluteBorderRadius,
    BOX_SHADOW,
    Color,
    DEFAULT_BUTTON_SIZE,
    FLEX_CENTERED_CONTAINER,
    FontFamily,
    FontSize,
    fontSizeToPixels,
    FULL_SIZE,
    FULL_SIZE_ABSOLUTE_POSITION,
    Spacing,
    Z_INDEX
} from "../Shared/Constants/StylesConstants";
import styled from "styled-components";
import {Sidebar} from "primereact/sidebar";
import {FullSizeImage} from "../Shared/Components/FullSizeImage";
import PlaygroundImage from "../../assets/Images/playgroundBackground.jpg";
import StyledAreaBackgroundImage from "../../assets/Images/highlightableArea.png";
import {getAbsolutePosition} from "../Shared/Utils/StylesUtils";
import TheGreatHall from "./TheGreatHall/TheGreatHall";
import {CancelButton} from "../Shared/Components/StyledButton";
import {LargerThanMobileScreen} from "../Shared/Components/LargerScreenComponent";
import Celestials from "./Celestials/Celestials";
import Tournaments from "./Tournaments/Tournaments";
import {DraggedTokenPreview} from "../Shared/Components/Drag/DraggedTokenPreview";
import {playBackgroundSound} from "../Shared/State/Sound/SoundService";
import {BACKGROUND_SOUND} from "../Shared/State/Sound/SoundState";
import Lootboxes from "./Lootboxes/Lootboxes";

const HighlightableAreaDetails = () => {
    const highlightableArea = useSelector<ApplicationState, HighlightableArea | undefined>(applicationState => (
        applicationState?.openedInterfaceState?.openedHighlightableArea
    ))

    const renderPlayGround = useCallback(() => {
        switch (highlightableArea) {
            default:
                return <PlayGround src={PlaygroundImage} alt={"PlaygroundBackground"}/>
        }
    }, [highlightableArea])

    const displayArea = useCallback(() => {
        switch (highlightableArea) {
            case HighlightableArea.THE_GREAT_HALL:
                return <TheGreatHall/>
            case HighlightableArea.CELESTIALS:
                return <Celestials/>
            case HighlightableArea.TOURNAMENTS:
                return <Tournaments/>
            case HighlightableArea.LOOTBOXES:
                return <Lootboxes/>
            default:
                return <>
                    <StyledAreaTitle>{highlightableArea}</StyledAreaTitle>
                    <div>More coming soon!</div>
                </>
        }
    }, [highlightableArea])

    const onCloseArea = useCallback(() => {
        closeHighlightableArea()
        playBackgroundSound(BACKGROUND_SOUND.DEFAULT)
    }, [])

    return <StyledSidebar visible={!!highlightableArea} onHide={onCloseArea} fullScreen showCloseIcon={false}>
        <StyledContent>
            <PlayGroundContainer>
                {renderPlayGround()}
            </PlayGroundContainer>
            <StyledArea>
                <StyledAreaBackground src={StyledAreaBackgroundImage} alt={"StyledAreaBackground"}/>
                <StyledAreaContent>
                    <BackButtonContainer>
                        <BackButton icon="pi pi-times" onClick={onCloseArea} />
                    </BackButtonContainer>
                    <LargerThanMobileScreen>
                        {highlightableArea && displayArea()}
                    </LargerThanMobileScreen>
                </StyledAreaContent>
            </StyledArea>
        </StyledContent>

        <DraggedTokenPreview/>
    </StyledSidebar>
}

const StyledSidebar = styled(Sidebar)`
    .p-sidebar-header {
        display: none !important;
    }
    .p-sidebar-content {
        padding: 0;
    }
`

const StyledContent = styled.div`
    padding: ${Spacing.FIFTH} ${Spacing.FOURTH};
    ${FULL_SIZE}
`

const PlayGroundContainer = styled.div`
    ${FULL_SIZE_ABSOLUTE_POSITION}
    margin: -5px;
`

const PlayGround = styled(FullSizeImage)`
    filter: blur(5px) brightness(50%);
`

const StyledArea = styled.div`
    position: relative;
    ${FULL_SIZE}
`

const StyledAreaBackground = styled(FullSizeImage)`
    z-index: ${Z_INDEX.RELATIVE_FIRST};
`

const StyledAreaContent = styled.div`
    z-index: ${Z_INDEX.RELATIVE_SECOND};
    ${FULL_SIZE_ABSOLUTE_POSITION}
    ${FLEX_CENTERED_CONTAINER}
    flex-direction: column;
    color: ${Color.WHITE};
    text-align: center;
`

const BackButtonContainer = styled.div`
    border-radius: ${AbsoluteBorderRadius.TINY};
    ${getAbsolutePosition(`-${Spacing.THIRD}`, Spacing.FOURTH, undefined, undefined)}
    ${BOX_SHADOW.BACKGROUND_SHADOW}
`

const BackButton = styled(CancelButton)`
    color: ${Color.WHITE} !important;
    padding: ${Spacing.FIRST} !important;
    ${DEFAULT_BUTTON_SIZE}
`

const StyledAreaTitle = styled.div`
    font-size: ${fontSizeToPixels(FontSize.LARGE)};
    margin-bottom: ${Spacing.FOURTH};
    font-family: ${FontFamily.HU_THE_GAME};
`

export default HighlightableAreaDetails
