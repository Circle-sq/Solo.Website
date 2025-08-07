import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import {
    useCompetitionIconUrlQuerySelector,
    useCompetitionLocationIconUrlQuerySelector,
} from '@sc-api/icons/querySelectors';
import { CupIcon, DownArrowIcon, UpArrowIcon } from '@sc-ui/icons/svg';

import { flags } from 'src/assets/icons/competitionLocationIcon/flags';
import ESoccerIcon from 'src/assets/icons/ESoccerIcon';
import { SportType } from 'src/common/enums';
import { sportIconUrlSelectorFamily } from 'src/common/store/icons/selectors';
import { useSubscribeParams } from 'src/utils/Router/hooks/useSubscribeParams';

import type { LHNCompetition } from '../../types';

import ItemEvent from './ItemEvent';
import { S_Events, S_Icon, S_SummaryButton } from './styled';

interface Props {
    competition: LHNCompetition;
    isBettingEnabled: boolean;
}

const ItemCompetition = ({ competition, isBettingEnabled }: Props) => {
    const { id, name, sport, platformObject, categoryInfo, events } = competition;
    const { tag, category } = categoryInfo ?? {};

    const eSoccerIconUrl = useRecoilValue(sportIconUrlSelectorFamily(SportType.ESoccer));
    const iconUrl = useCompetitionIconUrlQuerySelector(platformObject?.id ?? id);
    const locationIconUrl = useCompetitionLocationIconUrlQuerySelector(tag, category);

    const [isExpanded, setIsExpanded] = useState(false);

    const renderIcon = () => {
        if (iconUrl !== undefined) {
            return <S_Icon src={iconUrl} />;
        }

        if (locationIconUrl !== undefined) {
            return <S_Icon src={locationIconUrl} />;
        }

        if (category !== undefined && category in flags) {
            return <S_Icon src={flags[category]} />;
        }

        if (sport === SportType.ESoccer) {
            return eSoccerIconUrl !== undefined ? (
                <S_Icon src={eSoccerIconUrl} />
            ) : (
                <ESoccerIcon width='16' gutter={false} />
            );
        }

        return <CupIcon fontSize='small' />;
    };

    useSubscribeParams(({ id: eventId }) => {
        if (events.some((event) => event.id === Number(eventId))) {
            setIsExpanded(true);
        }
    });

    return (
        <Box>
            <S_SummaryButton size='sm' onClick={() => setIsExpanded(!isExpanded)}>
                {renderIcon()}

                <Typography noWrap component='span' variant='body2' title={name} sx={{ flex: 1 }}>
                    {name}
                </Typography>

                <Stack component='span' direction='row' gap={0.625} alignItems='center'>
                    <Typography component='span' variant='h3'>
                        {events.length}
                    </Typography>

                    {isExpanded ? (
                        <UpArrowIcon color='currentColor' fontSize='xsmall' />
                    ) : (
                        <DownArrowIcon color='currentColor' fontSize='xsmall' />
                    )}
                </Stack>
            </S_SummaryButton>

            {isExpanded && (
                <S_Events>
                    {events.map((event) => (
                        <ItemEvent key={event.id} event={event} isBettingEnabled={isBettingEnabled} />
                    ))}
                </S_Events>
            )}
        </Box>
    );
};

export default ItemCompetition;
