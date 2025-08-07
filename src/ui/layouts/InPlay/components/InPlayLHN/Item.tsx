import { Box, Stack } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

import { DownArrowIcon } from '@sc-ui/icons/svg';

import { useAppStateContext } from 'src/appState/AppState';
import { I18n } from 'src/ui/common/Language/I18n';
import { useSubscribeParams } from 'src/utils/Router/hooks/useSubscribeParams';

import { useLHNCompetitions } from '../../hooks/useLHNCompetitions';
import type { LHNSport } from '../../types';

import ItemCompetition from './ItemCompetition';
import ItemSport from './ItemSport';
import { S_ShowMoreButton } from './styled';

interface Props {
    sport: LHNSport;
}

const Item = ({ sport }: Props) => {
    const { models } = useAppStateContext();

    const [isExpanded, setIsExpanded] = useState(false);
    const [isBettingEnabled, setIsBettingEnabled] = useState(true);

    const { competitions, isLoading, isShowMoreAvailable, onShowMore } = useLHNCompetitions(sport.id, isExpanded);

    useSubscribeParams(({ id: eventId }) => {
        const event = models.getEvent(Number(eventId));

        if (sport.id === event?.sport) {
            setIsExpanded(true);
        }
    });

    return (
        <Box sx={{ overflow: 'hidden', borderRadius: 0.5 }}>
            <ItemSport
                id={sport.id}
                name={sport.name}
                count={sport.count}
                isLoading={isLoading}
                isExpanded={isExpanded}
                isBettingEnabled={isBettingEnabled}
                onToggleExpanded={() => setIsExpanded(!isExpanded)}
                onToggleBetting={() => setIsBettingEnabled(!isBettingEnabled)}
            />

            {isExpanded && (
                <Stack spacing={0.125} sx={{ mt: 0.125 }}>
                    {competitions.map((competition) => (
                        <ItemCompetition
                            key={competition.id}
                            competition={competition}
                            isBettingEnabled={isBettingEnabled}
                        />
                    ))}
                </Stack>
            )}

            {isExpanded && isShowMoreAvailable && (
                <S_ShowMoreButton disabled={isLoading} onClick={onShowMore}>
                    <I18n langKey='lhn.show.more' defaultText='Show more' />
                    <DownArrowIcon color='currentColor' fontSize='xsmall' />
                </S_ShowMoreButton>
            )}
        </Box>
    );
};

export default observer(Item);
