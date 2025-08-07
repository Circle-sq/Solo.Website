import { memo } from 'react';

import { useAppStateContext } from 'src/appState/AppState';
import type { Score } from 'src/common/types/statistics';

import { EventRowName, InfoRowScore, NumberRow } from '../styled';

interface Props {
    label?: string;
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

    const scoreLabel = label !== undefined ? getTranslation(`events.row.${label.toLowerCase()}`, label) : undefined;

    return (
        <span className={className}>
            <NumberRow>
                <InfoRowScore>{score.home}</InfoRowScore>
            </NumberRow>
            <NumberRow>
                <InfoRowScore>{score.away}</InfoRowScore>
            </NumberRow>
            <EventRowName>{scoreLabel}</EventRowName>
        </span>
    );
};

export default memo(InfoScore, (prevProps, nextProps) => {
    return (
        prevProps.score?.away === nextProps.score?.away &&
        prevProps.score?.home === nextProps.score?.home &&
        prevProps.label === nextProps.label
    );
});
