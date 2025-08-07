import {
    useCompetitionIconUrlQuerySelector,
    useCompetitionLocationIconUrlQuerySelector,
} from '@sc-api/icons/querySelectors';
import type { EventGroup } from '@sc-asianView/types';
import { DownArrowIcon, UpArrowIcon } from '@sc-ui/icons/svg';
import { cssColor } from '@sc-ui/system';

import CompetitionLocationIcon from 'src/assets/icons/competitionLocationIcon/CompetitionLocationIcon';
import { SportType } from 'src/common/enums';
import { SIMULATED_REALITY_LEAGUES } from 'src/config/config';

import { S_CompetitionHeaderLeftContent, S_GroupNameSeparator, S_CompetitionIcon, S_ExpandBtnWrapper } from '../styled';

interface Props {
    group: EventGroup;
    isExpanded: boolean;
}

const CompetitionHeader = ({ group, isExpanded }: Props) => {
    const { category, categoryLabel, platformObject, events } = group;

    const competitionIconUrl = useCompetitionIconUrlQuerySelector(platformObject?.id ?? group.id);
    const competitionLocationIconUrl = useCompetitionLocationIconUrlQuerySelector(group.tag, category);

    const isSimulatedRealityLeague = category !== undefined && SIMULATED_REALITY_LEAGUES.includes(category);
    const sportLabel = isSimulatedRealityLeague ? category : categoryLabel;

    const ArrowIcon = isExpanded ? UpArrowIcon : DownArrowIcon;

    return (
        <>
            <S_CompetitionHeaderLeftContent>
                <CompetitionLocationIcon
                    location={category}
                    sport={SportType.Football}
                    sportLabel={sportLabel}
                    locationIcon={competitionLocationIconUrl}
                />
                <span>{categoryLabel}</span>
                <S_GroupNameSeparator />
                {competitionIconUrl !== undefined && <S_CompetitionIcon src={competitionIconUrl} />}
                <span>{group.name}</span>
                <span>{`( ${events.length} )`}</span>
            </S_CompetitionHeaderLeftContent>

            <td>
                <S_ExpandBtnWrapper>
                    <ArrowIcon fontSize='xsmall' color={cssColor('--icon-light-color')} />
                </S_ExpandBtnWrapper>
            </td>
        </>
    );
};

export default CompetitionHeader;
