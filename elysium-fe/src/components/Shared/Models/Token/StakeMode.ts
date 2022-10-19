import FrontLineOffensiveImage from "../../../../assets/Icons/frontlineOffensive.png";
import OptimalOffensiveImage from "../../../../assets/Icons/optimalOffensive.png";
import StrategicDefensiveImage from "../../../../assets/Icons/strategicDefensive.png";

export enum StakeMode {
    FIRST = 'STRATEGIC_DEFENSIVE', SECOND = 'OPTIMAL_OFFENSIVE', THIRD = 'FRONTLINE_OFFENSIVE'
}

export const getTitleForStakedGodsMode = (mode: StakeMode): string => {
    switch (mode) {
        case StakeMode.FIRST:
            return 'Strategic Defensive'
        case StakeMode.SECOND:
            return 'Optimal Offensive'
        case StakeMode.THIRD:
            return 'Front-Line Offensive'
        default:
            throw new Error("Mode has not been defined")
    }
}

export const getStakeModeIconSource = (mode: StakeMode): string => {
    switch (mode) {
        case StakeMode.FIRST:
            return StrategicDefensiveImage
        case StakeMode.SECOND:
            return OptimalOffensiveImage
        case StakeMode.THIRD:
            return FrontLineOffensiveImage
        default:
            throw new Error("Mode has not been defined")
    }
}
