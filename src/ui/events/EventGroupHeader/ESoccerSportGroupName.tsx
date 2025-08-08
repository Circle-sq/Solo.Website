import { memo } from 'react';
import { useRecoilValue } from 'recoil';

import { CupIcon } from '@solo-ui/icons/svg';

import ESoccerIcon from 'src/assets/icons/ESoccerIcon';
import { SportType } from 'src/common/enums';
import { sportIconUrlSelectorFamily } from 'src/common/store/icons/selectors';
import { I18n } from 'src/ui/common/Language/I18n';
import { S_ContentIcon } from 'src/ui/common/NavigationList/styled';
import { S_CompetitionName, S_CountryName } from 'src/ui/crossbetting/Competitions/styled';
import {
    S_GroupName,
    S_GroupNameSeparator,
    S_CompetitionIcon,
    S_MarginBox,
} from 'src/ui/events/EventGroupHeader/styled';
import type { ESoccerCompetitionGroupNameProps } from 'src/ui/events/EventGroupHeader/types';

const ESoccerSportGroupName = ({ competitionName, categoryIconUrl }: ESoccerCompetitionGroupNameProps) => {
    const eSoccerIconUrl = useRecoilValue(sportIconUrlSelectorFamily(SportType.ESoccer));

    return (
        <S_GroupName data-testid='groupHeader'>
            {eSoccerIconUrl ? <S_ContentIcon src={eSoccerIconUrl} isLoaded /> : <ESoccerIcon />}
            <S_CountryName>
                <I18n langKey='crossbetting.bar.sport.esoccer' defaultText='eSoccer' />
            </S_CountryName>
            <S_GroupNameSeparator />
            {categoryIconUrl !== undefined ? (
                <S_CompetitionIcon src={categoryIconUrl} isLoaded />
            ) : (
                <S_MarginBox>
                    <CupIcon fontSize='small' data-testid='tournamentIcon' />
                </S_MarginBox>
            )}
            <S_CompetitionName title={competitionName}>{competitionName}</S_CompetitionName>
        </S_GroupName>
    );
};

export default memo(ESoccerSportGroupName);
