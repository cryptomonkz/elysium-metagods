import AuthenticationState, {getDefaultAuthenticationState} from "./AuthenticationState";
import {ActionEvent, ApplicationState, signalAction} from "../ApplicationState";

const signalAuthentication = (performingAuthentication: boolean) => signalAction('SET_AUTHENTICATION', {performingAuthentication})
export const signalAuthenticationStart = () => signalAuthentication(true)
export const signalAuthenticationEnd = () => signalAuthentication(false)

export const getAuthenticationState = (applicationState: ApplicationState): AuthenticationState => applicationState?.authenticationState || getDefaultAuthenticationState()

export default function authenticationReducer(
    state: AuthenticationState = getDefaultAuthenticationState(),
    action: ActionEvent<AuthenticationState>
): AuthenticationState {
    switch (action?.type) {
        case 'SET_AUTHENTICATION':
            const authenticationState = action.payload as AuthenticationState || getDefaultAuthenticationState()
            return {...state, ...authenticationState}
        default:
            return state
    }
}