import type { BetslipTab } from 'src/common/enums';

export interface TabItem {
    tab: BetslipTab;
    langKey: string;
    defaultText: string;
}
