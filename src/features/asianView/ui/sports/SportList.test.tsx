import { waitFor } from '@testing-library/react';
import { useAtomValue } from 'jotai';
import map from 'lodash/map';
import startsWith from 'lodash/startsWith';
import type { ComponentProps, PropsWithChildren } from 'react';

import { renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';
import { server } from '@solo-tests/unit/mocks/server.setup';

import type { EventItem } from 'src/store/events/types';

import { mainLineMarketIdsAtomFamily } from '../../store/mainLine';
import { sportConfigAtomWithQuery } from '../../store/sportConfig';

import type EventHeader from './competitions/CompetitionHeader/CompetitionHeader';
import { S_EventList } from './competitions/styled';
import { EventOddsCell } from './event/EventOddsCell/EventOddsCell';
import { S_EventRowWrapper } from './event/styled';
import SportList from './SportList';
import { handlers } from './test/handlers';

server.use(...handlers);

type EventHeaderProps = ComponentProps<typeof EventHeader>;

function MockEventRow({ event }: { event: EventItem }) {
    const { primaryGroup, secondaryGroup } = useAtomValue(mainLineMarketIdsAtomFamily(event.id));

    return (
        <S_EventRowWrapper key={`event-${event.id}`}>
            {event.name}
            <EventOddsCell eventId={event.id} mainLineMarketIds={primaryGroup} />

            <EventOddsCell eventId={event.id} mainLineMarketIds={secondaryGroup} />
        </S_EventRowWrapper>
    );
}

function MockEventList(props: { events: EventItem[] }) {
    const { isFetching } = useAtomValue(sportConfigAtomWithQuery);

    if (isFetching) {
        return (
            <tr>
                <td data-testid='event-list-spinner'>loading...</td>
            </tr>
        );
    }

    // TODO TBC
    return (
        <S_EventList>
            {map(props.events, (eventItem) => {
                return <MockEventRow key={`event-${eventItem.id}`} event={eventItem} />;
            })}
        </S_EventList>
    );
}

vi.mock('@solo-features/subscription-manager/SubscribeElement', () => ({
    SubscribeElement: ({ children }: PropsWithChildren) => children,
}));

vi.mock('src/features/asianView/ui/sports/event/EventList', () => ({
    default: MockEventList,
}));

vi.mock('src/features/asianView/ui/sports/event/EventHeader', () => ({
    default: (props: EventHeaderProps) => {
        const { categoryLabel, name, events } = props.group;

        // TODO TBC
        return (
            <td>
                {categoryLabel} / {name} ({events.length})
            </td>
        );
    },
}));

vi.mock('src/appState/AppState', () => ({
    useAppStateContext: () => {
        return {
            language: { getTranslation: (_key: string, defaultMessage: string) => defaultMessage },
            eventsCounter: {
                getEventsCounterList: vi.fn().mockReturnValue({ isLoading: false, total: 1 }),
            },
            reduxState: {
                getCompetitionIconUrl: vi.fn().mockReturnValue({ isLoading: false, total: 1 }),
                getCompetitionLocationIconUrl: vi.fn(),
            },
        };
    },
}));

const sanitize = (text: string[]) => {
    return map(text, (t) => {
        // sanitize header
        if (startsWith(t, '||')) {
            // remove all extra chars using regexp
            // '||Time  | Match     |           Match                  |'
            // => 'TimeMatchMatch'
            const result = t.replace(/\|/g, '').replace(/\s{2,}/g, '');
            // console.log('TH before:', t);
            // console.log('TH after :', result);

            return result; //.replace(/\_/g, ' ');
        }
        // replace more than 2 space with nothing
        const result = t
            .replace(/\|/g, '')
            //.replace(/\\s/g, '')
            .replace(/\s{2,}/g, '')
            .trim();
        //const result = t.replace(/\|/g, '').replace(/\s/g, '').trim();
        // console.log('before', t);
        // console.log('after ', result);

        return result;
    }).join('');
};
describe('SportList', () => {
    // TODO: Understand why it fails with valid data
    it.skip('should render list of market and selections (3rows)', async () => {
        const { getByRole, queryByTestId } = renderWithAppWrapper(<SportList />);

        await waitFor(
            () => {
                expect(getByRole('table')).toBeInTheDocument();
            },
            { timeout: 15000 },
        );
        await waitFor(() => {
            expect(queryByTestId('event-list-spinner')).not.toBeInTheDocument();
        });

        expect(getByRole('table')).toHaveTextContent(
            sanitize([
                // prettier-ignore
                'Volleyball - Today (4)',
                '||Time   |             Match                |                Match                      |                                                 ',
                '||                                          |  Winner   |   Point HDP   |   Point O/U   |                                                 ',
                '||                                                                                      |             Current Set                         ',
                '||                                                                                      |   Winner  |   Games HDP  |  Games O/U           ',
                'Serbia / Superliga, Women (1)                                                           |                                                 ',
                'Jedinstvo Stara Pazova vs OK Tent Obrenovac                                             |                                                 ',
                'Poland / Liga Siatkowki, Women (2)                                                      |                                                 ',
                'Bks Bielsko-Biala vs Budowlani Lodz                                                     |                                                 ',
                //row1
                '                                                         9.5    2.10                    |                                                 ',
                '                                                                1.73                    |                                                 ',
                //row2
                '                                               1.47                                     |                                                 ',
                '                                               2.70                                     |                                                 ',
                '                                                         7.5    1.88                    |                                                 ',
                '                                                                1.93                    |                                                 ',
                '                                                                         4.0  5.00      |                                                 ',
                '                                                                           u  5.00      |                                                 ',
                //row3
                '                                                         5.5    1.71                    |                                                 ',
                '                                                                2.15                    |                                                 ',
                //row1
                '                                                                                        |  1.59                                           ',
                '                                                                                        |  2.40                                           ',
                '                                                                                        |              3.5    2.40                        ',
                '                                                                                        |                     1.58      44.5   1.67       ',
                '                                                                                        |                                  u   2.20       ',
                //row2
                '                                                                                        |  1.66                                           ',
                '                                                                                        |  2.25                                           ',
                '                                                                                        |              2.5    2.10                        ',
                '                                                                                        |                     1.76                        ',
                '                                                                                        |                               45.5    2.00      ',
                '                                                                                        |                                  u    1.81      ',
                //row3
                '                                                                                        |  1.60                                           ',
                '                                                                                        |  2.35                                           ',
                '                                                                                        |                               46.5    2.60      ',
                '                                                                                        |                                  u    1.51      ',
                'Chemik Police vs KS Rzeszow',
                'Serbia / Superliga, Women (1)',
                'OK Tent Obrenovac vs Jedinstvo Stara Pazova',
            ]),
        );
    });
});
