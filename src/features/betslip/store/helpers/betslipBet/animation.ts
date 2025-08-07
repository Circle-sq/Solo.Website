import includes from 'lodash/includes';
import pickBy from 'lodash/pickBy';
import some from 'lodash/some';

import type { BetslipSelections } from '../../types';

export const addAnimationRecord =
    (animationKey: string) =>
    (state: Record<string, number>): Record<string, number> => {
        if (animationKey in state) {
            return state;
        }

        return {
            ...state,
            [animationKey]: Date.now(),
        };
    };

export const syncAnimationRecords =
    (selections: BetslipSelections) =>
    (state: Record<string, number>): Record<string, number> =>
        pickBy(state, (_, animationKey) => some(selections, ({ selectionId }) => includes(animationKey, selectionId)));
