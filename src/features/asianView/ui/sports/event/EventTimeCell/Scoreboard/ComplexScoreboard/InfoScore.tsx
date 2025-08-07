import { memo } from 'react';

import { useAppStateContext } from 'src/appState/AppState';
import type { Score } from 'src/common/types/statistics';

import { S_EventRowName, S_InfoRowScore, S_NumberRow } from '../styled';

interface Props {
    label: string;
    score?: Score;
    className?: string;
}

export const InfoScore = ({ label, score, className }: Props) => {
    const {
        language: { getTranslation },
    } = useAppStateContext();

    if (score == null) {
        return null;
    }

    const scoreLabel = getTranslation(`events.row.${label.toLowerCase()}`, label);

    return (
        <span className={className}>
            <S_NumberRow>
                <S_InfoRowScore>{score.home}</S_InfoRowScore>
            </S_NumberRow>
            <S_NumberRow>
                <S_InfoRowScore>{score.away}</S_InfoRowScore>
            </S_NumberRow>
            <S_EventRowName>{scoreLabel}</S_EventRowName>
        </span>
    );
};

export default memo(InfoScore, (prevProps, nextProps) => {
    return prevProps.score?.away === nextProps.score?.away && prevProps.score?.home === nextProps.score?.home;
});
