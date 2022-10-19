import {Rect} from 'react-konva';
import StageLayer from '../../../Common/StageLayer';
import {MutableRefObject} from "react";
import {getTerraformSources} from "../../../../Shared/Utils/LandSourcesUtils";
import {getMapSize} from "../../../../Shared/State/Map/MapService";
import {getCenteredMapPosition} from "../../../../Shared/Utils/MapUtils";

const MiniMapBackgroundLayer = ({landSources}: { landSources: MutableRefObject<any> }) => {
    const mapSize = getMapSize()
    const centerPosition = getCenteredMapPosition()
    return <StageLayer>
        <Rect
            fillPatternImage={getTerraformSources(landSources)}
            x={centerPosition.x} y={centerPosition.y}
            width={mapSize.x} height={mapSize.y}/>
    </StageLayer>
}

export default MiniMapBackgroundLayer
