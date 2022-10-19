import styled from "styled-components";
import {Color} from "../Constants/StylesConstants";

const StyledLink = styled.a`
    color: ${Color.FIRST_THEME_DARK};
    text-decoration: none;
    &:hover {
        color: ${Color.FIRST_THEME_LIGHT};
        text-decoration: underline;
    }
`

export default StyledLink