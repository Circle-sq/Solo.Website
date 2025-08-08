import { useAtomValue } from 'jotai';
import get from 'lodash/get';
import { observer } from 'mobx-react-lite';

import { currencySelector, oddsFormatSelector } from '@solo-account/store/selectors';
import type { PlacedBuildABetLeg } from '@solo-betslip/api/types/placedBet';
import { BuildABetLeg } from '@solo-buildABet/ui';

import { useAppStateContext } from 'src/appState/AppState';
import useTranslatedCurrency from 'src/appState/customHooks/useTranslatedCurrency';
import { I18n } from 'src/ui/common/Language/I18n';
import { getOddsFormatPrice } from 'src/utils/common';
import { amountFormatter, formatDecimalPart, formatStrAmount } from 'src/utils/format';

import {
    S_BuildABetAmount,
    S_BuildABetAmountContainer,
    S_BuildABetAmountLabel,
    S_BuildABetAmountValue,
    S_BuildABetContent,
    S_BuildABetEventName,
    S_BuildABetPossibleWinAmount,
    S_BuildABetSelection,
    S_BuildABetSelectionOdd,
    TextWrapper,
} from '../styled';

const SingleBuildABetContent = ({ leg }: { leg: PlacedBuildABetLeg }) => {
    const { event: legEvent, price, potentialReturns, stakePerLine = null, marketsAndSelections } = leg;

    const oddsFormat = useAtomValue(oddsFormatSelector);
    const oddsPrice = getOddsFormatPrice(price, oddsFormat);
    const currency = useAtomValue(currencySelector);
    const translatedCurrency = useTranslatedCurrency();

    const { models } = useAppStateContext();

    const selectionOdd = formatDecimalPart(oddsPrice);
    const eventId = get(legEvent, 'id', 0);
    const totalStakeAmount = formatStrAmount(amountFormatter(stakePerLine, undefined, currency), undefined, currency);
    const event = models.getEvent(Number(eventId));

    const eventName = event?.name ?? '';

    const possibleWinning = formatStrAmount(
        amountFormatter(potentialReturns, undefined, currency),
        undefined,
        currency,
    );

    return (
        <S_BuildABetSelection>
            <S_BuildABetContent>
                <BuildABetLeg marketsAndSelections={marketsAndSelections} />

                <S_BuildABetEventName>
                    <TextWrapper>{eventName}</TextWrapper>
                </S_BuildABetEventName>
            </S_BuildABetContent>

            <S_BuildABetAmountContainer>
                <S_BuildABetSelectionOdd>{selectionOdd}</S_BuildABetSelectionOdd>

                <S_BuildABetAmount>
                    <S_BuildABetAmountLabel>
                        <I18n langKey='betslip.receipt.stake' defaultText='Stake' />
                    </S_BuildABetAmountLabel>
                    <S_BuildABetAmountValue>
                        {totalStakeAmount} {translatedCurrency}
                    </S_BuildABetAmountValue>
                </S_BuildABetAmount>

                <S_BuildABetPossibleWinAmount>
                    <S_BuildABetAmountLabel>
                        <I18n langKey='betslip.receipt.possible.winning' defaultText='Possible winnings' />
                    </S_BuildABetAmountLabel>
                    <S_BuildABetAmountValue>
                        {possibleWinning} {translatedCurrency}
                    </S_BuildABetAmountValue>
                </S_BuildABetPossibleWinAmount>
            </S_BuildABetAmountContainer>
        </S_BuildABetSelection>
    );
};

export default observer(SingleBuildABetContent);
