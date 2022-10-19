import styled from "styled-components"
import {Color, Spacing} from "../Constants/StylesConstants";
import {device} from "../Constants/MediaQueries";
import LogoImage from '../../../assets/Images/logo.png';
import {preventEventDefault} from "../Utils/EventUtils";

const StyledLogo = styled.img`
    width: 150px;
    height: 106px;
    margin: ${Spacing.SECOND};
    background-color: ${Color.TRANSPARENT}; 
    
    @media ${device.tablet} { 
        width: 150px;
        height: 106px;
    }
`

export const Logo = () => <StyledLogo alt="Logo" src={LogoImage} onDragStart={preventEventDefault}/>