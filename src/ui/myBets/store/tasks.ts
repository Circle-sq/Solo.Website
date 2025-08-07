import isEmpty from 'lodash/isEmpty';
import type { MouseEvent } from 'react';
import type { CallbackInterface } from 'recoil';

import { MyBetsTab } from 'src/common/enums';
import { isValidFullDate } from 'src/common/helpers/date';
import { getValue } from 'src/common/recoil/snapshot';
import type { MyBet } from 'src/common/types/myBet';
import { emptyDateValidation } from 'src/ui/myBets/BetFilters/helpers';

import { defineMyBetsTab } from '../utils/helpers';

import { myBetsFiltersAtom } from './atoms';
import { defaultDateRange } from './helpers';
import { TabStatus, SortFilter } from './types';
import type { DateRange } from './types';

export const defineMyBetsTabTask =
    ({ set, snapshot }: CallbackInterface) =>
    (firstPageBets: MyBet[]) => {
        const { tab: myBetsTab } = getValue(snapshot, myBetsFiltersAtom);

        if (myBetsTab !== undefined) {
            return;
        }

        if (isEmpty(firstPageBets)) {
            set(myBetsFiltersAtom, (state) => ({ ...state, tab: MyBetsTab.Settled }));

            return;
        }

        set(myBetsFiltersAtom, (state) => ({ ...state, tab: defineMyBetsTab(firstPageBets) }));
    };

export const setMyBetsTabTask =
    ({ set }: CallbackInterface) =>
    (tab: MyBetsTab) => {
        set(myBetsFiltersAtom, (state) => ({ ...state, tab }));
    };

export const resetMyBetsFiltersTask =
    ({ set }: CallbackInterface) =>
    () => {
        set(myBetsFiltersAtom, {
            tab: undefined,
            status: TabStatus.All,
            range: defaultDateRange(),
            sort: SortFilter.DescPLacedAt,
        });
    };

export const setMyBetsSortTask =
    ({ set }: CallbackInterface) =>
    (sort: SortFilter) =>
    (e: MouseEvent) => {
        e.preventDefault();
        set(myBetsFiltersAtom, (myBetsFilters) => ({
            ...myBetsFilters,
            sort,
        }));
    };

export const setTabFiltersTask =
    ({ set }: CallbackInterface) =>
    ({ status, range }: { status: TabStatus; range: DateRange }) => {
        const { from, to, isTouched = false } = range;
        let newRange = { ...range };

        const isValidRange = isValidFullDate(from) && isValidFullDate(to);

        if (isTouched && !isValidRange) {
            newRange = { ...range, ...emptyDateValidation(range) };
        }

        set(myBetsFiltersAtom, (state) => ({
            ...state,
            status,
            range: newRange.isTouched ? newRange : range,
        }));
    };

export const resetStatusFilterTask =
    ({ set }: CallbackInterface) =>
    () => {
        set(myBetsFiltersAtom, (state) => ({ ...state, status: TabStatus.All }));
    };

export const resetRangeFilterTask =
    ({ set }: CallbackInterface) =>
    () => {
        set(myBetsFiltersAtom, (state) => ({ ...state, range: defaultDateRange() }));
    };

export const resetTabFiltersTask =
    ({ set }: CallbackInterface) =>
    () => {
        set(myBetsFiltersAtom, (state) => ({ ...state, status: TabStatus.All, range: defaultDateRange() }));
    };
