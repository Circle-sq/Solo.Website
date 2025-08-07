import { useRecoilValue } from 'recoil';

import { SubKey } from '@sc-features/subscription-manager/subKeys';
import { SubscribeElement } from '@sc-features/subscription-manager/SubscribeElement';

import { PriceChange, OddsFormat } from 'src/common/enums';
import type { Price } from 'src/common/types/selectionPrice';
import { useSpeedMarketTranslations } from 'src/features/scoreboardWidget/hooks/useSpeedMarketTranslations';
import { I18n } from 'src/ui/common/Language/I18n';
import { getPrice } from 'src/ui/myBets/utils/helpers';
import usePriceChange from 'src/utils/hooks/usePriceChange';

import { speedBetSelectedMarketAtom } from '../../../../store/atoms';

import { S_MarketName, S_Selection, S_SelectionLabel, S_SelectionIdentifier, S_SelectionPrice } from './styled';

const MISSING_REVISION = -15;

const MarketSelectionResult = () => {
    const selectedMarket = useRecoilValue(speedBetSelectedMarketAtom);

    const { priceDirection } = usePriceChange(selectedMarket?.selection?.price?.d);

    const selectionPrice = selectedMarket?.selection?.price as Price;
    const selectionName = selectedMarket?.selection?.name;

    const { marketName } = useSpeedMarketTranslations(selectedMarket?.market);

    const pricePosition =
        priceDirection === PriceChange.Up ? 'top' : priceDirection === PriceChange.Down ? 'bottom' : null;

    const revision = selectedMarket?.market?.revision ?? MISSING_REVISION;

    return (
        <SubscribeElement id={selectedMarket?.market?.id} subKey={SubKey.speed_bet_market} revision={revision}>
            <S_MarketName>{marketName}</S_MarketName>
            <S_Selection>
                <S_SelectionLabel>
                    <I18n langKey='speedBet.betslip.yourBet' defaultText='Your bet:' />
                </S_SelectionLabel>
                <S_SelectionIdentifier data-testid='speedBetBetslipSelection'>{selectionName}</S_SelectionIdentifier>
                <S_SelectionPrice data-testid='speedBetBetslipSelectionPrice' pricePosition={pricePosition}>
                    {getPrice(selectionPrice, OddsFormat.Decimal)}
                </S_SelectionPrice>
            </S_Selection>
        </SubscribeElement>
    );
};

export default MarketSelectionResult;
