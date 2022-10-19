import {ItemType} from "../State/GreatHall/ItemType";
import {GODS_ADDRESS, WEAPONS_ADDRESS} from "../Constants/ContractConstants";

export const getCollectionAddressForType = (itemType: ItemType): string => {
    switch (itemType) {
        case ItemType.GOD:
            return GODS_ADDRESS
        case ItemType.WEAPON:
            return WEAPONS_ADDRESS
        default:
            throw new Error("Item type has not been defined")
    }
}