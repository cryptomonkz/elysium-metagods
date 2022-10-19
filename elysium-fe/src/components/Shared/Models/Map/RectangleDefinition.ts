import {Rectangle} from "./Rectangle";
import {Sizes} from "./Sizes";
import {addOffset} from "../../Utils/CoordinateUtils";

export class RectangleDefinition {
    public size: Sizes
    public position: Sizes

    public constructor(size: Sizes, position: Sizes) {
        this.size = size
        this.position = position
    }

    public toRectangle = (): Rectangle => new Rectangle(this.position, addOffset(this.position, this.size))
}