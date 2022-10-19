import {FontSize, fontSizeToPixels, Spacing} from "../Constants/StylesConstants";
import {Separator, SeparatorType} from "./Separator";
import {AreaTitle} from "./AreaTitle";
import styled from "styled-components";
import {CSSProperties, ReactNode} from "react";

export const SectionDescription = styled.div`
    padding: ${Spacing.FIRST} 0;
    font-size: ${fontSizeToPixels(FontSize.SMALL_TO_MEDIUM)};
`

export const TitleWithSeparator = ({title, titleStyles = {}, separatorType, description}: {
    title: ReactNode, titleStyles?: CSSProperties, separatorType: SeparatorType, description?: ReactNode
}) => <>
    <AreaTitle style={titleStyles}>{title}</AreaTitle>
    <Separator type={separatorType}/>
    {description && <SectionDescription>{description}</SectionDescription>}
</>