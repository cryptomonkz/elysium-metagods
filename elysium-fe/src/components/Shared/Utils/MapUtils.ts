import {DEFAULT_TILE_SELECTABLE_PATH} from "../Constants/HighlightConstants";
import {TILE_SIZE} from "../Constants/TileConstants";
import {LandResponse} from "../Models/Map/LandResponse";
import {MapSelectableTile} from "../Models/Map/MapSelectableTile";
import {Sizes} from "../Models/Map/Sizes";
import {TileData} from "../Models/Map/TileData";
import {getMapSize, getMapTiles, signalHighlightableAreas, signalLandTiles} from "../State/Map/MapService";
import {buildSelectablePath} from "./HighlightUtils";
import {addOffsetToPath, getCenteredRectanglePosition, getRectangleCenterPosition} from "./CoordinateUtils";
import {DEFAULT_HIGHLIGHT_PROPERTIES} from "../Constants/StylesConstants";
import {SelectableArea} from "../Models/Map/SelectableArea";

const buildTileKey = (coordinates: Sizes): string => `${coordinates.x}-${coordinates.y}`

const getTileCenter = () => getRectangleCenterPosition(TILE_SIZE)

const getSupposedCoordinates = (coordinates: Sizes): Sizes => {
    const tileCenter = getTileCenter()
    const offsetX = coordinates.x / tileCenter.x
    const offsetY = coordinates.y / tileCenter.y
    const supposedY = (offsetX + offsetY) / -2
    const supposedX = offsetX + supposedY
    return new Sizes(Math.round(supposedX), Math.round(supposedY))
}

const getTileActualCoordinates = (coordinates: Sizes): Sizes => {
    const tileCenter = getTileCenter()
    return new Sizes(
        (coordinates.x - coordinates.y) * tileCenter.x - tileCenter.x,
        (-coordinates.x - coordinates.y) * tileCenter.y - tileCenter.y
    )
}

const getSelectableArea = (selectableTile: MapSelectableTile): SelectableArea => {
    const actualCoordinates = getTileActualCoordinates(selectableTile.coordinates)
    const selectableArea = addOffsetToPath(DEFAULT_TILE_SELECTABLE_PATH, actualCoordinates)
    return new SelectableArea(buildSelectablePath(selectableArea), DEFAULT_HIGHLIGHT_PROPERTIES)
}

const buildTileData = (selectableTile: MapSelectableTile): TileData => new TileData(
    buildTileKey(selectableTile.coordinates),
    selectableTile.coordinates,
    getSelectableArea(selectableTile)
)

const initializeLand = (selectableTiles: MapSelectableTile[] = []) => {
    const tilesMap = selectableTiles.reduce((tilesMap, currentTile) => {
        const mappedTile = buildTileData(currentTile)
        return tilesMap.set(mappedTile.id, mappedTile)
    }, new Map<string, TileData>())
    signalLandTiles(tilesMap)
}

export const initializeMap = (landResponse: LandResponse) => {
    initializeLand(landResponse.selectableTiles)
    signalHighlightableAreas(landResponse.highlightableAreas)
}

export const getSupposedTile = (coordinates: Sizes): TileData | undefined => {
    const supposedTileId = buildTileKey(getSupposedCoordinates(coordinates))
    return getMapTiles().get(supposedTileId)
}

export const getCenteredMapPosition = (): Sizes => getCenteredRectanglePosition(getMapSize())