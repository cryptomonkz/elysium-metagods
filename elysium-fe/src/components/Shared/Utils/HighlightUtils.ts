import {Sizes} from "../Models/Map/Sizes"

export const buildSelectablePath = (coordinatesList: Sizes[] = []): string => `M ${coordinatesList.map(coordinates => `${coordinates.x} ${coordinates.y}`).join(' L ')} Z`