import { MobxValue } from '@sc-webapi/mobx-utils/MobxValue';
import {
    addDays,
    addHours,
    addWeeks,
    addYears,
    endOfDay,
    endOfISOWeek,
    getUnixTime,
    startOfDay,
    startOfISOWeek,
    subDays,
} from 'date-fns';
import { computed, makeObservable } from 'mobx';

const TIME_REFRESH = 10000;

const currentTime: MobxValue<Date> = new MobxValue({
    initValue: new Date(),
});

currentTime.onConnect(() => {
    currentTime.setValue(new Date());

    const timer = setInterval(() => {
        currentTime.setValue(new Date());
    }, TIME_REFRESH);

    return () => {
        clearInterval(timer);
    };
});

interface ServerTimeRangeType {
    readonly from: number;
    readonly to: number;
}

class ServerTimeRange {
    readonly get: () => ServerTimeRangeType;

    constructor(get: () => { from: number; to: number }) {
        makeObservable<ServerTimeRange, 'range' | 'from' | 'to'>(this, {
            range: computed,
            from: computed,
            to: computed,
        });

        this.get = get;
    }

    private get range(): ServerTimeRangeType {
        return this.get();
    }

    private get from(): number {
        return this.range.from;
    }

    private get to(): number {
        return this.range.to;
    }

    match(timeUnixSeconds: number): boolean {
        return this.from <= timeUnixSeconds && timeUnixSeconds <= this.to;
    }
}

export class ServerTimeState {
    readonly inPlay: ServerTimeRange;
    readonly nextOff: ServerTimeRange;
    readonly upcoming: ServerTimeRange;
    readonly today: ServerTimeRange;
    readonly tomorrow: ServerTimeRange;
    readonly weekend: ServerTimeRange;
    readonly currentWeek: ServerTimeRange;
    readonly nextWeek: ServerTimeRange;

    constructor() {
        this.inPlay = new ServerTimeRange(
            (): ServerTimeRangeType => ({
                from: getUnixTime(subDays(new Date(), 6)),
                to: getUnixTime(new Date()),
            }),
        );

        this.nextOff = new ServerTimeRange(
            (): ServerTimeRangeType => ({
                from: getUnixTime(startOfDay(new Date())),
                to: getUnixTime(addHours(startOfDay(new Date()), 48)),
            }),
        );

        this.upcoming = new ServerTimeRange(
            (): ServerTimeRangeType => ({
                from: getUnixTime(new Date()),
                to: getUnixTime(addDays(addYears(new Date(), 1), 1)),
            }),
        );

        this.today = new ServerTimeRange(
            (): ServerTimeRangeType => ({
                from: getUnixTime(startOfDay(new Date())),
                to: getUnixTime(endOfDay(new Date())),
            }),
        );

        this.tomorrow = new ServerTimeRange(
            (): ServerTimeRangeType => ({
                from: getUnixTime(addDays(startOfDay(new Date()), 1)),
                to: getUnixTime(addDays(endOfDay(new Date()), 1)),
            }),
        );

        this.weekend = new ServerTimeRange(
            (): ServerTimeRangeType => ({
                from: getUnixTime(subDays(endOfISOWeek(new Date()), 2)),
                to: getUnixTime(endOfISOWeek(new Date())),
            }),
        );

        this.currentWeek = new ServerTimeRange(
            (): ServerTimeRangeType => ({
                from: getUnixTime(startOfISOWeek(new Date())),
                to: getUnixTime(endOfISOWeek(new Date())),
            }),
        );

        this.nextWeek = new ServerTimeRange(
            (): ServerTimeRangeType => ({
                from: getUnixTime(addWeeks(startOfISOWeek(new Date()), 1)),
                to: getUnixTime(addWeeks(endOfISOWeek(new Date()), 1)),
            }),
        );
    }
}
