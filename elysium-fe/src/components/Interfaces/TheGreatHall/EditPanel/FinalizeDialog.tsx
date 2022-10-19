import React, {CSSProperties, ReactNode, useCallback, useState} from "react";
import styled from "styled-components";
import {
    DEFAULT_BUTTON_SIZE,
    FLEX_CENTERED_CONTAINER,
    FontSize,
    fontSizeToPixels,
    Spacing
} from "../../../Shared/Constants/StylesConstants";
import {doesEditModeRequireConfirmation, EditMode} from "../../../Shared/State/GreatHall/EditMode";
import {CancelButton, ThemeButton} from "../../../Shared/Components/StyledButton";
import {EditOperation} from "../../../Shared/State/GreatHall/EditState";
import {GenericToken} from "../../../Shared/Models/Token/GenericToken";
import {AreaType, isStakedArea} from "../../../Shared/State/GreatHall/AreaType";
import {
    cancelEdit,
    confirmEdit,
    getEditOperations,
    getRelevantEditOperations,
    refreshTokenRelatedState,
    rollbackClaims
} from "../../../Shared/State/GreatHall/GreatHallService";
import {changeStakeTypes, changeTokenLinks, stakeTokens, unstakeTokens} from "../../../Shared/Service/AggregationService";
import {ElysiumDialog} from "../../../Shared/Components/ElysiumDialog";
import {getPairedAreaToken, isPairedAreaOperation} from "../../../Shared/State/GreatHall/EditService";
import {doWithMounted} from "../../../Shared/Utils/ComponentUtils";
import {ActionsPanel} from "../../../Shared/Components/ActionsPanel";
import {getTokenWithTrait} from "../../../Shared/Components/TokenWithTrait";
import {getTitleForStakedGodsMode, StakeMode} from "../../../Shared/Models/Token/StakeMode";

enum FinalizeAction {
    CONFIRM, CANCEL, NONE
}

const ConfirmButton = styled(ThemeButton)`
    ${DEFAULT_BUTTON_SIZE}
    margin-bottom: ${Spacing.SECOND};
`

const RollbackButton = styled(CancelButton)`
    ${DEFAULT_BUTTON_SIZE}
    margin-left: ${Spacing.SECOND};
    margin-right: ${Spacing.THIRD};
    margin-bottom: ${Spacing.SECOND};
`

const MessageContainer = styled.div`
    ${FLEX_CENTERED_CONTAINER}
    flex-direction: column;
    padding: ${Spacing.THIRD} ${Spacing.THIRD} 0 ${Spacing.THIRD};
`

const FinalizeButton = styled(ThemeButton)`
    margin: 0 ${Spacing.SECOND};
`

const FinalizeNoButton = styled(CancelButton)`
    margin: 0 ${Spacing.SECOND};
`

const ChangeMessage = styled.li`
    margin: ${Spacing.FIRST} 0;
`

const ChangesMainText = styled.div`
    text-align: center;
    font-size: ${fontSizeToPixels(FontSize.MEDIUM)};
`

const OperationsContainer = styled.ul`
`

const RevertText = styled.div`
    text-align: center;
    font-size: ${fontSizeToPixels(FontSize.MEDIUM)};
`

const buildStakedTokenMessage = (token: GenericToken, mode: StakeMode): ReactNode => <div>
    {getTokenWithTrait(token)} will be staked in <b>{getTitleForStakedGodsMode(mode)}</b> mode
</div>

const translateOperation = (operation: EditOperation): ReactNode => {
    const token = operation.token
    if (isPairedAreaOperation(operation)) {
        return <div>
            {getTokenWithTrait(token)} will be paired with {getTokenWithTrait(getPairedAreaToken(operation))}
        </div>
    }
    switch (operation.destination.area) {
        case AreaType.UNSTAKED_GODS:
            return <div>{getTokenWithTrait(operation.token)} will be unstaked</div>
        case AreaType.UNSTAKED_WEAPONS:
            return <div>{getTokenWithTrait(token)} will be unstaked</div>
        case AreaType.STAKED_GODS_1:
            return buildStakedTokenMessage(operation.token, StakeMode.FIRST)
        case AreaType.STAKED_GODS_2:
            return buildStakedTokenMessage(operation.token, StakeMode.SECOND)
        case AreaType.STAKED_GODS_3:
            return buildStakedTokenMessage(operation.token, StakeMode.THIRD)
        case AreaType.UNLINKED_STAKED_WEAPONS:
            return isStakedArea(operation.source) ? <div>{getTokenWithTrait(token)} will be unpaired</div> :
                <div>{getTokenWithTrait(token)} will be staked separately</div>
    }
    throw new Error("The operation was not correctly defined")
}

const translateOperations = (operations: EditOperation[]): ReactNode[] => {
    return operations.map(operation => translateOperation(operation))
}

