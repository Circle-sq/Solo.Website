import { useWindowWidth } from '@solo-hooks';
import { useAtomValue } from 'jotai';
import isUndefined from 'lodash/isUndefined';
import { observer } from 'mobx-react-lite';
import { useRecoilValue } from 'recoil';

import { isFractionalOddsFormatSelector } from '@solo-account/store/selectors';
import { useToggleCrossSelection } from '@solo-betslip/store/hooks/useToggleCrossSelection';
import { isBuildABetPageRelatedSelectionSelector } from '@solo-betslip/store/selectors/selections';

import { SelectionIdentifier } from 'src/common/enums';
import SelectionValue from 'src/ui/events/Selection/SelectionValue/SelectionValue';
import useSelectionState from 'src/ui/events/Selection/useSelectionState';

import { priceDirectionAtomFamily } from '../../events/store/atoms';

import IdentifierLabel from './IdentifierLabel/IdentifierLabel';
import {
    S_CrossBetSelection,
    S_CrossBetSelectionAction,
    S_CrossBetSelectionIdentifier,
    S_CrossBetSelectionName,
    S_IdentifierLabel,
} from './styled';

interface Props {
    selectionId: number;
    identifier: SelectionIdentifier;
    isHandicap?: boolean;
}

const CrossBetSelection = ({ selectionId, identifier, isHandicap = false }: Props) => {
    const isFractional = useAtomValue(isFractionalOddsFormatSelector);
    const isHighlightedBuildABet = useRecoilValue(isBuildABetPageRelatedSelectionSelector(selectionId));
    const priceDirection = useRecoilValue(priceDirectionAtomFamily(selectionId));

    const {
        selectionName,
        handicapLabel,
        displayPrice,
        isDisplay,
        isDisabled: isLocked,
        isOverUnder,
        isSelected,
        isSuspended,
        hasSelection,
        toggleSelection,
    } = useSelectionState({ selectionId, isHandicap });

    const { isTabletSmall } = useWindowWidth();
    const isHandicapOnTablet = isTabletSmall && isHandicap;

    const isAway = identifier === SelectionIdentifier.Away;
    const isDraw = identifier === SelectionIdentifier.Draw;
    const isHome = identifier === SelectionIdentifier.Home;

    const hasIdentifierLabel = isHome || isAway || isDraw;
    const showIdentifierLabel = !isOverUnder && hasSelection && !isUndefined(identifier) && hasIdentifierLabel;

    const toggleCallback = useToggleCrossSelection();

    const alignDirection = isAway ? 'right' : 'left';

    return (
        <S_CrossBetSelection isFractional={isFractional}>
            {isDisplay && (
                <S_CrossBetSelectionAction
                    data-testid={`selection-${selectionName}`}
                    data-test-direction={priceDirection}
                    isHighlightedBuildABet={isHighlightedBuildABet}
                    onClick={(e) => toggleSelection(e, toggleCallback)}
                    priceChange={priceDirection}
                    isSelected={isSelected}
                    isSuspended={isSuspended}
                    isDisplay
                >
                    {isOverUnder && (
                        <S_CrossBetSelectionName
                            title={selectionName}
                            data-testid='selectionName'
                            alignDirection={alignDirection}
                        >
                            {selectionName}

                            {isHandicapOnTablet && (
                                <S_CrossBetSelectionIdentifier>{handicapLabel}</S_CrossBetSelectionIdentifier>
                            )}
                        </S_CrossBetSelectionName>
                    )}

                    {showIdentifierLabel && (
                        <S_IdentifierLabel alignDirection={alignDirection}>
                            <IdentifierLabel
                                isAway={isAway}
                                isDraw={isDraw}
                                isHome={isHome}
                                isHandicap={isHandicap}
                                handicapLabel={handicapLabel}
                            />
                        </S_IdentifierLabel>
                    )}

                    <SelectionValue displayPrice={displayPrice} isSuspended={isSuspended} isLocked={isLocked} />
                </S_CrossBetSelectionAction>
            )}
        </S_CrossBetSelection>
    );
};

export default observer(CrossBetSelection);
