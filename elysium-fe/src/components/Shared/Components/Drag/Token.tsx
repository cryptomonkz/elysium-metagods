import {GenericToken} from "../../Models/Token/GenericToken";
import {
    CSSProperties,
    ForwardedRef,
    forwardRef,
    ReactElement,
    ReactNode,
    useCallback,
    useEffect,
    useState
} from "react";
import {
    AbsoluteBorderRadius,
    BOX_SHADOW_STYLE,
    Color,
    FLEX_CENTERED_CONTAINER,
    FontSize,
    fontSizeToPixels,
    FULL_HEIGHT,
    FULL_SIZE,
    FULL_SIZE_ABSOLUTE_POSITION,
    FULL_WIDTH,
    NO_USER_SELECT,
    TEXT_WITH_ELLIPSIS,
    Z_INDEX
} from "../../Constants/StylesConstants";
import styled from "styled-components";
import {buildTokenDetails, buildTokenImage, getDefaultTokenImage, getTokenTraitColor} from "../../Utils/TokenUtils";
import {FullSizeImage} from "../FullSizeImage";
import TokenBackground from "../../../../assets/Images/tokenBackground.png";
import TokenHighlightBackground from "../../../../assets/Images/tokenBackgroundHighlight.png";
import Tooltip from '@mui/material/Tooltip';

export const CONTAINER_MARGIN = '10px';
export const MIN_CONTAINER_HEIGHT = '110px';

const TOKEN_WIDTH = `220px`
const TOKEN_HEIGHT = '90px'
const TOKEN_PADDING = '10px'

const TOKEN_DETAILS_MARGIN = '10px';
const TOKEN_DETAILS_WIDTH = '120px';

const IMAGE_WIDTH = '70px';

const PAIRED_TOKEN_WIDTH = '20px'
const PAIRED_TOKEN_HEIGHT = '20px'

const TOKEN_IMAGE_BORDER = `border: 1px solid ${Color.TRANSPARENT_GREY};`

const TokenContainer = styled.div`
    ${FULL_WIDTH}
    width: ${TOKEN_WIDTH};
    height: ${TOKEN_HEIGHT};
    ${FLEX_CENTERED_CONTAINER}
    justify-content: flex-start;
    ${NO_USER_SELECT}
    position: relative;
    padding: ${TOKEN_PADDING};
`

const TokenImageContainer = styled.div`
    ${FULL_HEIGHT}
    min-width: ${IMAGE_WIDTH};
    max-width: ${IMAGE_WIDTH};
    z-index: ${Z_INDEX.RELATIVE_SECOND};
`

const TokenImageRelativeContainer = styled.div`
    ${FULL_SIZE}
    position: relative;
`

const TokenTrait = styled.div<{traitColor: string}>`
    ${FULL_SIZE_ABSOLUTE_POSITION}
    box-shadow: ${BOX_SHADOW_STYLE.TOKEN_TRAIT_SHADOW_PREFIX} ${props => props.traitColor};
`

const TokenNFT = styled(FullSizeImage)`
    ${TOKEN_IMAGE_BORDER}
`

const TokenDetailsContainer = styled.div`
    ${FULL_HEIGHT}
    flex: 1;
    ${FLEX_CENTERED_CONTAINER}
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: ${TOKEN_DETAILS_WIDTH};
    margin-left: ${TOKEN_DETAILS_MARGIN};
    z-index: ${Z_INDEX.RELATIVE_SECOND};
`

const ChildrenContainer = styled.div`
    flex: 1;
    ${FULL_WIDTH};
    ${FLEX_CENTERED_CONTAINER};
    align-items: flex-end;
    justify-content: flex-end;
`

const TokenBackgroundImage = styled(FullSizeImage)`
    z-index: ${Z_INDEX.RELATIVE_FIRST};
`

const TokenType = styled.div`
    ${TEXT_WITH_ELLIPSIS}
    font-size: ${fontSizeToPixels(FontSize.SMALLER)};
`

