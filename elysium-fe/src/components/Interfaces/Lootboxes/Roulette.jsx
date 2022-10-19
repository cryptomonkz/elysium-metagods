import 'react-roulette-pro/dist/index.css';
import {useEffect, useState} from "react";

import RoulettePro from 'react-roulette-pro';
import {doWithMounted} from "../../Shared/Utils/ComponentUtils";
import {SPIN_ROULETTE_TIMEOUT} from "../../Shared/Constants/TimeoutConstants";
import RouletteSound from "../../../assets/Sounds/roulette.mp3";

const Roulette = ({rouletteItems, winningIndex, isSoundEnabled, onSpinEnd}) => {
    const [isRouletteSpinning, setIsRouletteSpinning] = useState(false)

    useEffect(() => doWithMounted(isMounted => {
        setTimeout(() => isMounted.isMounted && setIsRouletteSpinning(true), SPIN_ROULETTE_TIMEOUT)
    }), [])

    return <RoulettePro
        spinningTime={5}
        prizes={rouletteItems}
        prizeIndex={winningIndex}
        start={isRouletteSpinning}
        onPrizeDefined={onSpinEnd}
        designOptions={{withoutAnimation: true}}
        classes={{wrapper: 'roulette-wrapper-style'}}
        {...(isSoundEnabled ? {soundWhileSpinning: RouletteSound} : {})}/>
}

export default Roulette
