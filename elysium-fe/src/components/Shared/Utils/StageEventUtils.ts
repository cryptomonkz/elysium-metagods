import {Sizes} from "../Models/Map/Sizes";
import {getOffset, getRectangleCenterPosition, scaleDownCoordinates} from "./CoordinateUtils";
import {getStageScale, getStageScaledSize} from "./StageUtils";

export const getStageMouseEventPositions = (mouseEvent: any): Sizes => {
    const touchesList = mouseEvent?.evt?.touches
    if (touchesList?.length) {
        const targetRectangle = mouseEvent?.evt?.target?.getBoundingClientRect()
        const targetPosition = new Sizes(targetRectangle?.x, targetRectangle?.y)
        return new Sizes(touchesList[0]?.clientX - targetPosition.x, touchesList[0]?.clientY - targetPosition.y)
    }
    return new Sizes(mouseEvent?.evt?.offsetX, mouseEvent?.evt?.offsetY)
};

const getStageCenterForMouseEvent = (stage: any): Sizes => getRectangleCenterPosition(getStageScaledSize(stage))

export const getRelativeUnscaledMouseEventPosition = (stage: any, event: any): Sizes => {
    const positionRelativeToCenter = getOffset(getStageCenterForMouseEvent(stage), getStageMouseEventPositions(event))
    return scaleDownCoordinates(positionRelativeToCenter, getStageScale(stage))
}

export const getAbsoluteUnscaledMouseEventPosition = (stage: any, event: any): Sizes => {
    return scaleDownCoordinates(getStageMouseEventPositions(event), getStageScale(stage))
}