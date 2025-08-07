import isEmpty from 'lodash/isEmpty';
import { selector } from 'recoil';

import { betslipAtom, possibleBetsTriggersAtom } from '../atoms/betslip';

export const showBettingSettingsSelector = selector<boolean>({
    key: 'showBettingSettingsSelector',
    get: ({ get }) => {
        const { showBettingSettings } = get(betslipAtom);

        return showBettingSettings;
    },
});

export const isPossibleBetsLoadingSelector = selector<boolean>({
    key: 'isPossibleBetsLoadingSelector',
    get: ({ get }) => !isEmpty(get(possibleBetsTriggersAtom)),
});
