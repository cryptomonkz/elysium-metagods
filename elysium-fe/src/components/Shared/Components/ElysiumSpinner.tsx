import {ProgressSpinner} from 'primereact/progressspinner';
import styled from 'styled-components';
import {Spacing} from "../Constants/StylesConstants";

const StyledSpinner = styled(ProgressSpinner)`
  width: ${Spacing.THIRD};
  height: ${Spacing.THIRD};
  margin: ${Spacing.SECOND};
  align-self: center;
  justify-content: center;
`

export const ElysiumSpinner = ({loading, ...props}: { loading: boolean }) => {
  return <>
      {loading && <StyledSpinner {...props}/>}
  </>
};

export const LargeSpinner = styled(ElysiumSpinner)`
    width: ${Spacing.FOURTH};
    height: ${Spacing.FOURTH};
`

export const ExtraLargeSpinner = styled(ElysiumSpinner)`
    width: ${Spacing.FIFTH};
    height: ${Spacing.FIFTH};
`