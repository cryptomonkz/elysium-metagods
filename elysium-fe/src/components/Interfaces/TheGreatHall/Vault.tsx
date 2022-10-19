import {useSelector} from "react-redux";
import {ApplicationState} from "../../Shared/State/ApplicationState";
import VaultState from "../../Shared/State/Vault/VaultState";
import {
    Color,
    FLEX_CENTERED_CONTAINER,
    FontSize,
    fontSizeToPixels,
    FontWeight,
    Spacing
} from "../../Shared/Constants/StylesConstants";
import styled from "styled-components";
import {VerticalSeparator} from "../../Shared/Components/Separator";
import {ReactNode, useCallback, useState} from "react";
import {refreshTokenRelatedState} from "../../Shared/State/GreatHall/GreatHallService";
import {ClaimableValue} from "./StakeUnstake/Claimable";
import GodsInput from "../../Shared/Components/GodsInput";
import {getVaultStateFromApplication} from "../../Shared/State/Vault/VaultService";
import {ActionsPanel, ActionTrigger} from "../../Shared/Components/ActionsPanel";
import {doWithMounted} from "../../Shared/Utils/ComponentUtils";
import {
    claimAllTokens,
    claimPasses,
    depositTokens,
    transferTokens,
    withdrawTokens
} from "../../Shared/Service/AggregationService";
import {ElysiumDialog} from "../../Shared/Components/ElysiumDialog";
import {CancelButton, ThemeButton} from "../../Shared/Components/StyledButton";
import {WITHDRAW_BLOCK_LIFETIME, WITHDRAW_TAX} from "../../Shared/Constants/TokenConstants";
import TokenBalance from "../../Shared/Components/TokenBalance";
import {ElysiumNumberInput, ElysiumTextInput} from "../../Shared/Components/ElysiumInput";
import {showTokensTransferFailed} from "../../Shared/Utils/ToastUtils";

enum ActionInProgress {
    DEPOSIT = 'DEPOSIT', WITHDRAW = 'WITHDRAW', TRANSFER = 'TRANSFER',
    CLAIM_ALL_TOKENS = 'CLAIM_ALL_TOKENS', CLAIM_ALL_PASSES = 'CLAIM_ALL_PASSES'
}

type ShowConfiguration = { showInputAmount: boolean; showDialog: boolean }
type InputConfiguration = { inputAmount: number | null; dialogInputAmount: number | null; dialogInputAddress: string; }

const VaultContainer = styled.div`
   ${FLEX_CENTERED_CONTAINER}
   flex-direction: column;
`

const VaultBalances = styled.div`
    ${FLEX_CENTERED_CONTAINER}
    align-items: stretch;
`

const VaultBalance = styled.div`
    ${FLEX_CENTERED_CONTAINER}
    flex-direction: column;
    justify-content: space-between;
    padding: ${Spacing.THIRD}
`

const VaultBalanceTitle = styled.div`
    margin-bottom: ${Spacing.FIFTH};
    font-size: ${fontSizeToPixels(FontSize.MEDIUM_TO_LARGE)};
`

const VaultBalanceInfo = styled.div`
    margin-top: -${Spacing.FOURTH};
    font-size: ${fontSizeToPixels(FontSize.SMALLER)};
`

const VaultBalanceValue = styled(TokenBalance)`
    margin-top: ${Spacing.FIFTH};
    font-size: ${fontSizeToPixels(FontSize.LARGE_TO_HUGE)};
`

const ClaimableValueContainer = styled.div`
    margin-left: ${Spacing.SECOND};
`

const WithdrawInformation = styled.div`
    max-width: 500px;
    color: ${Color.WHITE};
    margin-top: ${Spacing.SECOND};
    font-size: ${fontSizeToPixels(FontSize.SMALL_TO_MEDIUM)};
`

const WithdrawHighlight = styled.span`
    color: ${Color.GREEN_DARK};
    font-weight: ${FontWeight.EXTRA_LARGE};
`

const MessageContainer = styled.div`
    ${FLEX_CENTERED_CONTAINER}
    flex-direction: column;
    text-align: center;
    padding: ${Spacing.THIRD} ${Spacing.THIRD} 0 ${Spacing.THIRD};
`

const FinalizeButton = styled(ThemeButton)`
    margin: 0 ${Spacing.SECOND};
`

const FinalizeNoButton = styled(CancelButton)`
    margin: 0 ${Spacing.SECOND};
`

const TransferAmount = styled(ElysiumNumberInput)`
    align-self: stretch;
`

const TransferAddress = styled(ElysiumTextInput)`
    align-self: stretch;
`

const renderVaultBalance = (balance: number, title: string, additionalInfo?: ReactNode) => <VaultBalance>
    <VaultBalanceTitle>{title}</VaultBalanceTitle>
    {additionalInfo}
    <VaultBalanceValue>{balance}</VaultBalanceValue>
</VaultBalance>

