import type { EventGroup } from '@sc-asianView/types';

import CompetitionGroup from './CompetitionGroup';

interface Props {
    groups: EventGroup[];
    eventType: 'live' | 'upcoming';
}

const Competitions = ({ groups, eventType }: Props) => {
    return (
        <>
            {groups.map((group, index) => {
                const key = `${eventType}group-${group.id}-${index}`;

                return <CompetitionGroup key={key} group={group} eventType={eventType} />;
            })}
        </>
    );
};

export default Competitions;
