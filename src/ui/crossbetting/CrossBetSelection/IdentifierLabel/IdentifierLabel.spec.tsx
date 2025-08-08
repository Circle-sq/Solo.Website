import MockComponent from '@solo-tests/unit/mocks/MockComponent';
import { renderWithTheme } from '@solo-tests/unit/mocks/renderMocks';

import IdentifierLabel from 'src/ui/crossbetting/CrossBetSelection/IdentifierLabel/IdentifierLabel';

vi.mock('src/utils/Router/NewLink', () => ({ default: MockComponent }));
vi.mock('src/ui/common/DropdownSelect/DropdownSelect', () => ({ default: MockComponent }));

describe('IdentifierLabel', () => {
    it('should render the selection identifier label component with Draw text label', () => {
        const props = {
            isAway: false,
            isDraw: true,
            isHome: false,
            isSelected: true,
            isHandicap: false,
            handicapLabel: null,
        };
        const { container } = renderWithTheme(<IdentifierLabel {...props} />);
        expect(container).toHaveTextContent('Draw');
    });

    it('should render the selection identifier label component with Away text label', () => {
        const props = {
            isAway: true,
            isDraw: false,
            isHome: false,
            isSelected: true,
            isHandicap: false,
            handicapLabel: null,
        };
        const { container } = renderWithTheme(<IdentifierLabel {...props} />);
        expect(container).toHaveTextContent('Away');
    });

    it('should render the selection identifier label component with Home text label', () => {
        const props = {
            isAway: false,
            isDraw: false,
            isHome: true,
            isSelected: true,
            isHandicap: false,
            handicapLabel: null,
        };
        const { container } = renderWithTheme(<IdentifierLabel {...props} />);
        expect(container).toHaveTextContent('Home');
    });

    it('should render handicap value for handicap market', () => {
        const props = {
            isAway: false,
            isDraw: false,
            isHome: true,
            isSelected: true,
            isHandicap: true,
            handicapLabel: '+6.5',
        };
        const { container } = renderWithTheme(<IdentifierLabel {...props} />);
        expect(container).toHaveTextContent('+6.5');
    });

    it('should not render the selection identifier label component', () => {
        const props = {
            isAway: false,
            isDraw: false,
            isHome: false,
            isSelected: true,
            isHandicap: true,
            handicapLabel: null,
        };
        const { container } = renderWithTheme(<IdentifierLabel {...props} />);
        expect(container).toBeEmptyDOMElement();
    });
});
