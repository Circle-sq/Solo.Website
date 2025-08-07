import { userEvent } from '@storybook/test';
import { act, render } from '@testing-library/react';

import { DevToolsProvider } from './DevTools';
import { useBannersDevTool, useSubscriptionDevTool } from './hooks';

const DevToolsDisplay = () => {
    const { show_socket_subscriptions, toggle: toggleSubscription } = useSubscriptionDevTool();
    const { debug_banners, toggle: toggleBanners } = useBannersDevTool();

    return (
        <div>
            <div onClick={toggleSubscription}>Show Socket Subscriptions: {show_socket_subscriptions.toString()}</div>
            <div onClick={toggleBanners}>Debug Banners: {debug_banners.toString()}</div>
        </div>
    );
};
describe('DevToolsDisplay', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        ['devtools.debug_banners', 'devtools.show_socket_subscriptions'].forEach((key) => {
            localStorage.removeItem(key);
        });
    });

    it('should toggle flags', async () => {
        expect(localStorage.getItem('devtools.debug_banners')).toBeNull();
        expect(localStorage.getItem('devtools.show_socket_subscriptions')).toBeNull();

        const { getByText } = render(
            <DevToolsProvider>
                <DevToolsDisplay />
            </DevToolsProvider>,
        );

        expect(getByText('Debug Banners: false')).toBeInTheDocument();
        expect(getByText('Show Socket Subscriptions: false')).toBeInTheDocument();

        await act(async () => {
            await userEvent.click(getByText('Debug Banners: false'));
        });

        expect(getByText('Debug Banners: true')).toBeInTheDocument();

        await act(async () => {
            await userEvent.click(getByText('Show Socket Subscriptions: false'));
        });

        expect(getByText('Show Socket Subscriptions: true')).toBeInTheDocument();

        // check persistence
        expect(localStorage.getItem('devtools.debug_banners')).toBe('true');
        expect(localStorage.getItem('devtools.show_socket_subscriptions')).toBe('true');
    });

    it('should get params flags', async () => {
        const { getByText } = render(
            <DevToolsProvider initState={{ show_socket_subscriptions: true }}>
                <DevToolsDisplay />
            </DevToolsProvider>,
        );

        expect(getByText('Debug Banners: false')).toBeInTheDocument();
        expect(getByText('Show Socket Subscriptions: true')).toBeInTheDocument();
    });

    it.each([
        {
            title: 'no values in localStorage',
            input: [],
            output: ['Debug Banners: false', 'Show Socket Subscriptions: false'],
        },
        {
            title: 'banners on, socket subscriptions off',
            input: [
                { key: 'devtools.debug_banners', value: 'true' },
                { key: 'devtools.show_socket_subscriptions', value: 'false' },
            ],
            output: ['Debug Banners: true', 'Show Socket Subscriptions: false'],
        },
        {
            title: 'banners off, socket subscriptions on',
            input: [
                { key: 'devtools.debug_banners', value: 'false' },
                { key: 'devtools.show_socket_subscriptions', value: 'true' },
            ],
            output: ['Debug Banners: false', 'Show Socket Subscriptions: true'],
        },
        // title is used in the `'usecase: $title'`string interpolation
        //eslint-disable-next-line @typescript-eslint/no-unused-vars
    ])('usecase: $title', ({ title, input, output }) => {
        // Setting values in localStorage
        input.forEach(({ key, value }) => {
            localStorage.setItem(key, value);
        });

        const { getByText } = render(
            <DevToolsProvider>
                <DevToolsDisplay />
            </DevToolsProvider>,
        );

        output.forEach((text) => {
            expect(getByText(text)).toBeInTheDocument();
        });
    });
});
