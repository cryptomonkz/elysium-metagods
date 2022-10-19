import {MutableRefObject} from "react";
import LayerFromImage from "./LayerFromImage";
import {getTerraformSources} from "../../../Shared/Utils/LandSourcesUtils";
import StageLayer from "../../Common/StageLayer";

const MiniMapBackgroundLayer = ({landSources}: { landSources: MutableRefObject<any> }) => <StageLayer>
    <LayerFromImage sourceExtractor={() => getTerraformSources(landSources)}/>
</StageLayer>

export default MiniMapBackgroundLayer
