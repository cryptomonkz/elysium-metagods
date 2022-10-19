import {
    BackgroundType,
    CONTAINER_MARGIN,
    PairedToken,
    Token,
    TOKEN_HIGHLIGHT_PROPERTIES
} from "../../../Shared/Components/Drag/Token";
import {CSSProperties, ForwardedRef, forwardRef, ReactNode, useRef} from "react";
import {FLEX_CENTERED_CONTAINER, Spacing} from "../../../Shared/Constants/StylesConstants";
import styled from "styled-components";
import useHover from "@react-hook/hover";
import {EnrolledToken} from "../../../Shared/Models/Token/EnrolledToken";
import {StakeModeIconWithTooltip, StakeModeImageSize} from "../../../Shared/Components/StakeModeIcon";
import {TournamentToken} from "../../../Shared/Models/Token/TournamentToken";
import {TournamentStatusWithTooltip} from "../../../Shared/Components/GodTournamentStatusIcon";

const TokenContainer = styled.div`
    ${FLEX_CENTERED_CONTAINER}
    margin: ${CONTAINER_MARGIN};
`

const PairedContainer = styled.div`
    flex: 1;
`

const DetailContainer = styled.div`
    margin-left: ${Spacing.SECOND};
`

const TokenWithMode = forwardRef((
    {
        stakedToken, children, handlers = {}, backgroundType = BackgroundType.DEFAULT, getStyles = (_: boolean) => ({})
    }: {
        stakedToken: EnrolledToken, children?: ReactNode, handlers?: any,
        backgroundType?: BackgroundType, getStyles?: (isHovering: boolean) => CSSProperties
    }, tokenRef: ForwardedRef<any>) => {
    const containerRef = useRef<any>()
    const isHovering = useHover(containerRef)
    return <TokenContainer ref={containerRef} {...handlers}>
        <Token ref={tokenRef} token={stakedToken.token} styles={getStyles(isHovering)} backgroundType={backgroundType}>
            {!!stakedToken.pairedToken && <PairedContainer>
                <PairedToken token={stakedToken.pairedToken}/>
            </PairedContainer>}
            {!!children && children}
            {!!stakedToken.stakeType && <DetailContainer>
                <StakeModeIconWithTooltip mode={stakedToken.stakeType} size={StakeModeImageSize.SMALL}/>
            </DetailContainer>}
        </Token>
    </TokenContainer>
})

export const TokenWithHover = forwardRef((
    {
        stakedToken, isTournamentFinalized,
        handlers = {}, backgroundType = BackgroundType.DEFAULT, styles = {}
    }: {
        stakedToken: TournamentToken, isTournamentFinalized: boolean,
        handlers?: any, backgroundType?: BackgroundType, styles?: CSSProperties
    }, tokenRef: ForwardedRef<any>) => {
    return <TokenWithMode ref={tokenRef} stakedToken={stakedToken} handlers={handlers} backgroundType={backgroundType}
                          getStyles={isHovering => isHovering ? TOKEN_HIGHLIGHT_PROPERTIES : styles}>
        {!isTournamentFinalized && <DetailContainer>
            <TournamentStatusWithTooltip status={stakedToken.godTournamentStatus}/>
        </DetailContainer>}
    </TokenWithMode>
})

export default TokenWithMode