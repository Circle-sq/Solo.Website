import type { MouseEvent } from 'react';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useAppStateContext } from 'src/appState/AppState';
import type { EventModel } from 'src/appState/models/models/EventModel';
import type { SportType } from 'src/common/enums';
import { request as getCompetitionLocations } from 'src/modules/sports/actions/get-competitions-locations-list';
import { competitionLocationItemsBySportSelector } from 'src/modules/sports/selectors';
import EventGroupHeader from 'src/ui/events/EventGroupHeader/EventGroupHeader';
import EventGroupHeaderESoccer from 'src/ui/events/EventGroupHeader/EventGroupHeaderESoccer';
import EventRow from 'src/ui/events/EventRow/EventRow';
import { S_EventsGroup, S_EventsRowWrapper, S_HeaderGrouping } from 'src/ui/events/EventsList/styled';
import useEventsGrouping from 'src/ui/events/hooks/useEventsGrouping';

import { getEventsCount, getGroupName, hideEventsBasedOnESoccer, hideEventsBasedOnSRL, isESoccerType } from './helpers';

interface Props {
    collapsible?: boolean;
    columnLabelsGroups: string[][];
    countryId?: string | null;
    events: EventModel[];
    isLiveStreamingPage?: boolean;
    selectionsSizes: number[];
    shouldGroupEvents?: boolean;
    sortBy: string;
    sportId: string;
    templatesGroupIds: string[];
}

const Events = ({
    countryId,
    collapsible = true,
    columnLabelsGroups,
    events,
    isLiveStreamingPage,
    selectionsSizes,
    shouldGroupEvents = false,
    sortBy,
    sportId,
    templatesGroupIds,
}: Props) => {
    const dispatch = useDispatch();

    const {
        language: { getTranslation },
        reduxState,
        router: {
            route: { name: routeName, params },
        },
    } = useAppStateContext();

    const [collapsedGroups, setCollapsedGroups] = useState(new Map());

    const competitionLocations = useSelector(competitionLocationItemsBySportSelector(sportId as SportType));

    const { groupedEvents, withGrouping } = useEventsGrouping(
        routeName,
        sortBy,
        events,
        competitionLocations,
        shouldGroupEvents,
        isLiveStreamingPage,
    );

    useEffect(() => {
        if (sportId && competitionLocations.length === 0) {
            dispatch(getCompetitionLocations({ sport: sportId }));
        }
    }, [sportId, competitionLocations.length]);

    const isGroupCollapsed = (groupId: string) => {
        return collapsedGroups.has(groupId);
    };

    const toggleGroup = (groupId?: string) => (event: MouseEvent) => {
        event.preventDefault();

        if (groupId !== undefined) {
            setCollapsedGroups((prevCollapsedGroups) => {
                const newCollapsedGroups = new Map(prevCollapsedGroups);
                newCollapsedGroups.has(groupId)
                    ? newCollapsedGroups.delete(groupId)
                    : newCollapsedGroups.set(groupId, true);

                return newCollapsedGroups;
            });
        }
    };

    return (
        <>
            {withGrouping ? (
                groupedEvents.map((group) => {
                    const eventsCounter = getEventsCount(group);

                    const { competitionId, location, tag, formattedDate, startTime, eventCompetition, originalSport } =
                        group;
                    const groupId = `${competitionId}-${formattedDate}-${startTime}`;
                    const groupKey = `${competitionId}-${location}-${formattedDate}-${startTime}`;

                    if (
                        !eventsCounter ||
                        hideEventsBasedOnESoccer(params.countryId || countryId, originalSport) ||
                        hideEventsBasedOnSRL(params.countryId || countryId, group?.location)
                    ) {
                        return null;
                    }

                    const isOpen = !isGroupCollapsed(groupId);

                    const iconUrl = reduxState.getCompetitionIconUrl(eventCompetition);

                    const groupName = getGroupName({
                        group,
                        routeName,
                        getTranslation,
                        shouldGroupEvents,
                    });

                    const onToggle = toggleGroup(groupId);

                    return (
                        <S_EventsGroup data-testid='eventsGroup' key={groupKey}>
                            <S_HeaderGrouping>
                                {isESoccerType(originalSport) ? (
                                    <EventGroupHeaderESoccer
                                        columnLabelsGroups={columnLabelsGroups}
                                        eventsCount={eventsCounter}
                                        categoryIconUrl={reduxState.getCompetitionLocationIconUrl(tag, location)}
                                        competitionIconUrl={iconUrl}
                                        label={groupName}
                                        onToggle={collapsible ? onToggle : undefined}
                                        isOpen={isOpen}
                                        selectionsSizes={selectionsSizes}
                                        showSelections={false}
                                        sportId={sportId}
                                    />
                                ) : (
                                    <EventGroupHeader
                                        columnLabelsGroups={columnLabelsGroups}
                                        eventsCount={eventsCounter}
                                        iconUrl={iconUrl}
                                        label={groupName}
                                        onToggle={collapsible ? onToggle : undefined}
                                        isOpen={isOpen}
                                        originalSportId={originalSport}
                                        selectionsSizes={selectionsSizes}
                                        showSelections={false}
                                        sportId={sportId}
                                    />
                                )}
                            </S_HeaderGrouping>

                            {isOpen && (
                                <S_EventsRowWrapper data-testid='eventList'>
                                    {group.events.map(({ id, sport, display }) => {
                                        if (!display) {
                                            return null;
                                        }

                                        return (
                                            <EventRow
                                                key={id}
                                                sportId={sport}
                                                eventId={id}
                                                templatesGroupIds={templatesGroupIds}
                                                selectionsSizes={selectionsSizes}
                                            />
                                        );
                                    })}
                                </S_EventsRowWrapper>
                            )}
                        </S_EventsGroup>
                    );
                })
            ) : (
                <>
                    {events.map(({ id, sport, display }) => {
                        if (!display) {
                            return null;
                        }

                        return (
                            <EventRow
                                key={id}
                                sportId={sport}
                                eventId={id}
                                templatesGroupIds={templatesGroupIds}
                                selectionsSizes={selectionsSizes}
                            />
                        );
                    })}
                </>
            )}
        </>
    );
};

export default memo(Events);
