import { Box } from '@mui/material';
import mapValues from 'lodash/mapValues';
import some from 'lodash/some';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRecoilState } from 'recoil';

import { eventMediaAtom } from '@sc-media/store/atoms';

import { setStream } from 'src/modules/media/actions/stream';
import GroupingNavigation from 'src/ui/common/GroupingNavigation/GroupingNavigation';
import { marketDescriptionsGroupsAtom } from 'src/ui/events/store/atoms';

import EventMarkets from '../EventMarkets/EventMarkets';
import useMatchCardMarkets from '../hooks/useMatchCardMarkets';
import MatchLead from '../MatchLead/MatchLead';

import { MatchCardContent } from './styled';

interface Props {
    eventId: number;
}

const MatchCard = ({ eventId }: Props) => {
    const dispatch = useDispatch();

    const { event, markets, marketsCount, marketGroups, isHidden } = useMatchCardMarkets(eventId);
    const [marketDescriptionGroups, setMarketDescriptionGroups] = useRecoilState(marketDescriptionsGroupsAtom);

    const [eventMedia, setEventMedia] = useRecoilState(eventMediaAtom);

    useEffect(() => {
        if (event !== null) {
            const stream = [...event.mediaStreams].shift();

            if (stream !== undefined) {
                dispatch(setStream({ streamId: stream.id, provider: stream.provider }));
            }

            if (!eventMedia) {
                setEventMedia({ media: event.media, sport: event.sport, id: event.id });
            }
        }
    }, [event]);

    const collapseActiveMarketDescriptions = () => {
        if (some(Object.values(marketDescriptionGroups), (group) => group.active)) {
            const newMarketDescriptionGroups = mapValues(marketDescriptionGroups, ({ active, ...rest }) => rest);
            setMarketDescriptionGroups(newMarketDescriptionGroups);
        }
    };

    useEffect(() => {
        collapseActiveMarketDescriptions();
    }, []);

    return (
        <Box>
            <MatchLead eventId={eventId} />
            {event !== null && <GroupingNavigation eventId={eventId} marketGroups={marketGroups} hide={isHidden} />}
            <MatchCardContent key='match-card-content'>
                <EventMarkets eventId={eventId} markets={markets} numberOfMarkets={marketsCount} />
            </MatchCardContent>
        </Box>
    );
};

export default observer(MatchCard);
