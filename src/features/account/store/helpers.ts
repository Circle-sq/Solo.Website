import type { UserData, Wallet } from '../types';

export const setUserWallet = (wallet: Wallet) => (state: UserData | null) => {
    if (state === null) {
        return state;
    }

    return {
        ...state,
        wallet: {
            ...state.wallet,
            ...wallet,
        },
    };
};

export const updateUserData = (userData: Partial<UserData>) => (state: UserData | null) => {
    if (state === null) {
        return state;
    }

    return { ...state, ...userData };
};
