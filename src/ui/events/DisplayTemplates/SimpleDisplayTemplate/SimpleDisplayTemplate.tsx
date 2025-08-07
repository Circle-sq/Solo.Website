import { useWindowWidth } from '@sc-hooks';
import { createRef, useEffect, useMemo, useRef, useState } from 'react';

import { SubKey } from '@sc-features/subscription-manager/subKeys';
import { SubscribeElement } from '@sc-features/subscription-manager/SubscribeElement';

import type { MarketModel } from 'src/appState/models/models/MarketModel';
import { ExpandButton } from 'src/ui/common/ExpandButton/ExpandButton';
import MarketDescription from 'src/ui/events/DisplayTemplates/MarketDescription';
import type { SelectionsRefsType } from 'src/ui/events/DisplayTemplates/types';
import { useCommonTemplate } from 'src/ui/events/hooks/useCommonTemplate';
import MarketGroupTabs from 'src/ui/events/MarketGroup/MarketGroupTabs';
import { getDisplayOrderCriteria, shouldShowMoreBtn } from 'src/ui/events/utils/commonTemplateLogic';
import { MARKET_TEMPLATE } from 'src/utils/constants';
import { sortSelectionsByCriteria } from 'src/utils/sortNew';
import type { MarketTemplateType } from 'src/utils/types';

import SelectionGroup from '../SimpleDisplayTemplate/SelectionGroup';
import { S_TemplateSection } from '../styled';

export interface Props {
    markets: MarketModel[];
    eventId: number | null;
    groupName?: string;
    type?: string;
}

const SimpleDisplayTemplate = ({ groupName, eventId, type, markets }: Props) => {
    const {
        description,
        displayedRowsLimit,
        isExpanded,
        isOutright,
        selectedTabKey,
        selectionsViewModel,
        tabs,
        changeTab,
        toggleExpand,
    } = useCommonTemplate({
        groupName,
        marketTemplate: MARKET_TEMPLATE.simple,
        markets,
        type,
    });

    const { width } = useWindowWidth();
    const containerRef = useRef<HTMLDivElement>(null);
    const selectionsRefs = useRef<SelectionsRefsType>([]);

    const [displayTemplate, setDisplayTemplate] = useState<MarketTemplateType>(MARKET_TEMPLATE.threeColumn);

    const selectionMaxWidth = useMemo(
        () =>
            selectionsRefs.current
                .map(
                    ({ name, value }) =>
                        name.current && value.current && name.current?.clientWidth + value.current?.clientWidth + 30, // paddings
                )
                .sort((a, b) => Number(a) - Number(b))
                .pop(),
        [selectionsRefs.current[0]?.name.current],
    );

    useEffect(() => {
        const containerWidth = containerRef.current?.clientWidth;

        const columnsFit = Math.floor(Number(containerWidth) / Number(selectionMaxWidth));

        const displayColumns = Math.min(selectionsRefs.current.length, columnsFit, 3);

        let template: MarketTemplateType = MARKET_TEMPLATE.threeColumn;

        if (displayColumns !== 3 || selectionsRefs.current.length > 3) {
            template = MARKET_TEMPLATE.oneColumn;
        }

        setDisplayTemplate(template);
    }, [width, containerRef.current, selectionsRefs.current[0]?.name.current]);

    const selectionsToDisplay = selectionsViewModel.filter((selection) => selection.display);

    const isShowMoreButtonVisible = shouldShowMoreBtn({
        numberOfSelections: selectionsToDisplay.length,
        displayTemplate,
        displayedRowsLimit,
    });

    const displayOrder = getDisplayOrderCriteria(selectionsViewModel[0]?.marketSelectionOrdering, isOutright);
    const sortedSelections = sortSelectionsByCriteria(selectionsViewModel, displayOrder);

    if (selectionsRefs.current.length !== sortedSelections.length) {
        selectionsRefs.current = Array(sortedSelections.length)
            .fill(null)
            .map((_, i) => selectionsRefs.current[i] || { name: createRef(), value: createRef() });
    }

    const marketModel = markets[0];

    return (
        <SubscribeElement
            id={marketModel.id}
            subKey={SubKey.outright_market}
            parentId={marketModel.eventId}
            revision={marketModel.revision}
        >
            <MarketGroupTabs tabs={tabs} changeTab={changeTab} activeTabKey={selectedTabKey} />

            <div className='selections-group-wrap'>
                <MarketDescription description={description} />
                <S_TemplateSection data-testid='selectionsGroup' ref={containerRef}>
                    <SelectionGroup
                        selections={sortedSelections}
                        displayedRowsLimit={displayedRowsLimit}
                        displayTemplate={displayTemplate}
                        isExpanded={isExpanded}
                        eventId={eventId}
                        innerRef={selectionsRefs.current}
                    />
                </S_TemplateSection>
                {isShowMoreButtonVisible && <ExpandButton isExpanded={isExpanded} toggleExpand={toggleExpand} />}
            </div>
        </SubscribeElement>
    );
};

export default SimpleDisplayTemplate;
