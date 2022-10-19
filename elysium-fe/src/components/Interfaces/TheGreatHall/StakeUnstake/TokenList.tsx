import {AreaType} from "../../../Shared/State/GreatHall/AreaType";
import {GenericToken} from "../../../Shared/Models/Token/GenericToken";
import {DraggableToken} from "./DraggableToken";

const TokensList = ({ withPair = false, area, tokens = []}: {
    withPair?: boolean, area: AreaType, tokens: GenericToken[]
}) => <>
    {tokens.map(token => (
        <DraggableToken key={token.tokenId} withPair={withPair} area={area} token={token}/>
    ))}
</>

export default TokensList