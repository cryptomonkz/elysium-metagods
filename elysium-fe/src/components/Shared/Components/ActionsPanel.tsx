import styled from "styled-components";
import {Color, FLEX_CENTERED_CONTAINER, Spacing} from "../Constants/StylesConstants";
import {ReactNode, useCallback} from "react";
import {ThemeButton} from "./StyledButton";

const ActionsPanelContainer = styled.div`
    margin: ${Spacing.SECOND} 0;
    ${FLEX_CENTERED_CONTAINER}
    flex-direction: column;
`

const ActionsList = styled.div`
    margin-top: ${Spacing.FIRST};
    ${FLEX_CENTERED_CONTAINER}
`

const ErrorContainer = styled.div`
    ${FLEX_CENTERED_CONTAINER}
    color: ${Color.LIGHT_RED};
`

const ActionButton = styled(ThemeButton)`
    margin: ${Spacing.THIRD};
`

export const ActionTrigger = ({currentAction, isDisabled = false, actionInProgress, title, onClick, children}: {
    currentAction: string, isDisabled?: boolean, actionInProgress?: string,
    title: string, onClick: (action: string) => void, children?: ReactNode
}) => {
    const startAction = useCallback(() => onClick(currentAction), [currentAction, onClick])
    return <ActionButton disabled={isDisabled || !!actionInProgress} label={title}
                         loading={actionInProgress === currentAction} onClick={startAction}>
        {children}
    </ActionButton>
}

export const ActionsPanel = ({encounteredError = false, errorMessage, actionsList}: {
    encounteredError?: boolean, errorMessage?: string, actionsList: ReactNode
}) => {
    return <ActionsPanelContainer>
        {encounteredError && <ErrorContainer>{errorMessage || 'Failed to apply the changes.'}</ErrorContainer>}
        <ActionsList>
            {actionsList}
        </ActionsList>
    </ActionsPanelContainer>
}