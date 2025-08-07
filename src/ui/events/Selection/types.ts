import type { RefObject } from 'react';

export interface SelectionValueType {
    isCrossBet?: boolean;
    isSuspended?: boolean;
    disabled?: boolean;
}

export interface DetailedSelectionProps {
    selectionId: number;
    innerRefName?: RefObject<HTMLSpanElement>;
    innerRefValue?: RefObject<HTMLSpanElement>;
    isMultiScores?: boolean;
}
