import { categoryResponse, countryResponse, mergedResponse } from 'src/appState/EventsCollection/utilMocks';
import type { EventsResponse } from 'src/appState/EventsCollection/utils';
import { mergeEventsCounterResponse, mergeFootballAndESoccerEvents } from 'src/appState/EventsCollection/utils';
import { cloneItem } from 'src/modules/events/reducers/modelsHelper';
import { parseData } from 'src/modules/events/services/events-counter';
import { COMPETITION_ICON, LHN_SPORTS_ORDER, SPORT_TYPE } from 'src/utils/constants';

describe('utils', () => {
    describe('mergeFootballAndESoccerEvents function', () => {
        const response = mergeEventsCounterResponse(parseData(countryResponse), parseData(categoryResponse));

        it('should merge the response based on country aggregation and the response based on category aggregation', () => {
            expect(mergeEventsCounterResponse(parseData(countryResponse), parseData(categoryResponse))).toMatchObject(
                mergedResponse,
            );
        });

        it('should return the response unchanged if the esoccer sport does not exist', () => {
            const newResponse: EventsResponse = cloneItem(response);
            expect(mergeFootballAndESoccerEvents(newResponse)).toMatchObject(newResponse);
        });

        it('should return the response unchanged if the esoccer sport exists but has no events', () => {
            const newResponse: EventsResponse = cloneItem(response);
            newResponse.sports = [...response.sports, { id: SPORT_TYPE.esoccer, countries: [], count: 0 }];
            expect(mergeFootballAndESoccerEvents(newResponse)).toMatchObject(newResponse);
        });

        it('should return the response changed with esoccer countries (excluding World) as part of the football countries and count incremented if esoccer events are present', () => {
            const newResponse: EventsResponse = cloneItem(response);
            newResponse.sports.push({
                id: SPORT_TYPE.esoccer,
                countries: [
                    { key: LHN_SPORTS_ORDER.WRL, count: 3, label: 'World' },
                    { key: 'GT Sports League', count: 3, label: 'GT Sports League' },
                ],
                count: 3,
            });

            const footballSportId = newResponse.sports.findIndex((sport) => sport.id === SPORT_TYPE.football);
            const result: EventsResponse = cloneItem(newResponse);
            result.sports[footballSportId] = {
                id: 'football',
                count: 2,
                countries: [
                    {
                        key: 'INA',
                        count: 1,
                        label: 'Indonesia',
                    },
                    {
                        key: 'International',
                        count: 1,
                        label: 'International',
                    },
                    { key: 'GT Sports League', count: 3, label: 'GT Sports League', locationIcon: COMPETITION_ICON },
                ],
            };
            const eSoccerId = result.sports.findIndex((sport) => sport.id === SPORT_TYPE.esoccer);
            result.sports.splice(eSoccerId, 1);

            expect(mergeFootballAndESoccerEvents(newResponse)).toMatchObject(result);
        });
    });
});
