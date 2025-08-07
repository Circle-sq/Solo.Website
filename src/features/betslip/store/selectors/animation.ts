import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import some from 'lodash/some';
import { selector, selectorFamily } from 'recoil';

import { PriceChange } from 'src/common/enums';
import { priceDirectionAtomFamily } from 'src/ui/events/store/atoms';

import { splitIds } from '../../helpers/multiBet';
import { animationRecordsAtom, animationSubstitutionTagAtom } from '../atoms/animation';
import { betslipSelectionsAtom } from '../atoms/selections';

export const isAnimationInProgressSelector = selector<boolean>({
    key: 'isAnimationInProgressSelector',
    get: ({ get }) => {
        return !isEmpty(get(animationRecordsAtom));
    },
});

export const showAnimationLoaderSelectorFamily = selectorFamily<boolean, string>({
    key: 'showAnimationLoaderSelectorFamily',
    get:
        (betId) =>
        ({ get }) => {
            const animationRecords = get(animationRecordsAtom);

            if (isEmpty(animationRecords)) {
                return false;
            }

            return some(animationRecords, (_, key) => includes(betId, key) || includes(key, betId));
        },
});

export const showFadeInAnimationSelectorFamily = selectorFamily<boolean, number | undefined>({
    key: 'showFadeInAnimationSelectorFamily',
    get:
        (eventId) =>
        ({ get }) =>
            get(animationSubstitutionTagAtom) === eventId,
});

export const priceChangeSelectorFamily = selectorFamily<PriceChange | null, string>({
    key: 'priceChangeSelectorFamily',
    get:
        (betId) =>
        ({ get }) => {
            for (const selectionId of splitIds(betId)) {
                const priceDirection = get(priceDirectionAtomFamily(Number(selectionId)));

                if (priceDirection !== null) {
                    return priceDirection;
                }
            }

            return null;
        },
});

export const hasPriceWentDownSelector = selector<boolean>({
    key: 'hasPriceWentDownSelector',
    get: ({ get }) => {
        return some(get(betslipSelectionsAtom), ({ selectionId }) => {
            const priceDirection = get(priceDirectionAtomFamily(+selectionId));

            return priceDirection === PriceChange.Down;
        });
    },
});
