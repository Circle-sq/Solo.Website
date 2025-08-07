import { useAtomValue } from 'jotai';

import { eventPeriodSelectorFamily } from 'src/store/events/selectors/event';

import PeriodWithDate from './PeriodWithDate';
import PeriodWithTimer from './PeriodWithTimer';

const Period = ({ eventId }: { eventId: number }) => {
    const period = useAtomValue(eventPeriodSelectorFamily(eventId));

    if (period) {
        return <PeriodWithTimer eventId={eventId} />;
    }

    return <PeriodWithDate eventId={eventId} />;
};

export default Period;
