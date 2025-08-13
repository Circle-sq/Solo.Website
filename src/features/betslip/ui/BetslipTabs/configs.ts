import { BetslipTab } from 'src/common/enums';

import type { TabItem } from './types';

export const BETTING_RULES = 'https://rule.solo.com/?id=162';

export const LINK_NAME = 'solo-systems-betting-rule';

export const windowFeatures = 'width=1024, height=750, noopener';

export const betslipTabs: readonly TabItem[] = [
    {
        tab: BetslipTab.Single,
        langKey: 'betslip.header.singles',
        defaultText: 'Singles',
    },
    {
        tab: BetslipTab.Multi,
        langKey: 'betslip.header.multiples',
        defaultText: 'Multiples',
    },
    {
        tab: BetslipTab.System,
        langKey: 'betslip.header.system',
        defaultText: 'System',
    },
];
