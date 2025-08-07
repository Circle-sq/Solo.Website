import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import type { EventModel } from 'src/appState/models/models/EventModel';
import { IconCategory } from 'src/common/enums';
import { request as getContentIcons } from 'src/modules/content/actions/get-content-icons';
import CompetitionItem from 'src/ui/crossbetting/Competitions/CompetitionItem';

interface Props {
    groupedEvents: [number, EventModel[]][];
}

const Competitions = ({ groupedEvents }: Props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getContentIcons(IconCategory.Competitions));
        dispatch(getContentIcons(IconCategory.CompetitionLocations));
        dispatch(getContentIcons(IconCategory.Sports));
    }, []);

    return (
        <>
            {groupedEvents.map(([competitionId, events]) => {
                const key = `${competitionId}-${events[0]?.id}`;

                return (
                    <CompetitionItem
                        key={key}
                        competitionId={competitionId}
                        eventsList={events}
                        testId={`${competitionId}`}
                    />
                );
            })}
        </>
    );
};

export default observer(Competitions);
