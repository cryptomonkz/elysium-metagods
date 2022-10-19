import { Sizes } from "./Sizes";

export class Rectangle {
    public topLeft: Sizes
    public bottomRight: Sizes

    public constructor(topLeft: Sizes, bottomRight: Sizes) {
        this.topLeft = topLeft
        this.bottomRight = bottomRight
    }
}