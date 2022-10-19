import {useSelector} from "react-redux";
import {ApplicationState} from "../State/ApplicationState";
import {MutableRefObject, useEffect, useRef} from "react";
import {Toast} from 'primereact/toast';
import {ToastMessage} from "../State/Toast/ToastState";
import styled from "styled-components";
import {
    AbsoluteBorderRadius,
    BRIGHTNESS_FILTER,
    Color,
    FLEX_CENTERED_CONTAINER,
    GRADIENT,
    Spacing
} from "../Constants/StylesConstants";
import {device} from "../Constants/MediaQueries";

const StyledToast = styled(Toast)`
    .p-toast-message-icon {
        display: none;
    }
    .p-toast-message-content {
        ${FLEX_CENTERED_CONTAINER}
        align-items: flex-start;
    }
    .p-toast-icon-close-icon::before {
        padding: ${Spacing.FIRST};
        border-radius: ${AbsoluteBorderRadius.TINY};
        color: ${Color.WHITE}; 
        background: ${GRADIENT.CANCEL};
        
    }
    .p-toast-icon-close {
        border-radius: 0 !important;
        margin-left: ${Spacing.SECOND};
        &:hover, &:focus, &:active, &:enabled:hover, &:enabled:active {
            background: none !important;
            box-shadow: none !important;
        }
        &:hover, &:enabled:hover {
            ${BRIGHTNESS_FILTER}
        }
    }
    .p-toast-message-success {
        color: ${Color.WHITE} !important;
        background: ${Color.BACKGROUND_LIGHT} !important;
        border: solid ${Color.BACKGROUND_DARKER} !important;
        border-width: 0 0 0 6px !important;
    }
    opacity: 1;
    width: 25rem;
    @media ${device.tablet} {
        width: 35rem;
    }
`

const ToastContentContainer = styled.div`
    flex: 1;
    ${FLEX_CENTERED_CONTAINER}
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`

const ElysiumToast = () => {
    const toast = useRef()

    const toastMessage = useSelector<ApplicationState, ToastMessage | undefined>(applicationState => (
        applicationState?.toastState?.toastMessage
    ))
    useEffect(() => {
        const toastInstance = toast?.current as any
        toastInstance && toastMessage && toastInstance?.show({
            severity: toastMessage.severity,
            content: <ToastContentContainer>{toastMessage.content}</ToastContentContainer>,
            closable: true, sticky: true
        })
    }, [toastMessage])

    return <StyledToast ref={toast as MutableRefObject<any>}/>
}

export default ElysiumToast