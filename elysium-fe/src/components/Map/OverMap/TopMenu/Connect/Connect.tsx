import styled from "styled-components";
import {FLEX_CENTERED_CONTAINER, NO_USER_SELECT, Spacing, Z_INDEX} from "../../../../Shared/Constants/StylesConstants";
import ConnectContainerImage from '../../../../../assets/Images/connectContainer.png';
import {FullSizeImage} from "../../../../Shared/Components/FullSizeImage";
import {useCallback, useEffect, useState} from "react";
import WalletsList from "./WalletsList";
import {useWeb3React} from "@web3-react/core";
import {AbstractConnector} from '@web3-react/abstract-connector';
import {Metamask} from "../../../../Shared/Constants/ConnectorConstants";
import {ElysiumButton} from "../../../../Shared/Components/ElysiumButton";
import {doWithMounted} from "../../../../Shared/Utils/ComponentUtils";
import {simplifyAccount} from "../../../../Shared/Utils/AccountUtils";
import {playActionSound} from "../../../../Shared/State/Sound/SoundService";
import {ACTION_SOUND} from "../../../../Shared/State/Sound/SoundState";

const Connect = () => {
    const [displayWalletsList, setDisplayWalletsList] = useState(false)

    const {active, account, activate, deactivate} = useWeb3React()

    const hideWalletsList = useCallback(() => setDisplayWalletsList(false), [setDisplayWalletsList])

    const selectConnector = useCallback((selectedConnector: AbstractConnector, manualConnect: boolean) => doWithMounted(isMounted => {
        activate(selectedConnector, error => console.error(error), true).then(() => {
            isMounted.isMounted && hideWalletsList()
            isMounted.isMounted && manualConnect && playActionSound(ACTION_SOUND.ACCEPT_HIGH)
        }).catch(error => console.error(error))
    }), [activate, hideWalletsList])

    useEffect(() => doWithMounted(isMounted => {
        Metamask.isAuthorized().then(isAuthorized => {
            isAuthorized && isMounted.isMounted && selectConnector(Metamask, false)
        })
    }), [selectConnector])

    return <>
        <ConnectContainer>
            <ConnectBackground src={ConnectContainerImage} alt={"ConnectContainer"}/>
            {!active && <ElysiumButton label="CONNECT WALLET" onClick={() => setDisplayWalletsList(true)}/>}
            {active && !!account && <ElysiumButton
                label={`DISCONNECT ${simplifyAccount(account)}`}
                onClick={() => deactivate()}/>}
        </ConnectContainer>
        <WalletsList visible={displayWalletsList} onHide={hideWalletsList}
                     onConnectorSelected={selectedConnector => selectConnector(selectedConnector, true)}/>
    </>
}

const ConnectContainer = styled.div`
    position: relative;
    ${FLEX_CENTERED_CONTAINER}
    padding: 0.4rem 0.7rem 0.5rem 0.5rem;
    z-index: ${Z_INDEX.OVER_MAP};
    ${NO_USER_SELECT}
    margin-left: ${Spacing.SECOND}
`

const ConnectBackground = styled(FullSizeImage)`
    opacity: .65;
`

export default Connect