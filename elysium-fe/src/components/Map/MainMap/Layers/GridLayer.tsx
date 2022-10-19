import {useSelector} from 'react-redux';
import StageLayer from '../../Common/StageLayer';
import {MutableRefObject, useCallback, useState} from "react";
import {ApplicationState} from "../../../Shared/State/ApplicationState";
import {getGridSources} from "../../../Shared/Utils/LandSourcesUtils";
import LayerFromImage from "./LayerFromImage";
import {getAbsoluteUnscaledMouseEventPosition} from "../../../Shared/Utils/StageEventUtils";
import {addOffset} from "../../../Shared/Utils/CoordinateUtils";
import {getStageState, isDragging} from "../../../Shared/State/Drag/DragService";
import {removeHighlight, signalHighlight} from "../../../Shared/State/Highlighted/HighlightedService";
import {getSupposedTile} from "../../../Shared/Utils/MapUtils";

const LandTiles = ({gridEnabled, landSources}: { gridEnabled: boolean, landSources: MutableRefObject<any> }) => <LayerFromImage
    properties={{ opacity: gridEnabled ? 1 : 0 }}
    sourceExtractor={() => getGridSources(landSources)}/>

const GridLayer = ({stage, landSources}: { stage: MutableRefObject<any>, landSources: MutableRefObject<any> }) => {
    const gridEnabled = useSelector<ApplicationState, boolean>(applicationState => (
        !!applicationState?.highlightedState?.gridEnabled
    ))
    const [lastMouseEvent] = useState({ event: {} })
    const getLastMouseEvent = useCallback(() => lastMouseEvent.event, [lastMouseEvent])
    const setLastMouseEvent = useCallback((event: any) => lastMouseEvent.event = event, [lastMouseEvent])

    const getMouseEventTile = useCallback((event: any) => {
        const positionToCurrentStage = getAbsoluteUnscaledMouseEventPosition(stage, event)
        const absolutePositionOnStage = addOffset(getStageState()?.position, positionToCurrentStage)
        return getSupposedTile(absolutePositionOnStage)
    }, [stage])

    const onClick = useCallback((event: any) => getMouseEventTile(event), [getMouseEventTile])
    const onHighlight = useCallback((event: any) => signalHighlight(getMouseEventTile(event)?.selectableArea), [getMouseEventTile])
    const onMobileClick = useCallback(() => {
        onClick(getLastMouseEvent())
        onHighlight(getLastMouseEvent())
    }, [onClick, onHighlight, getLastMouseEvent])

    return <StageLayer listeningToEvents={gridEnabled} handlers={{
        onTouchMove: setLastMouseEvent,
        onTouchStart: setLastMouseEvent,
        onTouchEnd: () => !isDragging() && onMobileClick(),
        onClick: (event: any) => !isDragging() && onClick(event),
        onMouseLeave: () => removeHighlight(),
        onMouseMove: onHighlight
    }}>
        <LandTiles gridEnabled={gridEnabled} landSources={landSources}/>
    </StageLayer>
}

export default GridLayer
