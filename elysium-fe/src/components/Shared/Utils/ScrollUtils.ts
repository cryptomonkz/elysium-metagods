import {Rectangle} from "../Models/Map/Rectangle"
import {Sizes} from "../Models/Map/Sizes"
import {
    addOffset,
    getCenteredRectanglePosition,
    getOffset,
    getRectangleCenterPosition,
    singleMultiplyCoordinates
} from "./CoordinateUtils"
import {getElementScrollableSize, getElementSize} from "./HTMLElementUtils"
import {getMainStageContainerUnscaledSize, getMainStageSizeMultiplier} from "./MainMapUtils"
import {getStageUnscaledSize, scaleUpStageCoordinates} from "./StageUtils"
import {RectangleDefinition} from "../Models/Map/RectangleDefinition";
import {getMapSize} from "../State/Map/MapService";
import {getCenteredMapPosition} from "./MapUtils";

const getScrollCenter = (container: any): Sizes => addOffset(
    getRectangleCenterPosition(getElementScrollableSize(container)),
    getCenteredRectanglePosition(getElementSize(container))
)

export const scrollElement = (container: any, coordinates: Sizes): void => container?.current?.scrollTo(coordinates.x, coordinates.y)

export const scrollToCenter = (container: any): void => scrollElement(container, getScrollCenter(container))

export const getScrollState = (container: any): Sizes => new Sizes(container?.current?.scrollLeft, container?.current?.scrollTop)

export const getOffsetFromStartScroll = (container: any, startScroll?: Sizes): Sizes => getOffset(getScrollState(container), startScroll)

export const getScrollSpeed = (stage: any) => (getMainStageSizeMultiplier(stage) - 1) / 2

export const adaptOffsetToScrollSpeed = (stage: any, offset: Sizes): Sizes => singleMultiplyCoordinates(offset, getScrollSpeed(stage))

export const buildScrollableUnscaledLimitsForStage = (stage: any): Rectangle => {
    const offsetToClient = getUnscaledOffsetToClientScreen(stage)
    const scrollableLimits = getScrollableLimits()
    const topLeftLimit = getOffset(offsetToClient, scrollableLimits.topLeft)
    const bottomRightLimit = addOffset(offsetToClient, scrollableLimits.bottomRight)
    return new Rectangle(topLeftLimit, getOffset(getStageUnscaledSize(stage), bottomRightLimit))
}

export const buildScrollableScaledLimitsForStage = (stage: any): Rectangle => {
    const limits = buildScrollableUnscaledLimitsForStage(stage)
    return new Rectangle(scaleUpStageCoordinates(stage, limits.topLeft), scaleUpStageCoordinates(stage, limits.bottomRight))
}

export const getUnscaledOffsetToClientScreen = (stage: any): Sizes => {
    const unscaledContainerSize = getMainStageContainerUnscaledSize(stage)
    const notViewableSize = getOffset(unscaledContainerSize, getStageUnscaledSize(stage))
    return getRectangleCenterPosition(notViewableSize)
}

export const getScrollableLimits = (): Rectangle => new RectangleDefinition(getMapSize(), getCenteredMapPosition()).toRectangle()