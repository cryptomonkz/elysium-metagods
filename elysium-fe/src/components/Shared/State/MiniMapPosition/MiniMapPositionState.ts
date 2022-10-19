import { Sizes } from "../../Models/Map/Sizes"

export default class MiniMapPositionState {
    public position?: Sizes

    public constructor(position?: Sizes) {
        this.position = position
    }
}