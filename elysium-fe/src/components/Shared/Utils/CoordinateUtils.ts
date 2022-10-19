import {Rectangle} from "../Models/Map/Rectangle";
import {Sizes} from "../Models/Map/Sizes";

export const getOffset = (start?: Sizes, end?: Sizes): Sizes => {
    const offsetX = (end?.x || 0) - (start?.x || 0)
    const offsetY = (end?.y || 0) - (start?.y || 0)
    return new Sizes(offsetX, offsetY)
}

export const addOffset = (base?: Sizes, offset?: Sizes): Sizes => {
    const finalX = (base?.x || 0) + (offset?.x || 0)
    const finalY = (base?.y || 0) + (offset?.y || 0)
    return new Sizes(finalX, finalY)
}

export const addOffsetToPath = (path: Sizes[] = [], offset?: Sizes): Sizes[] => path.map(coordinates => addOffset(coordinates, offset))

export const multiplyCoordinates = (coordinates: Sizes, multiplier: Sizes): Sizes => new Sizes(coordinates?.x * multiplier?.x, coordinates?.y * multiplier?.y)

export const divideCoordinates = (coordinates: Sizes, divider: Sizes): Sizes => new Sizes(coordinates?.x / divider?.x, coordinates?.y / divider?.y)

export const singleMultiplyCoordinates = (coordinates: Sizes, multiplier: number): Sizes => multiplyCoordinates(coordinates, new Sizes(multiplier, multiplier))

export const singleDivideCoordinates = (coordinates: Sizes, divider: number): Sizes => divideCoordinates(coordinates, new Sizes(divider, divider))

export const scaleUpCoordinates = (coordinates: Sizes, scale: Sizes): Sizes => multiplyCoordinates(coordinates, scale)

export const scaleDownCoordinates = (coordinates: Sizes, scale: Sizes): Sizes => divideCoordinates(coordinates, scale)

export const getCoordinatesWithLimits = (coordinates: Sizes, min?: Sizes, max?: Sizes) => {
    const withinLimits = new Sizes(coordinates.x, coordinates.y)
    if (min) {
        withinLimits.x = withinLimits.x < min.x ? min.x : withinLimits.x
        withinLimits.y = withinLimits.y < min.y ? min.y : withinLimits.y
    }
    if (max) {
        withinLimits.x = withinLimits.x > max.x ? max.x : withinLimits.x
        withinLimits.y = withinLimits.y > max.y ? max.y : withinLimits.y
    }
    return withinLimits
}

export const doesPathIntersectRectangle = (path: Sizes[] = [], rectangle: Rectangle): boolean => {
    return path.some(point => point.x > rectangle.topLeft.x && point.x < rectangle.bottomRight.x &&
        point.y > rectangle.topLeft.y && point.y < rectangle.bottomRight.y)
}

export const getCenteredRectanglePosition = (size: Sizes): Sizes => singleDivideCoordinates(size, -2)

export const getRectangleCenterPosition = (size: Sizes): Sizes => singleDivideCoordinates(size, 2)
