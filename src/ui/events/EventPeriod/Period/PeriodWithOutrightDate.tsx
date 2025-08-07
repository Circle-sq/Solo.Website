import { format } from 'date-fns';

import { useAppStateContext } from 'src/appState/AppState';
import { formatToFullTime } from 'src/common/helpers/date';
import { isValidOutrightDate } from 'src/ui/events/Outrights/utils';
import { DATE_FORMAT } from 'src/utils/constants';

import { isTodayEvent, isTomorrowEvent } from '../helpers';

interface Props {
    startTime: string;
    isEventPage: boolean;
    isOutright: boolean;
}

const PeriodWithOutrightDate = ({ startTime, isEventPage, isOutright }: Props) => {
    const {
        language: { getTranslation },
    } = useAppStateContext();

    if (isOutright && !isValidOutrightDate(startTime)) {
        return null;
    }

    if (isTodayEvent(startTime)) {
        const eventTime = formatToFullTime(startTime);

        return <>{`${getTranslation('event.header.live.today', 'Today')} ${eventTime}`}</>;
    }

    if (isTomorrowEvent(startTime)) {
        const eventTime = formatToFullTime(startTime);

        return <>{`${getTranslation('event.header.live.tomorrow', 'Tomorrow')} ${eventTime}`}</>;
    }

    if (isEventPage) {
        return <>{format(new Date(startTime), DATE_FORMAT.NUMERIC_DAY_MONTH_SHORT_TIME)}</>;
    }

    return <>{format(new Date(startTime), DATE_FORMAT.NUMERIC_FULL_DATE_TIME_W_SEPARATOR)}</>;
};

export default PeriodWithOutrightDate;
