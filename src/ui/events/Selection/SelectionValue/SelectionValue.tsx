import { useWindowWidth } from '@sc-hooks';
import { useAtomValue } from 'jotai';
import isNumber from 'lodash/isNumber';
import type { RefObject } from 'react';
import { useMemo } from 'react';

import { isDecimalOddsFormatSelector } from '@sc-account/store/selectors';
import { LockIcon } from '@sc-ui/icons/svg';
import { cssColor } from '@sc-ui/system';

import { useAppStateContext } from 'src/appState/AppState';
import { formatDecimalPart, formatNumber } from 'src/utils/format';

import { S_SelectionValue, S_SelectionValueIdentifier } from './styled';

export interface Props {
    valueRef?: RefObject<HTMLSpanElement>;
    displayPrice: string | number | null;
    isCrossBet?: boolean;
    isLocked: boolean;
    isSuspended: boolean;
    isDisplay?: boolean;
}

const SelectionValue = ({
    valueRef,
    displayPrice,
    isCrossBet = false,
    isLocked,
    isSuspended,
    isDisplay = true,
}: Props) => {
    const {
        language: { getTranslation },
    } = useAppStateContext();

    const isDecimal = useAtomValue(isDecimalOddsFormatSelector);

    const { isTabletSmall } = useWindowWidth();

    const selectionValue = useMemo(() => {
        if (isLocked) {
            return <LockIcon fontSize='xsmall' data-testid='lock-icon' color={cssColor('--icon-secondary-color')} />;
        }

        if (!isDisplay) {
            return <>&nbsp;</>;
        }

        if (displayPrice === 'SP') {
            return getTranslation('selection.price.sp.value', 'SP');
        }

        if (isDecimal && isNumber(displayPrice)) {
            return formatNumber(formatDecimalPart(displayPrice));
        }

        return displayPrice;
    }, [isLocked, isDecimal, displayPrice, getTranslation, isDisplay]);

    if (isTabletSmall) {
        return <S_SelectionValue isCrossBet={isCrossBet}>{selectionValue}</S_SelectionValue>;
    }

    return (
        <S_SelectionValueIdentifier>
            <S_SelectionValue
                ref={valueRef}
                isCrossBet={isCrossBet}
                isSuspended={isSuspended}
                data-testid='selectionPrice'
            >
                {selectionValue}
            </S_SelectionValue>
        </S_SelectionValueIdentifier>
    );
};

export default SelectionValue;
