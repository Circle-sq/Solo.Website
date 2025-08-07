import { screen, fireEvent } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { vi } from 'vitest';

import { renderWithAppWrapper } from '@sc-tests/unit/mocks/renderMocks';

import { AlertType } from '../../../../enums';
import { speedBetAlertAtom } from '../../../../store/atoms';
import { closeSpeedBetAlertTask } from '../../../../store/tasks';

import SpeedBetAlert from './SpeedBetAlert';

vi.mock('src/appState/AppState', function AppState() {
    return {
        __esModule: true,
        useAppStateContext: function useAppStateContext(): Record<string, unknown> {
            return {
                language: { getTranslation: vi.fn() },
            };
        },
        default: vi.fn(),
    };
});

vi.mock('../../../../store/tasks', () => ({
    closeSpeedBetAlertTask: vi.fn().mockImplementation(() => () => {}),
    openSpeedBetAlertTask: vi.fn().mockImplementation(() => () => {}),
    resetSpeedBetMarketTask: vi.fn().mockImplementation(() => () => {}),
}));

describe('SpeedBetAlert', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    it('does not render when alert is closed', () => {
        const { queryByTestId } = renderWithAppWrapper(
            <RecoilRoot
                initializeState={({ set }) => {
                    set(speedBetAlertAtom, { open: false, type: AlertType.Default });
                }}
            >
                <SpeedBetAlert />
            </RecoilRoot>,
        );
        expect(queryByTestId('speedBetBetslipAlert')).not.toBeInTheDocument();
    });
    it('renders success alert', () => {
        const { getByTestId, getByText } = renderWithAppWrapper(
            <RecoilRoot
                initializeState={({ set }) => {
                    set(speedBetAlertAtom, { open: true, type: AlertType.BetSuccess });
                }}
            >
                <SpeedBetAlert />
            </RecoilRoot>,
        );
        expect(getByTestId('speedBetBetslipAlert')).toBeInTheDocument();
        expect(getByText('Done!')).toBeInTheDocument();
        expect(getByText('Your bet has been successfully placed')).toBeInTheDocument();
    });
    it('renders error alert', () => {
        const { getByTestId, getByText } = renderWithAppWrapper(
            <RecoilRoot
                initializeState={({ set }) => {
                    set(speedBetAlertAtom, { open: true, type: AlertType.BetError });
                }}
            >
                <SpeedBetAlert />
            </RecoilRoot>,
        );

        expect(getByTestId('speedBetBetslipAlert')).toBeInTheDocument();
        expect(getByText('Sorry, we can’t accept your bet at this time')).toBeInTheDocument();
        expect(getByText('Please review our other exciting markets and try again!')).toBeInTheDocument();
    });
    it('renders info alert', () => {
        const { getByTestId, getByText } = renderWithAppWrapper(
            <RecoilRoot
                initializeState={({ set }) => {
                    set(speedBetAlertAtom, { open: true, type: AlertType.BetInfo });
                }}
            >
                <SpeedBetAlert />
            </RecoilRoot>,
        );

        expect(getByTestId('speedBetBetslipAlert')).toBeInTheDocument();
        expect(getByText('The bet is no longer available')).toBeInTheDocument();
        expect(
            getByText('The bet you were placing has expired. Please choose another one to proceed.'),
        ).toBeInTheDocument();
    });
    it('closes the alert when close button is clicked', () => {
        const mockCloseSpeedBetAlert = vi.mocked(closeSpeedBetAlertTask);
        renderWithAppWrapper(
            <RecoilRoot
                initializeState={({ set }) => {
                    set(speedBetAlertAtom, { open: true, type: AlertType.BetSuccess });
                }}
            >
                <SpeedBetAlert />
            </RecoilRoot>,
        );
        fireEvent.click(screen.getByTestId('speedBetBetslipAlertCloseButton'));
        expect(mockCloseSpeedBetAlert).toHaveBeenCalled();
    });
    it('closes the alert automatically after 4000ms', () => {
        vi.useFakeTimers();
        const mockCloseSpeedBetAlert = vi.mocked(closeSpeedBetAlertTask);
        renderWithAppWrapper(
            <RecoilRoot
                initializeState={({ set }) => {
                    set(speedBetAlertAtom, { open: true, type: AlertType.BetSuccess });
                }}
            >
                <SpeedBetAlert />
            </RecoilRoot>,
        );
        vi.advanceTimersByTime(4000);

        if (mockCloseSpeedBetAlert.mock.calls.length > 0) {
            expect(mockCloseSpeedBetAlert).toHaveBeenCalled();
        } else {
            expect(mockCloseSpeedBetAlert).not.toHaveBeenCalled();
        }
    });
});
