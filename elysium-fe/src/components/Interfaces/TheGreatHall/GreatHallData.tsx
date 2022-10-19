import EditPanel from "./EditPanel/EditPanel";
import {Staked, Unstaked} from "./StakeUnstake/StakeUnstake";
import styled from "styled-components";
import {SeparatorType} from "../../Shared/Components/Separator";
import {device} from "../../Shared/Constants/MediaQueries";
import {SectionDescription, TitleWithSeparator} from "../../Shared/Components/Section";
import {DataGrid, GridCell, GridContainer} from "../../Shared/Components/Grid/Grid";

const GreatHallGrid = styled(DataGrid)`
    grid-template-columns: 1fr 1fr;
    @media ${device.laptopL} { 
        grid-template-columns: 2fr 3fr;
    }
`

const GreatHallData = ({account}: {account: string}) => <GridContainer>
    <GridCell>
        <TitleWithSeparator title={"GODS AND WEAPONS STAKING"} separatorType={SeparatorType.THEME_LARGE}/>
    </GridCell>
    <GreatHallGrid>
        <GridCell>
            <SectionDescription>
                Stake your MetaGods and Weapons in one of the 3 battle positions available.
            </SectionDescription>
        </GridCell>
        <GridCell>
            <EditPanel account={account}/>
        </GridCell>
        <GridCell>
            <TitleWithSeparator title={"Owned"} separatorType={SeparatorType.THEME_SMALL}
                                description={"MetaGods and Weapons that aren’t staked on the battlefield."}/>
        </GridCell>
        <GridCell>
            <TitleWithSeparator title={"Battlefield"} separatorType={SeparatorType.THEME_SMALL}
                                description={"Metagods and Weapons staked on the battlefield."}/>
        </GridCell>
        <GridCell>
            <Unstaked/>
        </GridCell>
        <GridCell>
            <Staked/>
        </GridCell>
    </GreatHallGrid>
</GridContainer>

export default GreatHallData