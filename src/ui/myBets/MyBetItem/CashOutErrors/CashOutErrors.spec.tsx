import { renderWithTheme } from '@sc-tests/unit/mocks/renderMocks';

import type { AppState } from 'src/appState/AppState';
import type { LanguagesState } from 'src/appState/LanguagesState';
import { BetslipErrorCode } from 'src/common/enums/error';
import type { CashOutError } from 'src/common/types/myBet';

import CashOutErrors from './CashOutErrors';

const cashOutPanicModeErrMock = {
    status: 'error',
    debug: {
        code: BetslipErrorCode.PanicModeEnabled,
        message: 'Cashout operation is disabled because of panic mode enabled',
        errors: [
            {
                resource: 'Cashout',
                code: BetslipErrorCode.PanicModeEnabled,
                field: null,
                debugDetails: null,
                details: null,
                pointer: null,
            },
        ],
        debugDetails: null,
        details: null,
    },
    errors: {
        cashoutPanicMode: `Cashout:${BetslipErrorCode.PanicModeEnabled}`,
    },
    problems: [
        {
            code: BetslipErrorCode.PanicModeEnabled,
            field: null,
            id: null,
            resource: 'Cashout',
        },
    ],
} as CashOutError;

const cashOutPanicModeErrorMessageMock = 'Sorry, we are not able to cashout your bet at this time';

describe('CashoutErrors', () => {
    it('CashoutErrors container should display panic mode enabled error message in case of panic mode on', () => {
        window.$appState = {
            language: { getTranslation: (_langKey: string, defaultText: string) => defaultText } as LanguagesState,
        } as AppState;

        const wrapper = renderWithTheme(<CashOutErrors errors={cashOutPanicModeErrMock} />);
        const cashoutContainer = wrapper.container.querySelector('.bet__errors');
        expect(cashoutContainer).toHaveTextContent(cashOutPanicModeErrorMessageMock);
    });
});
