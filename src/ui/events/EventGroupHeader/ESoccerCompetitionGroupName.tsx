import { memo } from 'react';

import { CupIcon } from '@solo-ui/icons/svg';

import { S_CompetitionName, S_CountryName } from 'src/ui/crossbetting/Competitions/styled';
import {
    S_GroupName,
    S_GroupNameSeparator,
    S_CompetitionIcon,
    S_MarginBox,
} from 'src/ui/events/EventGroupHeader/styled';
import type { ESoccerCompetitionGroupNameProps } from 'src/ui/events/EventGroupHeader/types';

const ESoccerCompetitionGroupName = ({
    competitionName,
    countryName,
    categoryIconUrl,
    competitionIconUrl,
}: ESoccerCompetitionGroupNameProps) => {
    return (
        <S_GroupName data-testid='groupHeader'>
            {categoryIconUrl !== undefined ? (
                <S_CompetitionIcon src={categoryIconUrl} isLoaded />
            ) : (
                <S_MarginBox>
                    <CupIcon fontSize='small' data-testid='tournamentIcon' />
                </S_MarginBox>
            )}
            <S_CountryName>{countryName}</S_CountryName>
            <S_GroupNameSeparator />
            {competitionIconUrl !== undefined && <S_CompetitionIcon src={competitionIconUrl} isLoaded />}
            <S_CompetitionName title={competitionName}>{competitionName}</S_CompetitionName>
        </S_GroupName>
    );
};

export default memo(ESoccerCompetitionGroupName);
