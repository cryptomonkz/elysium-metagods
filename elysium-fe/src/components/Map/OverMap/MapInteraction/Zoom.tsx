import {MutableRefObject, useEffect, useState} from 'react';
import styled from "styled-components";
import {ZOOM_TIMEOUT} from "../../../Shared/Constants/TimeoutConstants";
import {DEFAULT_ZOOM_LEVEL, MAX_ZOOM_LEVEL, MIN_ZOOM_LEVEL, ZOOM_STEP} from "../../../Shared/Constants/ZoomConstants";
import {doMainStageChangesAndKeepPosition, setMainStageSingleScale} from "../../../Shared/Utils/MainMapUtils";
import {getStageSingleScale} from "../../../Shared/Utils/StageUtils";
import {getNewScaleWithinLimits, shouldScale} from "../../../Shared/Utils/ZoomUtils";
import {Color, FULL_WIDTH, Spacing} from "../../../Shared/Constants/StylesConstants";
import {TransparentContainer} from "../../../Shared/Components/TransparentContainer";
import StyledSlider from "../../../Shared/Components/StyledSlider";

const zoomStage = (stage: MutableRefObject<any>, stageContainer: MutableRefObject<any>, zoomLevel: number) => {
    const previousScale = getStageSingleScale(stage)
    const newScale = getNewScaleWithinLimits(zoomLevel)
    shouldScale(previousScale, newScale) && doMainStageChangesAndKeepPosition(
        stage, () => setMainStageSingleScale(stage, stageContainer, newScale)
    )
}

const doZoom = (mainMapContext: MutableRefObject<any>, zoomLevel: number) => zoomStage(
    mainMapContext?.current?.stage(), mainMapContext?.current?.stageContainer(), zoomLevel
)

const Zoom = ({mainMapContext}: { mainMapContext: MutableRefObject<any> }) => {
    const [zoomLevel, setZoomLevel] = useState(DEFAULT_ZOOM_LEVEL)
    useEffect(() => doZoom(mainMapContext, DEFAULT_ZOOM_LEVEL), [mainMapContext])

    return <>
        <Wrapper>
            <SearchIcon className="pi pi-search"/>
            <StyledSlider
                value={zoomLevel}
                onChange={(changeEvent: any, level: number | number[]) => setZoomLevel(level as number)}
                onChangeCommitted={(changeEvent: any, level: number | number[]) => setTimeout(() => doZoom(mainMapContext, level as number), ZOOM_TIMEOUT)}
                step={ZOOM_STEP} min={MIN_ZOOM_LEVEL} max={MAX_ZOOM_LEVEL}/>
        </Wrapper>
    </>
}

const Wrapper = styled(TransparentContainer)`
    ${FULL_WIDTH}
    height: 20px;
    padding: 0;
`

const SearchIcon = styled.i`
    margin-right: ${Spacing.THIRD};
    color: ${Color.WHITE};
    transform: rotateY(180deg);
`


export default Zoom