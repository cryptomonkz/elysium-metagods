import styled from "styled-components"
import {FULL_HEIGHT, Spacing} from "../Constants/StylesConstants";
import {FullSizeImage} from "./FullSizeImage";
import ThemeLargeSeparator from '../../../assets/Images/themeLargeSeparator.png';
import ThemeSmallSeparator from '../../../assets/Images/themeSmallSeparator.png';
import WhiteLargeSeparator from '../../../assets/Images/whiteLargeSeparator.png';
import WhiteSmallSeparator from '../../../assets/Images/whiteSmallSeparator.png';
import VerticalThemeLargeSeparator from '../../../assets/Images/verticalThemeLargeSeparator.png';
import VerticalWhiteSmallSeparator from '../../../assets/Images/verticalWhiteSmallSeparator.png';
import {Divider} from "primereact/divider";

export enum SeparatorType {
    THEME_LARGE, THEME_SMALL, WHITE_LARGE, WHITE_SMALL,
}

export enum VerticalSeparatorType {
    VERTICAL_THEME_LARGE, VERTICAL_WHITE_SMALL
}

const SeparatorContainer = styled.div`
    min-height: 10px;
    max-height: 10px;
    position: relative;
    margin: ${Spacing.FIRST} -${Spacing.FIRST};
`

const VerticalSeparatorContainer = styled.div`
    ${FULL_HEIGHT}
    min-width: 10px;
    max-width: 10px;
    position: relative;
    margin: -${Spacing.FIRST} ${Spacing.FIRST};
`

const SmallDividerContainer = styled.div`
    min-width: 15px;
    max-width: 15px;
    overflow: hidden;
    margin: 0;
    
    .p-divider.p-divider-horizontal {
        margin: ${Spacing.SECOND} 0;
    }
`

const VerticalDividerContainer = styled.div`
    ${FULL_HEIGHT}
    overflow: hidden;
    margin: -${Spacing.SECOND} ${Spacing.FIRST};
`

const getSeparatorSource = (type: SeparatorType): string => {
    switch (type) {
        case SeparatorType.THEME_LARGE:
            return ThemeLargeSeparator
        case SeparatorType.THEME_SMALL:
            return ThemeSmallSeparator
        case SeparatorType.WHITE_LARGE:
            return WhiteLargeSeparator
        case SeparatorType.WHITE_SMALL:
            return WhiteSmallSeparator
        default:
            throw new Error("Separator type has not been defined")
    }
}

const getVerticalSeparatorSource = (type: VerticalSeparatorType): string => {
    switch (type) {
        case VerticalSeparatorType.VERTICAL_THEME_LARGE:
            return VerticalThemeLargeSeparator
        case VerticalSeparatorType.VERTICAL_WHITE_SMALL:
            return VerticalWhiteSmallSeparator
        default:
            throw new Error("Vertical separator type has not been defined")
    }
}

export const Separator = ({type}: { type: SeparatorType }) => <SeparatorContainer>
    <FullSizeImage src={getSeparatorSource(type)} alt={"ThemeSeparator"}/>
</SeparatorContainer>

export const VerticalSeparator = ({type = VerticalSeparatorType.VERTICAL_THEME_LARGE}: { type?: VerticalSeparatorType }) => <VerticalSeparatorContainer>
    <FullSizeImage src={getVerticalSeparatorSource(type)} alt={"VerticalSeparator"}/>
</VerticalSeparatorContainer>

export const SmallDivider = () => <SmallDividerContainer>
    <Divider/>
</SmallDividerContainer>

export const VerticalDivider = ({...properties}) => <VerticalDividerContainer {...properties}>
    <Divider layout="vertical"/>
</VerticalDividerContainer>