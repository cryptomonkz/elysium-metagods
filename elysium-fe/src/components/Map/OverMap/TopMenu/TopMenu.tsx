import styled from "styled-components"
import {getAbsolutePosition} from "../../../Shared/Utils/StylesUtils";
import {device} from "../../../Shared/Constants/MediaQueries";
import Connect from "./Connect/Connect";
import Settings from "./Settings";
import {FLEX_CENTERED_CONTAINER} from "../../../Shared/Constants/StylesConstants";

const TopMenuContainer = styled.div`
    ${FLEX_CENTERED_CONTAINER}
    ${getAbsolutePosition('20px', '20px', undefined, undefined)}

    @media ${device.tablet} {
        ${getAbsolutePosition('30px', '30px', undefined, undefined)}
    }
`

const TopMenu = () => {
    return <TopMenuContainer>
        <Settings/>
        <Connect/>
    </TopMenuContainer>
}

export default TopMenu