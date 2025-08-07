import userEvent from '@testing-library/user-event';

import { renderWithAppWrapper } from '@sc-tests/unit/mocks/renderMocks';

import FreeBetsDropdown from './FreeBetsDropdown';

const bonusCreditsMock = [
    {
        id: 1286,
        amount: 5000,
        promotionId: '1111',
        friendlyDescription:
            'You can use this Free Bet on any Football market with odds above 1.8. Only single bets are eligible.',
        expiryDate: '2029-10-10T00:00:00.000Z',
    },
    {
        id: 1287,
        amount: 10000,
        promotionId: '1112',
        friendlyDescription:
            'You can use this Free Bet on any Football market with odds above 1.8. Only single bets are eligible.',
        expiryDate: '2024-10-10T00:00:00.000Z',
    },
];

describe('FreeBetsDropdown', () => {
    const props = {
        freeBets: {
            credits: bonusCreditsMock,
            selectedId: bonusCreditsMock[0].id,
        },
        onSelectFreeBet: vi.fn(),
        selectedFreeBet: bonusCreditsMock[0],
        onToggleFreeBet: vi.fn(),
        isChecked: false,
    };

    it('should open the freebet dropdown on dropdown click', async () => {
        const { findByTestId } = renderWithAppWrapper(<FreeBetsDropdown {...props} />);
        const freebetDropdown = await findByTestId('freebet-dropdown');
        await userEvent.click(freebetDropdown);
        const freebetDropdownStatus = await findByTestId('freebetDropdown-open');

        expect(freebetDropdownStatus).toBeInTheDocument();
    });

    it('the dropdown should have 2 freebet items rendered', async () => {
        const { findByTestId, findAllByText } = renderWithAppWrapper(<FreeBetsDropdown {...props} />);
        const freebetDropdown = await findByTestId('freebet-dropdown');
        await userEvent.click(freebetDropdown);
        const freebetItems = await findAllByText('Validity:', { exact: false });

        expect(freebetItems).toHaveLength(2);
    });

    it('the dropdown should be closed on freebet item click', async () => {
        const { findByTestId } = renderWithAppWrapper(<FreeBetsDropdown {...props} />);
        const freebetDropdown = await findByTestId('freebet-dropdown');
        await userEvent.click(freebetDropdown);
        const freebetItem = await findByTestId('freebet-item-1286');
        await userEvent.click(freebetItem);
        const freebetDropdownStatus = await findByTestId('freebetDropdown-closed');

        expect(freebetDropdownStatus).toBeInTheDocument();
    });
});
