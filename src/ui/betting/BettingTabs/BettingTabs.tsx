import { useRecoilValue } from 'recoil';

import { betslipBetsCounterSelector } from '@sc-betslip/store/selectors/betslipBets';
import Betslip from '@sc-betslip/ui/Betslip';

import { BettingTab } from 'src/common/enums';
import { I18n } from 'src/ui/common/Language/I18n';
import MyBets from 'src/ui/myBets/MyBets';

import { S_BetsIndicator, S_BettingTabs, S_TabList } from './styled';
import Tab from './Tab';
import TabPanel from './TabPanel';

const BettingTabs = () => {
    const betsCount = useRecoilValue(betslipBetsCounterSelector);

    const showBetsIndicator = betsCount > 0;

    return (
        <S_BettingTabs data-testid='bettingTabs'>
            <S_TabList>
                <Tab tab={BettingTab.Betslip}>
                    <I18n langKey='betslip.tabs.betslip' defaultText='Bet Slip' />
                    {showBetsIndicator && <S_BetsIndicator>{betsCount}</S_BetsIndicator>}
                </Tab>
                <Tab tab={BettingTab.MyBets}>
                    <I18n langKey='betslip.tabs.my-bets' defaultText='My Bets' />
                </Tab>
            </S_TabList>

            <TabPanel tab={BettingTab.Betslip}>
                <Betslip />
            </TabPanel>

            <TabPanel tab={BettingTab.MyBets}>
                <MyBets />
            </TabPanel>
        </S_BettingTabs>
    );
};

export default BettingTabs;
