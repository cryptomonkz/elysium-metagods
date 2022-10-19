import {GRADIENT} from "../Constants/StylesConstants";
import styled, {keyframes} from "styled-components";
import {ThemeButton} from "./StyledButton";

const DEFAULT_BACKGROUND_IMAGE = `background: ${GRADIENT.FIRST_THEME}`

const ConnectKeyFrame = keyframes`
    0% {
        background: url("https://uploads-ssl.webflow.com/61bdc3c9fede2334b1f95af7/6226f720005f79dee7b5a69a_01.png"), ${GRADIENT.FIRST_THEME};
        background-size: cover,cover;
        background-position: 50% 50%, 50% 50%;
    }
    15% {
        ${DEFAULT_BACKGROUND_IMAGE};
        background-size: cover;
        background-position: 50% 50%;
    }
    30% {
        background: url("https://uploads-ssl.webflow.com/61bdc3c9fede2334b1f95af7/6226f7207101bc296a6e5427_02.png"), ${GRADIENT.FIRST_THEME};
        background-size: cover,cover;
        background-position: 50% 50%, 50% 50%;
    }
    50% {
        ${DEFAULT_BACKGROUND_IMAGE};
    }
    58% {
        background: url("https://uploads-ssl.webflow.com/61bdc3c9fede2334b1f95af7/6226f721eb3b7d1e51fc9c05_03.png"), ${GRADIENT.FIRST_THEME};
        background-size: cover,cover;
        background-position: 50% 50%, 50% 50%;
    }
    65% {
        background: url("https://uploads-ssl.webflow.com/61bdc3c9fede2334b1f95af7/6226f720ebc197937cd7b9ff_04.png"), ${GRADIENT.FIRST_THEME};
        background-size: cover,cover;
        background-position: 50% 50%, 50% 50%;
    }
    70% {
        ${DEFAULT_BACKGROUND_IMAGE};
        background-size: cover;
        background-position: 50% 50%;
    }
    80% {
        background: url("https://uploads-ssl.webflow.com/61bdc3c9fede2334b1f95af7/6226f720dc5521792ac46147_05.png"), ${GRADIENT.FIRST_THEME};
        background-size: cover,cover;
        background-position: 50% 50%, 50% 50%;
    }
    100% {
        background: url("https://uploads-ssl.webflow.com/61bdc3c9fede2334b1f95af7/6226f71fd826cf742eab253e_06.png"), ${GRADIENT.FIRST_THEME};
        background-size: cover,cover;
        background-position: 50% 50%, 50% 50%;
    }
`

export const ElysiumButton = styled(ThemeButton)`
    &:hover {
        animation: ${ConnectKeyFrame} 1.8s infinite !important;
    }
`