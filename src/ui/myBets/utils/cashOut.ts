import findIndex from 'lodash/findIndex';
import flatMap from 'lodash/flatMap';
import includes from 'lodash/includes';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';
import reject from 'lodash/reject';

import type { MyBetsInfiniteData, MyBetsPageData } from '@solo-api/bets/types';

import { BetStatus, MyBetsTab, RequestStatus } from 'src/common/enums';
import type { RequestError } from 'src/common/types/error';
import type { CashOutBet, MyBet, MyBets } from 'src/common/types/myBet';

import { CASHOUT_STATUSES, SETTLED_STATUSES } from '../store/configs';

export const findMyBetIndex = (bets: MyBet[], id: string) => findIndex(bets, { id });

export const findMyBetPosition = (pages: MyBetsPageData[], id: string) => {
    let betIndex = -1;
    const pageIndex = findIndex(pages, ({ bets }) => {
        betIndex = findMyBetIndex(bets, id);

        return betIndex !== -1;
    });

    return [pageIndex, betIndex];
};

export const updateBetStatus = (bet: MyBet): MyBet => {
    if (bet.status === BetStatus.Parked) {
        return { ...bet, status: BetStatus.Open };
    }

    return bet;
};

export const updateBetCashOut = (cashout: CashOutBet, bet: MyBet): MyBet | null => {
    if (!cashout) {
        return null;
    }

    return { ...bet, cashout };
};

export const getTabByBetStatus = ({ status }: MyBet): MyBetsTab | undefined => {
    if (includes(SETTLED_STATUSES, status)) {
        return MyBetsTab.Settled;
    }

    if (includes(CASHOUT_STATUSES, status)) {
        return MyBetsTab.CashOut;
    }

    return undefined;
};

export const updateCashOutPages = (
    pages: MyBetsPageData[],
    wsBet: MyBet,
    settledBetId: string | null,
    myBetsTab?: MyBetsTab,
    queryStatus?: BetStatus | BetStatus[],
): MyBetsPageData[] => {
    const tab = getTabByBetStatus(wsBet);

    if (isEmpty(flatMap(pages, 'bets'))) {
        if (tab === myBetsTab) {
            return [{ bets: [wsBet], total: 1 }];
        }

        return pages;
    }

    const [pageIndex, betIndex] = findMyBetPosition(pages, wsBet.id);

    if (pageIndex === -1) {
        const lastPageIndex = pages.length > 0 ? pages.length - 1 : 0;

        return pages.map((page, index) => {
            if (lastPageIndex === index) {
                return { ...page, bets: [wsBet, ...page.bets], total: page.total + 1 };
            }

            return page;
        });
    }

    if (tab !== myBetsTab) {
        return pages.map((page) => ({
            ...page,
            bets: reject(page.bets, ({ id }) => id === wsBet.id && id !== settledBetId),
        }));
    }

    const { bets } = pages[pageIndex];
    const isStatusChanged = isArray(queryStatus) && !includes(queryStatus, bets[betIndex].status);

    if (isStatusChanged) {
        return pages.map((page, index) => {
            if (pageIndex === index) {
                const updatedBets = reject(page.bets, { id: wsBet.id });

                return { ...page, bets: updatedBets, total: updatedBets.length };
            }

            return page;
        });
    }

    return pages.map((page, index) => {
        if (pageIndex === index) {
            const updatedBets = page.bets.map((bet) => {
                if (bet.id === wsBet.id) {
                    return { ...bet, ...wsBet };
                }

                return bet;
            });

            return { ...page, bets: updatedBets };
        }

        return page;
    });
};

export const getCashOutBetsToUpdate = (bets: MyBet[]): MyBets =>
    bets.reduce((acc: MyBets, bet) => {
        if (bet.status === BetStatus.Open || bet.status === BetStatus.Unsettled) {
            acc[bet.id] = bet;
        }

        return acc;
    }, {});

