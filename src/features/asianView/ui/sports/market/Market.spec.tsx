import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import flatMap from 'lodash/flatMap';
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import has from 'lodash/has';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import reject from 'lodash/reject';
import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';

import { isAuthenticatedAtom, userDataAtom } from '@sc-account/store/atoms';
import type { UserData } from '@sc-account/types';
import { MockStoreProvider } from '@sc-tests/unit/mocks/jotai/store';
import { renderWithAppWrapper } from '@sc-tests/unit/mocks/renderMocks';
import { store, useJotaiCallback } from '@sc-utils/jotai';

import { ApiWrapper } from 'src/appState/ApiWrapper';
import { OddsFormatLong, SportType } from 'src/common/enums';
import { marketItemAtomFamily, selectionItemAtomFamily } from 'src/store/events/entities';
import type { MarketItem, SelectionItem } from 'src/store/events/types';
import { mockUseAppStateContext } from 'src/ui/common/SubNavigation/tests/test-helper';

import { prepareMarket } from '../../../store/helpers/prepare';
import { handicapMarket, totalMarket, winnerMarket } from '../../sports/competitions/test/mocks';

import Market from './Market';

const abortFn = vi.fn();
// suppress vitest / abortController issue
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
global.AbortController = vi.fn(() => ({
    abort: abortFn,
}));
const defaultProps: {
    market: MarketItem;
    selectionsWithPriceUpdated?: SelectionItem[];
} = { market: winnerMarket };

const appState = mockUseAppStateContext({
    apiWrapper: new ApiWrapper(),
    language: {
        userLang: 'en-US',
        getTranslation: vi.fn().mockImplementation((_, defaultText) => defaultText),
    },
});

vi.mock('src/appState/AppState', () => {
    return { __esModule: true, useAppStateContext: () => appState, default: vi.fn() };
});

vi.mock('@sc-features/subscription-manager/SubscribeElement', () => ({
    SubscribeElement: ({ children }: PropsWithChildren) => children,
}));

vi.mock('src/features/asianView/icons/LockIcon', () => ({
    default: () => (
        <span role='img' aria-label='Lock icon'>
            🔒
        </span>
    ),
}));

type MockParams = PropsWithChildren<{ onClick: () => void }>;

vi.mock('src/features/asianView/ui/sports/market/Selection/styled', async () => {
    const actual: Record<string, unknown> = await vi.importActual(
        'src/features/asianView/ui/sports/market/Selection/styled',
    );

    return {
        ...actual,
        S_SelectedOddsValue: (props: MockParams) => {
            return <button onClick={props.onClick}>*{props.children}*</button>;
        },
        S_OddsValue: ({
            isSelected,
            children,
            onClick,
        }: PropsWithChildren<{ isSelected: boolean; onClick: () => void }>) => {
            if (isSelected) {
                return <button onClick={onClick}>*{children}*</button>;
            }

            return <button onClick={onClick}>{children}</button>;
        },
    };
});

vi.mock('src/features/asianView/icons/SmallLockIcon', () => ({
    default: () => (
        <span role='img' aria-label='Small lock icon'>
            🔐
        </span>
    ),
}));

vi.mock('src/features/asianView/icons/RedArrowUpIcon', () => ({
    default: () => (
        <span role='img' aria-label='Arrow up'>
            ↑
        </span>
    ),
}));

vi.mock('src/features/asianView/icons/BlueArrowDownIcon', () => ({
    default: () => (
        <span role='img' aria-label='Arrow down'>
            ↓
        </span>
    ),
}));

const initState = { oddsFormat: OddsFormatLong.Decimal } as UserData;

function HeaderTestHelper({ selections }: { selections: SelectionItem[] }) {
    const normalizedSelections = map(selections, 'tags.selection-identifier.0');
    // debug version
    /*
    const normalizedSelections = map(
        selections,
        (selection) => `${get(selection, 'tags.selection-identifier.0')} (${selection.id})`,
    );
*/

    return <>{normalizedSelections.join(' | ')}</>;
}

function normalizeSelections(selections: SelectionItem[]) {
    //    console.log('origin', map(selections, 'tags.selection-identifier.0'));

    // console.log('origin', selections);
    const {
        H = [],
        D = [],
        A = [],
        O = [],
        U = [],
    } = groupBy(selections, (selection) => {
        return get(selection, 'tags.selection-identifier.0');
    });

    const OVER_UNDER = reject([O, U], isEmpty);
    //const HOME_DRAW_AWAY = reject([H, D, A], isEmpty);
    const HOME_AWAY_DRAW = reject([H, A, D], isEmpty);
    const orderedBy_HOME_DRAW_AWAY = flatMap(HOME_AWAY_DRAW, ([selection]) => selection);
    const orderedBy_OVER_UNDER = flatMap(OVER_UNDER, ([selection]) => selection);

    return [...orderedBy_HOME_DRAW_AWAY, ...orderedBy_OVER_UNDER];
}

