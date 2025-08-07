import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { vi } from 'vitest';

import { isAuthenticatedAtom, userDataAtom } from '@sc-account/store/atoms';
import type { UserData } from '@sc-account/types';
import { MockStoreProvider } from '@sc-tests/unit/mocks/jotai/store';

import { speedBetStakeAtom } from '../../../../store/atoms';

import PlaceBetButton from './PlaceBetButton';

const userData = { id: 1 } as UserData;

vi.mock('../../../../store/tasks', () => ({
    setIsDisabledNumpadTask: vi.fn(),
}));
vi.mock('../../../../hooks/usePlaceBet', () => ({
    default: () => ({
        placeBetHandler: vi.fn(),
        isPending: false,
    }),
}));

const component = (isAuthenticated = false, userData: UserData | null = null, stake?: string) =>
    render(
        <MockStoreProvider
            values={[
                [isAuthenticatedAtom, isAuthenticated],
                [userDataAtom, userData],
            ]}
        >
            <RecoilRoot
                initializeState={({ set }) => {
                    if (stake !== undefined) {
                        set(speedBetStakeAtom, stake);
                    }
                }}
            >
                <PlaceBetButton />
            </RecoilRoot>
        </MockStoreProvider>,
    );

describe('PlaceBetButton', () => {
    it('renders login button when user is not authenticated', () => {
        component();
        expect(screen.getByTestId('speedBetBetslipLoginButton')).toBeInTheDocument();
        expect(screen.getByText('Log In')).toBeInTheDocument();
    });
    it('renders confirm button', () => {
        component(true, userData, '100');
        const confirmButton = screen.getByTestId('speedBetBetslipConfirmButton');
        expect(confirmButton).toBeInTheDocument();
        expect(confirmButton).toBeEnabled();
    });
});
