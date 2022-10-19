import styled from "styled-components";
import {Logo} from "../../Shared/Components/Logo";
import {getAbsolutePosition} from "../../Shared/Utils/StylesUtils";
import {Z_INDEX} from "../../Shared/Constants/StylesConstants";
import {device} from "../../Shared/Constants/MediaQueries";

const MainLogo = () => <LogoWithPosition><Logo/></LogoWithPosition>

const LogoWithPosition = styled.div`
    ${getAbsolutePosition('20px', undefined, undefined, '20px')}
    z-index: ${Z_INDEX.OVER_MAP};
    
    @media ${device.tablet} {
        ${getAbsolutePosition('30px', undefined, undefined, '30px')}
    }
`

export default MainLogo