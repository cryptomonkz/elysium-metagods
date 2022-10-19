import {Image} from 'react-konva';
import {ApplicationState} from "../../../Shared/State/ApplicationState";
import {RectangleDefinition} from "../../../Shared/Models/Map/RectangleDefinition";
import {useSelector} from 'react-redux';
import {getCenteredMapPosition} from "../../../Shared/Utils/MapUtils";

const LayerFromImage = ({properties = {}, sourceExtractor}: { properties?: any, sourceExtractor: () => HTMLImageElement | undefined }) => {
    const stageState = useSelector<ApplicationState, RectangleDefinition | undefined>(applicationState => (
        applicationState?.dragState?.stageState
    ))
    const mapPositionForCenter = getCenteredMapPosition()
    return <>{stageState && <Image
        {...properties}
        image={sourceExtractor()}
        crop={{
            x: stageState.position.x - mapPositionForCenter.x,
            y: stageState.position.y - mapPositionForCenter.y,
            width: stageState.size.x,
            height: stageState.size.y
        }}
        x={stageState.position.x} y={stageState.position.y}
        width={stageState.size.x} height={stageState.size.y}/>
    }</>
}

export default LayerFromImage
