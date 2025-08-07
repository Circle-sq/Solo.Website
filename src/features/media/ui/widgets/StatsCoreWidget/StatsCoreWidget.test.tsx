import { render, screen } from '@testing-library/react';

import { ThemeSwitchProvider } from '@sc-ui/system';

import StatsCoreWidget from './StatsCoreWidget';

window.STATSCOREWidgets = {
    onLoad: vi.fn((callback) => callback(null)),
    WidgetGroup: vi.fn(() => ({
        destroy: vi.fn(),
    })),
};

describe('StatsCoreWidget', () => {
    const eventId = '555333';
    const language = 'en';
    const configurationId = '67becafa74acb8b1c6528a79';

    it('should render and call WidgetGroup with specified arguments', () => {
        render(
            <ThemeSwitchProvider>
                <StatsCoreWidget eventId={eventId} language={language} />
            </ThemeSwitchProvider>,
        );

        const container = screen.getByTestId('statsCoreWidgetContainer');
        expect(container).toBeInTheDocument();

        expect(window.STATSCOREWidgets.onLoad).toHaveBeenCalledTimes(1);

        expect(window.STATSCOREWidgets.WidgetGroup).toHaveBeenCalledWith(
            container,
            configurationId,
            { eventId: `m:${eventId}`, language },
            {},
        );
    });
});