const ClaimPassesAction = ({actionInProgress, isDisabled, onClick}: {
    actionInProgress?: string, isDisabled?: boolean, onClick: (action: string) => void
}) => {
    const claimablePasses = useSelector<ApplicationState, number>(applicationState => (
        getVaultStateFromApplication(applicationState)?.claimablePasses || 0
    ))
    return <ActionTrigger actionInProgress={actionInProgress} currentAction={ActionInProgress.CLAIM_ALL_PASSES}
                          isDisabled={isDisabled} onClick={onClick} title={"CLAIM ALL PASSES"}>
        <ClaimableValueContainer>
            <ClaimableValue claimable={claimablePasses} isRedeemMode={true} isClaimed={false}/>
        </ClaimableValueContainer>
    </ActionTrigger>
}

const getDefaultShowConfiguration = (): ShowConfiguration => ({showInputAmount: false, showDialog: false})
const getDefaultInputConfiguration = (): InputConfiguration => ({ inputAmount: null, dialogInputAmount: null, dialogInputAddress: '' })

const VaultActions = ({account, vaultState}: { account: string, vaultState: VaultState }) => {
    const [inputConfiguration, setInputConfiguration] = useState<InputConfiguration>(() => getDefaultInputConfiguration())
    const [showConfiguration, setShowConfiguration] = useState<ShowConfiguration>(() => getDefaultShowConfiguration())

    const [encounteredError, setEncounteredError] = useState(false)
    const [actionInProgress, setActionInProgress] = useState<string | undefined>()
    const [actionInConfiguration, setActionInConfiguration] = useState<string | undefined>()

    const showInputFor = useCallback((actionInConfiguration: string) => {
        setActionInConfiguration(actionInConfiguration)
        setShowConfiguration(previous => ({...previous, showInputAmount: true}))
    }, [])

    const showDialogFor = useCallback((actionInConfiguration: string) => {
        setActionInConfiguration(actionInConfiguration)
        setShowConfiguration(previous => ({...previous, showDialog: true}))
    }, [])

    const onHideInputAmount = useCallback(() => {
        setShowConfiguration(previous => ({...previous, showInputAmount: false}))
        setInputConfiguration(previous => ({...previous, inputAmount: null}))
    }, [])

    const onHideDialog = useCallback(() => {
        setShowConfiguration(previous => ({...previous, showDialog: false}))
        setInputConfiguration(previous => ({...previous, dialogInputAmount: null, dialogInputAddress: ''}))
    }, [])

    const resetActions = useCallback(() => {
        onHideDialog()
        onHideInputAmount()
        setActionInProgress(undefined)
        setActionInConfiguration(undefined)
    }, [onHideDialog, onHideInputAmount])

    const performAction = useCallback((
        action: string,
        toDo: (account: string) => Promise<void>,
        onCatch?: (error: any) => void,
    ) => doWithMounted(isMounted => {
        setEncounteredError(false)
        setActionInProgress(action)
        toDo(account).catch((error) => {
            !!onCatch && onCatch(error)
            setEncounteredError(true)
        }).finally(() => {
            isMounted.isMounted && resetActions()
            isMounted.isMounted && refreshTokenRelatedState(account)
        })
    }), [account, setEncounteredError, setActionInProgress, resetActions])

    const performActionWithInput = useCallback((amount: number) => {
        switch (actionInConfiguration) {
            case ActionInProgress.DEPOSIT:
                performAction(actionInConfiguration, (account) => depositTokens(account, amount))
                break
            case ActionInProgress.WITHDRAW:
                showDialogFor(actionInConfiguration)
                setInputConfiguration(previous => ({...previous, inputAmount: amount}))
                break
        }
    }, [actionInConfiguration, performAction, showDialogFor])

    const performActionWithDialog = useCallback(() => {
        switch (actionInConfiguration) {
            case ActionInProgress.WITHDRAW:
                const withdrawAmount = inputConfiguration.inputAmount
                !!withdrawAmount && performAction(actionInConfiguration, (account) => withdrawTokens(account, withdrawAmount))
                break
            case ActionInProgress.CLAIM_ALL_TOKENS:
                performAction(actionInConfiguration, claimAllTokens)
                break
            case ActionInProgress.TRANSFER:
                const transferAmount = inputConfiguration.dialogInputAmount
                const transferAddress = inputConfiguration.dialogInputAddress
                !!transferAmount && !!transferAddress && performAction(
                    actionInConfiguration,
                    (account) => transferTokens(account, transferAmount, transferAddress),
                    (error) => showTokensTransferFailed((error as Error)?.message)
                )
        }
        onHideDialog()
    }, [actionInConfiguration, inputConfiguration, performAction, onHideDialog])

    const getInputPlaceholder = useCallback(() => {
        switch (actionInConfiguration) {
            case ActionInProgress.DEPOSIT:
                return 'Deposit amount'
            case ActionInProgress.WITHDRAW:
                return 'Withdraw amount'
        }
    }, [actionInConfiguration])

    const getMaxAmount = useCallback(() => {
        switch (actionInConfiguration) {
            case ActionInProgress.DEPOSIT:
                return vaultState.externalWalletBalance
            case ActionInProgress.WITHDRAW:
            case ActionInProgress.TRANSFER:
                return vaultState.inGameBalance
            default:
                return 0
        }
    }, [actionInConfiguration, vaultState])

    const getDialogMessage = useCallback(() => {
        switch (actionInConfiguration) {
            case ActionInProgress.CLAIM_ALL_TOKENS:
                return <>All staked tokens will be claimed. Proceed?</>
            case ActionInProgress.WITHDRAW:
                return <WithdrawInformation>
                    A <WithdrawHighlight>{WITHDRAW_TAX}%</WithdrawHighlight> tax will be perceived for this transaction!
                    Proceeding forward will result in the chosen amount being blocked
                    for approximately <WithdrawHighlight>{WITHDRAW_BLOCK_LIFETIME} hours</WithdrawHighlight> if
                    the transaction is cancelled or unsuccessful. Please make sure to adjust you gas fees so that your
                    transaction can be completed in at most the amount of time previously specified.
                </WithdrawInformation>
            case ActionInProgress.TRANSFER:
                return <>
                    <div>Please insert the details for the requested transfer:</div>
                    <TransferAmount
                        placeholder={"Amount"} min={0} max={getMaxAmount()}
                        value={inputConfiguration.dialogInputAmount} mode="decimal"
                        onValueChange={(e) => setInputConfiguration(previous => ({...previous, dialogInputAmount: e.value}))}/>
                    <TransferAddress
                        placeholder={"Address"}
                        value={inputConfiguration.dialogInputAddress}
                        onChange={(e) => setInputConfiguration(previous => ({...previous, dialogInputAddress: e.target.value}))}/>
                    <div>Proceed?</div>
                </>
        }
    }, [actionInConfiguration, inputConfiguration, getMaxAmount])

    const isDialogConfirmValid = useCallback(() => {
        switch (actionInConfiguration) {
            case ActionInProgress.TRANSFER:
                return !!inputConfiguration.dialogInputAmount && !!inputConfiguration.dialogInputAddress
            default:
                return true
        }
    }, [actionInConfiguration, inputConfiguration])

    return <>
        <ActionsPanel encounteredError={encounteredError} actionsList={<>
            <ActionTrigger actionInProgress={actionInProgress} currentAction={ActionInProgress.DEPOSIT}
                           isDisabled={true || !vaultState.externalWalletBalance} title={"DEPOSIT"} onClick={showInputFor}/>
            <ActionTrigger actionInProgress={actionInProgress} currentAction={ActionInProgress.WITHDRAW}
                           isDisabled={true || !vaultState.inGameBalance} title={"WITHDRAW"} onClick={showInputFor}/>
            <ActionTrigger actionInProgress={actionInProgress} currentAction={ActionInProgress.TRANSFER}
                           isDisabled={!vaultState.inGameBalance} title={"TRANSFER"} onClick={showDialogFor}/>
            <ActionTrigger actionInProgress={actionInProgress} currentAction={ActionInProgress.CLAIM_ALL_TOKENS}
                           isDisabled={!vaultState.claimableBalance} title={"CLAIM STAKING YIELD"}
                           onClick={showDialogFor}/>
            <ClaimPassesAction actionInProgress={actionInProgress} isDisabled={!vaultState.claimablePasses}
                               onClick={(action) => performAction(action, claimPasses)}/>
        </>}/>

        { showConfiguration.showInputAmount && <GodsInput
            placeholder={getInputPlaceholder()} additionalProperties={{ min: 0, max: getMaxAmount() }}
            confirmAction={performActionWithInput} cancelAction={resetActions} inputDisabled={!!actionInProgress}/> }

        <ElysiumDialog visible={showConfiguration.showDialog} onHide={onHideDialog} position="bottom">
            <MessageContainer>
                {getDialogMessage()}
            </MessageContainer>
            <ActionsPanel actionsList={<>
                <FinalizeButton label={"Yes"} disabled={!isDialogConfirmValid()} onClick={performActionWithDialog}/>
                <FinalizeNoButton label={"No"} onClick={onHideDialog}/>
            </>}/>
        </ElysiumDialog>
    </>
}

const Vault = ({account}: { account: string }) => {
    const vaultState = useSelector<ApplicationState, VaultState>(applicationState => (
        getVaultStateFromApplication(applicationState)
    ))
    return <>{vaultState && <VaultContainer>
        <VaultBalances>
            {renderVaultBalance(vaultState.inGameBalance, 'In-Game Vault Balance')}
            <VerticalSeparator/>
            {renderVaultBalance(vaultState.blockedBalance, 'Blocked Balance *', <VaultBalanceInfo>* Amount in transit or pending action</VaultBalanceInfo>)}
            <VerticalSeparator/>
            {renderVaultBalance(vaultState.claimableBalance, 'Claimable Balance *', <VaultBalanceInfo>* The yield is subject to risk</VaultBalanceInfo>)}
            <VerticalSeparator/>
            {renderVaultBalance(vaultState.externalWalletBalance, 'External Wallet Balance')}
        </VaultBalances>
        <VaultActions account={account} vaultState={vaultState}/>
    </VaultContainer>}</>
}

export default Vault