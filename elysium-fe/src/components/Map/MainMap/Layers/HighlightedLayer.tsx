import {Path, Text} from 'react-konva';
import {useSelector} from 'react-redux';
import StageLayer from '../../Common/StageLayer';
import {ApplicationState} from "../../../Shared/State/ApplicationState";
import {SelectableArea} from "../../../Shared/Models/Map/SelectableArea";
import {SelectableAreaText} from "../../../Shared/Models/Map/SelectableAreaText";

const HighlightedText = ({highlightedAreaText}: { highlightedAreaText: SelectableAreaText }) => {
    return <Text x={highlightedAreaText.position.x} y={highlightedAreaText.position.y}
                 text={highlightedAreaText.text} ${...highlightedAreaText.properties}/>
}

const HighlightedPath = () => {
    const highlightedArea = useSelector<ApplicationState, SelectableArea | undefined>(applicationState => (
        applicationState?.highlightedState?.highlightedArea
    ))
    return <>{highlightedArea && <>
        <Path
            {...highlightedArea?.properties}
            data={highlightedArea.pathData}/>
        {highlightedArea?.selectableText && <HighlightedText highlightedAreaText={highlightedArea.selectableText}/>}
    </>}</>
}

const HighlightedLayer = () => (
    <StageLayer listeningToEvents={false}>
        <HighlightedPath/>
    </StageLayer>
)

export default HighlightedLayer