const TokenId = styled.div`
    ${TEXT_WITH_ELLIPSIS}
    color: ${Color.DARK_GREY};
    font-size: ${fontSizeToPixels(FontSize.SMALLER)};
`

export const TOKEN_HIGHLIGHT_PROPERTIES: CSSProperties = {
    boxShadow: BOX_SHADOW_STYLE.TOKEN_HIGHLIGHT, borderRadius: AbsoluteBorderRadius.TINY
}

export enum BackgroundType {
    DEFAULT, HIGHLIGHT
}

export const getBackground = (backgroundType: BackgroundType) => {
    switch (backgroundType) {
        case BackgroundType.HIGHLIGHT:
            return TokenHighlightBackground
        case BackgroundType.DEFAULT:
        default:
            return TokenBackground
    }
}

const getTokenImageShadow = (token: GenericToken): ReactNode => {
    const tokenTraitColor = getTokenTraitColor(token)
    return tokenTraitColor ? <TokenTrait traitColor={tokenTraitColor} /> : <></>
}

const ContainerWithImage = ({token, children}: {
    token: GenericToken, children: (imageSource: string | undefined, onError: () => void) => ReactElement
}) => {
    const [imageSource, setImageSource] = useState<string | undefined>(() => buildTokenImage(token))
    useEffect(() => setImageSource(buildTokenImage(token)), [token])
    const onError = useCallback(() => setImageSource(getDefaultTokenImage(token)), [token])

    return children(imageSource, onError)
}

const TokenImage = ({token}:{token: GenericToken}) => {
    return <ContainerWithImage token={token}>
        {(imageSource, onError) => <TokenImageContainer>
            <TokenImageRelativeContainer>
                <TokenNFT src={imageSource} alt={"TokenImage"} onError={onError}/>
                {getTokenImageShadow(token)}
            </TokenImageRelativeContainer>
        </TokenImageContainer>}
    </ContainerWithImage>
}

const TokenDetails = ({children, token}: {
    children?: ReactNode, token: GenericToken
}) => <TokenDetailsContainer>
    <Tooltip title={token.name} arrow>
        <TokenType>{token.name}</TokenType>
    </Tooltip>
    <Tooltip title={`#${token.tokenId}`} arrow>
        <TokenId>#{token.tokenId}</TokenId>
    </Tooltip>
     <ChildrenContainer>
         {children}
    </ChildrenContainer>
</TokenDetailsContainer>

export const Token = forwardRef(({children, token, styles = {}, backgroundType = BackgroundType.DEFAULT}: {
    children?: ReactNode, token: GenericToken, styles?: CSSProperties, backgroundType?: BackgroundType
}, tokenRef: ForwardedRef<any>) => {
    return <TokenContainer ref={tokenRef} style={styles}>
        <TokenBackgroundImage src={getBackground(backgroundType)} alt={"TokenBackground"}/>
        <TokenImage token={token}/>
        <TokenDetails token={token}>{children}</TokenDetails>
    </TokenContainer>
})

const PairedTokenContainer = styled.img`
    ${FULL_HEIGHT}
    min-width: ${PAIRED_TOKEN_WIDTH};
    max-width: ${PAIRED_TOKEN_WIDTH};
    max-height: ${PAIRED_TOKEN_HEIGHT};
    ${NO_USER_SELECT}
    ${FLEX_CENTERED_CONTAINER}
    ${TOKEN_IMAGE_BORDER}
    
    &:hover {
        transform: scale(5);
    }
`

export const PairedToken = forwardRef(({token, styles = {}}: {
    token: GenericToken, styles?: CSSProperties
}, tokenRef: ForwardedRef<any>) => {
    return <ContainerWithImage token={token}>
        {(imageSource, onError) => <Tooltip title={buildTokenDetails(token)} arrow>
            <PairedTokenContainer src={imageSource} onError={onError}
                                  ref={tokenRef} style={styles}/>
        </Tooltip>}
    </ContainerWithImage>
})
