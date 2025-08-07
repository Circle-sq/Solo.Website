import { type Theme, ThemeProvider } from '@emotion/react';
import { render } from '@testing-library/react';
import {
    addDays,
    addHours,
    addMonths,
    addSeconds,
    addYears,
    endOfHour,
    format,
    startOfDay,
    startOfWeek,
    subMinutes,
} from 'date-fns';
import { RecoilRoot } from 'recoil';
import { describe, expect, it, vi } from 'vitest';

import RecoilObserver from '@sc-tests/unit/mocks/recoil/RecoilObserver';
import { renderWithAppWrapper } from '@sc-tests/unit/mocks/renderMocks';

import type { LanguageStore } from 'src/appState/LanguageStore';
import type { EventModel } from 'src/appState/models/models/EventModel';
import { buildTranslateStatisticsPeriodNameHelper } from 'src/appState/translation-helper';
import { DATE_FORMAT, MATCH_PERIOD, SPORT_TYPE } from 'src/utils/constants';

import EventPeriod from './EventPeriod';
import { formatToSeconds } from './helpers';
import { eventLiveTimerAtomFamily } from './store/atoms';

vi.mock('src/appState/AppState', () => {
    const language: LanguageStore = { getTranslation: (_key: string, defaultText) => defaultText };
    const translateStatisticsPeriodName = buildTranslateStatisticsPeriodNameHelper(language);
    const translateStatisticsMatchMode = (matchMode: string) => matchMode;

    return {
        __esModule: true,
        useAppStateContext: () => ({
            translationsStore: { translateStatisticsPeriodName, translateStatisticsMatchMode },
            language,
        }),
        default: vi.fn(),
    };
});

const mockTheme = {
    star: {
        breakpoints: {
            bp500: '500px',
        },
    },
} as unknown as Partial<Theme>;

