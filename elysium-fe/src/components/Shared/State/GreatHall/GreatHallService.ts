import {ActionEvent, ApplicationState, ApplicationStore, signalAction} from "../ApplicationState";
import GreatHallState from './GreatHallState';
import {DragArea, DragItem} from "./DragItem";
import GreatHallDataState, {buildGreatHallDataState, getDefaultDataState} from "./GreatHallDataState";
import {EditMode} from "./EditMode";
import {computeStateAfterDrop} from "./GreatHallDataService";
import EditState, {EditOperation} from "./EditState";
import {copyObject} from "../../Utils/JSONUtils";
import {computeEditStateWithChange} from "./EditService";
import {GenericToken} from "../../Models/Token/GenericToken";
import ClaimState, {getDefaultClaimState} from "./ClaimState";
import {addTokensToClaim, refreshClaimState, removeTokensToClaim} from "./ClaimService";
import {refreshVaultState} from "../Vault/VaultService";
import {StakingStatusResponse} from "../../Service/PublicWalletService";

export type DropType = { item: DragItem; destination: DragArea; }
export type AddChangeType = { token: GenericToken; source: DragArea; destination: DragArea; ignorable: boolean }

export const getGreatHallState = (applicationState?: ApplicationState): GreatHallState | undefined => applicationState?.greatHallState

export const getEditStateFromState = (applicationState?: ApplicationState): EditState | undefined => getGreatHallState(applicationState)?.editState
export const getEditState = (): EditState | undefined => getEditStateFromState(ApplicationStore?.getState())

export const getEditModeFromState = (applicationState?: ApplicationState): EditMode | undefined => getEditStateFromState(applicationState)?.editMode
export const getEditMode = (): EditMode | undefined => getEditModeFromState(ApplicationStore?.getState())

export const getEditOperations = (): EditOperation[] => Array.from((getEditState()?.editOperations || new Map<string, EditOperation>()).values())
export const getRelevantEditOperations = (): EditOperation[] => getEditOperations().filter(operation => !operation.ignorable)

export const getDataStateFromState = (applicationState?: ApplicationState): GreatHallDataState | undefined => getGreatHallState(applicationState)?.dataState

export const refreshTokenRelatedState = (account: string) => {
    refreshVaultState(account).finally()
    refreshClaimState(account).finally()
}

export const resetGreatHall = () => signalAction('RESET_GREAT_HALL', {})
export const cancelEdit = () => signalAction('CANCEL_EDIT', {})
export const confirmEdit = () => signalAction('CONFIRM_EDIT', {})
export const signalEditMode = (editMode: EditMode) => signalAction('CHANGE_EDIT', editMode)
export const signalEditChange = (
    token: GenericToken, source: DragArea, destination: DragArea, ignorable: boolean
) => setTimeout(() => signalAction('ADD_CHANGE', { token, source, destination, ignorable }))
export const signalDrop = (item: DragItem, destination: DragArea) => signalAction('DROP', {item, destination})
export const signalBuildGreatHallState = (walletTokens: StakingStatusResponse) => signalAction('BUILD_DATA_STATE', buildGreatHallDataState(walletTokens))
export const signalRefreshClaims = (claimState: ClaimState) => signalAction('REFRESH_CLAIMS', claimState)
export const signalClaimTokens = (tokens: GenericToken[]) => signalAction('CLAIM_TOKENS', tokens)
export const signalUnclaimTokens = (tokens: GenericToken[]) => signalAction('UNCLAIM_TOKENS', tokens)
export const rollbackClaims = () => signalAction('ROLLBACK_CLAIMS', {})

export default function greatHallReducer(state: GreatHallState = {
    dataState: getDefaultDataState(), claimState: getDefaultClaimState()
}, action: ActionEvent<GreatHallDataState | DropType | EditMode | AddChangeType | ClaimState | GenericToken[]>): GreatHallState {
    switch (action?.type) {
        case 'BUILD_DATA_STATE':
            const dataState = action.payload as GreatHallDataState
            return {...state, dataState: dataState || getDefaultDataState()}
        case 'DROP':
            const dropPayload = action.payload as DropType
            const newDataState = computeStateAfterDrop(state.dataState, dropPayload.item, dropPayload.destination)
            return {...state, dataState: newDataState}
        case 'CHANGE_EDIT':
            const editMode = action.payload as EditMode
            return {...state, editState: new EditState(editMode, copyObject(state.dataState))}
        case 'CANCEL_EDIT':
            return {...state, dataState: state?.editState?.initialData || state.dataState, editState: undefined}
        case 'CONFIRM_EDIT':
            return {...state, editState: undefined}
        case 'ADD_CHANGE':
            const change = action.payload as AddChangeType
            const newEditState = state.editState ? computeEditStateWithChange(state.editState, change) : state.editState
            return {...state, editState: newEditState}
        case 'RESET_GREAT_HALL':
            return { ...state, dataState: getDefaultDataState(), editState: undefined }
        case 'REFRESH_CLAIMS':
            const beforeRefresh = state.claimState
            const claimState = action.payload as ClaimState || getDefaultClaimState()
            return {...state, claimState: { yields: claimState.yields, tokensToClaim: beforeRefresh.tokensToClaim }}
        case 'CLAIM_TOKENS':
            const tokensToClaim = action.payload as GenericToken[]
            return { ...state, claimState: addTokensToClaim(state.claimState, tokensToClaim)  }
        case 'UNCLAIM_TOKENS':
            const tokensToUnclaim = action.payload as GenericToken[]
            return { ...state, claimState: removeTokensToClaim(state.claimState, tokensToUnclaim)  }
        case 'ROLLBACK_CLAIMS':
            return { ...state, editState: undefined, claimState: {yields: state.claimState.yields, tokensToClaim: []}}
        default:
            return state
    }
}