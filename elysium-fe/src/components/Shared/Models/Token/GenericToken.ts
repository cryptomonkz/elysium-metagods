import {ItemType} from "../../State/GreatHall/ItemType";
import {Trait} from "./Trait";

export abstract class GenericToken {
    public tokenId: number
    public name: string
    public trait: Trait
    public type: ItemType

    protected constructor(tokenId: number, name: string, trait: Trait, type: ItemType) {
        this.tokenId = tokenId
        this.name = name
        this.trait = trait
        this.type = type
    }
}