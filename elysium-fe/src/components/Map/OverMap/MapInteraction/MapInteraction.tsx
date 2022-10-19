import GridToggler from "./GridToggler";
import MiniMap from "./MiniMap/MiniMap";
import Zoom from "./Zoom";
import {MutableRefObject} from "react";
import styled from "styled-components";
import {getAbsolutePosition} from "../../../Shared/Utils/StylesUtils";
import {device} from "../../../Shared/Constants/MediaQueries";
import {
    BOX_SHADOW,
    FLEX_CENTERED_CONTAINER,
    FULL_SIZE,
    FULL_WIDTH,
    NO_USER_SELECT,
    Z_INDEX
} from "../../../Shared/Constants/StylesConstants";
import MiniMapContainerImage from '../../../../assets/Images/miniMapContainer.png';
import MiniMapWhiteSkinImage from '../../../../assets/Images/miniMapWhiteSkin.png';
import MiniMapDarkSkinImage from '../../../../assets/Images/miniMapDarkSkin.png';
import GridTogglerContainerImage from '../../../../assets/Images/gridTogglerContainer.png';
import ZoomContainerImage from '../../../../assets/Images/zoomContainer.png';
import {FullSizeImage} from "../../../Shared/Components/FullSizeImage";

const MapInteraction = ({ mainMapContext, landSources }: {mainMapContext: MutableRefObject<any>, landSources: MutableRefObject<any>}) => <InteractionContainer>
    <GridTogglerContainer>
        <GridTogglerBackground src={GridTogglerContainerImage} alt={"GridTogglerContainer"}/>
        <GridToggler/>
    </GridTogglerContainer>
    <MiniMapContainer>
        <MiniMapBackground src={MiniMapContainerImage} alt={"MiniMapContainer"}/>
        <SizedMiniMap>
            <MiniMap landSources={landSources}/>
            <MiniMapWhiteSkin src={MiniMapWhiteSkinImage} alt={"MiniMapWhiteSkin"}/>
            <MiniMapDarkSkin src={MiniMapDarkSkinImage} alt={"MiniMapDarkSkin"}/>
        </SizedMiniMap>
    </MiniMapContainer>
    <ZoomContainer>
        <ZoomBackground src={ZoomContainerImage} alt={"ZoomContainer"}/>
        <Zoom mainMapContext={mainMapContext}/>
    </ZoomContainer>
</InteractionContainer>

const InteractionContainer = styled.div`
    ${getAbsolutePosition(undefined, '20px', '20px', undefined)}
    ${FLEX_CENTERED_CONTAINER}
    flex-direction: column;
    align-items: flex-end;
    z-index: ${Z_INDEX.OVER_MAP};
    width: 150px;
    ${NO_USER_SELECT}
    
    @media ${device.tablet} {
        width: 300px;
        ${getAbsolutePosition(undefined, '30px', '30px', undefined)}
    }
`

const GridTogglerContainer = styled.div`
    padding: 0.5rem 1rem;
    position: relative;
    margin-bottom: 1rem;
`

const MiniMapContainer = styled.div`
    ${FULL_SIZE}
    padding: 0.3rem 0.6rem;
    padding-bottom: 0.8rem;
    position: relative;
    
    @media ${device.tablet} {
        padding: 0.5rem 0.7rem;
    }
`

const SizedMiniMap = styled.div`
    position: relative;
    ${FULL_WIDTH}
    height: 100px;
    
    @media ${device.tablet} {
        height: 210px;
    }
`

const ZoomContainer = styled.div`
    ${FULL_SIZE}
    padding: 0.6rem 1.2rem;
    margin-top: -0.6rem;
    position: relative;
`

const GridTogglerBackground = styled(FullSizeImage)`
    opacity: .6;
`

const MiniMapBackground = styled(FullSizeImage)`
    opacity: .9;
`

const MiniMapWhiteSkin = styled(FullSizeImage)`
    opacity: 0.7;
`

const MiniMapDarkSkin = styled(FullSizeImage)`
    opacity: 1;
    ${BOX_SHADOW.INSET_BACKGROUND}
`

const ZoomBackground = styled(FullSizeImage)`
    opacity: .65;
`

export default MapInteraction