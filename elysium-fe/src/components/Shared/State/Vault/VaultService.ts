import {getVaultData} from "../../Service/AggregationService";
import VaultState, {getDefaultVaultState} from "./VaultState";
import {ActionEvent, ApplicationState, signalAction} from "../ApplicationState";

export const signalVaultData = (vaultState: VaultState) => signalAction('SET_VAULT_DATA', vaultState)

export const refreshVaultState = (account: string) => getVaultData(account).then(signalVaultData)

export const getVaultStateFromApplication = (applicationState: ApplicationState): VaultState => applicationState?.vaultState || getDefaultVaultState()

export default function vaultReducer(
    state: VaultState = getDefaultVaultState(),
    action: ActionEvent<VaultState>): VaultState {
    switch (action?.type) {
        case 'SET_VAULT_DATA':
            const vaultState = action.payload as VaultState || getDefaultVaultState()
            return { ...state, ...vaultState }
        default:
            return state
    }
}