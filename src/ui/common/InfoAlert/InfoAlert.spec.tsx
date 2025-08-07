import { renderWithTheme } from '@sc-ui/system';

import type { AppState } from 'src/appState/AppState';
import type { LanguagesState } from 'src/appState/LanguagesState';
import { ErrorResource } from 'src/common/enums/error';
import InfoAlert from 'src/ui/common/InfoAlert/InfoAlert';

const defaultProps = {
    testId: 'validationMessage',
    type: 'error',
    error: {
        resource: ErrorResource.Account,
        code: 'closed',
        field: 'status',
        debugDetails: null,
        details: null,
        pointer: null,
        ignorePointer: null,
    },
};

window.$appState = {
    language: { getTranslation: (_langKey: string, defaultText: string) => defaultText } as LanguagesState,
} as AppState;

const renderComponent = (props = defaultProps) => renderWithTheme(<InfoAlert {...props} />);

describe('InfoAlert', () => {
    it(`should render error for default props`, () => {
        const { getByText } = renderComponent();
        expect(getByText(/Your account is Closed, bet placement is not allowed./i)).toBeInTheDocument();
    });

    it(`should render error for Blocked account`, () => {
        const { getByText } = renderComponent({
            ...defaultProps,
            error: {
                resource: ErrorResource.Account,
                code: 'blocked',
                field: 'status',
                debugDetails: null,
                details: null,
                pointer: null,
                ignorePointer: null,
            },
        });
        expect(getByText(/Your account is Blocked, bet placement is not allowed./i)).toBeInTheDocument();
    });

    it(`should render error for Pending account`, () => {
        const { getByText } = renderComponent({
            ...defaultProps,
            error: {
                resource: ErrorResource.Account,
                code: 'pending',
                field: 'status',
                debugDetails: null,
                details: null,
                pointer: null,
                ignorePointer: null,
            },
        });
        expect(getByText(/Your account is Pending, bet placement is not allowed./i)).toBeInTheDocument();
    });
});
