import {ElysiumDialog} from "./ElysiumDialog";
import {ActionsPanel} from "./ActionsPanel";
import {
    Color,
    FLEX_CENTERED_CONTAINER,
    FontSize,
    fontSizeToPixels,
    FontWeight,
    Spacing
} from "../Constants/StylesConstants";
import styled from "styled-components";
import {ReactNode, useCallback, useState} from "react";
import {CancelButton, ThemeButton} from "./StyledButton";
import {doWithMounted} from "../Utils/ComponentUtils";

const MessageContainer = styled.div`
    ${FLEX_CENTERED_CONTAINER}
    flex-direction: column;
    padding: ${Spacing.THIRD}
`

const FinalizeButton = styled(ThemeButton)`
    margin: 0 ${Spacing.SECOND};
`

const FinalizeNoButton = styled(CancelButton)`
    margin: 0 ${Spacing.SECOND};
`

export const ConfirmationMainText = styled.div`
    text-align: center;
    margin: ${Spacing.FIRST} 0;
    font-size: ${fontSizeToPixels(FontSize.MEDIUM)};
`

export const ConfirmationHighlightedText = styled.span`
    font-weight: ${FontWeight.EXTRA_LARGE};
    color: ${Color.GREEN_DARK};
`

const ConfirmationDialog = (
    {
        message, showConfirmation,
        yesButtonText = 'Yes', noButtonText = 'No',
        onConfirm, onHide
    }: {
        message: ReactNode, showConfirmation: boolean,
        yesButtonText?: string, noButtonText?: string,
        onConfirm: () => Promise<void>, onHide: () => void
    }) => {
    const [finalizeError, setFinalizeError] = useState(false)
    const [performingFinalize, setPerformingFinalize] = useState(false)
    const [finalizeErrorMessage, setFinalizeErrorMessage] = useState<string | undefined>()

    const onYes = useCallback(() => doWithMounted(isMounted => {
        setFinalizeError(false);
        setPerformingFinalize(true)
        onConfirm().then(() => isMounted.isMounted && onHide()).catch((error) => {
            isMounted.isMounted && setFinalizeError(true)
            const message = (error as Error)?.message
            isMounted.isMounted && !!message && setFinalizeErrorMessage(message)
        }).finally(() => isMounted.isMounted && setPerformingFinalize(false))
    }), [onConfirm, onHide])

    return <ElysiumDialog
        visible={showConfirmation} dismissableMask={!performingFinalize} onHide={onHide} position="bottom">
        <MessageContainer>
            {message}
        </MessageContainer>
        <ActionsPanel encounteredError={finalizeError} errorMessage={finalizeErrorMessage} actionsList={<>
            <FinalizeButton label={yesButtonText}
                            disabled={performingFinalize}
                            loading={performingFinalize} onClick={onYes}/>
            <FinalizeNoButton label={noButtonText} disabled={performingFinalize} onClick={onHide}/>
        </>}/>
    </ElysiumDialog>
}

export default ConfirmationDialog