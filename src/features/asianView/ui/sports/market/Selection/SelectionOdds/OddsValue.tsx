import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { useRecoilValue } from 'recoil';

import { isDecimalOddsFormatSelector } from '@solo-account/store/selectors';
import { isSelectedSelectorFamily } from '@solo-betslip/store/selectors/selections';
import { useBuildABetHighlighted } from '@solo-buildABet/hooks/useBuildABetHighlighted';

import type { Price } from 'src/common/types/selectionPrice';

import { formatDecimals } from '../../utils';
import {
    S_FractionalOddsValue,
    S_HighlightedBuildABetFractionalOddsValue,
    S_HighlightedBuildABetOddsValue,
    S_OddsValue,
    S_SelectedFractionalOddsValue,
    S_SelectedOddsValue,
} from '../styled';

const DIGITS_COUNT = 2;

interface BaseProps {
    selectionId: number;
    eventId: number;
    onClick: () => void;
}

const DecimalOddsValue = ({ selectionId, onClick, decimalPrice, eventId }: BaseProps & { decimalPrice: number }) => {
    const isSelected = useRecoilValue(isSelectedSelectorFamily(selectionId));
    const { isHighlightedBuildABet } = useBuildABetHighlighted(selectionId, eventId);

    const displayPrice = useMemo(() => formatDecimals(decimalPrice, DIGITS_COUNT), [decimalPrice]);

    if (isSelected) {
        const SelectedOddsValue = isHighlightedBuildABet ? S_HighlightedBuildABetOddsValue : S_SelectedOddsValue;

        return <SelectedOddsValue onClick={onClick}>{displayPrice}</SelectedOddsValue>;
    }

    return <S_OddsValue onClick={onClick}>{displayPrice}</S_OddsValue>;
};

const FractionalOddsValue = ({
    selectionId,
    onClick,
    fractionalPrice,
    eventId,
}: BaseProps & { fractionalPrice: string }) => {
    const isSelected = useRecoilValue(isSelectedSelectorFamily(selectionId));
    const { isHighlightedBuildABet } = useBuildABetHighlighted(selectionId, eventId);

    if (isSelected) {
        const SelectedFractionalOddsValue = isHighlightedBuildABet
            ? S_HighlightedBuildABetFractionalOddsValue
            : S_SelectedFractionalOddsValue;

        return <SelectedFractionalOddsValue onClick={onClick}>{fractionalPrice}</SelectedFractionalOddsValue>;
    }

    return <S_FractionalOddsValue onClick={onClick}>{fractionalPrice}</S_FractionalOddsValue>;
};

const OddsValue = ({ selectionId, onClick, price, eventId }: BaseProps & { price: Price }) => {
    const isDecimal = useAtomValue(isDecimalOddsFormatSelector);

    if (isDecimal) {
        return (
            <DecimalOddsValue selectionId={selectionId} eventId={eventId} decimalPrice={price.d} onClick={onClick} />
        );
    }

    return (
        <FractionalOddsValue selectionId={selectionId} eventId={eventId} fractionalPrice={price.f} onClick={onClick} />
    );
};

export default OddsValue;
