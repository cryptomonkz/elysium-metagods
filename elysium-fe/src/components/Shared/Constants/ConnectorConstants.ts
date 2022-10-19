import {InjectedConnector} from "@web3-react/injected-connector";
import {WalletConnectConnector} from "@web3-react/walletconnect-connector";
import {WalletLinkConnector} from "@web3-react/walletlink-connector";
import {Connector} from "../Models/Wallet/Connector";
import MetamaskIcon from "../../../assets/Icons/metamask.svg";
import WalletConnectIcon from "../../../assets/Icons/walletConnect.svg";
import CoinbaseIcon from "../../../assets/Icons/coinbase.png";

const RPC_URL = ""

export const Metamask = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42]
});

const WalletConnect = new WalletConnectConnector({
    rpc: {1: RPC_URL},
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
    // @ts-ignore
    pollingInterval: 12000
});

const Coinbase = new WalletLinkConnector({
    url: RPC_URL,
    appName: "Elysium Metagods"
});

export const Connectors: Connector[] = [
    {
        name: 'MetaMask',
        image: MetamaskIcon,
        actualConnector: Metamask,
        description: 'Connect to your MetaMask Wallet'
    },
    {
        name: 'WalletConnect',
        image: WalletConnectIcon,
        actualConnector: WalletConnect,
        description: 'Scan with WalletConnect to connect'
    },
    {
        name: 'Coinbase',
        image: CoinbaseIcon,
        actualConnector: Coinbase,
        description: 'Connect to your Coinbase Wallet'
    }
]

