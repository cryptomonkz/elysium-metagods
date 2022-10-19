import {GenericToken} from "./GenericToken";
import {ItemType} from "../../State/GreatHall/ItemType";
import {Trait} from "./Trait";

export class WeaponToken extends GenericToken {
    constructor(tokenId: number, name: string, trait: Trait) {
        super(tokenId, name, trait, ItemType.WEAPON);
    }
}