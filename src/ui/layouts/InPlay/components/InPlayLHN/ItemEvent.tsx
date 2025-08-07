import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useSetRecoilState } from 'recoil';

import { SubscribeElement } from '@sc-features/subscription-manager/SubscribeElement';
import { SubKey } from '@sc-features/subscription-manager/subKeys';
import { eventMediaAtom } from '@sc-media/store/atoms';
import { LockIcon } from '@sc-ui/icons/svg';
import { cssColor } from '@sc-ui/system';

import { useAppStateContext } from 'src/appState/AppState';
import type { EventModel } from 'src/appState/models/models/EventModel';
import { resetMediaState } from 'src/modules/media/actions/media';
import EventInfographics from 'src/ui/common/EventInfographics/EventInfographics';
import { slug } from 'src/utils/deburr';

import ItemSelection from './ItemSelection';
import { S_Event, S_EventHighlight, S_EventLink, S_Selections } from './styled';

interface Props {
    event: EventModel;
    isBettingEnabled: boolean;
}

const ItemEvent = ({ event, isBettingEnabled }: Props) => {
    const dispatch = useDispatch();

    const {
        router: {
            route: {
                params: { id: selectedEventId },
            },
        },
    } = useAppStateContext();

    const market = useMemo(
        () =>
            event.markets
                .filter((market) => market.inPlayLhn)
                .sort((a, b) => a.displayOrder - b.displayOrder)
                .at(0),
        [event.markets],
    );

    const isEventSelected = event.id === Number(selectedEventId);
    const isMarketExpanded = isBettingEnabled && market?.display;
    const isMarketSuspended = market?.isSuspended || market?.selections.every((selection) => !selection.display);

    const setEventMedia = useSetRecoilState(eventMediaAtom);

    const setMediaEvent = () => {
        dispatch(resetMediaState());
        setEventMedia({ media: event.media, sport: event.sport, id: event.id });
    };

    return (
        <S_Event>
            {isEventSelected && <S_EventHighlight />}

            <SubscribeElement id={event.id} subKey={SubKey.in_play_event} revision={event.revision}>
                <S_EventLink
                    route='event'
                    params={{ id: event.id, slug: slug(event.originalName) }}
                    onClick={setMediaEvent}
                >
                    <EventInfographics event={event} />
                </S_EventLink>
            </SubscribeElement>

            {isMarketExpanded && (
                <SubscribeElement
                    id={market.id}
                    parentId={event.id}
                    subKey={SubKey.in_play_market}
                    revision={market.revision}
                >
                    <S_Selections locked={isMarketSuspended}>
                        {isMarketSuspended ? (
                            <LockIcon color={cssColor('--icon-secondary-color')} fontSize='xsmall' />
                        ) : (
                            market.selections.map((selection) => (
                                <ItemSelection key={selection.id} id={selection.id} line={market.line} />
                            ))
                        )}
                    </S_Selections>
                </SubscribeElement>
            )}
        </S_Event>
    );
};

export default observer(ItemEvent);
