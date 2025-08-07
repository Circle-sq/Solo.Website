import { I18n } from 'src/ui/common/Language/I18n';

import { SpeedBetTab } from '../../../enums';

import { S_Tabs } from './styled';
import Tab from './Tab';

const SpeedBetTabs = () => {
    return (
        <S_Tabs>
            <Tab tab={SpeedBetTab.Statistics}>
                <I18n langKey='speedBet.tabs.statistics' defaultText='Statistics' />
            </Tab>
            <Tab tab={SpeedBetTab.SpeedBet}>
                <I18n langKey='speedBet.tabs.speedBet' defaultText='Speed bet' />
            </Tab>
        </S_Tabs>
    );
};

export default SpeedBetTabs;
