import { screen } from '@testing-library/react';

import { renderWithTheme } from '@solo-tests/unit/mocks/renderMocks';

import NavigationList from './NavigationList';

vi.mock('src/appState/AppState', () => ({
    useAppStateContext: () => ({
        language: {
            getTranslation: (left: string, right: string) => `${left}-${right}`,
        },
        router: {
            url: '/competition/91/football',
            route: {
                name: 'competition',
                params: {
                    id: '91',
                    slug: 'football',
                },
            },
            routes: [
                {
                    url: '/competition/:id/:slug',
                    matcher: /^\/competition\/([\w-]+)\/([\w-]+)$/,
                    params: Array(2),
                    name: 'competition',
                },
            ],
        },
    }),
}));

vi.mock('src/utils/Router/NewLink', () => ({
    default: (props: { label: string; className: string }) => {
        return <a className={props.className}>{props.label}</a>;
    },
}));

vi.mock('src/appState/customHooks', () => ({
    useEventCounters: () => ({
        countEvents: (id: string) => ({ count: id }),
    }),
}));

it('should render Highlight sports list', () => {
    const mockLinksData = [
        {
            imageUrl:
                'https://s3.eu-central-1.amazonaws.com/solohub-qa-cms/icons/competitions/6b730d2c-0bb1-479a-ab44-c4e5fb2f73f2.svg',
            label: 'NBA',
            params: { id: '918', slug: 'basketball' },
            route: 'competition',
        },
        {
            imageUrl:
                'https://s3.eu-central-1.amazonaws.com/solohub-qa-cms/icons/competitions/b425752b-3ca8-4860-836a-97b6935b76db.svg',
            label: 'UEFA Champions League',
            params: { id: '91', slug: 'football' },
            route: 'competition',
        },
    ];

    const defaultProps = {
        links: mockLinksData,
    };

    const activeLinkLabel = 'UEFA Champions League';
    const nonActiveLinkLabel = 'NBA';

    renderWithTheme(<NavigationList {...defaultProps} />);
    expect(screen.getByText(activeLinkLabel)).toHaveClass('active');
    expect(screen.getByText(nonActiveLinkLabel)).not.toHaveClass('active');
});
