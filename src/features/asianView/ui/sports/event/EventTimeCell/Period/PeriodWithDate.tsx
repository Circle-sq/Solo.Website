import { useAtomValue } from 'jotai';

import { formatToFullDate, formatToFullTime } from 'src/common/helpers/date';
import { isTodayEvent, isTomorrowEvent } from 'src/common/helpers/event';
import { eventStartTimeSelectorFamily } from 'src/store/events/selectors/event';
import { I18n } from 'src/ui/common/Language/I18n';

import { S_PeriodWithDateContainer } from '../styled';

const PeriodWithDate = ({ eventId }: { eventId: number }) => {
    const startTime = useAtomValue(eventStartTimeSelectorFamily(eventId));

    if (startTime === undefined) {
        return null;
    }

    const eventTime = formatToFullTime(startTime);

    if (isTodayEvent(startTime)) {
        return <>{eventTime}</>;
    }

    return (
        <S_PeriodWithDateContainer>
            <span>
                {isTomorrowEvent(startTime) ? (
                    <I18n langKey='event.header.live.tomorrow' defaultText='Tomorrow' />
                ) : (
                    formatToFullDate(startTime)
                )}
            </span>
            <span>{eventTime}</span>
        </S_PeriodWithDateContainer>
    );
};

export default PeriodWithDate;
