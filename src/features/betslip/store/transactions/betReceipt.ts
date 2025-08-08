import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import type { TransactionInterface_UNSTABLE as TransactionInterface } from 'recoil';

import { enabledBuildABetIdsAtom } from '@solo-buildABet/store/atoms';
import { store } from '@solo-utils/jotai';

import { LegType, RouteName } from 'src/common/enums';
import { routeNameAtom } from 'src/store/common/atoms';

import { betReceiptAtom } from '../atoms/betReceipt';
import { placeBetStatusAtom } from '../atoms/betslip';
import { betsAtom } from '../atoms/betslipBets';
import { betslipSelectionsAtom } from '../atoms/selections';
import { rejectBuildABetFromOtherEvent, rejectMultiBets } from '../helpers/betslipBets';
import {
    enableBuildABetSelectionsRelation,
    enableCrossBetSelectionsRelation,
    resetMultiBetSelectionsRelation,
} from '../helpers/selection/relation';

export const resetBetReceiptTransaction = ({ get, reset }: TransactionInterface) => {
    const betReceipt = get(betReceiptAtom);

    if (isEmpty(betReceipt.legs)) {
        return;
    }

    reset(placeBetStatusAtom);
    reset(betReceiptAtom);
};

export const syncRelationsAfterKeepingPlacedBetsTransaction =
    (eventId?: number) =>
    ({ get, set }: TransactionInterface) => {
        const routeName = store.get(routeNameAtom);
        const isCrossBetPage = routeName === RouteName.CrossBetting;
        const isEventPage = routeName === RouteName.Event;

        if (!isCrossBetPage && !isEventPage) {
            set(betslipSelectionsAtom, resetMultiBetSelectionsRelation);
            set(betsAtom, rejectMultiBets([LegType.BuildABet, LegType.CrossBet]));

            return;
        }

        if (isCrossBetPage) {
            set(betslipSelectionsAtom, enableCrossBetSelectionsRelation);
            set(betsAtom, rejectMultiBets([LegType.BuildABet]));

            return;
        }

        if (isEventPage) {
            const isEnabled = eventId !== undefined && includes(get(enabledBuildABetIdsAtom), eventId);

            if (isEnabled) {
                set(betslipSelectionsAtom, enableBuildABetSelectionsRelation(eventId));
                set(betsAtom, rejectBuildABetFromOtherEvent(eventId));

                return;
            }

            set(betslipSelectionsAtom, resetMultiBetSelectionsRelation);
            set(betsAtom, rejectMultiBets([LegType.BuildABet, LegType.CrossBet]));
        }
    };
