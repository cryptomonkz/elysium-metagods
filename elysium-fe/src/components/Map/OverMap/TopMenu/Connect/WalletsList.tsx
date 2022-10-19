import {Divider} from 'primereact/divider';
import styled from 'styled-components';
import {Connectors} from "../../../../Shared/Constants/ConnectorConstants";
import {
    AbsoluteBorderRadius,
    Color,
    FLEX_CENTERED_CONTAINER,
    FontWeight,
    Spacing
} from "../../../../Shared/Constants/StylesConstants";
import {AbstractConnector} from '@web3-react/abstract-connector';
import {ElysiumDialog} from "../../../../Shared/Components/ElysiumDialog";

const getWalletDivider = (position: number) => <div key={position}>
    {!!position && <Divider/>}
</div>

const WalletsList = ({visible, onHide, onConnectorSelected}: { visible: boolean, onHide: () => void, onConnectorSelected: (connector: AbstractConnector) => void }) => (
    <ElysiumDialog position="center" onHide={onHide} visible={visible} dismissableMask={true}>
        {
            Connectors.map(connector => <WalletContainer key={connector.name} onClick={() => onConnectorSelected(connector.actualConnector)}>
                <WalletLogo src={connector.image}/>
                <WalletName>{connector.name}</WalletName>
                <WalletDescription>{connector.description}</WalletDescription>
            </WalletContainer>).reduce((wallets: JSX.Element[], currentWallet: JSX.Element, currentWalletPosition: number) => [
                ...wallets, getWalletDivider(currentWalletPosition), currentWallet
            ], [])
        }
    </ElysiumDialog>
)

const WalletLogo = styled.img`
  width: 50px;
  height: 50px;
`

const WalletName = styled.h3`
    margin: 0 ${Spacing.THIRD};
`

const WalletDescription = styled.div`
    color: ${Color.DARK_GREY};
    font-weight: ${FontWeight.LARGE};
`

const WalletContainer = styled.div`
    ${FLEX_CENTERED_CONTAINER}
    flex-direction: column;
    padding: ${Spacing.THIRD} ${Spacing.FIRST};
    border-radius: ${AbsoluteBorderRadius.SMALL};
    
    &:hover {
        background-color: ${Color.TRANSPARENT_DARKENED_GREY};
    }
`

export default WalletsList