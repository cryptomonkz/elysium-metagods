import {Sizes} from "../Models/Map/Sizes"
import {TILE_SIZE} from "./TileConstants"

export const DEFAULT_TILE_SELECTABLE_PATH: Sizes[] = [
    new Sizes(TILE_SIZE.x / 2., 0),
    new Sizes(TILE_SIZE.x, TILE_SIZE.y / 2.),
    new Sizes(TILE_SIZE.x / 2., TILE_SIZE.y),
    new Sizes(0, TILE_SIZE.y / 2.)
]

