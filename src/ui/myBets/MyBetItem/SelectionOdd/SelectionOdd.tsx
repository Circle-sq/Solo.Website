import { memo } from 'react';
import { useAtomValue } from 'jotai';

import { oddsFormatSelector } from '@sc-account/store/selectors';

import type { Price } from 'src/common/types/selectionPrice';
import { getOddsFormatPrice } from 'src/utils/common';
import { formatDecimalPart } from 'src/utils/format';

import { S_OddPrice, S_SelectionOdd } from './styled';

const SelectionOdd = ({ price }: { price: Price }) => {
    const oddsFormat = useAtomValue(oddsFormatSelector);
    const oddsPrice = getOddsFormatPrice(price, oddsFormat);
    const selectionOdd = formatDecimalPart(oddsPrice);

    return (
        <S_SelectionOdd>
            <S_OddPrice data-testid='oddValue'>{selectionOdd}</S_OddPrice>
        </S_SelectionOdd>
    );
};

export default memo(SelectionOdd);
