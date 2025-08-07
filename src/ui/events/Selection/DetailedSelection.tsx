import { observer } from 'mobx-react-lite';
import { useAtomValue } from 'jotai';

import { isFractionalOddsFormatSelector } from '@sc-account/store/selectors';

import { useAppStateContext } from 'src/appState/AppState';
import { RouteName } from 'src/common/enums';
import SelectionAction from 'src/ui/events/Selection/SelectionAction/SelectionAction';
import { S_PureSelection, S_SelectionName, S_SelectionNameValue } from 'src/ui/events/Selection/styled';
import type { DetailedSelectionProps } from 'src/ui/events/Selection/types';
import useSelectionState from 'src/ui/events/Selection/useSelectionState';

const DetailedSelection = ({ selectionId, innerRefName, innerRefValue }: DetailedSelectionProps) => {
    const isFractional = useAtomValue(isFractionalOddsFormatSelector);

    const {
        router: { route },
    } = useAppStateContext();

    const isEventPage = route.name === RouteName.Event;

    const {
        eventId,
        selectionName,
        displayPrice,
        isDisplay,
        isDisabled: isLocked,
        isSelected,
        isSuspended,
        hasSelection,
        toggleSelection,
    } = useSelectionState({ selectionId });

    return (
        <S_PureSelection isFractional={isFractional}>
            {isDisplay && (
                <SelectionAction
                    eventId={eventId}
                    selectionId={selectionId}
                    innerRefValue={innerRefValue}
                    selectionName={selectionName}
                    displayPrice={displayPrice}
                    toggleSelection={toggleSelection}
                    isSelected={isSelected}
                    isSuspended={isSuspended}
                    isLocked={isLocked}
                >
                    {hasSelection && (
                        <S_SelectionName ref={innerRefName} isEventPage={isEventPage}>
                            <S_SelectionNameValue data-testid='selectionName' title={selectionName}>
                                {selectionName}
                            </S_SelectionNameValue>
                        </S_SelectionName>
                    )}
                </SelectionAction>
            )}
        </S_PureSelection>
    );
};

export default observer(DetailedSelection);
