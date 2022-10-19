import {SimpleDraggableToken} from "./SimpleDraggableToken";
import {EnrolledToken} from "../../../Shared/Models/Token/EnrolledToken";

const SimpleTokensList = ({ tokens = [], isEnrollmentDisabled }: { tokens: EnrolledToken[], isEnrollmentDisabled: boolean }) => <>
    {tokens.map(stakedToken => <SimpleDraggableToken
        key={stakedToken.token.tokenId}
        stakedToken={stakedToken} isEnrollmentDisabled={isEnrollmentDisabled}/>)}
</>

export default SimpleTokensList