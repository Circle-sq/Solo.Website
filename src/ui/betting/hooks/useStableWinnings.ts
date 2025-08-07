import { useRef } from 'react';
import { useRecoilValue } from 'recoil';

import { isPossibleBetsLoadingSelector } from '@sc-betslip/store/selectors/betslip';
import { possibleWinningsSelector } from '@sc-betslip/store/selectors/stake';

export const useStableWinnings = () => {
    const isPossibleBetsLoading = useRecoilValue(isPossibleBetsLoadingSelector);
    const possibleWinnings = useRecoilValue(possibleWinningsSelector);
    const previousPossibleWinnings = useRef(possibleWinnings);

    if (!isPossibleBetsLoading) {
        previousPossibleWinnings.current = possibleWinnings;
    }

    return isPossibleBetsLoading ? previousPossibleWinnings.current : possibleWinnings;
};
