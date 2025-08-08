import EventScore from 'src/ui/common/EventInfographics/EventScore';
import { SportType } from 'src/common/enums';
import { renderWithTheme } from '@solo-tests/unit/mocks/renderMocks';
import type { RenderResult } from '@testing-library/react';
import { fireEvent, act } from '@testing-library/react';
import type { Matcher, SelectorMatcherOptions, queries } from '@testing-library/dom';
import TranslationsStore from 'src/appState/TranslationsStore';
import { LanguagesState } from 'src/appState/LanguagesState';
import type { Statistics } from 'src/common/types/statistics';

const resizeWindow = (x: number, y: number) => {
    act(() => {
        (window as any).innerWidth = x;
        (window as any).innerHeight = y;
        fireEvent(window, new Event('resize'));
    });
};

const windowSize = {
    desktop: {
        x: 1920,
        y: 1080,
    },
    tablet: {
        x: 1250,
        y: 800,
    },
    mobile: {
        x: 450,
        y: 800,
    },
};

const defaultProps = {
    sport: SportType.Tennis,
    stats: {
        timer: {
            value: '',
        },
        period: {
            value: '2nd set',
        },
        'set-score': {
            home: '1',
            away: '0',
        },
        'full-game-score': [
            {
                home: '7',
                away: '5',
            },
            {
                home: '3',
                away: '2',
            },
        ],
        'game-score': {
            home: '3',
            away: '2',
        },
        turn: {
            value: 'Team01',
        },
        'point-score': {
            home: '40',
            away: '30',
        },
    } as unknown as Statistics,
    timeMatchInPlay: true,
};

const translationsStore = new TranslationsStore(LanguagesState.createForContext());

vi.mock('libs/ui-icons-svg/src/BaseballBatIcon', () => ({
    default: () => (
        <span role='img' aria-label='Batting icon'>
            🏏
        </span>
    ),
}));

vi.mock('src/appState/AppState', function AppState() {
    return {
        __esModule: true,
        useAppStateContext: function useAppStateContext(): Record<string, any> {
            return {
                language: {
                    userLang: 'en-US',
                    getTranslation: (_key: string, defaultMessage: string) => defaultMessage,
                },
                translationsStore: translationsStore,
            };
        },
        default: vi.fn(),
    };
});

const checkSizes = (unit: RenderResult<typeof queries, HTMLElement, HTMLElement>) => {
    const indicator = unit.getAllByText('●')[0];
    const homePointScore = unit.getAllByText('40')[0];
    const awayPointScore = unit.getAllByText('30')[0];
    const homeGameScore = unit.getAllByText('3')[0];
    const awayGameScore = unit.getAllByText('2')[0];
    const homeSetScore = unit.getAllByText('1')[0];
    const awaySetScore = unit.getAllByText('0')[0];

    expect(indicator).toHaveStyleRule('font-size', '10px');
    expect(indicator).toHaveStyleRule('line-height', '19px');

    expect(homePointScore).toHaveStyleRule('font-size', '14px');
    expect(homePointScore).toHaveStyleRule('line-height', '19px');

    expect(awayPointScore).toHaveStyleRule('font-size', '14px');
    expect(awayPointScore).toHaveStyleRule('line-height', '19px');

    expect(homeGameScore).toHaveStyleRule('font-size', '14px');
    expect(homeGameScore).toHaveStyleRule('line-height', '19px');

    expect(awayGameScore).toHaveStyleRule('font-size', '14px');
    expect(awayGameScore).toHaveStyleRule('line-height', '19px');

    expect(homeSetScore).toHaveStyleRule('font-size', '14px');
    expect(homeSetScore).toHaveStyleRule('line-height', '19px');

    expect(awaySetScore).toHaveStyleRule('font-size', '14px');
    expect(awaySetScore).toHaveStyleRule('line-height', '19px');
};

const checkInterContent = (
    callBack: { (id: Matcher, options?: SelectorMatcherOptions): HTMLElement },
    items: string[],
) => {
    items.map((item) => expect(callBack(item)).toBeInTheDocument());
};

const normalize = (value: string): string => value.replace(/ /g, '');

