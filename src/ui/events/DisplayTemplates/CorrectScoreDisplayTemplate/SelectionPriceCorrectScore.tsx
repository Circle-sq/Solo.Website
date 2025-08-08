import { useAtomValue } from 'jotai';
import { observer } from 'mobx-react-lite';

import { isFractionalOddsFormatSelector } from '@solo-account/store/selectors';

import { useAppStateContext } from 'src/appState/AppState';
import { RouteName } from 'src/common/enums';
import { S_SelectionPrice } from 'src/ui/events/DisplayTemplates/CorrectScoreDisplayTemplate/styled';
import SelectionAction from 'src/ui/events/Selection/SelectionAction/SelectionAction';
import { S_PureSelection, S_SelectionName, S_SelectionNameValue } from 'src/ui/events/Selection/styled';
import type { DetailedSelectionProps } from 'src/ui/events/Selection/types';
import useSelectionState from 'src/ui/events/Selection/useSelectionState';

const SelectionPriceCorrectScore = ({
    selectionId,
    innerRefName,
    innerRefValue,
    isMultiScores,
}: DetailedSelectionProps) => {
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

    if (!isDisplay) {
        return null;
    }

    return (
        <S_SelectionPrice isMultiScores={isMultiScores}>
            <S_PureSelection isFractional={isFractional}>
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
            </S_PureSelection>
        </S_SelectionPrice>
    );
};

export default observer(SelectionPriceCorrectScore);
