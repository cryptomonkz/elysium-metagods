import {GenericToken} from "../Models/Token/GenericToken";
import {buildTokenDetails, getTokenTraitColor} from "../Utils/TokenUtils";
import {ReactNode} from "react";

export const getTokenWithTrait = (token: GenericToken): ReactNode => {
    const traitColor = getTokenTraitColor(token)
    const tokenStyle = traitColor ? {color: traitColor} : {}
    return <b style={tokenStyle}>{buildTokenDetails(token)}</b>
}