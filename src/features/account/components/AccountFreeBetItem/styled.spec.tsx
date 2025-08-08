import { renderWithTheme } from '@solo-tests/unit/mocks/renderMocks';

import { S_Chip } from './styled';

describe('FreeBetBadge', () => {
    it('should render with theme colors', () => {
        const { getByTestId } = renderWithTheme(<S_Chip data-testid={'freeBetBadge'} />);
        const freeBetBadge = getByTestId('freeBetBadge');

        expect(freeBetBadge).toHaveStyleRule('background-color', 'var(--chip-freebet-bg, #00FF30)');
    });
});
