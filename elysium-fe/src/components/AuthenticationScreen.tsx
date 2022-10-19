import {useSelector} from "react-redux"
import styled from "styled-components"
import {ApplicationState} from "./Shared/State/ApplicationState"
import {FLEX_CENTERED_CONTAINER, FontSize, fontSizeToPixels, Spacing} from "./Shared/Constants/StylesConstants";
import {getAuthenticationState} from "./Shared/State/Authentication/AuthenticationService";
import {ElysiumDialog} from "./Shared/Components/ElysiumDialog";
import {LargeSpinner} from "./Shared/Components/ElysiumSpinner";

const AuthenticationMessage = styled.div`
    ${FLEX_CENTERED_CONTAINER}
    flex-direction: column;
    padding: ${Spacing.THIRD};
    font-size: ${fontSizeToPixels(FontSize.MEDIUM)};
`

const Disclaimer = styled.div`
    text-align: center
`

const AuthenticationScreen = () => {
    const performingAuthentication = useSelector<ApplicationState, boolean>(applicationState => (
        getAuthenticationState(applicationState)?.performingAuthentication || false
    ))

    return <ElysiumDialog visible={performingAuthentication} dismissableMask={false}
                          onHide={()=>{}} position="top">
        <AuthenticationMessage>
            <LargeSpinner loading={performingAuthentication}/>
            <Disclaimer>Please allow us to use your signature in order to sign you in.</Disclaimer>
        </AuthenticationMessage>
    </ElysiumDialog>
}

export default AuthenticationScreen
