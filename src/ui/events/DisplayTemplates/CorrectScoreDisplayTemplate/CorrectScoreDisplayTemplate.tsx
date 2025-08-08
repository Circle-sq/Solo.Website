import groupBy from 'lodash/groupBy';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';

import { SubKey } from '@solo-features/subscription-manager/subKeys';
import { SubscribeElement } from '@solo-features/subscription-manager/SubscribeElement';

import type { SelectionModel } from 'src/appState/models/models/SelectionModel/SelectionModel';
import { ExpandButton } from 'src/ui/common/ExpandButton/ExpandButton';
import { I18n } from 'src/ui/common/Language/I18n';
import SelectionPriceCorrectScore from 'src/ui/events/DisplayTemplates/CorrectScoreDisplayTemplate/SelectionPriceCorrectScore';
import MarketDescription from 'src/ui/events/DisplayTemplates/MarketDescription';
import type { SimpleDisplayTemplateProps } from 'src/ui/events/DisplayTemplates/types';
import { useCommonTemplate } from 'src/ui/events/hooks/useCommonTemplate';
import MarketGroupTabs from 'src/ui/events/MarketGroup/MarketGroupTabs';
import { getNumberOfSelectionsForView, shouldShowMoreBtn } from 'src/ui/events/utils/commonTemplateLogic';
import { MARKET_TEMPLATE, MarketGroupNames } from 'src/utils/constants';

import { S_TemplateSection } from '../styled';

import { S_HeaderWrapper, S_TemplateWrapper, S_SelectionColumnWrapper } from './styled';

const selectionColumnIndentifiers = {
    home: 'H',
    draw: 'D',
    away: 'A',
    other: '-',
};

const CorrectScoreDisplayTemplate = ({ markets, groupName, type }: SimpleDisplayTemplateProps) => {
    const {
        description,
        displayTemplate,
        displayedRowsLimit,
        isExpanded,
        selectedTabKey,
        selectionsViewModel,
        tabs,
        toggleExpand,
        changeTab,
    } = useCommonTemplate({
        groupName,
        marketTemplate: MARKET_TEMPLATE.correctscore,
        markets,
        type,
    });

    const isMultiScores = groupName === MarketGroupNames.Multiscores;

    const { '-': otherSelections, ...groupSelectionsByIdentifier } = groupBy(
        selectionsViewModel,
        (selection) => selection.identifier,
    );

    const getHeaderIdentifier = (identifier: string) => {
        switch (identifier) {
            case selectionColumnIndentifiers.home:
                return (
                    <S_HeaderWrapper key={identifier}>
                        <I18n langKey='market.template.correctscore.header.label.home' defaultText='1' />
                    </S_HeaderWrapper>
                );

            case selectionColumnIndentifiers.draw:
                return (
                    <S_HeaderWrapper key={identifier}>
                        <I18n langKey='market.template.correctscore.header.label.draw' defaultText='X' />
                    </S_HeaderWrapper>
                );

            case selectionColumnIndentifiers.away:
                return (
                    <S_HeaderWrapper key={identifier}>
                        <I18n langKey='market.template.correctscore.header.label.away' defaultText='2' />
                    </S_HeaderWrapper>
                );
        }
    };

    const selectionsCount =
        typeof groupSelectionsByIdentifier[Object.values(selectionColumnIndentifiers)[0]] !== 'undefined'
            ? groupSelectionsByIdentifier[Object.values(selectionColumnIndentifiers)[0]].length
            : 0;

    const isShowMoreButtonVisible = shouldShowMoreBtn({
        numberOfSelections: selectionsCount,
        displayTemplate,
        displayedRowsLimit,
    });

    const marketIdForDebug = markets[0]?.id;
    const marketRevision = markets[0].revision;

    const getVisibleColumnSelections = (selections: Array<SelectionModel>): Array<SelectionModel> => {
        return !isUndefined(selections) ? selections.filter((selection) => selection.display) : selections;
    };

    return (
        <>
            <MarketGroupTabs tabs={tabs} changeTab={changeTab} activeTabKey={selectedTabKey} />
            <MarketDescription description={description} />
            <S_TemplateSection>
                {Object.values(selectionColumnIndentifiers).map((identifier) => {
                    const selections = getVisibleColumnSelections(groupSelectionsByIdentifier[identifier]);
                    const filteredSelections = !isUndefined(selections)
                        ? selections.filter((selection) => selection.display === true)
                        : selections;

                    return !isEmpty(filteredSelections) && getHeaderIdentifier(identifier);
                })}
            </S_TemplateSection>
            <div className='selections-group-wrap'>
                <SubscribeElement id={marketIdForDebug} subKey={SubKey.correct_score} revision={marketRevision}>
                    <S_TemplateWrapper>
                        {Object.values(selectionColumnIndentifiers).map((identifier) => {
                            const selections = getVisibleColumnSelections(groupSelectionsByIdentifier[identifier]);
                            let filteredSelections = !isUndefined(selections)
                                ? selections.filter((selection) => selection.display === true)
                                : selections;

                            if (!isEmpty(filteredSelections)) {
                                filteredSelections = isExpanded
                                    ? filteredSelections
                                    : filteredSelections.slice(
                                          0,
                                          getNumberOfSelectionsForView(displayTemplate, displayedRowsLimit),
                                      );
                            }

                            return (
                                !isEmpty(filteredSelections) && (
                                    <S_SelectionColumnWrapper key={identifier}>
                                        {filteredSelections.map((selection: SelectionModel) => {
                                            return (
                                                <SelectionPriceCorrectScore
                                                    key={selection.id}
                                                    isMultiScores={isMultiScores}
                                                    selectionId={selection.id}
                                                />
                                            );
                                        })}
                                    </S_SelectionColumnWrapper>
                                )
                            );
                        })}
                    </S_TemplateWrapper>

                    {!isEmpty(otherSelections) && (
                        <S_TemplateWrapper>
                            {otherSelections.map((selection: SelectionModel) => (
                                <SelectionPriceCorrectScore
                                    key={selection.id}
                                    isMultiScores={isMultiScores}
                                    selectionId={selection.id}
                                />
                            ))}
                        </S_TemplateWrapper>
                    )}

                    {isShowMoreButtonVisible && <ExpandButton isExpanded={isExpanded} toggleExpand={toggleExpand} />}
                </SubscribeElement>
            </div>
        </>
    );
};

export default CorrectScoreDisplayTemplate;
