import { Box } from '@mui/material';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import { observer } from 'mobx-react-lite';
import { useMemo, useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import useDeepCompareEffect from 'use-deep-compare-effect';

import { SubKey } from '@solo-features/subscription-manager/subKeys';
import { SubscribeElement } from '@solo-features/subscription-manager/SubscribeElement';
import { cssColor } from '@solo-ui/system';

import { useAppStateContext } from 'src/appState/AppState';
import type { EventsCollectionQuery } from 'src/appState/EventsCollection/types';
import { getCompetitionLocation } from 'src/appState/utils';
import { RequestStatus, RouteName } from 'src/common/enums';
import { request as getEvent } from 'src/modules/events/actions/get';
import { competitionLocationItemsSelector } from 'src/modules/sports/selectors';
import SimpleDisplayTemplate from 'src/ui/events/DisplayTemplates/SimpleDisplayTemplate/SimpleDisplayTemplate';
import Messages from 'src/ui/events/EventsList/Messages';
import MarketOutrightHeader from 'src/ui/events/MarketOutrightHeader/MarketOutrightHeader';
import { getPageSortQuery, getSportId, groupOutrightEvents } from 'src/ui/events/Outrights/utils';

import OutrightHeader from './OutrightHeader/OutrightHeader';
import OutrightNamePanel from './OutrightNamePanel/OutrightNamePanel';
import { Content, MarketGroupContainer } from './styled';
import type { Settings } from './types';

interface Props {
    query: EventsCollectionQuery;
    collectionId: string;
}

const Outrights = ({ query, collectionId }: Props) => {
    const competitionLocations = useSelector(competitionLocationItemsSelector);
    const dispatch = useDispatch();

    const {
        language: { getTranslation },
        eventsCollection,
        router: {
            route: { name: routeName, params },
        },
    } = useAppStateContext();
    const pageSortQuery = getPageSortQuery(params.sportId);

    const [isOpen, setIsOpen] = useState<Settings[]>([]);

    const { events, status, isLoading } = useMemo(() => {
        return eventsCollection.getEventsCollectionList(collectionId, { ...query, sort: pageSortQuery });
    }, []);

    const eventIds = events.map((event) => event.id);

    useDeepCompareEffect(() => {
        batch(() => {
            eventIds.forEach((id) => {
                dispatch(getEvent(id));
            });
        });
    }, [dispatch, eventIds]);

    const sportId = getSportId(routeName, params);

    const competitionLocation = getCompetitionLocation(sportId);

    const changeIsOpen = (group: number, index: string) => {
        const itemFound = isOpen.find((x) => x.group === group && x.id === index);

        const item = {
            group: group,
            id: index,
            open: itemFound ? !itemFound.open : false,
        };

        setIsOpen([...isOpen.filter((x) => !(x.group === group && x.id === index)), item]);
    };

    const checkIsOpen = (group: number, index: string): boolean => {
        const itemFound: Settings | undefined = isOpen.find((x) => x.group === group && x.id === index);

        return itemFound ? itemFound.open : true;
    };

    let groupByParameter: 'formattedDate' | 'eventCompetition';

    if (routeName === RouteName.Competition) {
        groupByParameter = 'formattedDate';
    } else if (routeName === RouteName.Country) {
        groupByParameter = 'eventCompetition';
    }

    const groupedEvents = useMemo(
        () => groupOutrightEvents(events, groupByParameter, competitionLocations, competitionLocation, getTranslation),
        [competitionLocation, competitionLocations, events],
    );

    return (
        <>
            {groupedEvents.map((group, indexCompetition: number) => {
                const { events, competition, formattedDate, locationLabel, weekDayName, eventCompetition } = group;

                const isOpenCompetition = checkIsOpen(1, `${indexCompetition}`);

                const onChangeIsOpen = () => {
                    changeIsOpen(1, `${indexCompetition}`);
                };

                return (
                    <Box key={eventCompetition} sx={{ mb: '8px' }}>
                        <OutrightHeader
                            competition={competition}
                            formattedDate={formattedDate}
                            locationLabel={locationLabel}
                            weekDayName={weekDayName}
                            onChangeIsOpen={onChangeIsOpen}
                            isOpenCompetition={isOpenCompetition}
                        />

                        {isOpenCompetition && (
                            <>
                                {events.map((event, indexEvent) => {
                                    const filteredMarkets = filter(event.markets, { visible: true, websiteMain: true });
                                    const isEventExpandable = !isEmpty(filteredMarkets);

                                    const eventGroupKey = `${indexCompetition}-${indexEvent}`;
                                    const isOpenEvent = checkIsOpen(2, eventGroupKey);

                                    return (
                                        <Box
                                            key={eventGroupKey}
                                            sx={{
                                                backgroundColor: cssColor('--accordion-body-bg'),
                                                ':not(:last-child)': {
                                                    borderBottom: `1px solid ${cssColor('--accordion-border')}`,
                                                },
                                            }}
                                        >
                                            <OutrightNamePanel
                                                event={event}
                                                isOpen={isOpenEvent}
                                                isEventExpandable={isEventExpandable}
                                                eventGroupKey={eventGroupKey}
                                                changeIsOpen={changeIsOpen}
                                            />
                                            {isEventExpandable && isOpenEvent && (
                                                <Content data-testid={`event-${event.id}`}>
                                                    {map(filteredMarkets, (market, indexMarket) => {
                                                        const marketGroupKey = `${eventGroupKey}-${indexMarket}`;
                                                        const isOpenMarket = checkIsOpen(3, marketGroupKey);

                                                        return (
                                                            <MarketGroupContainer
                                                                key={marketGroupKey}
                                                                data-testid={`marketContent-${market.name}`}
                                                            >
                                                                <MarketOutrightHeader
                                                                    name={market.name || ''}
                                                                    isOpen={isOpenMarket}
                                                                    onClick={() => changeIsOpen(3, marketGroupKey)}
                                                                    marketId={market.id}
                                                                />

                                                                {isOpenMarket && (
                                                                    <SubscribeElement
                                                                        id={event.id}
                                                                        subKey={SubKey.outright_event}
                                                                        revision={event.revision}
                                                                    >
                                                                        <SimpleDisplayTemplate
                                                                            eventId={event.id}
                                                                            markets={[market]}
                                                                            type='outright'
                                                                        />
                                                                    </SubscribeElement>
                                                                )}
                                                            </MarketGroupContainer>
                                                        );
                                                    })}
                                                </Content>
                                            )}
                                        </Box>
                                    );
                                })}
                            </>
                        )}
                    </Box>
                );
            })}

            <Messages status={isLoading ? RequestStatus.Progress : status} count={events.length} />
        </>
    );
};

export default observer(Outrights);
