import type { SPORT_BOOK_MESSAGES } from 'src/utils/constants';

export interface PostMessageData {
    type?: (typeof SPORT_BOOK_MESSAGES)[keyof typeof SPORT_BOOK_MESSAGES];
    value?: {
        token?: string;
        jwt?: string;
        oddsFormat?: string;
        dateFormat?: string;
        language?: string;
        setUrl?: string;
        shortDateFormat?: string;
        theme?: string;
        guestCurrency?: string;
    };
}

export interface BetslipUpdatePostMessage {
    betsCount: number;
    showIcon: boolean;
    stake?: number;
    potentialReturns?: number;
}
