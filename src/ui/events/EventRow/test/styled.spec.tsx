import { screen } from '@testing-library/react';
import type { PropsWithChildren } from 'react';

import { renderWithTheme } from '@solo-tests/unit/mocks/renderMocks';
import { RightArrowIcon } from '@solo-ui/icons/svg';
import { cssColor, DarkBluePalette, fontWeight } from '@solo-ui/system';

import type { AppState } from 'src/appState/AppState';
import type { RecursivePartial } from 'src/common/types/main';
import { S_SelectionAction } from 'src/ui/events/Selection/SelectionAction/styled';
import { LANGUAGES } from 'src/utils/constants';

import { EventLink, S_DefaultMore, S_MarginBox } from '../styled';

vi.mock('src/appState/AppState', () => {
    const appStateContextMock = (): RecursivePartial<AppState> => ({
        router: {
            redirect: vi.fn(),
            updateQueryParams: vi.fn(),
            url: '',
            route: {
                name: 'homepage',
                params: {},
            },
            routes: [
                {
                    url: '/',
                    matcher: {},
                    params: [],
                    name: 'homepage',
                },
            ],
            buildUrl: vi.fn(),
        },
    });

    return {
        __esModule: true,
        useAppStateContext: appStateContextMock,
        default: vi.fn(),
    };
});

vi.mock('src/ui/common/DropdownSelect/DropdownSelect', () => ({
    default: (props: PropsWithChildren<{ className: string }>) => (
        <div className={props.className}>{props.children}</div>
    ),
}));

describe('Bet now button', () => {
    it('should have default sport styles', () => {
        const { container } = renderWithTheme(<S_DefaultMore />);
        const text = container.firstChild;

        expect(text).toHaveStyleRule('align-items', 'center');
        expect(text).toHaveStyleRule('font-size', '16px');
        expect(text).toHaveStyleRule('font-weight', fontWeight.bold);
        expect(text).toHaveStyleRule('color', DarkBluePalette.darkBlue6);
    });
    it('should have american sport styles', () => {
        const { container } = renderWithTheme(<S_DefaultMore />);
        const text = container.firstChild;

        expect(text).toHaveStyleRule('align-items', 'center');
        expect(text).toHaveStyleRule('font-size', '16px');
        expect(text).toHaveStyleRule('font-weight', fontWeight.bold);
        expect(text).toHaveStyleRule('color', DarkBluePalette.darkBlue6);
    });
    it('should have scoreboard sport styles', () => {
        const { container } = renderWithTheme(<S_DefaultMore />);
        const text = container.firstChild;

        expect(text).toHaveStyleRule('align-items', 'center');
        expect(text).toHaveStyleRule('font-size', '16px');
        expect(text).toHaveStyleRule('font-weight', fontWeight.bold);
        expect(text).toHaveStyleRule('color', DarkBluePalette.darkBlue6);
    });
});

describe('RightArrowIcon', () => {
    it('should have default English styles', () => {
        const userLang = LANGUAGES.english;
        const { container } = renderWithTheme(
            <S_MarginBox userLang={userLang}>
                <RightArrowIcon fontSize='xsmall' />
            </S_MarginBox>,
        );
        const wrapperEl = container.firstChild;
        const arrowEl = container.firstChild?.firstChild;

        expect(wrapperEl).toHaveStyleRule('margin-left', '10px');
        expect(wrapperEl).toHaveStyleRule('margin-top', '1px');
        expect(arrowEl).toHaveStyleRule('font-size', '12px');
    });

    it('should have default Korean styles', () => {
        const userLang = LANGUAGES.korean;
        const { container } = renderWithTheme(
            <S_MarginBox userLang={userLang}>
                <RightArrowIcon fontSize='xsmall' />
            </S_MarginBox>,
        );
        const wrapperEl = container.firstChild;
        const arrowEl = container.firstChild?.firstChild;

        expect(wrapperEl).toHaveStyleRule('margin-left', '10px');
        expect(wrapperEl).toHaveStyleRule('margin-top', '0');
        expect(arrowEl).toHaveStyleRule('font-size', '12px');
    });

    it('should display Korean styles by default', () => {
        const userLang = LANGUAGES.korean;
        const { container } = renderWithTheme(
            <S_MarginBox userLang={userLang}>
                <RightArrowIcon fontSize='xsmall' />
            </S_MarginBox>,
        );
        const wrapperEl = container.firstChild;
        const arrowEl = container.firstChild?.firstChild;

        expect(wrapperEl).toHaveStyleRule('margin-left', '10px');
        expect(wrapperEl).not.toHaveStyleRule('margin-top', '1px');
        expect(arrowEl).toHaveStyleRule('font-size', '12px');
    });
});

describe('EventLink', () => {
    it('should have default state color and different hover color', () => {
        renderWithTheme(
            <EventLink testId='eventLink-testid'>
                <S_SelectionAction>zzz</S_SelectionAction>
            </EventLink>,
        );
        const element = screen.getByTestId('eventLink-testid');
        expect(element).toHaveStyleRule('background-color', cssColor('--list-item-bg'));
    });
});
