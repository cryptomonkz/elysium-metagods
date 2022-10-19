export default class AuthenticationState {
    performingAuthentication: boolean

    constructor(performingAuthentication: boolean) {
        this.performingAuthentication = performingAuthentication;
    }
}

export const getDefaultAuthenticationState = (): AuthenticationState => ({performingAuthentication: false})