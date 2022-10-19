import {Sizes} from "../Models/Map/Sizes";
import {
    addOffset, getCenteredRectanglePosition,
    getCoordinatesWithLimits,
    getOffset,
    scaleDownCoordinates,
    scaleUpCoordinates,
    singleMultiplyCoordinates
} from "./CoordinateUtils";

export const getStageScale = (stage: any): Sizes => new Sizes(stage?.current?.scaleX(), stage?.current?.scaleY())

export const setStageScale = (stage: any, scale: Sizes): void => stage?.current?.scale({ x: scale.x, y: scale.y })

export const getStageSingleScale = (stage: any): number => getStageScale(stage).x || getStageScale(stage).y

export const setStageSingleScale = (stage: any, scale: number): void => setStageScale(stage, new Sizes(scale, scale))

export const scaleUpStageCoordinates = (stage: any, coordinates: Sizes): Sizes => scaleUpCoordinates(coordinates, getStageScale(stage))

export const scaleDownStageCoordinates = (stage: any, coordinates: Sizes): Sizes => scaleDownCoordinates(coordinates, getStageScale(stage))

export const getStageScaledSize = (stage: any): Sizes => new Sizes(stage?.current?.width() || 0, stage?.current?.height() || 0)

export const getStageUnscaledSize = (stage: any): Sizes => scaleDownStageCoordinates(stage, getStageScaledSize(stage))

export const setStageScaledSize = (stage: any, size: Sizes): void => stage?.current?.size({ width: size.x, height: size.y })

export const setStageUnscaledSize = (stage: any, size: Sizes): void => setStageScaledSize(stage, scaleUpStageCoordinates(stage, size))

export const getStageAbsoluteScaledPosition = (stage: any): Sizes => new Sizes(-stage?.current?.x(), -stage?.current?.y())

export const getStageAbsoluteUnscaledPosition = (stage: any): Sizes => scaleDownStageCoordinates(stage, getStageAbsoluteScaledPosition(stage))

export const getStageRelativeScaledPosition = (stage: any): Sizes => {
    const stageAbsolutePosition = getStageAbsoluteScaledPosition(stage)
    return getOffset(getPositionForLandCenter(stage), stageAbsolutePosition)
}

export const getStageRelativeUnscaledPosition = (stage: any): Sizes => {
    const scaledPosition = getStageRelativeScaledPosition(stage)
    return scaleDownStageCoordinates(stage, scaledPosition)
}

export const setStageRelativeScaledPosition = (stage: any, coordinates: Sizes, min?: Sizes, max?: Sizes): void => {
    const scaledAbsolutePosition = addOffset(getPositionForLandCenter(stage), coordinates)
    const withinLimits = getCoordinatesWithLimits(scaledAbsolutePosition, min, max)
    stage?.current?.position(singleMultiplyCoordinates(withinLimits, -1))
}

export const setStageRelativeUnscaledPosition = (stage: any, coordinates: Sizes, min?: Sizes, max?: Sizes): void => {
    const scaledPosition = scaleUpStageCoordinates(stage, coordinates)
    const scaledMin = min ? scaleUpStageCoordinates(stage, min) : undefined
    const scaledMax = max ? scaleUpStageCoordinates(stage, max) : undefined
    setStageRelativeScaledPosition(stage, scaledPosition, scaledMin, scaledMax)
}

export const doStageChangesAndKeepPosition = (stage: any, doChanges: () => void, setPosition: (position: Sizes) => void) => {
    const unscaledPosition = getStageRelativeUnscaledPosition(stage)
    doChanges()
    setPosition(unscaledPosition)
}

export const getPositionForLandCenter = (stage: any): Sizes => getCenteredRectanglePosition(getStageScaledSize(stage))
