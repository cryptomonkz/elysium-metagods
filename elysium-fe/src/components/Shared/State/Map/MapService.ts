import { MapHighlightableArea } from "../../Models/Map/MapHighlightableArea";
import { TileData } from "../../Models/Map/TileData";
import {ActionEvent, ApplicationStore, signalAction} from "../ApplicationState";
import MapState from './MapState';
import {Sizes} from "../../Models/Map/Sizes";

export const getMapState = (): MapState | undefined => ApplicationStore?.getState()?.mapState

export const getMapSize = (): Sizes => getMapState()?.mapSize || new Sizes()

export const getMapTiles = (): Map<string, TileData> => getMapState()?.landTiles || new Map<string, TileData>()

export const signalMapSize = (mapSize: Sizes = new Sizes()) => signalAction('MAP_SIZE', { mapSize })

export const signalLandTiles = (landTiles: Map<string, TileData> = new Map<string, TileData>()) => signalAction('LAND_TILES', { landTiles })

export const signalHighlightableAreas = (highlightableAreas: MapHighlightableArea[] = []) => signalAction('HIGHLIGHTABLE_AREAS', { highlightableAreas })

export default function mapReducer(state: MapState = { mapSize: new Sizes(), landTiles: new Map<string, TileData>(), highlightableAreas: [] }, action: ActionEvent<MapState>): MapState {
    switch (action?.type) {
        case 'MAP_SIZE':
            return {
                ...state,
                mapSize: action?.payload?.mapSize || new Sizes()
            }
        case 'LAND_TILES':
            return {
                ...state,
                landTiles: action?.payload?.landTiles || new Map<string, TileData>()
            }
        case 'HIGHLIGHTABLE_AREAS':
            return {
                ...state,
                highlightableAreas: action?.payload?.highlightableAreas || []
            }
        default:
            return state
    }
}