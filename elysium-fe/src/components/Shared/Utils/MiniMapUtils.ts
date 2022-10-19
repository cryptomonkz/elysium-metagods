import {Sizes} from "../Models/Map/Sizes"
import {divideCoordinates} from "./CoordinateUtils"
import {getElementSize} from "./HTMLElementUtils"
import {getMapSize} from "../State/Map/MapService";
import {doStageChangesAndKeepPosition, setStageRelativeUnscaledPosition} from "./StageUtils";

export const getMinimapScale = (minimapContainer: any): Sizes => {
    const containerSize = getElementSize(minimapContainer)
    return divideCoordinates(containerSize, getMapSize())
}

export const doMiniMapStageChangesAndKeepPosition = (stage: any, doChanges: () => void) => doStageChangesAndKeepPosition(
    stage, doChanges, position => setStageRelativeUnscaledPosition(stage, position)
)