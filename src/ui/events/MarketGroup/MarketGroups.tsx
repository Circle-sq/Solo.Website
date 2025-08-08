import { useAsianInPlayHandicapLineFlag } from '@solo-feature-flags';
import get from 'lodash/get';
import isNil from 'lodash/isNil';
import { observer } from 'mobx-react-lite';
import { useCallback, useState, useEffect, type MouseEvent } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';

import { InfoOutlineIcon } from '@solo-ui/icons/svg';
import { GreyPalette, DarkBluePalette } from '@solo-ui/system';

import { useAppStateContext } from 'src/appState/AppState';
import type { EventModel } from 'src/appState/models/models/EventModel';
import type { MarketModel } from 'src/appState/models/models/MarketModel';
import { SportType } from 'src/common/enums';
import type { Score } from 'src/common/types/statistics';
import { currentMarketAtom } from 'src/ui/common/GroupingNavigation/atoms';
import type { MarketGroupUI } from 'src/ui/events/EventMarkets/types';
import MarketHeader from 'src/ui/events/MarketHeader/MarketHeader';
import { marketDescriptionsGroupsAtom } from 'src/ui/events/store/atoms';
import { MARKET_TEMPLATE_GROUP } from 'src/utils/constants';

import DisplayTemplateSwitcher from '../DisplayTemplates/DisplayTemplateSwitcher/DisplayTemplateSwitcher';

import { S_MarketGroupContainer, S_InfoIconWrapper, S_MarketGroupSpacing } from './styled';

interface Props {
    event: EventModel | null;
    marketGroups: MarketGroupUI;
}

const MarketGroup = ({ event, marketGroups }: Props) => {
    const {
        language: { getTranslation },
    } = useAppStateContext();

    const { groupName, markets, customName } = marketGroups;
    const [isOpen, setIsOpen] = useState(true);
    const changeIsOpen = useCallback(() => setIsOpen((value) => !value), []);
    const isSuspended = markets.every(
        (market: MarketModel) => !get(market, 'active') || !get(market, 'tradedCorrectly'),
    );
    const eventId = get(event, 'id', null);
    const isOutrightEvent = event?.tagsOutright === 'yes';
    const showContent = isOpen && !isSuspended;

    const currentMarket = useRecoilValue(currentMarketAtom);
    const sportType = get(event, 'sport', '');

    useEffect(() => {
        if (!isOpen) {
            changeIsOpen();
        }
    }, [currentMarket]);
    const score = get(event, 'score', {} as Score);
    const marketTemplateId: string = get(markets, '0.templateId', '');
    const isInPlay = get(event, 'timeSettings.started', false);
    const asianInPlayHandicapLineFlag = useAsianInPlayHandicapLineFlag();

    const [marketDescriptionGroups, setMarketDescriptionGroups] = useRecoilState(marketDescriptionsGroupsAtom);

    // TODO create proper way to translate custom name Markets currently this property should be part of every customName market group
    const getCustomNameTranslation = (customName: string) => {
        switch (customName) {
            case 'Game Lines':
                return getTranslation('market.header.custom.name.game-lines', 'Game Lines');

            default:
                return null;
        }
    };

    const getMarketHeaderName = () => {
        const name = customName !== undefined ? getCustomNameTranslation(customName) : groupName;
        const scoreEligibleTemplates = ['bet-radar-16', 'bet-radar-66', 'bet-radar-88'];

        if (
            asianInPlayHandicapLineFlag &&
            scoreEligibleTemplates.includes(marketTemplateId) &&
            isInPlay &&
            !isNil(score?.home) &&
            !isNil(score?.away) &&
            sportType === SportType.Football
        ) {
            return `${name} (${score.home}:${score.away})`;
        }

        return name;
    };

    const marketHeaderName = getMarketHeaderName();

    const currentMarketGroup = marketDescriptionGroups[groupName];

    const showMarketDescriptionIcon =
        showContent && currentMarketGroup?.hasDescription && customName !== MARKET_TEMPLATE_GROUP.gameLines;

    const toggleActive = (e: MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        setMarketDescriptionGroups((prevState) => ({
            ...prevState,
            [groupName]: { ...prevState[groupName], active: !prevState[groupName]?.active },
        }));
    };

    return (
        <S_MarketGroupSpacing data-testid={`marketContent-${marketHeaderName}`}>
            <S_MarketGroupContainer>
                <MarketHeader
                    name={marketHeaderName || ''}
                    isOpen={isOpen}
                    isSuspended={isSuspended}
                    onClick={changeIsOpen}
                >
                    {showMarketDescriptionIcon && (
                        <S_InfoIconWrapper onClick={toggleActive}>
                            <InfoOutlineIcon
                                fontSize='small'
                                color={currentMarketGroup.active ? GreyPalette.grey6 : DarkBluePalette.darkBlue5}
                            />
                        </S_InfoIconWrapper>
                    )}
                </MarketHeader>
                {showContent && (
                    <DisplayTemplateSwitcher
                        sportId={event?.sport}
                        groupName={groupName}
                        isOutrightEvent={isOutrightEvent}
                        eventId={eventId}
                        markets={markets}
                    />
                )}
            </S_MarketGroupContainer>
        </S_MarketGroupSpacing>
    );
};

MarketGroup.displayName = 'MarketGroup';
export default observer(MarketGroup);
