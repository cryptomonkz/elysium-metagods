import {MutableRefObject} from "react";
import MainLogo from "./MainLogo";
import PositionListener from "./PositionListener";
import MapInteraction from "./MapInteraction/MapInteraction";
import Stats from "./Stats";
import TopMenu from "./TopMenu/TopMenu";

const OverMapLayer = ({ mainMapContext, landSources }: {mainMapContext: MutableRefObject<any>, landSources: MutableRefObject<any>}) => <>
    <MainLogo/>
    <Stats/>
    <TopMenu/>
    <PositionListener mainMapContext={mainMapContext}/>
    <MapInteraction mainMapContext={mainMapContext} landSources={landSources}/>
</>

export default OverMapLayer