import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';

import { useAppStateContext } from 'src/appState/AppState';
import type { SelectionModel } from 'src/appState/models/models/SelectionModel/SelectionModel';
import DetailedSelection from 'src/ui/events/Selection/DetailedSelection';
import { getNumberOfSelectionsForView } from 'src/ui/events/utils/commonTemplateLogic';
import type { MarketTemplateType } from 'src/utils/types';

import type { SelectionsRefsType } from '../types';

import { S_Selection, S_SimpleDisplayTemplate } from './styled';

interface Props {
    selections?: SelectionModel[];
    displayedRowsLimit: number;
    displayTemplate: MarketTemplateType;
    isExpanded: boolean;
    eventId?: number | null;
    innerRef?: SelectionsRefsType;
}

const SelectionGroup = ({
    selections = [],
    displayedRowsLimit,
    displayTemplate,
    isExpanded,
    eventId = null,
    innerRef,
}: Props) => {
    const { models } = useAppStateContext();

    const visibleSelections = useMemo(() => {
        const filteredSelections = selections.filter((selection) => selection.display);

        return isExpanded
            ? filteredSelections
            : filteredSelections.slice(0, getNumberOfSelectionsForView(displayTemplate, displayedRowsLimit));
    }, [isExpanded, selections]);

    if (!models.hasEvent(eventId)) {
        return null;
    }

    return (
        <>
            {visibleSelections.map((selection, i) => {
                return (
                    <S_SimpleDisplayTemplate
                        key={selection.id}
                        className={displayTemplate}
                        displayTemplate={displayTemplate}
                        selectionLength={visibleSelections.length}
                    >
                        <S_Selection displayTemplate={displayTemplate}>
                            <DetailedSelection
                                selectionId={selection.id}
                                innerRefName={innerRef?.[i].name}
                                innerRefValue={innerRef?.[i].value}
                            />
                        </S_Selection>
                    </S_SimpleDisplayTemplate>
                );
            })}
        </>
    );
};

export default observer(SelectionGroup);
