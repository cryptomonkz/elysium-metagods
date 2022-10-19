import {useWeb3React} from "@web3-react/core"
import {ReactElement} from "react";
import HighlightableAreaMessage from "./HighlightableAreaMessage";

export const ConnectWalletError = ({children}: {children: (account: string) => ReactElement}) => {
    const { account } = useWeb3React()
    return <>
        {!!account && children(account)}
        {!account && <HighlightableAreaMessage>Please connect your wallet first!</HighlightableAreaMessage>}
    </>
}