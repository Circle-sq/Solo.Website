import { fireEvent } from '@testing-library/react';
import map from 'lodash/map';

import { buildSubUnsubWrapper, renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';

import CorrectScoreDisplayTemplate from 'src/ui/events/DisplayTemplates/CorrectScoreDisplayTemplate/CorrectScoreDisplayTemplate';

const eventId = 7729;
const markets = require('./test/markets.json');

vi.mock('src/utils/Router/NewLink', () => ({
    default: ({ children }: { children: React.ReactNode }) => {
        return <a href='#'>{children}</a>;
    },
}));
vi.mock('src/ui/common/DropdownSelect/DropdownSelect', () => ({
    default: ({ options }: { options: Record<string, string>[] }) => {
        return (
            <div>
                <ul>
                    {map(options, ({ label }) => (
                        <li data-testid={label} key={label}>
                            {label}
                        </li>
                    ))}
                </ul>
            </div>
        );
    },
}));
vi.mock('react-slick', () => ({
    default: () => <div></div>,
}));
vi.mock('src/appState/AppState', () => {
    return {
        __esModule: true,
        useAppStateContext: function useAppStateContext(): Record<string, unknown> {
            return {
                router: { route: { name: 'sport', params: { id: 'football' } } },
                translationsStore: {
                    translateMarketTab: (tabName: string): string => {
                        return tabName;
                    },
                },
                language: {
                    getTranslation: (str: string) => str,
                },
                models: {
                    getEvent: vi.fn().mockReturnValue({
                        name: 'event name',
                    }),
                    getMarket: vi.fn().mockReturnValue({
                        name: 'market name',
                    }),
                    getSelection: vi.fn().mockReturnValue({
                        eventId: 237161,
                        id: 95734125,
                        price: { d: 2.5, f: '7/2' },
                        selectionView: vi.fn().mockReturnValue({ displayPrice: 2.5 }),
                        forView: vi.fn().mockReturnValue({ displayPrice: 2.5 }),
                    }),
                },
            };
        },
        default: vi.fn(),
    };
});
vi.mock('src/ui/common/Carousel/Carousel', () => ({
    default: ({ children }: { children: React.ReactNode }): React.ReactNode => {
        return <div data-testid='carousel'>{children}</div>;
    },
}));

vi.mock('src/ui/events/DisplayTemplates/CorrectScoreDisplayTemplate/SelectionPriceCorrectScore', () => ({
    default: (props: { selectionId?: number }) => {
        return <span data-testid='selection'>{props.selectionId}</span>;
    },
}));

describe('CorrectScoreDisplayTemplate', () => {
    it('should render Home column (1) with a selection', () => {
        const { getByText, queryByText } = renderWithAppWrapper(
            <CorrectScoreDisplayTemplate eventId={eventId} markets={[markets]} />,
            {},
            { wrapper: buildSubUnsubWrapper() },
        );

        expect(getByText(/^1$/i)).toBeTruthy();
        expect(getByText(/17042/i)).toBeTruthy();
        expect(queryByText(/^X$/i)).toBeFalsy();
        expect(queryByText(/^2$/i)).toBeFalsy();
    });

    it('should render Draw column (X) with a selection', () => {
        const { getByText, queryByText } = renderWithAppWrapper(
            <CorrectScoreDisplayTemplate
                eventId={eventId}
                markets={[{ ...markets, selections: [{ ...markets.selections[0], identifier: 'D' }] }]}
            />,
            {},
            { wrapper: buildSubUnsubWrapper() },
        );

        expect(getByText(/^X$/i)).toBeTruthy();
        expect(getByText(/17042/i)).toBeTruthy();
        expect(queryByText(/^1$/i)).toBeFalsy();
        expect(queryByText(/^2$/i)).toBeFalsy();
    });

    it('should render Away column (2) with a selection', () => {
        const { getByText, queryByText } = renderWithAppWrapper(
            <CorrectScoreDisplayTemplate
                eventId={eventId}
                markets={[{ ...markets, selections: [{ ...markets.selections[0], identifier: 'A' }] }]}
            />,
            {},
            { wrapper: buildSubUnsubWrapper() },
        );

        expect(getByText(/^2$/i)).toBeTruthy();
        expect(getByText(/17042/i)).toBeTruthy();
        expect(queryByText(/^1$/i)).toBeFalsy();
        expect(queryByText(/^X$/i)).toBeFalsy();
    });

    it('should render other selection', () => {
        const { queryByText, getByText } = renderWithAppWrapper(
            <CorrectScoreDisplayTemplate
                eventId={eventId}
                markets={[
                    {
                        ...markets,
                        selections: [{ ...markets.selections[0], identifier: '-' }],
                    },
                ]}
            />,
            {},
            { wrapper: buildSubUnsubWrapper() },
        );

        expect(getByText(/17042/i)).toBeTruthy();
        expect(queryByText(/^1$/i)).toBeFalsy();
        expect(queryByText(/^X$/i)).toBeFalsy();
        expect(queryByText(/^2$/i)).toBeFalsy();
    });

    it('should render show more button if selections are bigger than 3', () => {
        let id: number = markets.selections[0].id;
        const { getByRole, getByText, queryByText } = renderWithAppWrapper(
            <CorrectScoreDisplayTemplate
                eventId={eventId}
                markets={[
                    {
                        ...markets,
                        selections: [
                            { ...markets.selections[0] },
                            { ...markets.selections[0], id: ++id },
                            { ...markets.selections[0], id: ++id },
                            { ...markets.selections[0], id: ++id },
                            { ...markets.selections[0], id: ++id },
                        ],
                    },
                ]}
            />,
            {},
            { wrapper: buildSubUnsubWrapper() },
        );

        const showMoreBtn = getByRole('button', {
            name: /show more/i,
        });

        expect(showMoreBtn).toBeTruthy();

        expect(getByText(/^1$/i)).toBeTruthy();
        expect(getByText(/17042/i)).toBeTruthy();
        expect(getByText(/17043/i)).toBeTruthy();
        expect(getByText(/17044/i)).toBeTruthy();
        expect(queryByText(/17045/i)).toBeFalsy();
        expect(queryByText(/17046/i)).toBeFalsy();

        fireEvent.click(showMoreBtn);
        expect(getByText(/17045/i)).toBeTruthy();
        expect(getByText(/17046/i)).toBeTruthy();
    });
});
