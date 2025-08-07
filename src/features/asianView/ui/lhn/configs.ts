import { LHNTab, LHNTimeTab } from '../../enums';

export const lhnTabs = [
    {
        tab: LHNTab.Sports,
        langKey: 'asianView.lhn.tabs.sports',
        defaultText: 'Sports',
        testId: 'asian-lhn-sports-tab',
    },
    {
        tab: LHNTab.Betslip,
        langKey: 'asianView.lhn.tabs.betslip',
        defaultText: 'Bet Slip',
        testId: 'asian-lhn-betslip-tab',
    },
    {
        tab: LHNTab.MyBets,
        langKey: 'asianView.lhn.tabs.myBets',
        defaultText: 'My Bets',
        testId: 'asian-lhn-my-bets-tab',
    },
] as const;

export const sportTabs = [
    {
        tab: LHNTimeTab.Live,
        langKey: 'asianView.lhn.subTabs.live',
        defaultText: 'Live',
        testId: 'asian-lhn-live-sport-tab',
    },
    {
        tab: LHNTimeTab.Today,
        langKey: 'asianView.lhn.subTabs.today',
        defaultText: 'Today',
        testId: 'asian-lhn-today-sport-tab',
    },
    {
        tab: LHNTimeTab.Upcoming,
        langKey: 'asianView.lhn.subTabs.upcoming',
        defaultText: 'Upcoming',
        testId: 'asian-lhn-upcoming-sport-tab',
    },
] as const;
