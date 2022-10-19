import 'react-roulette-pro/dist/index.css';
import {useEffect, useState} from "react";
import styled from "styled-components";
import {
    BOX_SHADOW,
    Color,
    FLEX_CENTERED_CONTAINER,
    FULL_WIDTH,
    GRADIENT,
    Spacing,
    Z_INDEX
} from "../../Shared/Constants/StylesConstants";
import {getAbsolutePosition} from "../../Shared/Utils/StylesUtils";
import {getSoundState} from "../../Shared/State/Sound/SoundService";
import {useSelector} from "react-redux";
import Roulette from "./Roulette";
import {OpenedBoxResponse} from "../../Shared/Service/LootboxesService";

const RouletteBox = styled.div`
    ${FULL_WIDTH}
    ${FLEX_CENTERED_CONTAINER}
    margin: ${Spacing.THIRD} 0;
`

const RouletteShadow = styled.div`
    ${BOX_SHADOW.INSET_ROULETTE}
    border: 2px solid ${Color.SILVER};
    z-index: ${Z_INDEX.RELATIVE_SECOND};
    ${getAbsolutePosition(0, 0, 0, 0)}
`

const StyledContainer = styled.div`
    ${FULL_WIDTH}
    position: relative;
    
    .roulette-wrapper-style {
        z-index: ${Z_INDEX.RELATIVE_FIRST};
    
        .roulette-pro-regular-image-wrapper {
            ${FLEX_CENTERED_CONTAINER}
        }
        
        .roulette-pro-regular-prize-item-wrapper {
                background: ${GRADIENT.ITEM_GRADIENT};        
        }
        
        .roulette-pro-regular-prize-item-text {
            background-color: ${Color.BACKGROUND_BOX_DETAILS};
        }
        
        .roulette-pro-regular-design-top {
            background: ${GRADIENT.FIRST_THEME};
        }
    }
`

type RouletteDefinition = {id: string, image: string, text: string}
const mapPrizesToRouletteItems = (rouletteData: OpenedBoxResponse): RouletteDefinition[] => {
    return (rouletteData?.rouletteItems || []).map((item, position) => ({
        id: `ROULETTE_ITEM_${position}`, image: item.imageUrl, text: item.name
    }))
}

const RouletteContainer = ({rouletteData, onSpinEnd}:{rouletteData: OpenedBoxResponse, onSpinEnd: () => void}) => {
    const [rouletteItems, setRouletteItems] = useState<RouletteDefinition[]>([])
    const [winningIndex, setWinningIndex] = useState<number | undefined>(undefined)

    const isSoundEnabled = useSelector(applicationState => getSoundState(applicationState).isEnabled)

    useEffect(() => {
        setWinningIndex(rouletteData.wonItemIndex)
        setRouletteItems(mapPrizesToRouletteItems(rouletteData))
    }, [rouletteData])

    return <RouletteBox>
        <StyledContainer>
            {!!rouletteItems.length && winningIndex !== undefined && <Roulette
                rouletteItems={rouletteItems} winningIndex={winningIndex}
                isSoundEnabled={isSoundEnabled} onSpinEnd={onSpinEnd}/>}
            <RouletteShadow/>
        </StyledContainer>
    </RouletteBox>
}

export default RouletteContainer
