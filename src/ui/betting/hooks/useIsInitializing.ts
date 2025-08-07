import { useRecoilValue } from 'recoil';

import { possibleBetsTriggersAtom } from '@sc-betslip/store/atoms/betslip';
import { betslipBetsCounterSelector } from '@sc-betslip/store/selectors/betslipBets';

export const useIsInitializing = () => {
    const betsCount = useRecoilValue(betslipBetsCounterSelector);
    const possibleBetsTriggers = useRecoilValue(possibleBetsTriggersAtom);

    const isAdding = possibleBetsTriggers.some(({ triggeredBy }) => triggeredBy.startsWith('ADD'));
    const isInitializing = betsCount === 0 && isAdding;

    return isInitializing;
};
