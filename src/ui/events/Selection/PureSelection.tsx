import { useAtomValue } from 'jotai';
import { observer } from 'mobx-react-lite';

import { isFractionalOddsFormatSelector } from '@sc-account/store/selectors';

import SelectionAction from './SelectionAction/SelectionAction';
import { S_PureSelection } from './styled';
import useSelectionState from './useSelectionState';

interface Props {
    selectionId: number;
    isSP?: boolean;
}

const PureSelection = ({ selectionId, isSP }: Props) => {
    const isFractional = useAtomValue(isFractionalOddsFormatSelector);

    const {
        eventId,
        selectionName,
        displayPrice,
        isDisplay,
        isDisabled: isLocked,
        isSelected,
        isSuspended,
        toggleSelection,
    } = useSelectionState({ selectionId, isSP });

    return (
        <S_PureSelection isFractional={isFractional}>
            <SelectionAction
                eventId={eventId}
                selectionId={selectionId}
                selectionName={selectionName}
                displayPrice={displayPrice}
                toggleSelection={toggleSelection}
                isSelected={isSelected}
                isSuspended={isSuspended}
                isLocked={isLocked}
                isDisplay={isDisplay}
            />
        </S_PureSelection>
    );
};

export default observer(PureSelection);
