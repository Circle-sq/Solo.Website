import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useAtomValue } from 'jotai';
import { vi, describe, expect, it } from 'vitest';

import { renderWithAppWrapper } from '@sc-tests/unit/mocks/renderMocks';

import { RouteName } from 'src/common/enums';
import { isSearchModalOpenAtom } from 'src/store/common/atoms';

import SearchButton from './SearchButton';

const router = {
    redirect: vi.fn(),
    route: { name: RouteName.Homepage },
};

vi.mock('src/appState/AppState', () => ({
    useAppStateContext: () => ({ router }),
}));

const ModalMock = () => {
    const isOpen = useAtomValue(isSearchModalOpenAtom);

    return <div data-testid='modal-state'>{isOpen ? 'TRUE' : 'FALSE'}</div>;
};

describe('SearchButton', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('opens search modal on click', async () => {
        renderWithAppWrapper(
            <>
                <SearchButton />
                <ModalMock />
            </>,
        );
        const button = screen.getByTestId('burger-search-button');

        await userEvent.click(button);

        expect(screen.getByTestId('modal-state')).toHaveTextContent(/TRUE/);
    });

    it('redirects to homepage if not on homepage before opening modal', async () => {
        router.route.name = RouteName.CrossBetting;

        renderWithAppWrapper(
            <>
                <SearchButton />
                <ModalMock />
            </>,
        );
        const button = screen.getByTestId('burger-search-button');

        await userEvent.click(button);

        expect(router.redirect).toHaveBeenCalledWith(RouteName.Homepage);
        expect(screen.getByTestId('modal-state')).toHaveTextContent(/TRUE/);
    });
});
