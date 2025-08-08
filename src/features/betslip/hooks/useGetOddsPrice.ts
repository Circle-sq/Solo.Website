import { useAtomValue } from 'jotai';
import get from 'lodash/get';
import { useRecoilValue } from 'recoil';

import { isDecimalOddsFormatSelector, oddsFormatSelector } from '@solo-account/store/selectors';

import { useAppStateContext } from 'src/appState/AppState';
import { OddsFormat } from 'src/common/enums';
import { PriceType } from 'src/common/types/selectionPrice';
import { getDisplayPrice } from 'src/ui/events/Selection/utils';
import { getOddsFormatPrice } from 'src/utils/common';

import type { Leg } from '../api/types/leg';
import { selectionView } from '../helpers/selectionView';
import { isOfferedSelector } from '../store/selectors/offer';
import { getOddsPrice } from '../ui/SelectionList/utils';

import useBetType from './useBetType';

const useGetOddsPrice = (leg: Leg): string => {
    const { isMultiBet } = useBetType(leg);

    const isOffered = useRecoilValue(isOfferedSelector);
    const isDecimalFormat = useAtomValue(isDecimalOddsFormatSelector);
    const oddsFormat = useAtomValue(oddsFormatSelector);
    const multiBetPrice = getOddsFormatPrice(leg.price, oddsFormat);

    const {
        models,
        language: { getTranslation },
    } = useAppStateContext();

    if (isMultiBet) {
        return getOddsPrice(getTranslation, isDecimalFormat, multiBetPrice);
    }

    const selectionId = leg.selectionId ?? leg.selection?.id;
    const isSP = leg.priceType === PriceType.SP;
    const modelView = selectionView(models, selectionId, isSP);

    const price = get(modelView, 'price', null);
    const displayPrice = getDisplayPrice(price, oddsFormat);
    const priceValue = isOffered ? leg.price?.[OddsFormat.Decimal] : displayPrice;

    return getOddsPrice(getTranslation, isDecimalFormat, priceValue);
};

export default useGetOddsPrice;
