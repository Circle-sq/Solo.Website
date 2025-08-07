import { useAtomValue } from 'jotai';

import { oddsFormatSelector } from '@sc-account/store/selectors';

import type { Price } from 'src/common/types/selectionPrice';
import { getOddsFormatPrice } from 'src/utils/common';
import { formatDecimalPart } from 'src/utils/format';

import { S_BuildABetOdd } from './styled';

export const BuildABetOdds = ({ price }: { price: Price }) => {
    const oddsFormat = useAtomValue(oddsFormatSelector);
    const oddsPrice = getOddsFormatPrice(price, oddsFormat);
    const selectionOdd = formatDecimalPart(oddsPrice);

    return <S_BuildABetOdd>{selectionOdd}</S_BuildABetOdd>;
};
