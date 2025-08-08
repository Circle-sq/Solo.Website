import { useRecoilValue } from 'recoil';

import { possibleBetsTriggersAtom } from '@solo-betslip/store/atoms/betslip';
import { betslipBetsCounterSelector } from '@solo-betslip/store/selectors/betslipBets';

export const useIsInitializing = () => {
    const betsCount = useRecoilValue(betslipBetsCounterSelector);
    const possibleBetsTriggers = useRecoilValue(possibleBetsTriggersAtom);

    const isAdding = possibleBetsTriggers.some(({ triggeredBy }) => triggeredBy.startsWith('ADD'));
    const isInitializing = betsCount === 0 && isAdding;

    return isInitializing;
};
