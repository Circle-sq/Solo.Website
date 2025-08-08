import CheckboxCheckedIcon from '@solo-asianView/icons/CheckboxCheckedIcon';
import CheckboxUncheckedIcon from '@solo-asianView/icons/CheckboxUncheckedIcon';

import { S_CompetitionItem } from '../styled';

interface Props {
    competitionId: number;
    label: string;
    isSelected: boolean;
    toggleCompetition: (competitionId: number) => void;
}

const LeaguesCompetitionItem = ({ competitionId, label, isSelected, toggleCompetition }: Props) => {
    const toggle = () => {
        toggleCompetition(competitionId);
    };

    return (
        <S_CompetitionItem onClick={toggle}>
            <div>{isSelected ? <CheckboxCheckedIcon /> : <CheckboxUncheckedIcon />}</div>
            <span>{label}</span>
        </S_CompetitionItem>
    );
};

export default LeaguesCompetitionItem;
