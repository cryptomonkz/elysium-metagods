import { SCALE_LIMITS } from "../Constants/ZoomConstants"

const getNewScale = (zoomLevel: number): number => SCALE_LIMITS.MIN + zoomLevel * (SCALE_LIMITS.MAX - SCALE_LIMITS.MIN)

const isScaleBigger = (first: number, second: number) => first.toFixed(2) >= second.toFixed(2)

const isScaleLess = (first: number, second: number) => first.toFixed(2) <= second.toFixed(2)

export const shouldScale = (previousScale: number, newScale: number): boolean => !!previousScale && !!newScale && previousScale !== newScale

export const getNewScaleWithinLimits = (zoomLevel: number): number => {
    let newScale = getNewScale(zoomLevel)
    if (newScale) {
        if (isScaleBigger(newScale, SCALE_LIMITS.MAX)) {
            newScale = SCALE_LIMITS.MAX
        }
        if (isScaleLess(newScale, SCALE_LIMITS.MIN)) {
            newScale = SCALE_LIMITS.MIN
        }
    }
    return newScale
}