import {forwardRef, MutableRefObject, useCallback, useEffect, useImperativeHandle, useRef} from 'react';
import {attachOnResizeEvent} from '../../Shared/Utils/EventUtils';
import {
    doMainStageChangesAndKeepPosition,
    setMainStageDesiredSize,
    setMainStageScaledPositionAndNotify
} from '../../Shared/Utils/MainMapUtils';
import MapStage from '../Common/MapStage';
import HighlightableAreas from './Layers/HighlightableAreas';
import HighlightedLayer from './Layers/HighlightedLayer';
import GridLayer from './Layers/GridLayer';
import StageWrapper from './StageWrapper';
import MainMapBackgroundLayer from "./Layers/MainMapBackgroundLayer";
import {RenderAnnouncer} from "../../Shared/Components/RenderAnnouncer";
import {signalMapLoading} from "../../Shared/State/Loader/LoaderService";
import {MAIN_STAGE_INITIAL_POSITION} from "../../Shared/Constants/MainMapConstants";

const MainMap = forwardRef(({landSources}: { landSources: MutableRefObject<any> }, mapContext) => {
    const stage = useRef()
    const stageContainer = useRef()

    useImperativeHandle(mapContext, () => ({
        stage: () => stage,
        stageContainer: () => stageContainer
    }))

    const onResize = useCallback(() => doMainStageChangesAndKeepPosition(
        stage, () => setMainStageDesiredSize(stage, stageContainer)
    ), [stage, stageContainer])

    useEffect(() => {
        setMainStageDesiredSize(stage, stageContainer)
        setMainStageScaledPositionAndNotify(stage, MAIN_STAGE_INITIAL_POSITION)
        attachOnResizeEvent(() => onResize())
    }, [stage, stageContainer, onResize])

    return <StageWrapper ref={stageContainer} stage={stage as MutableRefObject<any>}>
        <MapStage ref={stage}>
            <MainMapBackgroundLayer landSources={landSources}/>
            <GridLayer stage={stage} landSources={landSources}/>
            <HighlightableAreas/>
            <HighlightedLayer/>
            <RenderAnnouncer onRender={() => signalMapLoading(false)} />
        </MapStage>
    </StageWrapper>
})

export default MainMap