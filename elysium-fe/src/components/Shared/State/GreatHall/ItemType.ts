import {AreaType} from "./AreaType";

export enum ItemType {
    GOD = 'GOD', WEAPON = 'WEAPON'
}

export const getTypeDisplayedName = (type: ItemType): string => {
    switch (type) {
        case ItemType.GOD:
            return 'God'
        case ItemType.WEAPON:
            return 'Weapon'
        default:
            throw new Error("Type has not been defined")
    }
}

export const shouldComputeClaimWithPair = (type: ItemType): boolean => {
    switch (type) {
        case ItemType.GOD:
            return true
        default:
            return false
    }
}

export const getAcceptedPairType = (type: ItemType): ItemType => {
    switch (type) {
        case ItemType.GOD:
            return ItemType.WEAPON
        case ItemType.WEAPON:
            return ItemType.GOD
        default:
            throw new Error("Type has not been defined")
    }
}

export const getTokenSafeRemovalArea = (itemType: ItemType): AreaType => {
    switch (itemType) {
        case ItemType.WEAPON:
            return AreaType.UNLINKED_STAKED_WEAPONS
        default:
            throw new Error("Safe removal area has not been defined")
    }
}