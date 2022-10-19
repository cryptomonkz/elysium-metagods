import {FLEX_CENTERED_CONTAINER, FULL_HEIGHT, FULL_SIZE, Spacing} from "../../Constants/StylesConstants";
import styled from "styled-components";

export const GridContainer = styled.div`
    padding: ${Spacing.FIFTH} ${Spacing.FOURTH};
    ${FULL_SIZE}
    ${FLEX_CENTERED_CONTAINER}
    flex-direction: column;
    align-items: stretch;
`

export const DataGrid = styled.div`
    flex: 1;
    display: grid;
    overflow: hidden;
    grid-template-rows: max-content;
`

export const GridCell = styled.div`
    text-align: start;
    overflow: hidden;
    padding: ${Spacing.SECOND} ${Spacing.FOURTH};
`

export const ComplexCell = styled.div`
    overflow: hidden;
    ${FULL_HEIGHT}
    ${FLEX_CENTERED_CONTAINER}
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
`