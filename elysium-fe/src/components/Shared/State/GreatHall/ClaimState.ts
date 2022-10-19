import {ItemType} from "./ItemType";
import {GenericToken} from "../../Models/Token/GenericToken";

export default class ClaimState {
    public yields: Map<ItemType, Map<number, number>>
    public tokensToClaim: GenericToken[] = []

    public constructor(yields: Map<ItemType, Map<number, number>>, tokensToClaim: GenericToken[]) {
        this.yields = yields
        this.tokensToClaim = tokensToClaim
    }
}

export const getDefaultYields = () => Object.keys(ItemType).reduce(
    (currentState, type) => currentState.set(type as ItemType, new Map<number, number>()),
    new Map<ItemType, Map<number, number>>()
)

export const getDefaultClaimState = (): ClaimState => ({ yields: getDefaultYields(), tokensToClaim: [] })