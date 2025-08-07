import type { TransactionInterface_UNSTABLE as TransactionInterface } from 'recoil';

import { getSystemCombination } from '../../helpers/combinations';
import { combinationsAtom, systemBetTypeAtom, systemCombinationAtom } from '../atoms/combinations';
import { multipleBetStakesAtom } from '../atoms/stake';
import { updateCombinationsStakePerLine, updateCombinationStakePerLine } from '../helpers/combinations';

export const changeSystemBetTypeTransaction =
    (betType: string) =>
    ({ get, set }: TransactionInterface) => {
        const { system: stakePerLine } = get(multipleBetStakesAtom);
        const systemCombination = getSystemCombination(get(combinationsAtom), betType);

        set(systemBetTypeAtom, betType);
        set(systemCombinationAtom, updateCombinationStakePerLine(stakePerLine, systemCombination));
        set(combinationsAtom, updateCombinationsStakePerLine(stakePerLine, betType));
    };
