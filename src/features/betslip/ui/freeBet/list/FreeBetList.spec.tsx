import type { RenderResult } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';

import { renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';

import { CurrencySymbol } from 'src/common/enums';

import type { FreeBetCredit } from '../../../api/types/freeBet';

import FreeBetList from './FreeBetList';

const freeBetDetails: FreeBetCredit = {
    id: 123456,
    amount: 10,
    expiryDate: '12/29/2023',
    promotionId: null,
    friendlyDescription: null,
};

const defaultProps = {
    credits: [freeBetDetails],
    onSelect: vi.fn(),
    isOpen: false,
};

const renderComponent = (props = defaultProps): RenderResult => renderWithAppWrapper(<FreeBetList {...props} />);

describe('FreeBetItem', () => {
    it('should render with default props', () => {
        const { getByTestId } = renderComponent();
        expect(getByTestId('freebetAmount')).toHaveTextContent(`${CurrencySymbol.GBP} ${10}`);
        expect(getByTestId('freebetValidity')).toHaveTextContent(`Validity: 2023.12.29 | 00:00`);
    });

    it('should render ReadMore component when freeBetDetails friendlyDescription is defined', () => {
        const { getByText } = renderComponent({
            ...defaultProps,
            credits: [
                {
                    ...defaultProps.credits[0],
                    friendlyDescription: 'This is a very friendly description',
                },
            ],
        });
        expect(getByText(/this is a very friendly description/i)).toBeTruthy();
    });

    it('should call on select when clicking on the FreeBetItemWrapper', () => {
        const { getByTestId } = renderComponent();
        fireEvent.click(getByTestId('freebet-item-123456'));
        expect(defaultProps.onSelect).toHaveBeenCalledTimes(1);
        expect(defaultProps.onSelect).toHaveBeenCalledWith(123456);
    });
});
