import { MyBetsTab } from 'src/common/enums';

export const myBetsTabs = [
    {
        tab: MyBetsTab.Live,
        langKey: 'betslip.tabs.live',
        defaultText: 'Live',
        testId: 'sport-live',
    },
    {
        tab: MyBetsTab.CashOut,
        langKey: 'betslip.tabs.open',
        defaultText: 'Open',
        testId: 'sport-cash_out',
    },
    {
        tab: MyBetsTab.Settled,
        langKey: 'betslip.tabs.settled',
        defaultText: 'Settled',
        testId: 'sport-settled',
    },
];
