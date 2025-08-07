import type { MouseEvent, PropsWithChildren, RefObject } from 'react';
import { useRecoilValue } from 'recoil';

import { useToggleStandardSelection } from '@sc-betslip/store/hooks/useToggleStandardSelection';
import type { SelectionPayload } from '@sc-betslip/store/types';
import { useBuildABetHighlighted } from '@sc-buildABet/hooks/useBuildABetHighlighted';
import { S_BuildABetSelectionAction } from '@sc-buildABet/ui/selection/styled';

import { priceDirectionAtomFamily } from '../../store/atoms';
import SelectionValue from '../SelectionValue/SelectionValue';

import { S_SelectionAction } from './styled';

interface Props {
    selectionId: number;
    selectionName: string;
    displayPrice: string | number | null;
    isSuspended: boolean;
    isSelected: boolean;
    isLocked: boolean;
    toggleSelection: (e: MouseEvent, toggle: (partialSelection: SelectionPayload) => void) => void;
    eventId?: number;
    innerRefValue?: RefObject<HTMLSpanElement>;
    isDisplay?: boolean;
}

const SelectionAction = ({
    eventId,
    innerRefValue,
    selectionName,
    displayPrice,
    isDisplay = true,
    isLocked,
    isSelected,
    isSuspended,
    toggleSelection,
    selectionId,
    children,
}: PropsWithChildren<Props>) => {
    const priceDirection = useRecoilValue(priceDirectionAtomFamily(selectionId));
    const { isHighlightedBuildABet } = useBuildABetHighlighted(selectionId, eventId);

    const toggleCallback = useToggleStandardSelection();

    const S_SelectionActionWrapper = isHighlightedBuildABet ? S_BuildABetSelectionAction : S_SelectionAction;

    return (
        <S_SelectionActionWrapper
            data-testid={`selection-${selectionName}`}
            data-test-direction={priceDirection}
            onClick={(e) => toggleSelection(e, toggleCallback)}
            priceChange={priceDirection}
            isDisplay={isDisplay}
            isSelected={isSelected}
            isSuspended={isSuspended}
        >
            {children}

            <SelectionValue
                valueRef={innerRefValue}
                displayPrice={displayPrice}
                isSuspended={isSuspended}
                isLocked={isLocked}
                isDisplay={isDisplay}
            />
        </S_SelectionActionWrapper>
    );
};

export default SelectionAction;