export const updateQueryDataByCashOuts =
    (betCashOut: MyBet) =>
    ({ pages, pageParams }: MyBetsInfiniteData): MyBetsInfiniteData => {
        if (isEmpty(pages)) {
            const page = { bets: [betCashOut], total: 1 };

            return { pageParams, pages: [page] };
        }

        const updatedPages = pages.map((page) => {
            const updatedBets = page.bets.map((bet) => {
                if (bet.id !== betCashOut.id) {
                    return bet;
                }

                return { ...bet, ...betCashOut };
            });

            return { ...page, bets: updatedBets, total: updatedBets.length };
        });

        return { pageParams, pages: updatedPages };
    };

export const retrieveCashOutRequest =
    (betId: string) =>
    ({ pages, pageParams }: MyBetsInfiniteData): MyBetsInfiniteData => {
        const [pageIndex, betIndex] = findMyBetPosition(pages, betId);

        if (pageIndex === -1) {
            return { pages, pageParams };
        }

        const { bets } = pages[pageIndex];

        const updatedBets = bets.map((bet, index) => {
            if (betIndex === index) {
                return { ...bet, _state: RequestStatus.InProgress };
            }

            return bet;
        });

        const updatedPages = pages.map((page, index) => {
            if (pageIndex === index) {
                return { ...page, bets: updatedBets };
            }

            return page;
        });

        return {
            pages: updatedPages,
            pageParams,
        };
    };

export const retrieveCashOutSuccess =
    ({ id: betId, settledAt, status, payout }: MyBet) =>
    ({ pages, pageParams }: MyBetsInfiniteData): MyBetsInfiniteData => {
        const [pageIndex, betIndex] = findMyBetPosition(pages, betId);

        if (pageIndex === -1) {
            return { pages, pageParams };
        }

        const { bets } = pages[pageIndex];

        const updatedBets = bets.map((bet, index) => {
            if (betIndex === index) {
                return {
                    ...bet,
                    cashOut: true,
                    _state: RequestStatus.Ready,
                    settledAt,
                    status,
                    payout,
                };
            }

            return bet;
        });

        const updatedPages = pages.map((page, index) => {
            if (pageIndex === index) {
                return { ...page, bets: updatedBets };
            }

            return page;
        });

        return {
            pages: updatedPages,
            pageParams,
        };
    };

export const retrieveCashOutError =
    (betId: string, error: RequestError) =>
    ({ pages, pageParams }: MyBetsInfiniteData): MyBetsInfiniteData => {
        const [pageIndex, betIndex] = findMyBetPosition(pages, betId);

        if (pageIndex === -1) {
            return { pages, pageParams };
        }

        const { bets } = pages[pageIndex];

        const updatedBets = bets.map((bet, index) => {
            if (betIndex === index) {
                return {
                    ...bet,
                    _state: RequestStatus.Error,
                    errors: error.body ?? error.message,
                };
            }

            return bet;
        });

        const updatedPages = pages.map((page, index) => {
            if (pageIndex === index) {
                return { ...page, bets: updatedBets };
            }

            return page;
        });

        return {
            pages: updatedPages,
            pageParams,
        };
    };

export const clearRetrievedCashOut =
    (betId: string, errorOnly = false) =>
    ({ pages, pageParams }: MyBetsInfiniteData): MyBetsInfiniteData => {
        const [pageIndex, betIndex] = findMyBetPosition(pages, betId);

        if (pageIndex === -1) {
            return { pages, pageParams };
        }

        const { bets } = pages[pageIndex];
        let updatedBets: MyBet[] = [];

        if (errorOnly) {
            updatedBets = bets.map((bet, index) => (betIndex === index ? omit(bet, 'errors') : bet));
        } else {
            updatedBets = reject(bets, { id: betId });
        }

        const updatedPages = pages.map((page, index) => {
            if (pageIndex === index) {
                return {
                    ...page,
                    bets: updatedBets,
                    total: updatedBets.length,
                };
            }

            return page;
        });

        return {
            pages: updatedPages,
            pageParams,
        };
    };
