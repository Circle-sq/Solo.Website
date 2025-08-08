import map from 'lodash/map';

import type { MyBetsInfiniteData, MyBetsPageData } from '@solo-api/bets/types';

import type { ModelsState } from 'src/appState/models/ModelsState';
import { MyBetsTab } from 'src/common/enums';

import { initialData } from '../store/configs';
import type { TabStatus } from '../store/types';

import { getLiveBets, getSettledBets } from './helpers';

export const syncQueryCache =
    (models: ModelsState, settledBetId: string | null, tabStatus: TabStatus, myBetsTab?: MyBetsTab) =>
    ({ pages, pageParams }: MyBetsInfiniteData): MyBetsInfiniteData => {
        switch (myBetsTab) {
            case MyBetsTab.Live: {
                const livePages = map(pages, ({ bets, ...page }) => {
                    return {
                        ...page,
                        bets: getLiveBets(models, settledBetId, bets),
                    };
                });

                return { pageParams, pages: livePages };
            }

            case MyBetsTab.CashOut:
                return { pages, pageParams };

            case MyBetsTab.Settled: {
                const settledPages = map(pages, ({ bets, ...page }) => {
                    return {
                        ...page,
                        bets: getSettledBets(tabStatus, bets),
                    };
                });

                return { pageParams, pages: settledPages };
            }

            default:
                return initialData;
        }
    };

export const prepareMyBetsPageData = (
    page: MyBetsPageData,
    models: ModelsState,
    settledBetId: string | null,
    tabStatus: TabStatus,
    myBetsTab?: MyBetsTab,
): MyBetsPageData => {
    switch (myBetsTab) {
        case MyBetsTab.Live: {
            return { ...page, bets: getLiveBets(models, settledBetId, page.bets) };
        }

        case MyBetsTab.CashOut:
            return page;

        case MyBetsTab.Settled: {
            return { ...page, bets: getSettledBets(tabStatus, page.bets) };
        }

        default:
            return initialData.pages[0];
    }
};
