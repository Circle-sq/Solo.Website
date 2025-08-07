import userEvent from '@testing-library/user-event';
import map from 'lodash/map';
import type { PropsWithChildren } from 'react';

import MockComponent from '@sc-tests/unit/mocks/MockComponent';
import { renderWithAppWrapper } from '@sc-tests/unit/mocks/renderMocks';
import { fontWeight } from '@sc-ui/system';

import SimpleDisplayTemplate, { type Props } from './SimpleDisplayTemplate';
import markets from './test/markets.json';
import newMarkets from './test/marketsNew.json';

// we don't need to test the actual functionality of the components, just that they render correctly
vi.mock('@sc-features/subscription-manager/SubscribeElement', () => ({
    SubscribeElement: ({ children }: PropsWithChildren) => children,
}));

vi.mock('src/utils/Router/NewLink', () => ({ default: MockComponent }));
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
vi.mock('react-slick', () => ({ default: () => <div></div> }));

vi.mock('src/appState/AppState', function AppState() {
    return {
        __esModule: true,
        useAppStateContext: function useAppStateContext(): Record<string, unknown> {
            return {
                translationsStore: {
                    translateMarketTab: (tabName: string): string => {
                        return tabName;
                    },
                },
                language: {
                    getTranslation: (str: string) => str,
                },
                models: {
                    hasEvent: vi.fn(() => true),
                },
            };
        },
        default: vi.fn(),
    };
});

vi.mock('src/ui/common/Carousel/Carousel', () => ({ default: MockComponent }));
vi.mock('src/ui/events/Selection/DetailedSelection', () => ({
    default: (props: { selectionId?: number }) => {
        return <span data-testid='selection'>{props.selectionId}</span>;
    },
}));

// TODO disabled temporally to unblock testing
describe('SimpleDisplayTemplate', () => {
    const props: Props = {
        groupName: 'Match Result',
        eventId: 294068,
        markets: markets as unknown as Props['markets'],
    };

    it('SimpleDisplayTemplate should be able to switch tabs', async () => {
        const { getAllByTestId, rerender } = renderWithAppWrapper(<SimpleDisplayTemplate {...props} />);

        // Check initial state. Expect the first tab to be active (default tab is set)
        let buttons = getAllByTestId('tabButton');
        const button1 = buttons.filter((button) => button.textContent?.includes('1st set'))[0];
        const button2 = buttons.filter((button) => button.textContent?.includes('2nd set'))[0];
        let button1Styles = window.getComputedStyle(button1);
        let button2Styles = window.getComputedStyle(button2);
        let selection = getAllByTestId('selection')[0];

        expect(button1Styles.fontWeight).toEqual(fontWeight.bold);
        expect(button2Styles.fontWeight).toEqual(fontWeight.regular);
        expect(selection).toHaveTextContent('content 1');

        // Click on second tab
        await userEvent.click(button2);

        // Expect the second tab to be active
        button1Styles = window.getComputedStyle(button1);
        button2Styles = window.getComputedStyle(button2);
        selection = getAllByTestId('selection')[0];
        expect(button1Styles.fontWeight).toEqual(fontWeight.regular);
        expect(button2Styles.fontWeight).toEqual(fontWeight.bold);
        expect(selection).toHaveTextContent('content 2');

        // Rerender
        rerender(<SimpleDisplayTemplate {...props} />);

        // Expect the second tab to still be active
        button1Styles = window.getComputedStyle(button1);
        button2Styles = window.getComputedStyle(button2);
        selection = getAllByTestId('selection')[0];
        expect(button1Styles.fontWeight).toEqual(fontWeight.regular);
        expect(button2Styles.fontWeight).toEqual(fontWeight.bold);
        expect(selection).toHaveTextContent('content 2');

        // Add new tab
        props.markets = newMarkets as unknown as Props['markets'];
        rerender(<SimpleDisplayTemplate {...props} />);

        // Expect the first tab to be active (default tab is set)
        buttons = getAllByTestId('tabButton');
        const button3 = buttons.filter((button) => button.textContent?.includes('3rd set'))[0];
        button1Styles = window.getComputedStyle(button1);
        button2Styles = window.getComputedStyle(button2);
        let button3Styles = window.getComputedStyle(button3);
        selection = getAllByTestId('selection')[0];
        expect(button1Styles.fontWeight).toEqual(fontWeight.bold);
        expect(button2Styles.fontWeight).toEqual(fontWeight.regular);
        expect(button3Styles.fontWeight).toEqual(fontWeight.regular);
        expect(selection).toHaveTextContent('content 1');

        // Click on third tab
        await userEvent.click(button3);

        // Expect the third tab to be active
        button1Styles = window.getComputedStyle(button1);
        button2Styles = window.getComputedStyle(button2);
        button3Styles = window.getComputedStyle(button3);
        selection = getAllByTestId('selection')[0];
        expect(button1Styles.fontWeight).toEqual(fontWeight.regular);
        expect(button2Styles.fontWeight).toEqual(fontWeight.regular);
        expect(button3Styles.fontWeight).toEqual(fontWeight.bold);
        expect(selection).toHaveTextContent('content 3');

        // Remove third tab
        props.markets = markets as unknown as Props['markets'];
        rerender(<SimpleDisplayTemplate {...props} />);

        // Expect the first tab to be active (default tab is set)
        buttons = getAllByTestId('tabButton');
        expect(buttons.filter((button) => button.textContent?.includes('3rd set')).length).toBe(0);
        button1Styles = window.getComputedStyle(button1);
        button2Styles = window.getComputedStyle(button2);
        selection = getAllByTestId('selection')[0];
        expect(button1Styles.fontWeight).toEqual(fontWeight.bold);
        expect(button2Styles.fontWeight).toEqual(fontWeight.regular);
        expect(selection).toHaveTextContent('content 1');
    });
});
