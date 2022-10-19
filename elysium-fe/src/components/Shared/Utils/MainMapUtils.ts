import {DEFAULT_MAIN_STAGE_OFF_SCREEN_VISIBILITY} from "../Constants/MainMapConstants"
import {Sizes} from "../Models/Map/Sizes"
import {signalClientPositionChange, signalStagePositionChange} from "../State/Drag/DragService"
import {addOffset, singleDivideCoordinates, singleMultiplyCoordinates} from "./CoordinateUtils"
import {getElementSize} from "./HTMLElementUtils"
import {
    buildScrollableScaledLimitsForStage,
    buildScrollableUnscaledLimitsForStage,
    getUnscaledOffsetToClientScreen,
    scrollToCenter
} from "./ScrollUtils"
import {
    doStageChangesAndKeepPosition,
    getStageAbsoluteUnscaledPosition,
    getStageSingleScale,
    getStageUnscaledSize,
    scaleDownStageCoordinates,
    setStageRelativeScaledPosition,
    setStageRelativeUnscaledPosition,
    setStageScaledSize,
    setStageSingleScale
} from "./StageUtils"

const signalPositionChange = (stage: any): void => {
    signalStagePositionChange(getStageUnscaledSize(stage), getStageAbsoluteUnscaledPosition(stage))
    signalClientPositionChange(getMainStageContainerUnscaledSize(stage), getClientScreenUnscaledPosition(stage, getStageAbsoluteUnscaledPosition(stage)))
}

export const signalClientScaledPositionChange = (stage: any, scaledPosition: Sizes) => {
    const unscaledStagePosition = scaleDownStageCoordinates(stage, scaledPosition)
    signalClientPositionChange(getMainStageContainerUnscaledSize(stage), getClientScreenUnscaledPosition(stage, unscaledStagePosition))
}

export const getClientScreenUnscaledPosition = (stage: any, coordinates: Sizes): Sizes => addOffset(coordinates, getUnscaledOffsetToClientScreen(stage))

export const setMainStageSingleScale = (stage: any, stageContainer: any, scale: number) => {
    setStageSingleScale(stage, scale)
    setMainStageDesiredSize(stage, stageContainer)
}

export const getMainStageSizeMultiplier = (stage: any): number => 1 + Math.min(getStageSingleScale(stage) * DEFAULT_MAIN_STAGE_OFF_SCREEN_VISIBILITY, DEFAULT_MAIN_STAGE_OFF_SCREEN_VISIBILITY)

export const getMainStageContainerUnscaledSize = (stage: any) => singleDivideCoordinates(getStageUnscaledSize(stage), getMainStageSizeMultiplier(stage))

export const getMainStageDesiredSize = (stage: any, stageContainer: any) => singleMultiplyCoordinates(getElementSize(stageContainer), getMainStageSizeMultiplier(stage))

export const setMainStageDesiredSize = (stage: any, stageContainer: any) => {
    setStageScaledSize(stage, getMainStageDesiredSize(stage, stageContainer))
    scrollToCenter(stageContainer)
}

export const setMainStageScaledPosition = (stage: any, coordinates: Sizes): void => {
    const scaledLimits = buildScrollableScaledLimitsForStage(stage)
    setStageRelativeScaledPosition(stage, coordinates, scaledLimits.topLeft, scaledLimits.bottomRight)
}

export const setMainStageUnscaledPosition = (stage: any, coordinates: Sizes): void => {
    const unscaledLimits = buildScrollableUnscaledLimitsForStage(stage)
    setStageRelativeUnscaledPosition(stage, coordinates, unscaledLimits.topLeft, unscaledLimits.bottomRight)
}

export const setMainStageScaledPositionAndNotify = (stage: any, coordinates: Sizes): void => {
    setMainStageScaledPosition(stage, coordinates)
    signalPositionChange(stage)
}

export const setMainStageUnscaledPositionAndNotify = (stage: any, coordinates: Sizes): void => {
    setMainStageUnscaledPosition(stage, coordinates)
    signalPositionChange(stage)
}

export const doMainStageChangesAndKeepPosition = (stage: any, doChanges: () => void) => doStageChangesAndKeepPosition(
    stage, doChanges, position => setMainStageUnscaledPositionAndNotify(stage, position)
)