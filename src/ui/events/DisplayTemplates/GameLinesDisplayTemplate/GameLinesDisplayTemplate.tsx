import compact from 'lodash/compact';
import { observer } from 'mobx-react-lite';

import { SubKey } from '@solo-features/subscription-manager/subKeys';
import { SubscribeElement } from '@solo-features/subscription-manager/SubscribeElement';

import type { MarketModel } from 'src/appState/models/models/MarketModel';
import type { SelectionModel } from 'src/appState/models/models/SelectionModel/SelectionModel';
import { isHandicapMarket, isOverUnderMarket } from 'src/common/helpers/market';
import { AMERICAN_SPORTS } from 'src/config/config';
import { I18n } from 'src/ui/common/Language/I18n';
import MarketDescription from 'src/ui/events/DisplayTemplates/MarketDescription';
import { useCommonTemplate } from 'src/ui/events/hooks/useCommonTemplate';
import MarketGroupTabs from 'src/ui/events/MarketGroup/MarketGroupTabs';
import Selection from 'src/ui/events/Selection/Selection';
import { MARKET_TEMPLATE } from 'src/utils/constants';

import { S_TemplateSection } from '../styled';

import {
    S_HeaderWrapper,
    S_ParticipantColumnWrapper,
    S_ParticipantLabel,
    S_SelectionColumnWrapper,
    S_SelectionGroupWrapper,
    S_SelectionPrice,
    S_TemplateWrapper,
} from './styled';

interface Props {
    markets: MarketModel[];
    sportId?: string;
}

const GameLinesDisplayTemplate = ({ markets, sportId }: Props) => {
    const isAmericanSports = AMERICAN_SPORTS.includes(String(sportId));

    const { description, selectedTabKey, visibleMarkets, tabs, changeTab } = useCommonTemplate({
        marketTemplate: MARKET_TEMPLATE.gamelines,
        markets,
    });

    const [{ selections }] = visibleMarkets;

    return (
        <>
            <MarketGroupTabs tabs={tabs} changeTab={changeTab} activeTabKey={selectedTabKey} displaySingleTab />
            <MarketDescription description={description} />
            <S_TemplateSection>
                <S_ParticipantColumnWrapper />
                <S_HeaderWrapper>
                    <I18n langKey='market.template.game.lines.header.label.moneyline' defaultText='Money' />
                </S_HeaderWrapper>
                <S_HeaderWrapper>
                    <I18n langKey='market.template.game.lines.header.label.spread' defaultText='Spread' />
                </S_HeaderWrapper>
                <S_HeaderWrapper>
                    <I18n langKey='market.template.game.lines.header.label.total' defaultText='Total' />
                </S_HeaderWrapper>
            </S_TemplateSection>
            <S_SelectionGroupWrapper>
                <S_TemplateWrapper>
                    <S_ParticipantColumnWrapper>
                        {selections?.map(({ nameWithoutLine, name, id }: SelectionModel) => {
                            return (
                                <S_ParticipantLabel key={id}>
                                    {nameWithoutLine ? nameWithoutLine : name}
                                </S_ParticipantLabel>
                            );
                        })}
                    </S_ParticipantColumnWrapper>

                    {tabs[selectedTabKey].map((market) => {
                        const isHandicap = isHandicapMarket(market);
                        const isOverUnder = isOverUnderMarket(market);
                        let selections = market.selections;

                        if (isOverUnder) {
                            selections = compact([
                                selections.find((selection) => selection.identifier === 'O'),
                                selections.find((selection) => selection.identifier === 'U'),
                            ]);
                        }

                        return (
                            <S_SelectionColumnWrapper key={market.id}>
                                {selections.map((selection: SelectionModel, index) => {
                                    if (index === 0) {
                                        return (
                                            <SubscribeElement
                                                key={selection.id}
                                                id={market.id}
                                                subKey={SubKey.game_lines}
                                                revision={market.revision}
                                            >
                                                <S_SelectionPrice key={selection.id}>
                                                    <Selection
                                                        line={market.line}
                                                        selectionId={selection.id}
                                                        isAmericanSports={isAmericanSports}
                                                        isHighlighted={isHandicap}
                                                        showIdentifier={isHandicap}
                                                    />
                                                </S_SelectionPrice>
                                            </SubscribeElement>
                                        );
                                    }

                                    return (
                                        <S_SelectionPrice key={selection.id}>
                                            <Selection
                                                line={market.line}
                                                selectionId={selection.id}
                                                isAmericanSports={isAmericanSports}
                                                isHighlighted={isHandicap}
                                                showIdentifier={isHandicap}
                                            />
                                        </S_SelectionPrice>
                                    );
                                })}
                            </S_SelectionColumnWrapper>
                        );
                    })}
                </S_TemplateWrapper>
            </S_SelectionGroupWrapper>
        </>
    );
};

export default observer(GameLinesDisplayTemplate);
