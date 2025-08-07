import getIn from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';
import mapValues from 'lodash/mapValues';
import size from 'lodash/size';
import some from 'lodash/some';
import { selector, selectorFamily } from 'recoil';

import type { FreeBetAssignment, FreeBetAssignments, MultipleFreeBets } from '../../api/types/freeBet';
import { freeBetsAtom } from '../atoms/freeBets';
import { emptyFreeBetAssignment } from '../configs';
import { getAppliedFreeBets } from '../helpers/freeBets';

import { activeBetsCountSelector } from './betslipBets';
import { isMultiTabSelector, isSingleTabSelector } from './betslipTab';
import { multipleCombinationTypeSelector } from './combinations';

export const appliedFreeBetsSelector = selector<FreeBetAssignments<number>>({
    key: 'appliedFreeBetsSelector',
    get: ({ get }) => getAppliedFreeBets(get(freeBetsAtom)),
});

export const hasAppliedFreeBetsSelector = selector<boolean>({
    key: 'hasAppliedFreeBetsSelector',
    get: ({ get }) => !isEmpty(get(appliedFreeBetsSelector)),
});

export const isAllBetsAreFreeBetsSelector = selector<boolean>({
    key: 'isAllBetsAreFreeBetsSelector',
    get: ({ get }) => {
        const activeBetsCount = get(activeBetsCountSelector);
        const activeFreeBetsCount = size(get(appliedFreeBetsSelector));

        return activeFreeBetsCount > 0 && activeFreeBetsCount === activeBetsCount;
    },
});

export const availableFreeBetsSelector = selector<FreeBetAssignments>({
    key: 'availableFreeBetsSelector',
    get: ({ get }) => {
        const appliedFreeBets = get(appliedFreeBetsSelector);

        return mapValues(get(freeBetsAtom), ({ credits, selectedId }) => ({
            credits: credits.filter(({ id }) => id === selectedId || !some(appliedFreeBets, { selectedId: id })),
            selectedId,
        }));
    },
});

export const availableFreeBetsByBetIdSelectorFamily = selectorFamily<FreeBetAssignment, string>({
    key: 'availableFreeBetsByBetIdSelectorFamily',
    get:
        (betId) =>
        ({ get }) => {
            const availableFreeBets = get(availableFreeBetsSelector);

            return getIn(availableFreeBets, betId, emptyFreeBetAssignment);
        },
});

export const freeBetsForMultipleTabSelector = selector<MultipleFreeBets>({
    key: 'freeBetsForMultiBetSelector',
    get: ({ get }) => {
        const availableFreeBets = get(availableFreeBetsSelector);
        const type = get(multipleCombinationTypeSelector);

        if (type === undefined) {
            return { betId: null, multipleFreeBets: emptyFreeBetAssignment };
        }

        const betId = `all${type}`;
        const multipleFreeBets = getIn(availableFreeBets, betId, emptyFreeBetAssignment);

        return { betId, multipleFreeBets };
    },
});

export const hasAppliedFreeBetOnMultipleTabSelector = selector<boolean>({
    key: 'hasAppliedFreeBetOnMultipleTabSelector',
    get: ({ get }) => {
        const isAllBetsAreFreeBets = get(isAllBetsAreFreeBetsSelector);
        const { multipleFreeBets } = get(freeBetsForMultipleTabSelector);

        return !isNull(multipleFreeBets.selectedId) || isAllBetsAreFreeBets;
    },
});

export const showCardFreeBetsDropdown = selectorFamily<boolean, string>({
    key: 'showCardFreeBetsDropdown',
    get:
        (betId) =>
        ({ get }) => {
            const singleFreeBets = get(availableFreeBetsByBetIdSelectorFamily(betId));

            return get(isSingleTabSelector) && !isEmpty(singleFreeBets.credits);
        },
});

export const showSummaryFreeBetsDropdown = selector<boolean>({
    key: 'showSummaryFreeBetsDropdown',
    get: ({ get }) => {
        const { multipleFreeBets } = get(freeBetsForMultipleTabSelector);

        return get(isMultiTabSelector) && !isEmpty(multipleFreeBets.credits);
    },
});
