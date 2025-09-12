import { useAtomValue } from 'jotai';
import { observer } from 'mobx-react-lite';

import { isFractionalOddsFormatSelector } from '@solo-account/store/selectors';

import IdentifierLabel from 'src/ui/events/Selection/IdentifierLabel/IdentifierLabel';
import SelectionAction from 'src/ui/events/Selection/SelectionAction/SelectionAction';
import useSelectionState from 'src/ui/events/Selection/useSelectionState';

import { S_SelectionHighlightCarousel } from './styled';

interface Props {
    selectionId: number;
    line?: number | null;
}

const SelectionHighlightCarousel = ({ selectionId, line }: Props) => {
    const isFractional = useAtomValue(isFractionalOddsFormatSelector);

    const {
        selectionName,
        handicapLabel,
        displayPrice,
        isDisplay,
        isDisabled,
        isSelected,
        isSuspended,
        hasSelection,
        identifier,
        sportId,
        toggleSelection,
    } = useSelectionState({ selectionId });

    const isLocked = isDisabled || !isDisplay;

    return (
        <S_SelectionHighlightCarousel isFractional={isFractional}>
            {hasSelection && (
                <IdentifierLabel
                    line={line}
                    sportId={sportId}
                    selectionId={selectionId}
                    identifier={identifier}
                    handicapLabel={handicapLabel}
                    isSmallSize
                />
            )}

            <SelectionAction
                selectionId={selectionId}
                selectionName={selectionName}
                displayPrice={displayPrice}
                toggleSelection={toggleSelection}
                isDisplay={isDisplay}
                isSelected={isSelected}
                isSuspended={isSuspended}
                isLocked={isLocked}
            />
        </S_SelectionHighlightCarousel>
    );
};

export default observer(SelectionHighlightCarousel);