function UpdateStateWithNewSelections({ selections }: { selections: SelectionItem[] }) {
    const setSelectionsState = useJotaiCallback(({ set }) => {
        return (selections: SelectionItem[]) => {
            forEach(selections, (selection) => {
                set(selectionItemAtomFamily(selection.id), selection);
            });
        };
    }, []);

    useEffect(() => {
        setSelectionsState(selections);
    }, [setSelectionsState, selections]);

    return null;
}

const renderComponent = (props = defaultProps, state = initState) => {
    const selections = props.market?.selections;
    /*
    // console.log('origin', selections);
    const {
        H = [],
        D = [],
        A = [],
        O = [],
        U = [],
    } = groupBy(selections, (selection) => {
        return get(selection, 'tags.selection-identifier.0');
    });

    const OVER_UNDER = reject([O, U], isEmpty);
    //const HOME_DRAW_AWAY = reject([H, D, A], isEmpty);
    const HOME_AWAY_DRAW = reject([H, A, D], isEmpty);
    const orderedBy_HOME_DRAW_AWAY = flatMap(HOME_AWAY_DRAW, ([selection]) => selection);
    const orderedBy_OVER_UNDER = flatMap(OVER_UNDER, ([selection]) => selection);

*/
    const nonEmptySelections = normalizeSelections(selections || []);

    const mockJotaiState = () => {
        forEach(nonEmptySelections, (selection) => {
            store.set(selectionItemAtomFamily(selection.id), selection);
        });

        if (has(props.market, 'id')) {
            store.set(marketItemAtomFamily(props.market.id), prepareMarket(props.market, true));
        }

        store.set(userDataAtom, state);
    };

    return renderWithAppWrapper(
        <MockStoreProvider
            values={[
                [isAuthenticatedAtom, true],
                [userDataAtom, state],
            ]}
        >
            <HeaderTestHelper selections={nonEmptySelections} />
            <Market marketId={props.market.id} eventId={props.market.event.id} />
            {props.selectionsWithPriceUpdated && (
                <UpdateStateWithNewSelections selections={props.selectionsWithPriceUpdated} />
            )}
        </MockStoreProvider>,
        {},
        {},
        mockJotaiState,
    );
};

type Key = keyof SelectionItem;
type Modifications = Partial<{ [K in Key]: SelectionItem[K] }>;

/**
 * Util function that modifies the market selection at specified index with the given properties and values
 * @param market Market to be modified
 * @param modifications Key-value pairs of properties and values to be modified
 * @param indexToModify At which index of selections should the modification take place
 */
const modifySelection = (market: MarketItem, modifications: Modifications, indexToModify = 0): MarketItem => {
    return {
        ...market,
        selections: Object.values(market.selections).map((selection, index) => {
            if (index !== indexToModify) {
                return selection;
            }

            let modifiedSelection = { ...selection };

            for (const key in modifications) {
                modifiedSelection = { ...modifiedSelection, [key]: modifications[key as Key] };
            }

            return modifiedSelection;
        }),
    };
};

const sanitize = (text: string[]) => {
    return map(text, (t, index) => {
        const header = index === 0;

        if (header) {
            const result = t.replace(/\s+\|\s+/g, ' | ').trim();
            // console.log('HEADER input  :', t);
            // console.log('HEADER result :', result);

            return result;
        }

        const result = t.replace(/\s+\|\s+/g, '').trim();

        // console.log('input  :', t);
        // console.log('result :', result);
        return result;
    }).join('');
};

