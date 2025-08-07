import { getTime } from 'date-fns';
import type { OrderedMap } from 'immutable';

import type { MediaOption, MediaOptionGroup } from './types';

export const mapStreamsToDropdownOptions = (
    streams: MediaOption[],
    sports: OrderedMap<string, unknown>,
): MediaOptionGroup[] => {
    const groupOptions = streams.reduce((acc: Record<string, MediaOption[]>, stream: MediaOption) => {
        const option = {
            ...stream,
            value: stream.id,
            provider: stream.provider,
            label: stream.name,
        };

        return {
            ...acc,
            [stream.sportId]: acc[stream.sportId] !== undefined ? [...acc[stream.sportId], option] : [option],
        };
    }, {});

    return Object.keys(groupOptions).map(
        (key: string): MediaOptionGroup => ({
            label: sports.getIn([key, 'name']),
            value: key,
            options: groupOptions[key],
        }),
    );
};

export const sortMappedStreams = (streams: MediaOptionGroup[]): MediaOptionGroup[] => {
    streams
        .sort((prev, next) => {
            return Number(next.options[0].sportDisplayOrder) - Number(prev.options[0].sportDisplayOrder);
        })
        .forEach((sport) => {
            return sport.options.sort((prev, next) => {
                if (prev.competitionDisplayOrder === next.competitionDisplayOrder) {
                    const prevDate = getTime(new Date(prev.eventStartTime));
                    const nextDate = getTime(new Date(next.eventStartTime));

                    if (prevDate === nextDate) {
                        if (prev.name > next.name) {
                            return 1;
                        } else if (prev.name < next.name) {
                            return -1;
                        } else if (prev.name === next.name) {
                            return 0;
                        }
                    }

                    return prevDate - nextDate;
                }

                return Number(next.competitionDisplayOrder) - Number(prev.competitionDisplayOrder);
            });
        });

    return streams;
};
