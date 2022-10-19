import {Path} from 'react-konva';
import {useSelector} from 'react-redux';
import {STAGE_WITH_HIGHLIGHT_HANDLERS} from '../../../Shared/Constants/MainMapConstants';
import {SelectableArea} from '../../../Shared/Models/Map/SelectableArea';
import {signalHighlight} from '../../../Shared/State/Highlighted/HighlightedService';
import {signalOpenHighlightableArea} from '../../../Shared/State/OpenedInterface/OpenedInterfaceService';
import {doesPathIntersectRectangle} from '../../../Shared/Utils/CoordinateUtils';
import {buildSelectablePath} from '../../../Shared/Utils/HighlightUtils';
import StageLayer from '../../Common/StageLayer';
import {ApplicationState} from "../../../Shared/State/ApplicationState";
import {RectangleDefinition} from "../../../Shared/Models/Map/RectangleDefinition";
import {MapHighlightableArea} from "../../../Shared/Models/Map/MapHighlightableArea";
import {useCallback} from "react";
import {isDragging} from "../../../Shared/State/Drag/DragService";
import {playActionSound} from "../../../Shared/State/Sound/SoundService";
import {ACTION_SOUND} from "../../../Shared/State/Sound/SoundState";

const shouldDisplayHighlightableArea = (highlightableArea: MapHighlightableArea, stageState?: RectangleDefinition) => stageState &&
    doesPathIntersectRectangle(highlightableArea?.path, stageState?.toRectangle())

const HighlightableAreasLayer = () => {
    const stageState = useSelector<ApplicationState, RectangleDefinition | undefined>(applicationState => (
        applicationState?.dragState?.stageState
    ))
    const highlightableAreas = useSelector<ApplicationState, MapHighlightableArea[]>(applicationState => (
        applicationState?.mapState?.highlightableAreas || []
    ))
    const openArea = useCallback((highlightableArea: MapHighlightableArea) => {
        playActionSound(ACTION_SOUND.ACCEPT_HIGH)
        signalOpenHighlightableArea(highlightableArea.area)
    }, [])
    return <>{
        highlightableAreas.filter(highlightableArea => shouldDisplayHighlightableArea(highlightableArea, stageState)).map(highlightableArea => {
            const path = buildSelectablePath(highlightableArea?.path)
            return <Path
                key={highlightableArea.area}
                data={path}
                onClick={() => openArea(highlightableArea)}
                onTouchEnd={() => !isDragging() && openArea(highlightableArea)}
                onMouseOver={() => signalHighlight(new SelectableArea(path, highlightableArea.fillProperties, highlightableArea.highlightText))} />
        })
    }</>
}

const HighlightableAreas = () => {
    return <StageLayer listeningToEvents={true} handlers={STAGE_WITH_HIGHLIGHT_HANDLERS}>
        <HighlightableAreasLayer/>
    </StageLayer>
}

export default HighlightableAreas