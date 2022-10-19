import {GenericToken} from "../Models/Token/GenericToken";
import {StakeMode} from "../Models/Token/StakeMode";
import {ItemType} from "../State/GreatHall/ItemType";
import {Color} from "../Constants/StylesConstants";
import {Trait} from "../Models/Token/Trait";
import {StakedToken} from "../Models/Token/StakedToken";

export const isStakedTokenLinked = (stakedToken: StakedToken): boolean => !!stakedToken.pairedToken

export const isSearchedStakeType = (searched: StakeMode, toCheck: StakeMode): boolean => !!toCheck && toCheck === searched

export const isTokenStakedForMode = (stakedToken: StakedToken, mode: StakeMode): boolean => isSearchedStakeType(mode, stakedToken.stakeType)

export const findTokensByType = (tokens: GenericToken[], type: ItemType) => tokens.filter(token => token.type === type)

export const findToken = (tokens: GenericToken[], toSearch: GenericToken): GenericToken | undefined => tokens
    .find(token => token.type === toSearch.type && token.tokenId === toSearch.tokenId)

export const buildTokenDetails = (token: GenericToken): string => `${token.name} #${token.tokenId}`

export const buildTokenImage = (token: GenericToken): string => {
    switch (token.type) {
        case ItemType.GOD:
            return `https://storage.googleapis.com/elysium-metagods-gods/image-small/${token.tokenId}.png`
        case ItemType.WEAPON:
            return `https://storage.googleapis.com/elysium-metagods-weapons/images-small/${token.tokenId}.png`;
        default:
            throw new Error("Token type has not been defined")
    }
}

export const getDefaultTokenImage = (token: GenericToken): string | undefined => {
    switch (token.type) {
        case ItemType.GOD:
            return undefined;
        case ItemType.WEAPON:
            return 'https://storage.googleapis.com/elysium-metagods-weapons/weapons_preview_small.gif';
        default:
            throw new Error("Default token image has not been defined")
    }
}

export const getTokenTraitColor = (token: GenericToken): string | undefined => {
    switch (token.type) {
        case ItemType.GOD:
        case ItemType.WEAPON:
            return !!token.trait ? getColorForTrait(token.trait) : undefined
        default:
            return undefined
    }
}

export const getColorForTrait = (tokenTrait: Trait): string => {
    switch (tokenTrait) {
        case Trait.PURIFICATION:
            return Color.PURIFICATION_TRAIT_COLOR
        case Trait.CHAOS:
            return Color.CHAOS_TRAIT_COLOR
        case Trait.AURORA:
            return Color.AURORA_TRAIT_COLOR
        case Trait.CONJUNCTION:
            return Color.CONJUNCTION_TRAIT_COLOR
        case Trait.REFLECTION:
            return Color.REFLECTION_TRAIT_COLOR
        case Trait.ASTRAL:
            return Color.ASTRAL_TRAIT_COLOR
        case Trait.AGNO:
            return Color.AGNO_TRAIT_COLOR
        default:
            return Color.TRANSPARENT
    }
}

