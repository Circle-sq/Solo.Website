import { useAtomValue } from 'jotai';
import { useCallback } from 'react';

import { MarketTypeGeneric } from '@solo-asianView/constants';

import {
    selectionActiveSelectorFamily,
    selectionDisplaySelectorFamily,
    selectionNameSelectorFamily,
} from 'src/store/events/selectors/selection';

import LockedSelection from './LockedSelection';
import HandicapOddsRange from './SelectionOdds/HandicapOddsRange';
import SelectionOdds from './SelectionOdds/SelectionOdds';
import TotalOddsRange from './SelectionOdds/TotalOddsRange';
import { S_SingleValueCell, S_ValueWithRangeCell } from './styled';

interface Props {
    selectionId: number;
    eventId: number;
    firstItem: boolean;
    marketTypeGeneric?: string;
    toggleSelection: (id: number) => void;
}

const Selection = ({ selectionId, marketTypeGeneric, toggleSelection, firstItem, eventId }: Props) => {
    const active = useAtomValue(selectionActiveSelectorFamily(selectionId));
    const display = useAtomValue(selectionDisplaySelectorFamily(selectionId));
    const selectionName = useAtomValue(selectionNameSelectorFamily(selectionId));

    const toggle = useCallback(() => {
        toggleSelection(selectionId);
    }, [selectionId, toggleSelection]);

    if (!display) {
        return null;
    }

    if (!active) {
        return <LockedSelection />;
    }

    if (marketTypeGeneric === MarketTypeGeneric.OverUnder) {
        return (
            <S_ValueWithRangeCell className='market__cell' data-testid={`selection-${selectionName}`}>
                <TotalOddsRange selectionId={selectionId} firstItem={firstItem} />
                <SelectionOdds selectionId={selectionId} eventId={eventId} onClick={toggle} />
            </S_ValueWithRangeCell>
        );
    }

    if (marketTypeGeneric === MarketTypeGeneric.TwoWayHandicap) {
        return (
            <S_ValueWithRangeCell className='market__cell' data-testid={`selection-${selectionName}`}>
                <HandicapOddsRange selectionId={selectionId} />
                <SelectionOdds selectionId={selectionId} eventId={eventId} onClick={toggle} />
            </S_ValueWithRangeCell>
        );
    }

    return (
        <S_SingleValueCell className='market__cell' data-testid={`selection-${selectionName}`}>
            <SelectionOdds selectionId={selectionId} eventId={eventId} onClick={toggle} offsetRight='2.5%' />
        </S_SingleValueCell>
    );
};

export default Selection;
