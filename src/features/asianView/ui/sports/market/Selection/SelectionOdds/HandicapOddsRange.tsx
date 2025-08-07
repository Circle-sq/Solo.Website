import { useAtomValue } from 'jotai';
import { useMemo } from 'react';

import {
    selectionHandicapLineSelectorFamily,
    selectionIdentifierSelectorFamily,
    selectionTemplateSportIdSelectorFamily,
} from 'src/store/events/selectors/selection';

import { formatHandicapLine } from '../../../market/utils';
import { S_OddsRange } from '../styled';

interface Props {
    selectionId: number;
}

const HandicapOddsRange = ({ selectionId }: Props) => {
    const identifier = useAtomValue(selectionIdentifierSelectorFamily(selectionId));
    const sportId = useAtomValue(selectionTemplateSportIdSelectorFamily(selectionId));
    const selectionHandicapLine = useAtomValue(selectionHandicapLineSelectorFamily(selectionId));

    const handicapLine = useMemo(() => {
        return formatHandicapLine(selectionHandicapLine ?? '', identifier, sportId);
    }, [selectionHandicapLine, identifier, sportId]);

    return <S_OddsRange>{handicapLine}</S_OddsRange>;
};

export default HandicapOddsRange;
