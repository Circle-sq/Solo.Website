import filter from 'lodash/filter';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import sortBy from 'lodash/sortBy';
import { type ReactElement, useMemo } from 'react';

import type { MarketModel } from 'src/appState/models/models/MarketModel';
import { ExpandButton } from 'src/ui/common/ExpandButton/ExpandButton';
import { I18n } from 'src/ui/common/Language/I18n';
import MarketDescription from 'src/ui/events/DisplayTemplates/MarketDescription';
import { useCommonTemplate } from 'src/ui/events/hooks/useCommonTemplate';
import MarketGroupTabs from 'src/ui/events/MarketGroup/MarketGroupTabs';
import PureSelection from 'src/ui/events/Selection/PureSelection';
import { getDisplayOrderCriteria, TEMPLATE_TAB_GROUPING_TYPES } from 'src/ui/events/utils/commonTemplateLogic';
import { MARKET_TABS_GOALSCORER, MARKET_TEMPLATE, MARKET_TEMPLATES_SETTINGS, NUMBERS } from 'src/utils/constants';
import { sortSelectionsByCriteria } from 'src/utils/sortNew';

import { S_TemplateSection } from '../styled';

import {
    S_GoalscorerDisplayTemplateWrapper,
    S_GoalscorerHeaderWrapper,
    S_GoalscorerPlayerName,
    S_SelectionPrice,
    S_TemplateSelectionRow,
} from './styled';

const THREE_COLUMNS = 3;
const FOUR_COLUMNS = 4;
const DISPLAYED_ROW_LIMIT = MARKET_TEMPLATES_SETTINGS.rowsDisplayLimit.default;

interface Props {
    markets: MarketModel[];
    groupName?: string;
}

const GoalscorerDisplayTemplate = ({ groupName, markets }: Props) => {
    const { description, isExpanded, selectedTabKey, selectionsViewModel, tabs, toggleExpand, changeTab } =
        useCommonTemplate({
            groupName,
            marketTemplate: MARKET_TEMPLATE.goalscorer,
            markets,
            tabGroupingLogicType: TEMPLATE_TAB_GROUPING_TYPES.goalscorer,
        });

    const [firstSelection] = selectionsViewModel;
    const displayOrder = getDisplayOrderCriteria(firstSelection?.marketSelectionOrdering);
    const sortedSelectionsViewModel = sortSelectionsByCriteria(selectionsViewModel, displayOrder);
    const sortSelections = orderBy(sortedSelectionsViewModel, (selection) => selection?.price?.d);

    const rows = useMemo(() => {
        const filteredSelections = filter(sortSelections, { active: true });
        const rows = groupBy(filteredSelections, 'name');

        for (const [playerName] of Object.entries(rows)) {
            rows[playerName] = sortBy(rows[playerName], (selection) =>
                ['SA', 'SF', 'SL', 'S2M', 'S3M'].indexOf(`${selection.identifier}`),
            );
        }

        return rows;
    }, [selectionsViewModel]);

    const columnsNumber = selectedTabKey === MARKET_TABS_GOALSCORER.singleGoal ? FOUR_COLUMNS : THREE_COLUMNS;

    const single: Record<string, ReactElement> = {
        SF: <I18n langKey='market.template.goalscorer.header.label.first' defaultText='First' />,
        SA: <I18n langKey='market.template.goalscorer.header.label.anytime' defaultText='Anytime' />,
        SL: <I18n langKey='market.template.goalscorer.header.label.last' defaultText='Last' />,
    };
    const multiples = {
        S2M: <I18n langKey='market.template.goalscorer.header.label.two.more' defaultText='2 or more' />,
        S3M: <I18n langKey='market.template.goalscorer.header.label.three.more' defaultText='3 or more' />,
    };

    const isShowMoreButtonVisible = Object.keys(rows).length > DISPLAYED_ROW_LIMIT;
    const rowSliceBound = isExpanded ? Object.keys(rows).length : DISPLAYED_ROW_LIMIT;
    const groupedSelections = groupBy(sortSelections, 'identifier');

    const renderHeaders = (headers: Record<string, ReactElement>) =>
        Object.keys(groupedSelections).map((key: string) => (
            <S_GoalscorerHeaderWrapper key={key}>{headers[key]}</S_GoalscorerHeaderWrapper>
        ));

    return (
        <>
            <MarketGroupTabs tabs={tabs} changeTab={changeTab} activeTabKey={selectedTabKey} />
            <MarketDescription description={description} />

            {/* TODO -> This should be the columns header but it needs another component here + restyling. */}
            {selectedTabKey === MARKET_TABS_GOALSCORER.singleGoal ? (
                <S_TemplateSection>
                    <S_GoalscorerPlayerName columnsNumber={columnsNumber} />
                    {renderHeaders(single)}
                </S_TemplateSection>
            ) : (
                <S_TemplateSection>
                    <S_GoalscorerPlayerName columnsNumber={columnsNumber} />
                    {renderHeaders(multiples)}
                </S_TemplateSection>
            )}

            <div className='selections-group-wrap'>
                <S_TemplateSection>
                    {Object.entries(rows)
                        .slice(NUMBERS.zero, rowSliceBound)
                        .map(([playerName, selections]) => {
                            return (
                                <S_TemplateSelectionRow key={playerName}>
                                    <S_GoalscorerPlayerName columnsNumber={columnsNumber}>
                                        {playerName}
                                    </S_GoalscorerPlayerName>

                                    {selections.map((selection) => {
                                        return (
                                            <S_GoalscorerDisplayTemplateWrapper key={selection.id}>
                                                <S_SelectionPrice>
                                                    <PureSelection selectionId={selection.id} />
                                                </S_SelectionPrice>
                                            </S_GoalscorerDisplayTemplateWrapper>
                                        );
                                    })}
                                </S_TemplateSelectionRow>
                            );
                        })}
                </S_TemplateSection>
                {isShowMoreButtonVisible && <ExpandButton isExpanded={isExpanded} toggleExpand={toggleExpand} />}
            </div>
        </>
    );
};

export default GoalscorerDisplayTemplate;
