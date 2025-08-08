import { useCallback, useState } from 'react';

import type { EventGroup } from '@solo-asianView/types';

import { toggleState } from 'src/common/helpers/state';

import EventRow from '../event/EventRow';
import { S_EventRowWrapper, S_EventRowWrapperLive } from '../event/styled';

import CompetitionHeader from './CompetitionHeader/CompetitionHeader';
import { S_CompetitionGroup, S_CompetitionHeader, S_EventList } from './styled';

interface Props {
    group: EventGroup;
    eventType: 'live' | 'upcoming';
}

const CompetitionGroup = ({ group, eventType }: Props) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleExpand = useCallback(() => {
        setIsExpanded(toggleState);
    }, []);

    const EventRowWrapper = eventType === 'live' ? S_EventRowWrapperLive : S_EventRowWrapper;

    return (
        <S_CompetitionGroup>
            <S_CompetitionHeader isExpanded={isExpanded} onClick={toggleExpand} data-testid={`${eventType}SportHeader`}>
                <CompetitionHeader group={group} isExpanded={isExpanded} />
            </S_CompetitionHeader>

            {isExpanded && (
                <S_EventList>
                    {group.events.map((event) => {
                        const testId = `eventListItem-${event.id}`;

                        return (
                            <EventRowWrapper key={testId} data-testid={testId}>
                                <EventRow id={event.id} />
                            </EventRowWrapper>
                        );
                    })}
                </S_EventList>
            )}
        </S_CompetitionGroup>
    );
};

export default CompetitionGroup;