const confirmEditForMode = (
    account: string, editMode: EditMode,
    onConfirm: () => void, onSuccess: () => void, onError: () => void, onFinish: () => void
): void => {
    onConfirm()
    switch (editMode) {
        case EditMode.STAKE:
            stakeTokens(account, getRelevantEditOperations()).then(onSuccess).catch(onError).finally(onFinish)
            break
        case EditMode.UNSTAKE:
            unstakeTokens(account, getRelevantEditOperations()).then(onSuccess).catch(onError).finally(onFinish)
            break
        case EditMode.EDIT_PAIRING:
            changeTokenLinks(account, getRelevantEditOperations()).then(onSuccess).catch(onError).finally(onFinish)
            break
        case EditMode.EDIT_STAKE_MODE:
            changeStakeTypes(account, getRelevantEditOperations()).then(onSuccess).catch(onError).finally(onFinish)
            break
        default:
            onError()
            onFinish()
    }
}

const doRollbackForEditModeWithoutConfirmation = (editMode: EditMode): void => {
    switch (editMode) {
        case EditMode.REDEEM:
            rollbackClaims()
            break;
    }
}

const performFinalize = (
    account: string, action: FinalizeAction,
    onConfirm: () => void, onSuccess: () => void, onError: () => void, onFinish: () => void,
    editMode?: EditMode
): void => {
    switch (action) {
        case FinalizeAction.CONFIRM:
            editMode && confirmEditForMode(account, editMode, onConfirm, () => {
                confirmEdit()
                onSuccess()
                refreshTokenRelatedState(account)
            }, onError, onFinish)
            break
        case FinalizeAction.CANCEL:
            cancelEdit()
            onSuccess()
            break
    }
}

const renderActionMessage = (action: FinalizeAction) => {
    switch (action) {
        case FinalizeAction.CONFIRM:
            const editOperations = translateOperations(getEditOperations())
            return <>
                <ChangesMainText>The following changes will be applied:</ChangesMainText>
                <OperationsContainer>
                    {editOperations.map((message, position) => <ChangeMessage
                        key={position}>{message}</ChangeMessage>)}
                </OperationsContainer>
                <ChangesMainText>Do you want to proceed?</ChangesMainText>
            </>
        case FinalizeAction.CANCEL:
            return <RevertText>All changes will be reverted. Proceed?</RevertText>
        default:
            return <></>
    }
}

const getButtonVisibility = (editMode?: EditMode): CSSProperties => ({
    visibility: doesEditModeRequireConfirmation(editMode) ? 'visible' : 'hidden'
})

const FinalizeDialog = ({account, editMode}: {account: string, editMode?: EditMode}) => {
    const [finalizeAction, setFinalizeAction] = useState(FinalizeAction.NONE)
    const [performingFinalize, setPerformingFinalize] = useState(false)
    const [finalizeError, setFinalizeError] = useState(false)

    const changeAction = useCallback((action: FinalizeAction) => {
        const wasAnyChangeMade = !!getEditOperations().length
        wasAnyChangeMade ? setFinalizeAction(action) : cancelEdit()
    }, [setFinalizeAction])

    const onHide = useCallback(() => {
        setFinalizeError(false)
        setFinalizeAction(FinalizeAction.NONE)
    }, [])

    const doOnConfirm = useCallback(() => doWithMounted(isMounted => {
        isMounted.isMounted && setPerformingFinalize(true)
        isMounted.isMounted && setFinalizeError(false)
    }), [])

    const doOnSuccess = useCallback(() => doWithMounted(isMounted => {
        isMounted.isMounted && onHide()
    }), [onHide])

    const doOnError = useCallback(() => doWithMounted(isMounted => {
        isMounted.isMounted && setFinalizeError(true)
    }), [])

    const doOnFinish = useCallback(() => doWithMounted(isMounted => {
        isMounted.isMounted && setPerformingFinalize(false)
    }), [])

    return <>
        <ConfirmButton icon="pi pi-check" disabled={performingFinalize}
                       onClick={() => changeAction(FinalizeAction.CONFIRM)}
                       style={getButtonVisibility(editMode)}/>
        <RollbackButton icon="pi pi-replay" disabled={performingFinalize}
                        onClick={() => changeAction(FinalizeAction.CANCEL)}
                        style={getButtonVisibility(editMode)}/>
        {editMode && !doesEditModeRequireConfirmation(editMode) && <RollbackButton
            icon="pi pi-replay" onClick={() => doRollbackForEditModeWithoutConfirmation(editMode)}/>}
        <ElysiumDialog visible={finalizeAction !== FinalizeAction.NONE}
                       dismissableMask={!performingFinalize} onHide={onHide} position="bottom">
            <MessageContainer>
                {renderActionMessage(finalizeAction)}
            </MessageContainer>
            <ActionsPanel encounteredError={finalizeError} actionsList={<>
                <FinalizeButton label={"Yes"} disabled={performingFinalize} loading={performingFinalize} onClick={() => performFinalize(
                    account, finalizeAction,
                    doOnConfirm,
                    doOnSuccess,
                    doOnError,
                    doOnFinish,
                    editMode
                )}/>
                <FinalizeNoButton label={"No"} disabled={performingFinalize} onClick={() => onHide()}/>
            </>}/>
        </ElysiumDialog>
    </>
}

export default FinalizeDialog