describe('EventsList > EventScore', () => {
    it('should have correct sizes on Desktop', () => {
        const unit = renderWithTheme(<EventScore {...defaultProps} />);
        resizeWindow(windowSize.desktop.x, windowSize.desktop.y);
        checkSizes(unit);
    });

    it('should have correct sizes on Tablet', () => {
        const unit = renderWithTheme(<EventScore {...defaultProps} />);
        resizeWindow(windowSize.tablet.x, windowSize.tablet.y);
        checkSizes(unit);
    });

    it('should have correct sizes on Mobile', () => {
        const unit = renderWithTheme(<EventScore {...defaultProps} />);
        resizeWindow(windowSize.mobile.x, windowSize.mobile.y);
        checkSizes(unit);
    });

    it('should render Basic score', () => {
        const { getByText } = renderWithTheme(
            <EventScore
                {...defaultProps}
                score={{
                    home: 0,
                    away: 2,
                }}
            />,
        );
        checkInterContent(getByText, ['0', '2']);
    });
    it('should render tennis score', () => {
        const { getByText } = renderWithTheme(<EventScore {...defaultProps} />);
        checkInterContent(getByText, ['30', '40', 'P', 'G', 'S']);
    });

    it('should render table tennis score', () => {
        const { getByText } = renderWithTheme(<EventScore {...defaultProps} sport={SportType.TableTennis} />);
        checkInterContent(getByText, ['●', '30', '40', 'P', 'G']);
    });

    it('should render volleyball score', () => {
        const { container, getByText } = renderWithTheme(
            <EventScore
                sport={SportType.Volleyball}
                stats={
                    {
                        'set-score': {
                            home: '1',
                            away: '0',
                        },
                        turn: {
                            value: 'Team01',
                        },
                    } as Statistics
                }
                timeMatchInPlay={false}
            />,
        );
        expect(container.getElementsByClassName('sets-info-score').length).toBe(1);
        checkInterContent(getByText, ['P', 'S']);
    });

    it('should render baseball score with turn Team01', () => {
        const { container } = renderWithTheme(
            <EventScore
                sport={SportType.Baseball}
                stats={
                    {
                        'set-score': {
                            home: '1',
                            away: '0',
                        },
                        turn: {
                            value: 'Team01',
                        },
                    } as Statistics
                }
                score={{
                    home: 1,
                    away: 0,
                }}
                timeMatchInPlay={false}
            />,
        );
        expect(container).toHaveTextContent(
            normalize(
                [
                    // prettier-ignore
                    '🏏  1',
                    '    0',
                ].join(''),
            ),
        );
    });

    it('should render baseball score with turn Team02', () => {
        const { container } = renderWithTheme(
            <EventScore
                sport={SportType.Baseball}
                stats={
                    {
                        'set-score': {
                            home: '1',
                            away: '0',
                        },
                        turn: {
                            value: 'Team02',
                        },
                    } as Statistics
                }
                score={{
                    home: 1,
                    away: 0,
                }}
                timeMatchInPlay={false}
            />,
        );
        expect(container).toHaveTextContent(
            normalize(
                [
                    // prettier-ignore
                    '    1',
                    '🏏  0',
                ].join(''),
            ),
        );
    });

    it('should render basketball score without turn icon', () => {
        const { container } = renderWithTheme(
            <EventScore
                sport={SportType.Basketball}
                stats={
                    {
                        score: {
                            home: 46,
                            away: 52,
                        },
                    } as Statistics
                }
                score={{
                    home: 46,
                    away: 52,
                }}
                timeMatchInPlay={false}
            />,
        );
        expect(container).toHaveTextContent(['46', '52'].join(''));
    });

    test('should render correct score for Snooker sport', () => {
        const { getByText } = renderWithTheme(
            <EventScore
                {...defaultProps}
                sport={SportType.Snooker}
                stats={
                    {
                        'frames-score': {
                            home: '22',
                            away: '20',
                        },
                        'points-score': {
                            home: '44',
                            away: '30',
                        },
                    } as Statistics
                }
            />,
        );

        checkInterContent(getByText, ['22', '30', 'F', 'P']);
    });

    test('should render correct score for CS:GO sport', () => {
        const { getByText } = renderWithTheme(
            <EventScore
                {...defaultProps}
                sport={SportType.CsGo}
                stats={
                    {
                        score: { home: '11', away: '9' },
                        'current-period-score': { home: '27', away: '53' },
                    } as Statistics
                }
            />,
        );
        checkInterContent(getByText, ['11', '27', 'R', 'G']);
    });

    test('should render null when no props are provided', () => {
        const { container } = renderWithTheme(
            <EventScore timeMatchInPlay={false} sport={'' as SportType} stats={{} as Statistics} />,
        );
        expect(container.firstChild).toBeNull();
    });
});
