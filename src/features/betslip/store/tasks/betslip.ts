import type { CallbackInterface } from 'recoil';
import { getRecoil, resetRecoil } from 'recoil-nexus';

import { betslipAtom } from '../atoms/betslip';
import { resetBetslipStateTransaction } from '../transactions/betslip';

export const closeBettingSettingsPopupTask =
    ({ set }: CallbackInterface) =>
    () => {
        set(betslipAtom, (state) => ({ ...state, showBettingSettings: false }));
    };

export const openBettingSettingsPopupTask =
    ({ set }: CallbackInterface) =>
    () => {
        set(betslipAtom, (state) => ({ ...state, showBettingSettings: true }));
    };

export const resetBetslipStateTask =
    ({ transact_UNSTABLE: transact }: CallbackInterface) =>
    () => {
        transact(resetBetslipStateTransaction);
    };

export const resetBetslipState = () => {
    resetBetslipStateTransaction({ get: getRecoil, reset: resetRecoil });
};
