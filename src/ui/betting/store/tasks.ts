import type { CallbackInterface } from 'recoil';

import type { BettingTab } from 'src/common/enums';
import { isStandalone } from 'src/infra.client';

import { ANIMATION_WAIT_TIME_MS } from '../utils/constants';

import { bettingAtom, quickBetAnimationStateAtom, quickBetStandaloneAnimationStateAtom } from './atoms';
import { QuickBetAnimationState } from './types';

export const setBettingTabTask =
    ({ set }: CallbackInterface) =>
    (bettingTab: BettingTab) => {
        set(bettingAtom, (state) => ({ ...state, bettingTab }));
    };

export const setOpenMyBetsBettingTabTask =
    ({ set }: CallbackInterface) =>
    (bettingTab: BettingTab) => {
        set(bettingAtom, (state) => ({ ...state, showMyBets: true, bettingTab }));
    };

export const setShowBackdropTask =
    ({ set }: CallbackInterface) =>
    (showBackdrop: boolean) => {
        set(bettingAtom, (state) => ({ ...state, showBackdrop }));
    };

export const closeQuickBetTask =
    ({ set }: CallbackInterface) =>
    () => {
        set(bettingAtom, (state) => ({ ...state, showQuickBet: false }));
    };

export const resetQuickBetAnimationStateTask =
    ({ set }: CallbackInterface) =>
    async () => {
        set(bettingAtom, (state) => ({ ...state, showQuickBet: false }));

        if (isStandalone()) {
            set(quickBetStandaloneAnimationStateAtom, QuickBetAnimationState.Close);
        } else {
            set(quickBetAnimationStateAtom, QuickBetAnimationState.Close);
        }

        await new Promise((resolve) => setTimeout(resolve, ANIMATION_WAIT_TIME_MS));
    };

export const closeMyBetsAndQuickBetTask =
    ({ set }: CallbackInterface) =>
    () => {
        set(bettingAtom, (state) => ({ ...state, showQuickBet: false, showMyBets: false }));
    };

export const openQuickBetTask =
    ({ set }: CallbackInterface) =>
    () => {
        set(bettingAtom, (state) => ({ ...state, showQuickBet: true }));
    };

export const toggleQuickBetTask =
    ({ set }: CallbackInterface) =>
    () => {
        set(bettingAtom, ({ showQuickBet, ...state }) => ({
            ...state,
            showQuickBet: !showQuickBet,
        }));
    };

export const toggleMyBetsTask =
    ({ set }: CallbackInterface) =>
    () => {
        set(bettingAtom, ({ showMyBets, showQuickBet, ...state }) => ({
            ...state,
            showQuickBet: showMyBets ? showQuickBet : showMyBets,
            showMyBets: !showMyBets,
        }));
    };
