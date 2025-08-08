import { CircularProgress, Stack, Tooltip, Typography } from '@mui/material';

import { useSportIconUrlQuerySelector } from '@solo-api/icons/querySelectors';
import { DownArrowIcon, HideIcon, ShowIcon } from '@solo-ui/icons/svg';

import { useAppStateContext } from 'src/appState/AppState';
import { SPORT_ICONS } from 'src/config/sport-icons';

import { S_Icon, S_SummaryButton, TooltipStyles } from './styled';

interface Props {
    id: string;
    name: string;
    count: number;
    isLoading: boolean;
    isExpanded: boolean;
    isBettingEnabled: boolean;
    onToggleExpanded: () => void;
    onToggleBetting: () => void;
}

const ItemSport = ({
    id,
    name,
    count,
    isLoading,
    isExpanded,
    isBettingEnabled,
    onToggleExpanded,
    onToggleBetting,
}: Props) => {
    const icon = useSportIconUrlQuerySelector(id);

    const {
        language: { getTranslation },
    } = useAppStateContext();

    const renderStatusIcon = () => {
        if (!isExpanded) {
            return (
                <Stack component='span' direction='row' gap={0.625} alignItems='center'>
                    <Typography component='span' variant='h3'>
                        {count}
                    </Typography>

                    <DownArrowIcon color='currentColor' fontSize='xsmall' />
                </Stack>
            );
        }

        if (!isLoading) {
            return (
                <Tooltip
                    arrow
                    title={getTranslation(
                        isBettingEnabled ? 'lhn.hide.bets' : 'lhn.show.bets',
                        isBettingEnabled ? 'Hide bets' : 'Show bets',
                    )}
                    placement='right'
                    slotProps={TooltipStyles}
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleBetting();
                    }}
                >
                    <Stack component='span'>
                        {isBettingEnabled ? <HideIcon fontSize='small' /> : <ShowIcon fontSize='small' />}
                    </Stack>
                </Tooltip>
            );
        }

        return <CircularProgress color='inherit' size={16} />;
    };

    return (
        <S_SummaryButton data-testid='in-play-lhn-sport' size='md' onClick={onToggleExpanded}>
            {icon === undefined ? (
                <Stack component='span' className={SPORT_ICONS[id] ?? SPORT_ICONS.default} sx={{ m: 0 }} />
            ) : (
                <S_Icon src={icon} />
            )}

            <Typography noWrap component='span' variant='h2' title={name} sx={{ flex: 1 }}>
                {name}
            </Typography>

            {renderStatusIcon()}
        </S_SummaryButton>
    );
};

export default ItemSport;
