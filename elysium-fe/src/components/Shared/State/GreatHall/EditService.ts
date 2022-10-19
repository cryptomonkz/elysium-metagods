import EditState, {EditOperation} from "./EditState";
import {AddChangeType} from "./GreatHallService";
import {DragArea} from "./DragItem";
import {GenericToken} from "../../Models/Token/GenericToken";
import {getAcceptedPairType, ItemType} from "./ItemType";
import {extractParentToken, isPairedAreaForType} from "./AreaType";

const buildTokenKey = (token: GenericToken) => `${token.type}_${token.tokenId}`

const isMovedBack = (destination: DragArea, previousSource?: DragArea): boolean => !!previousSource &&
    previousSource.area === destination.area

const buildEditOperation = (change: AddChangeType, previousSource?: DragArea): EditOperation => ({
    token: change.token,
    source: previousSource || change.source,
    destination: change.destination,
    ignorable: change.ignorable
})

export const computeEditStateWithChange = (state: EditState, change: AddChangeType): EditState => {
    const currentChanges = state.editOperations
    const tokenKey = buildTokenKey(change.token)
    const previousSource = currentChanges.get(tokenKey)?.source
    isMovedBack(change.destination, previousSource) ? currentChanges.delete(tokenKey) :
        currentChanges.set(tokenKey, buildEditOperation(change, previousSource))
    return { ...state, editOperations: currentChanges }
}

export const isPairedAreaOperation = (operation: EditOperation): boolean => {
    switch (getAcceptedPairType(operation.token.type)) {
        case ItemType.GOD:
            return isPairedAreaForType(operation.destination.area, ItemType.GOD)
        default:
            return false
    }
}

export const getPairedAreaToken = (operation: EditOperation): GenericToken => {
    if (isPairedAreaForType(operation.destination.area, ItemType.GOD)) {
        return extractParentToken(operation.destination.area, ItemType.GOD)
    }
    throw new Error("Operation is not related to a paired area")
}

export const operationsToTokens = (operations: EditOperation[]): GenericToken[] => operations
    .map(operation => operation.token)

export const findOperationsByType = (operations: EditOperation[], type: ItemType): EditOperation[] => operations
    .filter(operation => operation.token.type === type)