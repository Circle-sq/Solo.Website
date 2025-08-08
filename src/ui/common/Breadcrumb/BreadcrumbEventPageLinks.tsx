import Box from '@mui/material/Box';

import { CupIcon } from '@solo-ui/icons/svg';

import CompetitionLocationIcon from 'src/assets/icons/competitionLocationIcon/CompetitionLocationIcon';
import { SportType } from 'src/common/enums';
import { S_CompetitionIcon } from 'src/ui/events/EventGroupHeader/styled';

import { S_Separator } from './styled';
import type { CompetitionDetails } from './types';

interface Props {
    location?: string;
    category?: string;
    sport?: string;
    sportLabel?: string;
    locationIcon?: string;
    eSoccerIconUrl?: string;
    iconUrl?: string;
    competitionEventById?: CompetitionDetails;
}

const BreadcrumbEventPageLinks = ({
    location,
    category,
    sport,
    sportLabel,
    locationIcon,
    eSoccerIconUrl,
    iconUrl,
    competitionEventById,
}: Props) => {
    const isESoccerSport = competitionEventById?.sport === SportType.ESoccer;

    const renderIcon = () => {
        if (!location) {
            return null;
        }

        if (location === 'World') {
            return (
                <Box sx={{ display: 'flex', mr: '8px' }}>
                    <CupIcon fontSize='small' data-testid='playIcon' />
                </Box>
            );
        }

        if (!isESoccerSport) {
            return (
                <CompetitionLocationIcon
                    location={category}
                    sport={sport || competitionEventById?.sport}
                    sportLabel={sportLabel}
                    locationIcon={locationIcon}
                />
            );
        }

        if (isESoccerSport) {
            return <S_CompetitionIcon src={eSoccerIconUrl} isLoaded />;
        }

        return null;
    };

    const renderCompetitionIcon = () => {
        if (!competitionEventById?.name) {
            return null;
        }

        if (iconUrl) {
            return <S_CompetitionIcon src={iconUrl} isLoaded />;
        }

        return (
            <Box sx={{ display: 'flex', mr: '8px' }}>
                <CupIcon fontSize='small' data-testid='playIcon' />
            </Box>
        );
    };

    return (
        <>
            {renderIcon()}
            {location && (
                <>
                    <span>{location}</span> <S_Separator> | </S_Separator>
                </>
            )}
            {renderCompetitionIcon()}
            <span>{competitionEventById?.name}</span>
        </>
    );
};

export default BreadcrumbEventPageLinks;
