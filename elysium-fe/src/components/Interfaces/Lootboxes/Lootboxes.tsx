import React from 'react'
import {TabsWithAccount} from "../../Shared/Components/Tab/Tabs";
import Shop from "./Shop";
import LootboxHistory from "./LootboxHistory";

enum TAB {
    SHOP = 'SHOP', HISTORY = 'HISTORY'
}

const getTabs = () => {
    return Object.keys(TAB).map(tabName => ({name: tabName, value: TAB[tabName as keyof typeof TAB]}))
}

const TabsData = ({account, selectedTab}: {account: string, selectedTab: TAB}) => {
    return <>
        {selectedTab === TAB.SHOP && <Shop account={account}/>}
        {selectedTab === TAB.HISTORY && <LootboxHistory account={account}/>}
    </>
}

const Lootboxes = () => <TabsWithAccount defaultTab={TAB.SHOP} tabs={getTabs()}>
    {(account, selectedTab) => <TabsData account={account} selectedTab={selectedTab}/>}
</TabsWithAccount>


export default Lootboxes