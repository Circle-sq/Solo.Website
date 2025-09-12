import { OrderedMap } from 'immutable';
import { useAtomValue } from 'jotai';
import find from 'lodash/find';
import flatMap from 'lodash/flatMap';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import isUndefined from 'lodash/isUndefined';
import { type Dispatch, memo, type SetStateAction, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { GroupHeadingProps, MultiValue, SingleValue } from 'react-select';
import { components } from 'react-select';
import { useSetRecoilState } from 'recoil';

import { eventMediaAtom } from '@solo-media/store/atoms';

import { useAppStateContext } from 'src/appState/AppState';
import { ThemeNames } from 'src/common/enums';
import { hasIdInValue } from 'src/common/typeGuards/select';
import type { Media } from 'src/common/types/media';
import { eventSelector } from 'src/modules/events/selectors';
import { setDropdownListState, setMediaEventId, setMediaIsPlayingVideo } from 'src/modules/media/actions/media';
import { setStream as setSelectedStreamsIds } from 'src/modules/media/actions/stream';
import { mediaSelector, mediaStreamsItemsSelector } from 'src/modules/media/selectors';
import { fetchEventWithoutMarketsAtomWithMutation } from 'src/store/events/queries/events';
import DropdownSelect from 'src/ui/common/DropdownSelect/DropdownSelect';
import type { Option } from 'src/common/types/option';

import { mapStreamsToDropdownOptions, sortMappedStreams } from './helpers';
import MediaGroupLabel from './MediaGroupLabel';
import { S_GroupHeader } from './styled';
import type { MediaOption } from './types';

const GroupHeading = (props: GroupHeadingProps<Option>) => {
    const { GroupHeading } = components;

    return (
        <S_GroupHeader>
            <GroupHeading {...props} />
        </S_GroupHeader>
    );
};

const MediaDropdown = ({ setIsDropdownListEvent }: { setIsDropdownListEvent: Dispatch<SetStateAction<boolean>> }) => {
    const dispatch = useDispatch();
    const {
        language: { getTranslation },
    } = useAppStateContext();

    const setEventMedia = useSetRecoilState(eventMediaAtom);

    const media = useSelector(mediaSelector);
    const sports = useSelector(({ sports }) => sports.getIn(['all', 'items'], OrderedMap()));
    const streams: MediaOption[] = useSelector(mediaStreamsItemsSelector);

    const { mutate: fetchEventWithoutMarkets } = useAtomValue(fetchEventWithoutMarketsAtomWithMutation);
    const options = useMemo(() => sortMappedStreams(mapStreamsToDropdownOptions(streams, sports)), [streams, sports]);

    useEffect(() => {
        if (media?.streamId) {
            const flatOptions: Array<MediaOption> = flatMap(options, (sportOptions) => sportOptions.options);

            const selectedStream = find(flatOptions, (option) => option.id === media?.streamId);

            if (selectedStream) {
                setOptionValue(selectedStream);
            }
        }
    }, [media?.streamId, streams]);

    const [optionValue, setOptionValue] = useState<SingleValue<MediaOption | undefined>>(undefined);
    const isMediaStreamDisabled = streams === undefined || streams.length < 1;
    const placeholder = isMediaStreamDisabled
        ? getTranslation('betslip.tabs.search.event.palceholder.no-options', 'No live streaming events available')
        : getTranslation('betslip.tabs.search.event.palceholder', 'Search an event...');

    const getEventId = (): number => {
        if (optionValue && !isUndefined(optionValue?.sportEventId)) {
            return +optionValue?.sportEventId;
        }

        return -1;
    };

    const eventId = getEventId();

    const event = useSelector(eventSelector(eventId));

    useEffect(() => {
        if (optionValue?.id && !event?.id) {
            fetchEventWithoutMarkets(+optionValue.sportEventId, {
                onSuccess: (eventItem) => {
                    if (!eventItem) {
                        return;
                    }

                    setEventMedia({
                        media: eventItem.media as Media,
                        sport: eventItem.sport,
                        id: eventItem.id,
                    });
                },
            });
        }
    }, [optionValue?.id, event?.id]);

    useEffect(() => {
        if (event) {
            setEventMedia({ media: event.media, sport: event.sport, id: event.id });
        }
    }, [event?.id]);

    const handleMenuOpen = async () =>
        (async () => {
            if (document.pictureInPictureElement !== null) {
                await document.exitPictureInPicture();
            }
        })();

    const onChangeDropdownSelect = (newValue: SingleValue<Option | MediaOption> | MultiValue<Option | MediaOption>) => {
        if (isNil(newValue) || !hasIdInValue(newValue)) {
            return;
        }
        setOptionValue(newValue);
        setIsDropdownListEvent(true);

        if (!isEmpty(newValue)) {
            const { id: streamId, provider } = newValue;
            dispatch(setMediaEventId(Number(newValue.sportEventId)));
            dispatch(setMediaIsPlayingVideo(true));
            dispatch(setDropdownListState(true));
            dispatch(setSelectedStreamsIds({ streamId, provider }));
        }
    };

    return (
        <DropdownSelect
            customTheme={ThemeNames.Media}
            isDisabled={isMediaStreamDisabled}
            placeholder={placeholder}
            value={optionValue}
            options={options}
            onChange={onChangeDropdownSelect}
            formatGroupLabel={(group) => <MediaGroupLabel {...group} />}
            components={{ GroupHeading }}
            onMenuOpen={handleMenuOpen}
        />
    );
};

export default memo(MediaDropdown);
