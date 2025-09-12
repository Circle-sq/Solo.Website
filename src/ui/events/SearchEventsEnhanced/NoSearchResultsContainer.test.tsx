import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useAtomValue } from 'jotai';
import { RecoilRoot } from 'recoil';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { RouteName } from 'src/common/enums';
import { isSearchModalOpenAtom } from 'src/store/common/atoms';

import NoSearchResultsContainer from './NoSearchResultsContainer';

const router = { redirect: vi.fn() };

vi.mock('src/appState/AppState', () => ({
    useAppStateContext: () => ({ router }),
}));

const ModalMock = () => {
    const isOpen = useAtomValue(isSearchModalOpenAtom);

    return <div data-testid='modal-state'>{isOpen ? 'TRUE' : 'FALSE'}</div>;
};

const renderComponent = () => {
    return render(
        <RecoilRoot>
            <NoSearchResultsContainer />
            <ModalMock />
        </RecoilRoot>,
    );
};

describe('NoSearchResultsContainer', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the empty result message', () => {
        const { getByTestId } = renderComponent();

        const message = getByTestId('empty-result-message');
        expect(message).toHaveTextContent(/We are sorry, there are no events currently available for your input/);
    });

    it('renders links', () => {
        const { getByTestId } = renderComponent();

        const links = getByTestId(/empty-result-links/);
        expect(links.children).toHaveLength(2);
    });

    it('redirects to the correct route when a link is clicked', async () => {
        const { getByTestId } = renderComponent();

        const sportsLink = getByTestId(`empty-result-link-${RouteName.Homepage}`);
        await userEvent.click(sportsLink);

        expect(router.redirect).toHaveBeenCalledWith(RouteName.Homepage);
    });

    it('closes the modal after redirect', async () => {
        const { getByTestId } = renderComponent();

        const sportsLink = getByTestId(`empty-result-link-${RouteName.Homepage}`);
        await userEvent.click(sportsLink);

        expect(getByTestId('modal-state')).toHaveTextContent(/FALSE/);
    });
});
