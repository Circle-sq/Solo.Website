import { useAtomValue } from 'jotai';
import { observer } from 'mobx-react-lite';

import { isFractionalOddsFormatSelector } from '@solo-account/store/selectors';

import IdentifierLabel from './IdentifierLabel/IdentifierLabel';
import SelectionAction from './SelectionAction/SelectionAction';
import { S_Selection, S_SelectionInlineLine } from './styled';
import useSelectionState from './useSelectionState';

interface Props {
    selectionId: number;
    line?: string | number | null;
    isHandicap?: boolean;
    isHighlighted?: boolean;
    isAmericanSports?: boolean;
    showIdentifier?: boolean;
}

const Selection = ({
    selectionId,
    line,
    isAmericanSports = false,
    isHandicap = false,
    isHighlighted = false,
    showIdentifier = false,
}: Props) => {
    const isFractional = useAtomValue(isFractionalOddsFormatSelector);

    const {
        eventId,
        selectionName,
        handicapLabel,
        displayPrice,
        isDisplay,
        isDisabled: isLocked,
        isSelected,
        isSuspended,
        suspended,
        hasSelection,
        identifier,
        sportId,
        toggleSelection,
    } = useSelectionState({ selectionId, isHandicap });

    const showSelectionInlineLine = isAmericanSports && hasSelection && !suspended;

    return (
        <S_Selection isFractional={isFractional} isAmericanSports={isAmericanSports}>
            {showIdentifier && !isAmericanSports && hasSelection && (
                <IdentifierLabel
                    line={line}
                    sportId={sportId}
                    selectionId={selectionId}
                    identifier={identifier}
                    handicapLabel={handicapLabel}
                />
            )}

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
            >
                {showSelectionInlineLine && (
                    <S_SelectionInlineLine
                        isHighlighted={isHighlighted}
                        isSelected={isSelected}
                        className='selection-inline'
                    >
                        <IdentifierLabel
                            line={line}
                            identifier={identifier}
                            sportId={sportId}
                            selectionId={selectionId}
                            handicapLabel={handicapLabel}
                            isAmericanSports={isAmericanSports}
                        />
                    </S_SelectionInlineLine>
                )}
            </SelectionAction>
        </S_Selection>
    );
};

export default observer(Selection);
