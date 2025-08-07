import isEmpty from 'lodash/isEmpty';
import { useMemo } from 'react';

import { SubKey } from '@sc-features/subscription-manager/subKeys';
import { SubscribeElement } from '@sc-features/subscription-manager/SubscribeElement';

import type { MarketModel } from 'src/appState/models/models/MarketModel';
import type { SelectionModel } from 'src/appState/models/models/SelectionModel/SelectionModel';
import { ExpandButton } from 'src/ui/common/ExpandButton/ExpandButton';
import { I18n } from 'src/ui/common/Language/I18n';
import MarketDescription from 'src/ui/events/DisplayTemplates/MarketDescription';
import { useCommonTemplate } from 'src/ui/events/hooks/useCommonTemplate';
import MarketGroupTabs from 'src/ui/events/MarketGroup/MarketGroupTabs';
import PureSelection from 'src/ui/events/Selection/PureSelection';
import {
    getNumberOfSelectionsForView,
    getSortedLineSelections,
    shouldShowMoreBtn,
} from 'src/ui/events/utils/commonTemplateLogic';
import { MARKET_TEMPLATE } from 'src/utils/constants';

import { S_TemplateSection } from '../styled';

import { getRowSelections, SELECTION_ROW_IDENTIFIERS } from './getRowSelections';
import {
    S_OverUnderSelectionLine,
    S_OverUnderDisplayTemplateWrapper,
    S_OverUnderHeaderWrapper,
    S_OverUnderSelection,
    S_SelectionColumnWrapper,
    S_SelectionPrice,
} from './styled';

function expandedSlice(
    _selections: SelectionModel[],
    isExpanded: boolean,
    numberOfSelectionsShown: number,
): SelectionModel[] {
    let selections = _selections;

    if (!isEmpty(selections)) {
        selections = isExpanded ? selections : selections.slice(0, numberOfSelectionsShown);
    }

    return selections;
}

interface Props {
    markets: MarketModel[];
    groupName?: string;
    type?: string;
}

const FIRST_DATA_COLUMN_INDEX = 1;
const MISSING_REVISION = -13;

const OverUnderDisplayTemplate = ({ groupName, markets, type }: Props) => {
    const {
        description,
        displayTemplate,
        displayedRowsLimit,
        groupedSelections,
        isExpanded,
        isTotalGroup,
        selectedTabKey,
        selectionsViewModel,
        tabs,
        toggleExpand,
        visibleMarkets,
        changeTab,
    } = useCommonTemplate({
        groupName,
        marketTemplate: MARKET_TEMPLATE.overunder,
        markets,
        type,
    });

    const numberOfSelectionsShown = getNumberOfSelectionsForView(displayTemplate, displayedRowsLimit, isTotalGroup);
    const selectionsCount = getRowSelections(groupedSelections.flat(), SELECTION_ROW_IDENTIFIERS.LINE).length;

    const isShowMoreButtonVisible = shouldShowMoreBtn({
        numberOfSelections: selectionsCount,
        displayTemplate,
        displayedRowsLimit,
        threeLineAlways: isTotalGroup,
    });

    const getSortedSelection = useMemo(
        () => getSortedLineSelections(groupedSelections, isExpanded),
        [groupedSelections, isExpanded],
    );

    if (isEmpty(visibleMarkets)) {
        return null;
    }

    return (
        <>
            <MarketGroupTabs
                tabs={tabs}
                changeTab={changeTab}
                activeTabKey={selectedTabKey}
                displaySingleTab={isTotalGroup}
            />
            <MarketDescription description={description} />
            <S_TemplateSection>
                <S_OverUnderHeaderWrapper />
                <S_OverUnderHeaderWrapper>
                    <I18n langKey='market.template.overunder.header.label.over' defaultText='Over' />
                </S_OverUnderHeaderWrapper>
                <S_OverUnderHeaderWrapper>
                    <I18n langKey='market.template.overunder.header.label.under' defaultText='Under' />
                </S_OverUnderHeaderWrapper>
            </S_TemplateSection>
            <div className='selections-group-wrap'>
                <S_OverUnderDisplayTemplateWrapper>
                    {Object.values(SELECTION_ROW_IDENTIFIERS).map((identifier, index) => {
                        return (
                            <S_SelectionColumnWrapper key={identifier}>
                                {getRowSelections(selectionsViewModel, identifier).length ? (
                                    expandedSlice(
                                        getRowSelections(getSortedSelection, identifier),
                                        isExpanded,
                                        numberOfSelectionsShown,
                                    ).map((selection: SelectionModel) => {
                                        if (identifier === SELECTION_ROW_IDENTIFIERS.LINE) {
                                            return (
                                                <S_OverUnderSelection
                                                    key={selection.id}
                                                    data-testid='overUnderSelection'
                                                >
                                                    <S_OverUnderSelectionLine>
                                                        {selection.line ? selection.line : identifier}
                                                    </S_OverUnderSelectionLine>
                                                </S_OverUnderSelection>
                                            );
                                        }

                                        const selectionPrice = (
                                            <S_SelectionPrice key={selection.id} identifier={identifier} overunder>
                                                <PureSelection selectionId={selection.id} />
                                            </S_SelectionPrice>
                                        );

                                        if (index === FIRST_DATA_COLUMN_INDEX) {
                                            const marketRevision = selection.getMarket()?.revision ?? MISSING_REVISION;

                                            return (
                                                <SubscribeElement
                                                    id={selection.marketId}
                                                    key={selection.id}
                                                    subKey={SubKey.o_u_tmpl}
                                                    revision={marketRevision}
                                                >
                                                    {selectionPrice}
                                                </SubscribeElement>
                                            );
                                        }

                                        return selectionPrice;
                                    })
                                ) : (
                                    <S_OverUnderSelection key={identifier} identifier={identifier}>
                                        <S_OverUnderSelectionLine>
                                            {SELECTION_ROW_IDENTIFIERS.LINE}
                                        </S_OverUnderSelectionLine>
                                    </S_OverUnderSelection>
                                )}
                            </S_SelectionColumnWrapper>
                        );
                    })}
                </S_OverUnderDisplayTemplateWrapper>
                {isShowMoreButtonVisible && <ExpandButton isExpanded={isExpanded} toggleExpand={toggleExpand} />}
            </div>
        </>
    );
};

export default OverUnderDisplayTemplate;
