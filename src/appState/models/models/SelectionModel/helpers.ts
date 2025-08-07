import type { PriceForView } from 'src/common/types/selectionPrice';
import { PriceType } from 'src/common/types/selectionPrice';

import type { PriceForViewParams, SuspendedParams } from './types';

export const getPriceForView = ({
    selection,
    started,
    isSPOnly,
    priceType,
    sp,
}: PriceForViewParams): PriceForView | undefined => {
    const isSP = selection.sp && !started;
    const isLegSP = priceType === PriceType.SP && !sp;
    const isUnnamedFavouriteSP = selection.templateId === 'unnamed-favourite' && isSP;
    const withoutPrice = (isUnnamedFavouriteSP && sp === false) || (sp === true && !isSP);
    const isPriceType = isLegSP || (isUnnamedFavouriteSP && sp !== false);
    const isSelectionPrice =
        !withoutPrice && !sp && !isSP && !isSPOnly && selection.price !== undefined && selection.activated;

    if (isSelectionPrice && !isPriceType) {
        return selection.price;
    }

    if (isPriceType || (isSP && !withoutPrice)) {
        return PriceType.SP;
    }

    return undefined;
};

export const isSuspended = ({ selection, sp, started, tradedInPlay, isSPOnly }: SuspendedParams) => {
    const isSP = selection.sp && !started;

    if (isSP && sp === true) {
        return false;
    }

    return !isSPOnly && !isSP && (!selection.activated || (!tradedInPlay && started));
};

export const isSelected = (priceType?: PriceType, price?: PriceForView) =>
    (priceType === PriceType.SP && price === PriceType.SP) ||
    (priceType === PriceType.FP && price !== undefined && price !== PriceType.SP);
