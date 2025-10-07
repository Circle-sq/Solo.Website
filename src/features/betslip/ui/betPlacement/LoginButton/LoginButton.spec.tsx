import userEvent from '@testing-library/user-event';
import type { PropsWithChildren } from 'react';

import { renderWithTheme } from '@solo-tests/unit/mocks/renderMocks';

import * as utils from 'src/infra.client';
import { SPORT_BOOK_MESSAGES } from 'src/utils/constants';

import LoginButton from './LoginButton';

vi.mock('src/ui/common/Button/Button', () => ({
    default: ({
        children,
        onClick,
        type,
        params,
    }: PropsWithChildren<{
        params: Record<string, unknown>;
        type: string;
        onClick: () => void;
    }>) => {
        if (type === 'anchor') {
            return <a href={`/${params.account}`}>{children}</a>;
        }

        return <div onClick={onClick}>{children}</div>;
    },
}));

const originalInfo = console.info;

beforeAll(() => {
    console.info = vi.fn();
});

afterAll(() => {
    console.info = originalInfo;
});

describe('LoginButton', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it(`should dispatch relogin action if it's is Standalone`, async () => {
        vi.spyOn(utils, 'isStandalone').mockReturnValue(true);

        const { getByText } = renderWithTheme(<LoginButton />);
        const loginButton = getByText(/login to bet/i);
        const postMessageSpy = vi.spyOn(window.parent, 'postMessage' as never);

        expect(postMessageSpy).not.toHaveBeenCalled();

        await userEvent.click(loginButton);

        expect(postMessageSpy).toHaveBeenCalledWith({ type: SPORT_BOOK_MESSAGES.relogin }, '*');
    });

    it(`should open LoginPopup if it's local/dev`, () => {
        vi.spyOn(utils, 'isStandalone').mockReturnValue(false);

        const { getByText } = renderWithTheme(<LoginButton />);
        const loginButton = getByText(/login to bet/i);

        expect(loginButton).toHaveTextContent(/login to bet/i);
    });
});
