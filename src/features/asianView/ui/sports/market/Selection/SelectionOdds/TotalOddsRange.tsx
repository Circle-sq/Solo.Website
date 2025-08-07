import { useAtomValue } from 'jotai';
import { useMemo } from 'react';

import { useAppStateContext } from 'src/appState/AppState';
import { SportType } from 'src/common/enums';
import {
    selectionLineSelectorFamily,
    selectionTemplateSportIdSelectorFamily,
} from 'src/store/events/selectors/selection';

import { formatDecimals, formatMarketLine } from '../../utils';
import { S_OddsRange } from '../styled';

interface Props {
    selectionId: number;
    firstItem: boolean;
}

const TotalOddsRange = ({ selectionId, firstItem }: Props) => {
    const {
        language: { getTranslation },
    } = useAppStateContext();

    const sportId = useAtomValue(selectionTemplateSportIdSelectorFamily(selectionId));
    const line = useAtomValue(selectionLineSelectorFamily(selectionId));

    const totalLine = useMemo(() => {
        if (line === null) {
            return '';
        }

        if (firstItem) {
            const isFootball = sportId === SportType.Football || sportId === SportType.ESoccer;

            return isFootball ? formatMarketLine(line) : formatDecimals(+line, 1);
        }

        return getTranslation('asianView.event.markets.under', 'u');
    }, [line, sportId, firstItem]);

    return <S_OddsRange>{totalLine}</S_OddsRange>;
};

export default TotalOddsRange;
