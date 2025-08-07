import { observer } from 'mobx-react-lite';

import IdentifierLabel from 'src/ui/events/Selection/IdentifierLabel/IdentifierLabel';
import SelectionAction from 'src/ui/events/Selection/SelectionAction/SelectionAction';
import useSelectionState from 'src/ui/events/Selection/useSelectionState';

interface Props {
    id: number;
    line: number | null;
}

const ItemSelection = ({ id, line }: Props) => {
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
    } = useSelectionState({ selectionId: id, isHandicap: Boolean(line) });

    const isLocked = isDisabled || !isDisplay;

    return (
        <SelectionAction
            isDisplay={isDisplay}
            isSelected={isSelected}
            isSuspended={isSuspended}
            isLocked={isLocked}
            selectionId={id}
            selectionName={selectionName}
            displayPrice={displayPrice}
            toggleSelection={toggleSelection}
        >
            {hasSelection && !isLocked && (
                <IdentifierLabel
                    isSmallSize
                    line={line}
                    sportId={sportId}
                    selectionId={id}
                    identifier={identifier}
                    handicapLabel={handicapLabel}
                />
            )}
        </SelectionAction>
    );
};

export default observer(ItemSelection);
