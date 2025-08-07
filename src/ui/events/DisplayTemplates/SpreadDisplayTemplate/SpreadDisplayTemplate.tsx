import groupBy from 'lodash/groupBy';
import isEmpty from 'lodash/isEmpty';
import { useMemo } from 'react';

import { SubKey } from '@sc-features/subscription-manager/subKeys';
import { SubscribeElement } from '@sc-features/subscription-manager/SubscribeElement';

import type { MarketModel } from 'src/appState/models/models/MarketModel';
import type { SelectionModel } from 'src/appState/models/models/SelectionModel/SelectionModel';
import { ExpandButton } from 'src/ui/common/ExpandButton/ExpandButton';
import MarketDescription from 'src/ui/events/DisplayTemplates/MarketDescription';
import { useCommonTemplate } from 'src/ui/events/hooks/useCommonTemplate';
import MarketGroupTabs from 'src/ui/events/MarketGroup/MarketGroupTabs';
import Selection from 'src/ui/events/Selection/Selection';
import { getSortedLineSelections, shouldShowMoreBtn } from 'src/ui/events/utils/commonTemplateLogic';
import { MARKET_TEMPLATE } from 'src/utils/constants';

import { S_TemplateSection } from '../styled';

import {
    S_HeaderWrapper,
    S_SelectionColumnWrapper,
    S_SelectionGroupWrapper,
    S_SelectionPrice,
    S_TemplateWrapper,
} from './styled';

interface Props {
    markets: MarketModel[];
    groupName?: string;
    type?: string;
}

const FIRST_DATA_COLUMN_INDEX = 0;
const MISSING_REVISION = -12;

const SpreadDisplayTemplate = ({ groupName, type, markets }: Props) => {
    const {
        description,
        displayTemplate,
        displayedRowsLimit,
        groupedSelections,
        isExpanded,
        selectedTabKey,
        tabs,
        changeTab,
        toggleExpand,
        visibleMarkets,
    } = useCommonTemplate({
        groupName,
        marketTemplate: MARKET_TEMPLATE.spread,
        markets,
        type,
    });

    const isShowMoreButtonVisible = shouldShowMoreBtn({
        numberOfSelections: groupedSelections.flat().length,
        displayTemplate,
        displayedRowsLimit,
    });

    const groupedSelectionByParticipants = (items: SelectionModel[]) => groupBy(items, 'nameWithoutLine');

    const getSortedSelection = useMemo(
        () => groupedSelectionByParticipants(getSortedLineSelections(groupedSelections, isExpanded)),
        [groupedSelections, isExpanded],
    );

    const headers = useMemo(() => {
        return Object.keys(getSortedSelection).map((participant) => {
            const selections = getSortedSelection[participant];
            const nameWithoutLine = selections.length > 0 ? selections[0].nameWithoutLine : '';

            return { key: `${nameWithoutLine}`, name: nameWithoutLine };
        });
    }, [getSortedSelection]);

    if (isEmpty(visibleMarkets)) {
        return null;
    }

    return (
        <>
            <MarketGroupTabs tabs={tabs} changeTab={changeTab} activeTabKey={selectedTabKey} displaySingleTab />
            <MarketDescription description={description} />
            <S_TemplateSection>
                {headers.map((header) => (
                    <S_HeaderWrapper key={header.key}>{header.name}</S_HeaderWrapper>
                ))}
            </S_TemplateSection>

            <S_SelectionGroupWrapper>
                <S_TemplateWrapper>
                    {Object.keys(getSortedSelection).map((participant, index) => {
                        return (
                            <S_SelectionColumnWrapper key={participant} data-testid='spreadSelectionColumn'>
                                {getSortedSelection[participant].map((selection) => {
                                    const selectionPrice = (
                                        <S_SelectionPrice key={selection.id} data-testid='spreadSelectionPrice'>
                                            <Selection
                                                line={selection.line}
                                                selectionId={selection.id}
                                                showIdentifier
                                                isHandicap
                                                isHighlighted
                                                isAmericanSports
                                            />
                                        </S_SelectionPrice>
                                    );

                                    if (index === FIRST_DATA_COLUMN_INDEX) {
                                        const marketRevision = selection.getMarket()?.revision ?? MISSING_REVISION;

                                        return (
                                            <SubscribeElement
                                                id={selection.marketId}
                                                key={selection.id}
                                                subKey={SubKey.spread_tmpl}
                                                revision={marketRevision}
                                            >
                                                {selectionPrice}
                                            </SubscribeElement>
                                        );
                                    } else {
                                        return selectionPrice;
                                    }
                                })}
                            </S_SelectionColumnWrapper>
                        );
                    })}
                </S_TemplateWrapper>
                {isShowMoreButtonVisible && <ExpandButton isExpanded={isExpanded} toggleExpand={toggleExpand} />}
            </S_SelectionGroupWrapper>
        </>
    );
};

export default SpreadDisplayTemplate;
