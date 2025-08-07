import isEmpty from 'lodash/isEmpty';
import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';

import type { MarketAndSelection } from '@sc-betslip/api/types/leg';

import { useAppStateContext } from 'src/appState/AppState';
import BetStatusIcon from 'src/assets/icons/betStatusIcon/BetStatusIcon';
import type { BetStatus } from 'src/common/enums';
import { getBetLegStatus } from 'src/ui/myBets/utils/helpers';

import {
    S_BuildABetLeg,
    S_BuildABetResultIcon,
    S_BuildABetSelection,
    S_BuildABetSelectionInfo,
    S_MarketName,
    S_SelectionName,
} from '../myBet/styled';

import { hasLegStatusIcon } from './helpers';

interface Props {
    marketsAndSelections: MarketAndSelection[];
    betStatus?: BetStatus;
    isSingleTab?: boolean;
}

const BuildABetLeg = ({ marketsAndSelections, betStatus, isSingleTab = false }: Props) => {
    const { models } = useAppStateContext();

    const hasIconWithStatus = useMemo(() => {
        if (isEmpty(marketsAndSelections)) {
            return false;
        }

        return marketsAndSelections.some(({ result }) => hasLegStatusIcon(result?.type));
    }, [marketsAndSelections]);

    return (
        <S_BuildABetLeg>
            {marketsAndSelections.map(({ market, selection, result }) => {
                const eventMarket = models.getMarket(market.id);
                const eventSelection = models.getSelection(selection.id);

                const key = eventSelection?.id ?? selection.id;
                const marketName = eventMarket?.name ?? market.name;
                const selectionName = eventSelection?.name ?? selection.name;

                const status = getBetLegStatus(betStatus, result);
                const hasDefaultIcon = hasLegStatusIcon(result?.type ?? betStatus);

                return (
                    <S_BuildABetSelection key={key} defaultIcon={hasDefaultIcon} iconBulb={hasIconWithStatus}>
                        <S_BuildABetResultIcon>
                            <BetStatusIcon status={status} isMultiBet />
                        </S_BuildABetResultIcon>
                        <S_BuildABetSelectionInfo isSingleTab={isSingleTab}>
                            <S_SelectionName data-testid={`selectionName-${selectionName}`}>
                                {selectionName}
                            </S_SelectionName>
                            <S_MarketName data-testid={`marketName-${marketName}`}>{marketName}</S_MarketName>
                        </S_BuildABetSelectionInfo>
                    </S_BuildABetSelection>
                );
            })}
        </S_BuildABetLeg>
    );
};

export default observer(BuildABetLeg);
