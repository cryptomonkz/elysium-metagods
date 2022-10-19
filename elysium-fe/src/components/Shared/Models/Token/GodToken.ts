import {GenericToken} from "./GenericToken";
import {ItemType} from "../../State/GreatHall/ItemType";
import {Trait} from "./Trait";

export class GodToken extends GenericToken {
    constructor(tokenId: number, name: string, trait: Trait) {
        super(tokenId, name, trait, ItemType.GOD);
    }
}