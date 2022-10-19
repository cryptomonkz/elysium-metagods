import {Rect} from "react-konva"
import {useSelector} from "react-redux"
import {ApplicationState} from "../../../../Shared/State/ApplicationState";
import {RectangleDefinition} from "../../../../Shared/Models/Map/RectangleDefinition";
import {MINIMAP_STROKE_COLOR, MINIMAP_STROKE_WIDTH} from "../../../../Shared/Constants/StylesConstants";
import {MutableRefObject} from "react";
import {getStageSingleScale} from "../../../../Shared/Utils/StageUtils";
import StageLayer from "../../../Common/StageLayer";

const Position = ({stage, clientState}: { stage: MutableRefObject<any>, clientState: RectangleDefinition }) => <Rect
    x={clientState?.position?.x} y={clientState?.position?.y}
    width={clientState?.size?.x} height={clientState?.size?.y}
    stroke={MINIMAP_STROKE_COLOR} strokeWidth={MINIMAP_STROKE_WIDTH / getStageSingleScale(stage)}/>

const MiniMapPosition = ({stage}: { stage: MutableRefObject<any> }) => {
    const clientState = useSelector<ApplicationState, RectangleDefinition | undefined>(applicationState => (
        applicationState?.dragState?.clientState
    ))
    return <>{clientState && <Position stage={stage} clientState={clientState}/>}</>
}

const MiniMapPositionContainer = ({stage}: { stage: MutableRefObject<any> }) => <StageLayer>
    <MiniMapPosition stage={stage}/>
</StageLayer>

export default MiniMapPositionContainer