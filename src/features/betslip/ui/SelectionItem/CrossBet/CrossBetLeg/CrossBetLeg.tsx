import classNames from 'classnames';
import isNil from 'lodash/isNil';
import { observer } from 'mobx-react-lite';

import { SubKey } from '@sc-features/subscription-manager/subKeys';
import { SubscribeElement } from '@sc-features/subscription-manager/SubscribeElement';

import { useAppStateContext } from 'src/appState/AppState';
import BetStatusIcon from 'src/assets/icons/betStatusIcon/BetStatusIcon';
import type { BetStatus } from 'src/common/enums';
import type { Score } from 'src/common/types/statistics';
import { getBetLegStatus } from 'src/ui/myBets/utils/helpers';

import type { MarketAndSelection } from '../../../../api/types/leg';

import {
    S_CrossbetSelectionWrapper,
    S_ResultIconWrapper,
    S_CrossBetLeg,
    S_ScoreInfo,
    S_SelectionInfo,
    S_SelectionMarketName,
    SelectionName,
} from './styled';
import { useMarketRevisions } from './useMarketRevisions';

export interface Props {
    eventScore?: Score;
    betStatus?: BetStatus;
    marketsAndSelections?: MarketAndSelection[] | null;
    showScore?: boolean;
    isSingleTab?: boolean;
    eventId: number;
}

const MISSING_REVISION = -8;

const CrossBetLeg = ({
    eventScore,
    marketsAndSelections,
    showScore = false,
    betStatus,
    isSingleTab = false,
    eventId,
}: Props) => {
    const { models } = useAppStateContext();
    const marketRevisions = useMarketRevisions(marketsAndSelections);

    if (!isNil(marketsAndSelections)) {
        return (
            <S_CrossBetLeg>
                {marketsAndSelections.map(({ market, selection, result }, index: number) => {
                    const isFirstItem = index === 0;
                    const score = isFirstItem ? eventScore?.home : eventScore?.away;
                    const eventMarket = models.getMarket(market.id);
                    const eventSelection = models.getSelection(selection.id);

                    const key = eventSelection?.id ?? selection.id;
                    const marketName = eventMarket?.name ?? market.name;
                    const marketRevision = marketRevisions[market.id] ?? eventMarket?.revision ?? MISSING_REVISION;
                    const selectionName = eventSelection?.name ?? selection.name;

                    const status = getBetLegStatus(betStatus, result);

                    return (
                        <SubscribeElement
                            key={key}
                            id={market.id}
                            subKey={SubKey.xbet_leg}
                            parentId={eventId}
                            revision={marketRevision}
                        >
                            <S_CrossbetSelectionWrapper>
                                <S_ResultIconWrapper className={classNames({ first: isFirstItem })}>
                                    <BetStatusIcon status={status} isMultiBet />
                                </S_ResultIconWrapper>
                                <S_SelectionInfo isSingleTab={isSingleTab}>
                                    <SelectionName data-testid={`selectionName-${selectionName}`} title={selectionName}>
                                        {selectionName}
                                    </SelectionName>
                                    <S_SelectionMarketName data-testid={`marketName-${marketName}`}>
                                        {marketName}
                                    </S_SelectionMarketName>
                                </S_SelectionInfo>
                                {showScore && (
                                    <S_ScoreInfo data-testid={`scoreInfo-${isFirstItem ? 'home' : 'away'}`}>
                                        {score}
                                    </S_ScoreInfo>
                                )}
                            </S_CrossbetSelectionWrapper>
                        </SubscribeElement>
                    );
                })}
            </S_CrossBetLeg>
        );
    }

    return null;
};

export default observer(CrossBetLeg);
