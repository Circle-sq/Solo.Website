import Betslip from '@solo-betslip/ui/Betslip';

import MyBets from 'src/ui/myBets/MyBets';

import { LHNTab } from '../../enums';

import { lhnTabs } from './configs';
import SportContainer from './SportContainer/SportContainer';
import SportTabs from './SportTabs/SportTabs';
import { S_TabList, S_Tabs } from './styled';
import Tab from './Tab/Tab';
import TabPanel from './TabPanel/TabPanel';

const LeftHandNavigation = () => {
    return (
        <S_Tabs data-testid='leftHandNavigation'>
            <S_TabList>
                {lhnTabs.map(({ tab, langKey, defaultText, testId }) => (
                    <Tab key={testId} tab={tab} langKey={langKey} defaultText={defaultText} testId={testId} />
                ))}
            </S_TabList>

            <TabPanel tab={LHNTab.Sports}>
                <SportTabs />
                <SportContainer />
            </TabPanel>

            <TabPanel tab={LHNTab.Betslip}>
                <Betslip />
            </TabPanel>

            <TabPanel tab={LHNTab.MyBets}>
                <MyBets />
            </TabPanel>
        </S_Tabs>
    );
};

export default LeftHandNavigation;
