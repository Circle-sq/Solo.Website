import { screen } from '@testing-library/react';

import { renderWithTheme } from '@solo-tests/unit/mocks/renderMocks';

import StatefulButton from './StatefulButton';
import type { ActionButtonProps } from './types';

const props: ActionButtonProps = {
    color: 'green',
    route: '',
    onClick: () => {},
    size: 'large',
    disabled: false,
    children: <div data-testid='children'>test data button</div>,
    loading: false,
    className: '',
};

describe('Button', () => {
    it(`should render message`, () => {
        renderWithTheme(<StatefulButton {...props} />);
        const message = screen.getByText(/test data button/i);
        expect(message).toBeTruthy();
    });

    it(`should render spinner as loading`, () => {
        renderWithTheme(<StatefulButton {...props} loading />);
        const spinner = screen.getByTestId('spinner');
        expect(spinner).toBeTruthy();
    });

    it(`should render spinner and loading message when loading with option`, () => {
        renderWithTheme(<StatefulButton {...props} loading />);
        const spinner = screen.getByTestId('spinner');
        expect(spinner).toBeTruthy();
        const message = screen.getByText(/test data button/i);
        expect(message).toBeTruthy();
    });
});
