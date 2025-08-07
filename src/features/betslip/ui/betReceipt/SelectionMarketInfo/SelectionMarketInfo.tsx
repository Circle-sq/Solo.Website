import { useAtomValue } from 'jotai';
import { observer } from 'mobx-react-lite';

import { oddsFormatSelector } from '@sc-account/store/selectors';

import { useAppStateContext } from 'src/appState/AppState';
import SelectionMarketName from 'src/ui/common/SelectionMarketName/SelectionMarketName';
import { getOddsFormatPrice } from 'src/utils/common';
import { formatDecimalPart } from 'src/utils/format';

import type { PlacedStandardBetLeg } from '../../../api/types/placedBet';
import { S_OddPrice } from '../BetReceiptItems/styled';

import { S_SelectionMarketInfo } from './styled';

const SelectionMarketInfo = ({ leg }: { leg: PlacedStandardBetLeg }) => {
    const { market, selection, price } = leg;

    const oddsFormat = useAtomValue(oddsFormatSelector);
    const oddsPrice = getOddsFormatPrice(price, oddsFormat);
    const selectionOdd = formatDecimalPart(oddsPrice);

    const { models } = useAppStateContext();

    const marketModel = models.getMarket(Number(market.id));
    const selectionModel = models.getSelection(selection.id);

    const marketName = marketModel?.name ?? '';
    const selectionName = selectionModel?.name ?? '';

    return (
        <S_SelectionMarketInfo>
            <SelectionMarketName marketName={marketName} selectionName={selectionName} />

            <S_OddPrice data-testid='selectionOdd'>{selectionOdd}</S_OddPrice>
        </S_SelectionMarketInfo>
    );
};

export default observer(SelectionMarketInfo);
