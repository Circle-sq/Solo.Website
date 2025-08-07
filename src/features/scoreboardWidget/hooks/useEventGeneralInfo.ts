import { setDefaultOptions } from 'date-fns';
import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';

import { useAppStateContext } from 'src/appState/AppState';

import { langToLocale } from '../helpers';

const useEventGeneralInfo = (eventId: number) => {
    const {
        models,
        language: { userLang },
    } = useAppStateContext();

    const event = models.getEvent(Number(eventId));

    if (!isNull(userLang)) {
        const locale = langToLocale(userLang);
        setDefaultOptions({ locale });
    }

    const isLive = event?.timeSettingsStarted ?? false;
    const stats = event?.stats ?? {};
    const sport = event?.sport;
    const mappedPeriod = event?.mappedPeriod;
    const eventName = event?.name;
    const isOutright = event?.isOutright;

    const isPreMatch = stats === null || isEmpty(stats);

    return {
        sport,
        eventName,
        isLive,
        isPreMatch,
        isOutright,
        isEventScore: event?.isEventScore,
        mappedPeriod: mappedPeriod,
        stats,
    };
};

export default useEventGeneralInfo;
