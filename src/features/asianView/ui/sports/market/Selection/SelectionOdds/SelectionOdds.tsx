import { useAtomValue } from 'jotai';

import { selectionPriceSelectorFamily } from 'src/store/events/selectors/selection';

import OddsArrow from './OddsArrow';
import OddsValue from './OddsValue';

interface Props {
    selectionId: number;
    eventId: number;
    onClick: () => void;
    offsetRight?: string;
}

const SelectionOdds = ({ selectionId, eventId, onClick, offsetRight }: Props) => {
    const price = useAtomValue(selectionPriceSelectorFamily(selectionId));

    if (price == null) {
        return null;
    }

    return (
        <>
            <OddsValue selectionId={selectionId} eventId={eventId} price={price} onClick={onClick} />
            <OddsArrow decimalPrice={price.d} offsetRight={offsetRight} />
        </>
    );
};

export default SelectionOdds;
