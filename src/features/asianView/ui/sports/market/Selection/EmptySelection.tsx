import { useAtomValue } from 'jotai';

import { SelectionIdentifier } from 'src/common/enums';
import { selectionIdentifierSelectorFamily } from 'src/store/events/selectors/selection';

import { S_SingleValueCell } from './styled';

// TODO: removed as part of fixing UI on table, should remove if no issues raised
const EmptySelection = ({ selectionId }: { selectionId: number }) => {
    const identifier = useAtomValue(selectionIdentifierSelectorFamily(selectionId));

    if (identifier === SelectionIdentifier.Draw) {
        return null;
    }

    return <S_SingleValueCell className='market__cell' />;
};

export default EmptySelection;
