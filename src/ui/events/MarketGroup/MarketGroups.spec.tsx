import { vi, describe } from 'vitest';

import { renderWithAppWrapper } from '@sc-tests/unit/mocks/renderMocks';

import { SportType } from 'src/common/enums';

import MarketGroups from './MarketGroups';

const event = require('./tests/mocks/event.json');
const marketGrops = require('./tests/mocks/marketGroups.json');

vi.mock('src/appState/AppState', () => ({
    useAppStateContext: (): Record<string, unknown> => ({
        language: {
            getTranslation: (_label: string, defaultText: string) => defaultText,
        },
    }),
}));

vi.mock('@sc-feature-flags', () => ({
    useAsianInPlayHandicapLineFlag: () => true,
}));

describe('MarketGroups', () => {
    it('should render market header with score if sport is football', () => {
        const { container } = renderWithAppWrapper(<MarketGroups event={event} marketGroups={marketGrops} />);

        expect(container).toHaveTextContent('Spreads (1:1)');
    });

    it('should not render market header with score if event has template id not eligible for score', () => {
        const firstMarketInTheList = { ...marketGrops.markets[0], templateId: 'bet-radar-76' };
        const mainEvent = {
            ...event,
            sport: SportType.Football,
        };
        const modifiedMarketGroups = { ...marketGrops, markets: [{ ...firstMarketInTheList, ...marketGrops.markets }] };

        const { container } = renderWithAppWrapper(
            <MarketGroups event={mainEvent} marketGroups={modifiedMarketGroups} />,
        );

        expect(container).toHaveTextContent(/Spreads/);
    });
});