describe('EventPeriod', () => {
    it('should render period as is, for corresponding sport', () => {
        const mockEvent = {
            sport: SPORT_TYPE.icehockey,
            mappedPeriod: 'whatever period name',
            stats: {},
        } as EventModel;

        const { getByTestId } = renderWithAppWrapper(<EventPeriod event={mockEvent} isEventPage />);

        expect(getByTestId('EventPeriod')).toHaveTextContent('whatever period name');
    });

    it('should render period translated, for corresponding sport', () => {
        const mockEvent = {
            sport: SPORT_TYPE.football,
            mappedPeriod: MATCH_PERIOD.penaltyShootoutStartingSoon,
            stats: {},
        } as EventModel;

        const { getByTestId } = renderWithAppWrapper(<EventPeriod event={mockEvent} isEventPage />);

        expect(getByTestId('EventPeriod')).toHaveTextContent('Penalty shootout starting soon');
    });

    it('should render "Today" for current day planned event', () => {
        vitest.useFakeTimers();
        // set now to 2024-11-27 13:13
        const today = new Date(2024, 11, 27, 13, 13);
        vitest.setSystemTime(today);
        const startTime = addSeconds(endOfHour(new Date()), 1);
        const mockEvent = {
            sport: SPORT_TYPE.football,
            mappedPeriod: '',
            stats: {},
            timeSettingsStartTime: format(startTime, DATE_FORMAT.FULL_NUMERIC_WITH_TIMEZONE_DIFF),
        } as EventModel;

        const { getByTestId } = renderWithAppWrapper(<EventPeriod event={mockEvent} isEventPage />);
        // because "now" is set to 2024-11-27 13:13, the startTime is 2024-11-27 14:00 - so it's today
        expect(getByTestId('EventPeriod')).toHaveTextContent('Today');
        vitest.restoreAllMocks();
    });

    it('should render "Tomorrow" for next day planned event', () => {
        const startTime = addHours(startOfDay(addDays(new Date(), 1)), 12);
        const mockEvent = {
            sport: SPORT_TYPE.football,
            mappedPeriod: '',
            stats: {},
            timeSettingsStartTime: format(startTime, DATE_FORMAT.FULL_NUMERIC_WITH_TIMEZONE_DIFF),
        } as EventModel;

        const { getByTestId } = renderWithAppWrapper(<EventPeriod event={mockEvent} isEventPage />);

        expect(getByTestId('EventPeriod')).toHaveTextContent('Tomorrow');
    });

    it('should render date/time long format, for planned event', () => {
        const startTime = addHours(startOfWeek(addMonths(new Date(), 1)), 12);
        const mockEvent = {
            sport: SPORT_TYPE.football,
            mappedPeriod: '',
            stats: {},
            timeSettingsStartTime: format(startTime, DATE_FORMAT.FULL_NUMERIC_WITH_TIMEZONE_DIFF),
        } as EventModel;

        const { getByTestId } = render(
            <ThemeProvider theme={mockTheme}>
                <EventPeriod event={mockEvent} />
            </ThemeProvider>,
        );

        expect(getByTestId('EventPeriodWithIcon')).toHaveTextContent(
            format(startTime, DATE_FORMAT.NUMERIC_FULL_DATE_TIME_W_SEPARATOR),
        );
    });

    it('should not render date/time outright event in way future', () => {
        const startTime = addYears(new Date(), 5);
        const mockEvent = {
            sport: SPORT_TYPE.football,
            mappedPeriod: '',
            stats: {},
            timeSettingsStartTime: format(startTime, DATE_FORMAT.FULL_NUMERIC_WITH_TIMEZONE_DIFF),
            isOutright: true,
        } as EventModel;

        const { getByTestId } = renderWithAppWrapper(<EventPeriod event={mockEvent} isEventPage />);

        expect(getByTestId('EventPeriod')).toHaveTextContent('');
    });

    it('should render date/time w/o year within <small/>, for planned event on EventPage', () => {
        const startTime = addHours(startOfWeek(addMonths(new Date(), 1)), 12);
        const mockEvent = {
            sport: SPORT_TYPE.football,
            mappedPeriod: '',
            stats: {},
            timeSettingsStartTime: format(startTime, DATE_FORMAT.FULL_NUMERIC_WITH_TIMEZONE_DIFF),
        } as EventModel;

        const { getByTestId } = renderWithAppWrapper(<EventPeriod event={mockEvent} isEventPage />);

        expect(getByTestId('EventPeriod')).toHaveTextContent(
            format(startTime, DATE_FORMAT.NUMERIC_DAY_MONTH_SHORT_TIME),
        );
    });

    it('should render period and simple timer, for the corresponding sport', () => {
        const startTime = addSeconds(subMinutes(new Date(), 12), 1);
        const mockEvent = {
            sport: SPORT_TYPE.basketball,
            mappedPeriod: MATCH_PERIOD.firstQuarter,
            stats: { timer: { value: '0:01' } },
            timeSettingsStarted: true,
            timeSettingsStartTime: format(startTime, DATE_FORMAT.FULL_NUMERIC_WITH_TIMEZONE_DIFF),
        } as EventModel;

        const { getByTestId } = renderWithAppWrapper(<EventPeriod event={mockEvent} isEventPage />);

        expect(getByTestId('EventPeriod')).toHaveTextContent('1st quarter < 0:01');
    });

    it('should render period and NO timer at "0:00" or "00:00" point', () => {
        const startTime = subMinutes(new Date(), 12);
        const mockEvent1 = {
            sport: SPORT_TYPE.basketball,
            mappedPeriod: MATCH_PERIOD.firstQuarter,
            stats: { timer: { value: '00:00' } },
            timeSettingsStarted: true,
            timeSettingsStartTime: format(startTime, DATE_FORMAT.FULL_NUMERIC_WITH_TIMEZONE_DIFF),
        } as EventModel;

        const { rerender, getByTestId } = renderWithAppWrapper(<EventPeriod event={mockEvent1} isEventPage />);

        expect(getByTestId('EventPeriod')).toHaveTextContent('1st quarter');

        const mockEvent2 = {
            ...mockEvent1,
            stats: { timer: { value: '0:00' } },
        } as EventModel;

        rerender(<EventPeriod event={mockEvent2} />);

        expect(getByTestId('EventPeriodWithIcon')).toHaveTextContent('1st quarter');
    });

    it('should render period and live timer, for the corresponding sport', () => {
        const startTime = new Date();
        const mockEvent = {
            sport: SPORT_TYPE.football,
            mappedPeriod: MATCH_PERIOD.firstPeriod,
            stats: { timer: { value: '0:00' } },
            timeSettingsStarted: true,
            timeSettingsStartTime: format(startTime, DATE_FORMAT.FULL_NUMERIC_WITH_TIMEZONE_DIFF),
        } as EventModel;

        const { getByTestId } = renderWithAppWrapper(<EventPeriod event={mockEvent} />);

        expect(getByTestId('EventPeriodWithIcon')).toHaveTextContent('1st period 00:00');
    });

    it('should render period and live timer, for the match mode sports', () => {
        const id = 0;
        const time = '12:00';
        const startTime = new Date();
        const mockEvent = {
            id,
            sport: SPORT_TYPE.lol,
            mappedPeriod: '1st map',
            matchMode: 'bo3',
            stats: { timer: { value: time } },
            timeSettingsStarted: true,
            timeSettingsStartTime: format(startTime, DATE_FORMAT.FULL_NUMERIC_WITH_TIMEZONE_DIFF),
        } as EventModel;

        const { getByTestId } = renderWithAppWrapper(
            <RecoilRoot>
                <RecoilObserver
                    node={eventLiveTimerAtomFamily(id)}
                    onChange={(_, setValue) => setValue(formatToSeconds(time))}
                />
                <EventPeriod event={mockEvent} />
            </RecoilRoot>,
        );

        expect(getByTestId('EventPeriodWithIcon')).toHaveTextContent('bo3 - 1st map 12:00');
    });

    it('should render live icon if component is used in marquee card, event has not started and has a stream available', () => {
        const startTime = new Date();
        const id = 0;
        const time = '12:00';
        const mockEvent = {
            id,
            sport: SPORT_TYPE.lol,
            mappedPeriod: '1st map',
            matchMode: 'bo3',
            media: { streams: [{ id: '1234', provider: 'bet-radar' }] },
            stats: { timer: { value: time } },
            timeSettingsStarted: false,
            timeSettingsStartTime: format(startTime, DATE_FORMAT.FULL_NUMERIC_WITH_TIMEZONE_DIFF),
        } as EventModel;

        const { getByTestId, getByText } = renderWithAppWrapper(
            <RecoilRoot>
                <RecoilObserver
                    node={eventLiveTimerAtomFamily(id)}
                    onChange={(_, setValue) => setValue(formatToSeconds(time))}
                />
                <EventPeriod isCarousel event={mockEvent} />{' '}
            </RecoilRoot>,
        );

        expect(getByTestId('live-icon')).toBeInTheDocument();
        expect(getByText('bo3 - 1st map 12:00')).toBeInTheDocument();
    });

    it('should not render live icon if component is not used in marquee card, event has not started and has a stream available', () => {
        const startTime = new Date();
        const id = 0;
        const time = '12:00';
        const mockEvent = {
            id,
            sport: SPORT_TYPE.lol,
            mappedPeriod: '1st map',
            matchMode: 'bo3',
            media: { streams: [{ id: '1234', provider: 'bet-radar' }] },
            stats: { timer: { value: time } },
            timeSettingsStarted: false,
            timeSettingsStartTime: format(startTime, DATE_FORMAT.FULL_NUMERIC_WITH_TIMEZONE_DIFF),
        } as EventModel;

        const { queryByTestId, getByText } = renderWithAppWrapper(
            <RecoilRoot>
                <RecoilObserver
                    node={eventLiveTimerAtomFamily(id)}
                    onChange={(_, setValue) => setValue(formatToSeconds(time))}
                />
                <EventPeriod isCarousel={false} event={mockEvent} />
            </RecoilRoot>,
        );

        expect(queryByTestId('live-icon')).not.toBeInTheDocument();
        expect(getByText('bo3 - 1st map 12:00')).toBeInTheDocument();
    });

    it('should not render live icon if component is used in marquee card, event has started and has a stream available', () => {
        const startTime = new Date();
        const mockEvent = {
            sport: SPORT_TYPE.lol,
            mappedPeriod: '1st map',
            matchMode: 'bo3',
            media: { streams: [{ id: '1234', provider: 'bet-radar' }] },
            stats: { timer: { value: '12:00' } },
            timeSettingsStarted: true,
            timeSettingsStartTime: format(startTime, DATE_FORMAT.FULL_NUMERIC_WITH_TIMEZONE_DIFF),
        } as EventModel;

        const { queryByTestId } = renderWithAppWrapper(<EventPeriod isCarousel event={mockEvent} />);

        expect(queryByTestId('live-icon')).not.toBeInTheDocument();
    });

    it('should not render live icon if component is used in marquee card, event has not started and does not have a stream available', () => {
        const startTime = new Date();
        const mockEvent = {
            sport: SPORT_TYPE.lol,
            mappedPeriod: '1st map',
            matchMode: 'bo3',
            stats: { timer: { value: '12:00' } },
            timeSettingsStarted: false,
            timeSettingsStartTime: format(startTime, DATE_FORMAT.FULL_NUMERIC_WITH_TIMEZONE_DIFF),
        } as EventModel;

        const { queryByTestId } = renderWithAppWrapper(<EventPeriod isCarousel event={mockEvent} />);

        expect(queryByTestId('live-icon')).not.toBeInTheDocument();
    });
});
