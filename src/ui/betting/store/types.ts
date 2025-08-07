import type { BettingTab } from 'src/common/enums';

export interface Betting {
    bettingTab: BettingTab;
    showBackdrop: boolean;
    showQuickBet: boolean;
    showMyBets: boolean;
}

export const enum QuickBetAnimationState {
    Close = 'close',
    Open = 'open',
    Preview = 'preview',
}
