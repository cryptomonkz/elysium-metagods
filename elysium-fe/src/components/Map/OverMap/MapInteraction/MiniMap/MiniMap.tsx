import {MutableRefObject, useCallback, useEffect, useRef} from 'react';
import styled from "styled-components";
import {Sizes} from '../../../../Shared/Models/Map/Sizes';
import {signalMiniMapLoading} from '../../../../Shared/State/Loader/LoaderService';
import {getElementSize} from '../../../../Shared/Utils/HTMLElementUtils';
import {doMiniMapStageChangesAndKeepPosition, getMinimapScale} from '../../../../Shared/Utils/MiniMapUtils';
import {setStageRelativeScaledPosition, setStageScale, setStageScaledSize} from '../../../../Shared/Utils/StageUtils';
import MapStage from '../../../Common/MapStage';
import {FULL_SIZE} from "../../../../Shared/Constants/StylesConstants";
import {signalMiniMapPositionChange} from "../../../../Shared/State/MiniMapPosition/MiniMapPositionService";
import {getRelativeUnscaledMouseEventPosition} from "../../../../Shared/Utils/StageEventUtils";
import MiniMapPositionContainer from "./MiniMapPosition";
import {attachOnResizeEvent} from "../../../../Shared/Utils/EventUtils";
import MiniMapBackgroundLayer from "./MiniMapBackgroundLayer";
import {RenderAnnouncer} from "../../../../Shared/Components/RenderAnnouncer";
import {playActionSound} from "../../../../Shared/State/Sound/SoundService";
import {ACTION_SOUND} from "../../../../Shared/State/Sound/SoundState";

const setStageSize = (stage: MutableRefObject<any>, minimapContainer: MutableRefObject<any>) => setStageScaledSize(stage, getElementSize(minimapContainer))

const MiniMap = ({landSources}: { landSources: MutableRefObject<any> }) => {
    const stage = useRef()
    const minimapContainer = useRef()

    const handleMiniMapClick = useCallback((mouseEvent: any) => {
        playActionSound(ACTION_SOUND.DROP)
        signalMiniMapPositionChange(
            getRelativeUnscaledMouseEventPosition(stage, mouseEvent)
        )
    }, [stage])

    const setStageConfiguration = useCallback(() => {
        setStageSize(stage, minimapContainer)
        setStageScale(stage, getMinimapScale(minimapContainer))
    }, [stage, minimapContainer])

    const onResize = useCallback(() => doMiniMapStageChangesAndKeepPosition(
        stage, () => setStageConfiguration()
    ), [stage, setStageConfiguration])

    useEffect(() => {
        setStageConfiguration()
        setStageRelativeScaledPosition(stage, new Sizes())
        attachOnResizeEvent(onResize)
    }, [stage, minimapContainer, setStageConfiguration, onResize])

    return <MinimapWrapper ref={minimapContainer as MutableRefObject<any>}>
        <MapStage ref={stage} handlers={{onClick: handleMiniMapClick, onTouchStart: handleMiniMapClick}}>
            <MiniMapBackgroundLayer landSources={landSources}/>
            <MiniMapPositionContainer stage={stage}/>
            <RenderAnnouncer onRender={() => signalMiniMapLoading(false)}/>
        </MapStage>
    </MinimapWrapper>
}

const MinimapWrapper = styled.div`
    ${FULL_SIZE}
    overflow: hidden;
`

export default MiniMap