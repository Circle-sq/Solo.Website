import { useAtomValue } from 'jotai';
import { memo, useMemo } from 'react';

import { oddsFormatSelector } from '@solo-account/store/selectors';
import { isMultipleBetType } from '@solo-betslip/helpers/combinations';
import { calcTotalOdds } from '@solo-betslip/helpers/price';
import { isCrossBetLegType } from '@solo-betslip/typeGuards/leg';
import { FreeBetsLabel, FreeBetsLabelElWrapper, FreeBetsSelect } from '@solo-betslip/ui/freeBet/dropdown/styled';

import { useAppStateContext } from 'src/appState/AppState';
import useTranslatedCurrency from 'src/appState/customHooks/useTranslatedCurrency';
import { OddsFormatLong } from 'src/common/enums';
import { hasStartingPriceType } from 'src/common/helpers/price';
import type { MyBet } from 'src/common/types/myBet';
import { PriceType } from 'src/common/types/selectionPrice';
import Icon from 'src/ui/common/Icon/Icon';
import { I18n } from 'src/ui/common/Language/I18n';
import { getOddsFormatPrice, getShortOddsFormat } from 'src/utils/common';
import { NUMBERS } from 'src/utils/constants';
import { formatAmountWithCurrency, formatDecimalPart, moneyWithoutSymbol } from 'src/utils/format';

import {
    S_BetBottomCol,
    S_BetBottomContainer,
    S_BetBottomRow,
    S_CenterAlign,
    S_IconWrapper,
    S_PotentialReturns,
    S_RightAlign,
    S_StakeOddTitle,
    S_StakeOddValue,
} from './styled';

interface Props {
    bet: MyBet;
    isSettledOrCancelledBet: boolean;
    hasFreeBetCredits: boolean;
}

const BottomDetails = ({ bet, isSettledOrCancelledBet, hasFreeBetCredits }: Props) => {
    const { legs, currency, totalStake, payout, potentialReturns, type: betType } = bet;
    const translatedCurrency = useTranslatedCurrency();

    const oddsFormat = useAtomValue(oddsFormatSelector);

    const {
        language: { getTranslation },
    } = useAppStateContext();

    const totalOddsValue = useMemo((): string => {
        if (legs.length === 0) {
            return '-';
        }

        const [firstLeg] = legs;
        const { priceType, spPrice } = firstLeg;

        if (priceType === PriceType.SP && spPrice === null) {
            return getTranslation('bets.selection.starting-price', 'SP');
        }

        if (spPrice !== null) {
            return formatDecimalPart(getOddsFormatPrice(spPrice, oddsFormat));
        }

        const totalOdds = calcTotalOdds(legs, getShortOddsFormat(oddsFormat));

        if (isCrossBetLegType(firstLeg)) {
            return oddsFormat === OddsFormatLong.Fractional
                ? formatDecimalPart(totalOdds)
                : Number(formatDecimalPart(totalOdds)).toFixed(NUMBERS.two);
        }

        return formatDecimalPart(totalOdds);
    }, [legs, oddsFormat]);

    return (
        <S_BetBottomContainer>
            <S_BetBottomRow>
                <S_BetBottomCol>
                    <S_StakeOddTitle data-testid='stakeLabel'>
                        {hasFreeBetCredits ? (
                            <I18n langKey='bets.selection.free-bet-stake.label' defaultText='Free Bet Stake' />
                        ) : (
                            <I18n langKey='bets.selection.stake.label' defaultText='Stake' />
                        )}
                    </S_StakeOddTitle>

                    <S_StakeOddValue data-testid='stakeValue'>
                        {hasFreeBetCredits ? (
                            <FreeBetsSelect component='myBets'>
                                <FreeBetsLabel data-testid='freebet-dropdown' component='myBets'>
                                    <FreeBetsLabelElWrapper>
                                        <I18n langKey='betslip.free-bets.freebet-label' defaultText='Free bet!' />
                                    </FreeBetsLabelElWrapper>
                                    <FreeBetsLabelElWrapper>
                                        {formatAmountWithCurrency(totalStake, currency, true)}
                                    </FreeBetsLabelElWrapper>
                                </FreeBetsLabel>
                            </FreeBetsSelect>
                        ) : (
                            moneyWithoutSymbol(totalStake, currency, translatedCurrency)
                        )}
                    </S_StakeOddValue>
                </S_BetBottomCol>

                <S_BetBottomCol>
                    {(isMultipleBetType(betType) || legs.length === 1) && (
                        <S_CenterAlign>
                            <S_StakeOddTitle data-testid='oddsLabel'>
                                <I18n langKey='bets.selection.odds.label' defaultText='Odds' />
                            </S_StakeOddTitle>
                            <S_StakeOddValue data-testid='totalOdds'>{totalOddsValue}</S_StakeOddValue>
                        </S_CenterAlign>
                    )}
                </S_BetBottomCol>

                <S_BetBottomCol>
                    {isSettledOrCancelledBet ? (
                        <S_RightAlign>
                            <S_StakeOddTitle>
                                <I18n langKey='bets.selection.winnings.label' defaultText='Winnings' />
                            </S_StakeOddTitle>

                            <S_PotentialReturns data-testid='possibleWinnings'>
                                {moneyWithoutSymbol(payout, currency, translatedCurrency)}
                            </S_PotentialReturns>
                        </S_RightAlign>
                    ) : (
                        <S_RightAlign>
                            <S_StakeOddTitle data-testid='possibleWinningsLabel'>
                                <I18n
                                    langKey='bets.selection.possible-winnings.label'
                                    defaultText='Possible Winnings'
                                />
                                {hasFreeBetCredits && (
                                    <S_IconWrapper title='Exclude Stake' hasFreeBetCredits={hasFreeBetCredits}>
                                        <Icon name='help' />
                                    </S_IconWrapper>
                                )}
                            </S_StakeOddTitle>

                            <S_PotentialReturns data-testid='possibleWinnings'>
                                {hasStartingPriceType(legs) ? (
                                    <I18n langKey='bets.selection.na.label' defaultText='n/a' />
                                ) : (
                                    moneyWithoutSymbol(potentialReturns, currency, translatedCurrency)
                                )}
                            </S_PotentialReturns>
                        </S_RightAlign>
                    )}
                </S_BetBottomCol>
            </S_BetBottomRow>
        </S_BetBottomContainer>
    );
};

export default memo(BottomDetails);
