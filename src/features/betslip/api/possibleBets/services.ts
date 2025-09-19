import { queryClientAtom } from 'jotai-tanstack-query';
import filter from 'lodash/filter';
import get from 'lodash/get';
import reject from 'lodash/reject';

import { queryKeys } from '@solo-account/api/queryKeys';
import { isAuthenticatedAtom, userDataAtom } from '@solo-account/store/atoms';
import type { FreebetCredits } from '@solo-account/types';
import { api } from '@solo-api/api';
import { store } from '@solo-utils/jotai';

import { Currency } from 'src/common/enums';
import { getValue } from 'src/common/recoil/snapshot';

import { getChannel } from '../../helpers/helpers';
import { uncheckedBetIdsAtom } from '../../store/atoms/betslipBets';
import { betslipActiveTabAtom } from '../../store/atoms/betslipTab';
import { betslipSelectionsAtom } from '../../store/atoms/selections';
import { multipleBetStakesAtom } from '../../store/atoms/stake';
import { isPossibleLegChecked } from '../../store/helpers/possibleBets';
import { parseEvents } from '../helpers';
import type { PossibleBetApiData, PossibleBetApiResponse, PossibleBetApiReturn, PossibleBetsApiParams } from '../types';

export const getPossibleBetsApi = async ({
    combinations,
    legs,
    isFreeBetTax,
    triggeredBy,
    snapshot,
    signal,
    id,
}: PossibleBetsApiParams): Promise<PossibleBetApiReturn | null> => {
    const userData = store.get(userDataAtom);
    const isAuthenticated = store.get(isAuthenticatedAtom);
    const queryClient = store.get(queryClientAtom);
    const freebetCredits = queryClient.getQueryData<FreebetCredits>(
        queryKeys.user.freebetCredits(String(userData?.id)).queryKey,
    );
    const hasFreebetCredits = Boolean(freebetCredits?.totalAmount);

    const activeBetslipTab = getValue(snapshot, betslipActiveTabAtom);
    const betslipSelections = getValue(snapshot, betslipSelectionsAtom);
    const uncheckedBetIds = getValue(snapshot, uncheckedBetIdsAtom);
    const multipleBetStakes = getValue(snapshot, multipleBetStakesAtom);
    const stakePerLine = get(multipleBetStakes, activeBetslipTab, 0);
    const currency = get(userData, 'wallet.currency', Currency.GBP);

    try {
        const data = await api.post<PossibleBetApiResponse, PossibleBetApiData | null>(
            '/betslip/possible-bets',
            {
                betslipSelections,
                betslipState: { activeBetslipTab, stakePerLine },
                channel: getChannel(),
                combinations,
                legs: filter(legs, isPossibleLegChecked(uncheckedBetIds)),
                uncheckedLegs: reject(legs, isPossibleLegChecked(uncheckedBetIds)),
                isFreeBet: isAuthenticated ? hasFreebetCredits : false,
                isFreeBetTax,
                triggeredBy,
                currency,
            },
            { id },
            signal,
        );

        const events = parseEvents(data);
        const { selectedBets, selectedBetsProblems } = data.originalResponse;

        return {
            bets: data.bets,
            combinations: data.combinations,
            competitions: data.competitions,
            sports: data.sports,
            selectedBets,
            selectedBetsProblems,
            events,
        };
    } catch (error) {
        if (signal?.aborted === true) {
            return null;
        }

        throw error;
    }
};
