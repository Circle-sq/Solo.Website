import { atom } from 'recoil';

import { MutationStatus } from 'src/common/enums/status';

import type { BetError } from '../../api/types/error';
import type { Problem } from '../../api/types/problem';
import type { Betslip, PossibleBetsTrigger } from '../types';

export const betslipAtom = atom<Betslip>({
    key: 'betslipAtom',
    default: {
        showBettingSettings: false,
    },
});

export const betslipErrorsAtom = atom<BetError[]>({
    key: 'betslipErrorsAtom',
    default: [],
});

export const betslipProblemsAtom = atom<Problem[]>({
    key: 'betslipProblemsAtom',
    default: [],
});

export const placeBetStatusAtom = atom<MutationStatus>({
    key: 'placeBetStatusAtom',
    default: MutationStatus.Idle,
});

export const possibleBetsTriggersAtom = atom<PossibleBetsTrigger[]>({
    key: 'possibleBetsTriggersAtom',
    default: [],
});
