import { MapHighlightableArea } from "../../Models/Map/MapHighlightableArea"
import { TileData } from "../../Models/Map/TileData"
import {Sizes} from "../../Models/Map/Sizes";

export default class MapState {
    public mapSize: Sizes = new Sizes()
    public landTiles: Map<string, TileData> = new Map<string, TileData>()
    public highlightableAreas: MapHighlightableArea[] = []

    public constructor(mapSize: Sizes = new Sizes(), landTiles: Map<string, TileData> = new Map<string, TileData>(), highlightableAreas: MapHighlightableArea[] = []) {
        this.mapSize = mapSize
        this.landTiles = landTiles
        this.highlightableAreas = highlightableAreas
    }
}