describe.skip('AsianView > Market', () => {
    it('should render fractional value', () => {
        const { container } = renderComponent(defaultProps, { oddsFormat: OddsFormatLong.Fractional } as UserData);

        expect(container).toHaveTextContent(
            sanitize([
                // prettier-ignore
                '      H     |     A    |    D    ',
                '   71/100   |   19/5   |   5/2   ',
            ]),
        );
    });

    it('should return lock icon if market is inactive', () => {
        const { container } = renderComponent({ market: { ...winnerMarket, active: false } });

        expect(container).toHaveTextContent('🔒');
    });

    it('should return lock icon if all the market selections are inactive', () => {
        const { container } = renderComponent({
            market: {
                ...winnerMarket,
                selections: Object.values(winnerMarket.selections).map((selection) => ({
                    ...selection,
                    active: false,
                })),
            },
        });

        expect(container).toHaveTextContent('🔒');
    });

    it('should return empty cell if one selection display is false', () => {
        const { container } = renderComponent({
            market: modifySelection(winnerMarket, { display: false }),
        });

        expect(container).toHaveTextContent(
            sanitize([
                // prettier-ignore
                '   H   |    A     |   D      ',
                '       |   4.80   |   3.50   ',
            ]),
        );
    });

    it('should return small lock icon if one selection is inactive', () => {
        const { container } = renderComponent({
            market: modifySelection(winnerMarket, { active: false }),
        });

        expect(container).toHaveTextContent(
            sanitize([
                // prettier-ignore
                '    H   |    A     |    D     ',
                '   🔐   |   4.80   |   3.50   ',
            ]),
        );
    });

    // TODO Fix it after SelectionPriceUpdate is implemented
    it('should render cell with background when selected and no background when deselected', async () => {
        const { getByText, container } = renderComponent();
        const selection = getByText('1.71');
        //expect(selection).toHaveStyleRule('background', 'transparent');
        expect(container).toHaveTextContent(
            sanitize([
                // prettier-ignore
                '     H      |    A     |    D     ',
                '    1.71    |   4.80   |   3.50   ',
            ]),
        );
        await userEvent.click(selection);
        await waitFor(() =>
            expect(container).toHaveTextContent(
                sanitize([
                    // prettier-ignore
                    '     H      |    A     |    D     ',
                    '   *1.71*   |   4.80   |   3.50   ',
                ]),
            ),
        );
        await userEvent.click(getByText('*1.71*'));
        await waitFor(() =>
            expect(container).toHaveTextContent(
                sanitize([
                    // prettier-ignore
                    '     H      |    A     |    D     ',
                    '    1.71    |   4.80   |   3.50   ',
                ]),
            ),
        );
    });

    it('should pad the value with a zero if it has only 1 decimal', () => {
        const { container } = renderComponent({
            ...defaultProps,
            market: modifySelection(winnerMarket, { price: { d: 1.7, f: '3/4' } }),
        });
        expect(container).toHaveTextContent(['1.70', '4.80', '3.50'].join(''));
    });

    it('should pad the value with 2 zeroes if it has no decimals', () => {
        const { container } = renderComponent({
            ...defaultProps,
            market: modifySelection(winnerMarket, { price: { d: 3, f: '3/4' } }),
        });
        expect(container).toHaveTextContent(['3.00', '4.80', '3.50'].join(''));
    });

    it('should return same value if it has more than 2 decimals', () => {
        const { container } = renderComponent({
            ...defaultProps,
            market: modifySelection(winnerMarket, { price: { d: 1.0025, f: '3/4' } }),
        });
        expect(container).toHaveTextContent(
            sanitize([
                // prettier-ignore
                '     H       |    A     |    D     ',
                '    1.0025   |   4.80   |   3.50   ',
            ]),
        );
    });

    it('should render red arrow up if price increases', async () => {
        const { container, rerender } = renderComponent();
        expect(container).toHaveTextContent(
            sanitize([
                // prettier-ignore
                '     H     |    A     |    D     ',
                '    1.71   |   4.80   |   3.50   ',
            ]),
        );
        const nonEmptySelections = normalizeSelections(winnerMarket.selections as unknown as SelectionItem[]);

        rerender(
            <>
                <HeaderTestHelper selections={nonEmptySelections} />
                <Market marketId={winnerMarket.id} eventId={winnerMarket.event.id} />
                <UpdateStateWithNewSelections
                    selections={[{ ...winnerMarket.selections[0], price: { d: 1.72, f: '3/4' } }]}
                />
            </>,
        );

        expect(container).toHaveTextContent(
            sanitize([
                // prettier-ignore
                '    H      |    A     |    D     ',
                '   1.72↑   |   4.80   |   3.50   ',
            ]),
        );
    });

    it('should render blue arrow down if price decreases', async () => {
        const { container, rerender } = renderComponent();

        expect(container).toHaveTextContent(
            sanitize([
                // prettier-ignore
                '     H     |    A     |    D     ',
                '    1.71   |   4.80   |   3.50   ',
            ]),
        );
        const nonEmptySelections = normalizeSelections(winnerMarket.selections as unknown as SelectionItem[]);

        rerender(
            <>
                <HeaderTestHelper selections={nonEmptySelections} />
                <Market marketId={winnerMarket.id} eventId={winnerMarket.event.id} />
                <UpdateStateWithNewSelections
                    selections={[{ ...winnerMarket.selections[0], price: { d: 1.69, f: '3/4' } }]}
                />
            </>,
        );
        expect(container).toHaveTextContent(
            sanitize([
                // prettier-ignore
                '    H      |    A     |    D     ',
                '   1.69↓   |   4.80   |   3.50   ',
            ]),
        );
    });

    it('should render total market for non-football sports', async () => {
        const selections = map(totalMarket.selections, (selection) => ({
            ...selection,
            template: {
                ...selection.template,
                sportId: SportType.Tennis,
            },
        }));

        const { container } = renderComponent({
            market: { ...totalMarket, selections },
        });

        const row1 = ['2.25', '1.96'];
        const row2 = ['u', '1.82'];

        expect(container).toHaveTextContent([...row1, ...row2].join(''));
    });

    it('should convert quarter line 2.25 to half/full market line 2-2.5 for total market for football sport', async () => {
        const { container } = renderComponent({
            market: {
                ...totalMarket,
                template: { ...totalMarket.template, sportId: SportType.Football },
            },
        });

        const row1 = ['2-2.5', '1.96'];
        const row2 = ['u', '1.82'];

        expect(container).toHaveTextContent([...row1, ...row2].join(''));
    });

    it('should format line market with 1 decimal for total market for non-football sports', async () => {
        const { container } = renderComponent({
            market: {
                ...modifySelection(totalMarket, { line: '2' }),
                template: { ...totalMarket.template, sportId: SportType.Tennis },
            },
        });

        const row1 = ['2.0', '1.96'];
        const row2 = ['u', '1.82'];

        expect(container).toHaveTextContent([...row1, ...row2].join(''));
    });

    it('should render handicap market for non-football sports', async () => {
        const selections = map(handicapMarket.selections, (selection) => ({
            ...selection,
            template: {
                ...selection.template,
                sportId: SportType.Tennis,
            },
        }));

        const { container } = renderComponent({
            market: { ...handicapMarket, selections },
        });

        const row1 = ['0.75', '1.94'];
        const row2 = ['1.84'];

        expect(container).toHaveTextContent([...row1, ...row2].join(''));
    });

    it('should convert quarter line 0.75 to half/full market line 0.5-1 for handicap market for football sport', async () => {
        const { container } = renderComponent({
            market: { ...handicapMarket, template: { ...handicapMarket.template, sportId: SportType.Football } },
        });

        const row1 = ['0.5-1', '1.94'];
        const row2 = ['1.84'];

        expect(container).toHaveTextContent([...row1, ...row2].join(''));
    });

    it('should not render positive lines for handicap market and should display negative ones without dash', async () => {
        const selections = map(handicapMarket.selections, (selection, index) => ({
            ...selection,
            line: index === 0 ? '0.75' : '-0.75',
            template: {
                ...selection.template,
                sportId: SportType.Tennis,
            },
        }));

        const { container } = renderComponent({
            market: { ...handicapMarket, selections },
        });

        const row1 = ['1.94'];
        const row2 = ['0.75', '1.84'];

        expect(container).toHaveTextContent([...row1, ...row2].join(''));
    });

    it('should render 0 line for handicap market only for home team', async () => {
        const { container } = renderComponent({
            market: {
                ...handicapMarket,
                template: { ...handicapMarket.template, sportId: SportType.Tennis },
                selections: [
                    { ...handicapMarket.selections[0], line: '0' },
                    { ...handicapMarket.selections[1], line: '0' },
                ],
            },
        });

        const row1 = ['0', '1.94'];
        const row2 = ['1.84'];

        expect(container).toHaveTextContent([...row1, ...row2].join(''));
    });

    it('should render 0 line when sport is football for handicap market only for home team', async () => {
        const { container } = renderComponent({
            market: {
                ...handicapMarket,
                template: { ...handicapMarket.template, sportId: SportType.Football },
                selections: [
                    { ...handicapMarket.selections[0], line: '0' },
                    { ...handicapMarket.selections[1], line: '0' },
                ],
            },
        });

        const row1 = ['0', '1.94'];
        const row2 = ['1.84'];

        expect(container).toHaveTextContent([...row1, ...row2].join(''));
    });
});
