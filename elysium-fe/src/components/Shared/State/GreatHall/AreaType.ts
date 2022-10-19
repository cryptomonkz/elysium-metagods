import {StakeMode} from "../../Models/Token/StakeMode";
import {GenericToken} from "../../Models/Token/GenericToken";
import {ItemType} from "./ItemType";
import {DragArea} from "./DragItem";
import {Trait} from "../../Models/Token/Trait";

export enum AreaType {
    UNSTAKED_GODS = 'UNSTAKED_GODS',
    UNSTAKED_WEAPONS = 'UNSTAKED_WEAPONS',
    STAKED_GODS_1 = 'STAKED_GODS_1',
    STAKED_GODS_2 = 'STAKED_GODS_2',
    STAKED_GODS_3 = 'STAKED_GODS_3',
    UNLINKED_STAKED_WEAPONS = 'UNLINKED_STAKED_WEAPONS',
}

const PAIRED_PREFIX = 'PAIRED_'

const tokenToDetails = (token: GenericToken): string => `${token.tokenId}_${token.name}_${token.type}_${token.trait}`
const tokenFromDetails = (details: string): GenericToken => {
    const components = details.split("_")
    return {
        tokenId: Number(components[0]),
        name: components[1],
        type: ItemType[components[2] as keyof typeof ItemType],
        trait: Trait[components[3] as keyof typeof Trait]
    }
}

const isPairedArea = (area: string): boolean => area.startsWith(PAIRED_PREFIX)

const buildPairedAreaPrefix = (tokenType: ItemType): string => `${PAIRED_PREFIX}${tokenType}_`

export const extractParentToken = (area: string, tokenType: ItemType): GenericToken => tokenFromDetails(area.replace(buildPairedAreaPrefix(tokenType), ''))

export const isPairedAreaForType = (area: string, tokenType: ItemType): boolean => area.startsWith(buildPairedAreaPrefix(tokenType))

export const buildPairedArea = (parentToken: GenericToken) => `${buildPairedAreaPrefix(parentToken.type)}${tokenToDetails(parentToken)}`

export const doesAreaRequirePairedTokenRemoval = (area: string) => [AreaType.UNSTAKED_GODS.toString()].includes(area)

export const getStakedGodsArea = (mode: StakeMode): AreaType => {
    switch (mode) {
        case StakeMode.FIRST:
            return AreaType.STAKED_GODS_1
        case StakeMode.SECOND:
            return AreaType.STAKED_GODS_2
        case StakeMode.THIRD:
            return AreaType.STAKED_GODS_3
        default:
            throw new Error("Mode has not been defined")
    }
}

export const getStakeTypeForArea = (area: string): StakeMode => {
    switch (area) {
        case AreaType.STAKED_GODS_2:
            return StakeMode.SECOND
        case AreaType.STAKED_GODS_3:
            return StakeMode.THIRD
        case AreaType.STAKED_GODS_1:
        default:
            return StakeMode.FIRST
    }
}

export const getDragArea = (area: string): DragArea => ({ area, isPairedArea: isPairedArea(area) })

export const isUnstakedArea = (area: DragArea): boolean => [
    AreaType.UNSTAKED_GODS.toString(), AreaType.UNSTAKED_WEAPONS.toString()
].includes(area.area)

export const isStakedArea = (area: DragArea): boolean => (area.isPairedArea && isPairedAreaForType(area.area, ItemType.GOD)) || [
    AreaType.STAKED_GODS_1.toString(),
    AreaType.STAKED_GODS_2.toString(),
    AreaType.STAKED_GODS_3.toString(),
    AreaType.UNLINKED_STAKED_WEAPONS.toString(),
].includes(area.area)