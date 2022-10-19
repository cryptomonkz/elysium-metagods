import {useCallback, useState} from 'react';
import styled from "styled-components";
import {enableGrid, removeHighlight} from '../../../Shared/State/Highlighted/HighlightedService';
import {TransparentContainer} from "../../../Shared/Components/TransparentContainer";
import {Spacing} from "../../../Shared/Constants/StylesConstants";
import GridIconImage from '../../../../assets/Images/hashIcon.png';
import StyledInputSwitch from "../../../Shared/Components/StyledInputSwitch";

const GridToggler = () => {
    const [gridEnabled, setGridEnabled] = useState(false)

    const handleHighlight = useCallback(() => {
        enableGrid(!gridEnabled)
        setGridEnabled(!gridEnabled)
        removeHighlight()
    }, [gridEnabled])

    return <GridTogglerContainer>
        <GridIcon alt={"GridIcon"} src={GridIconImage}/>
        <StyledInputSwitch checked={gridEnabled} onChange={handleHighlight}/>
    </GridTogglerContainer>
}

const GridTogglerContainer = styled(TransparentContainer)`
    padding: 0;
`

const GridIcon = styled.img`
    width: 1rem;
    height: 1rem;
    position: relative;
    margin-right: ${Spacing.THIRD};
`

export default GridToggler