import { useAtomValue } from 'jotai';
import { useRecoilState, useRecoilValue } from 'recoil';

import { currencySelector, oddsFormatSelector } from '@solo-account/store/selectors';
import { CheckboxIcon } from '@solo-ui/icons/svg';
import { LightBluePalette } from '@solo-ui/system';

import useTranslatedCurrency from 'src/appState/customHooks/useTranslatedCurrency';
import { toggleState } from 'src/common/helpers/state';
import { I18n } from 'src/ui/common/Language/I18n';
import { amountFormatter, formatStrAmount } from 'src/utils/format';

import { betReceiptAtom, keepPlacedBetsAtom } from '../../../store/atoms/betReceipt';
import { betReceiptTotalOddsSelector, showBetReceiptTotalOddsSelector } from '../../../store/selectors/betReceipt';

import {
    S_BetReceiptActions,
    S_BetReceiptCheckbox,
    S_BetReceiptInfoLabel,
    S_BetReceiptInfoRow,
    S_BetReceiptInfoValue,
    S_KeepBetsAction,
} from './styled';

const BetReceiptInfo = () => {
    const currency = useAtomValue(currencySelector);
    const oddsFormat = useAtomValue(oddsFormatSelector);
    const translatedCurrency = useTranslatedCurrency();
    const { totalStake, totalPotentialReturns } = useRecoilValue(betReceiptAtom);
    const totalOdds = useRecoilValue(betReceiptTotalOddsSelector({ oddsFormat }));
    const showTotalOdds = useRecoilValue(showBetReceiptTotalOddsSelector);

    const [keepPlacedBets, setKeepPlacedBets] = useRecoilState(keepPlacedBetsAtom);

    const toggleKeepPlacedBets = () => setKeepPlacedBets(toggleState);

    const visualTotalStake = formatStrAmount(amountFormatter(totalStake, false, currency), undefined, currency);

    const visualWinning = formatStrAmount(amountFormatter(totalPotentialReturns, false, currency), undefined, currency);

    return (
        <div>
            {showTotalOdds && (
                <S_BetReceiptInfoRow>
                    <S_BetReceiptInfoLabel>
                        <I18n langKey='betslip.system.total-odds' defaultText='Total odds' />
                    </S_BetReceiptInfoLabel>
                    <S_BetReceiptInfoValue>{totalOdds}</S_BetReceiptInfoValue>
                </S_BetReceiptInfoRow>
            )}

            <S_BetReceiptInfoRow highlight>
                <S_BetReceiptInfoLabel>
                    <I18n langKey='betslip.receipt.stake' defaultText='Stake' />
                </S_BetReceiptInfoLabel>
                <S_BetReceiptInfoValue data-testid='betReceipt-stake'>
                    {`${visualTotalStake} ${translatedCurrency}`}
                </S_BetReceiptInfoValue>
            </S_BetReceiptInfoRow>

            <S_BetReceiptInfoRow highlight>
                <S_BetReceiptInfoLabel>
                    <I18n langKey='betslip.receipt.possible.winning' defaultText='Possible winnings' />
                </S_BetReceiptInfoLabel>
                <S_BetReceiptInfoValue data-testid='possibleWinnings'>
                    {`${visualWinning} ${translatedCurrency}`}
                </S_BetReceiptInfoValue>
            </S_BetReceiptInfoRow>

            <S_BetReceiptActions>
                <S_KeepBetsAction onClick={toggleKeepPlacedBets} isActive={keepPlacedBets} data-testid='keepPlacedBets'>
                    {keepPlacedBets ? (
                        <CheckboxIcon fontSize='small' color={LightBluePalette.lightBlue6} />
                    ) : (
                        <S_BetReceiptCheckbox className='theme-checkbox-off' />
                    )}
                    <I18n
                        langKey='betslip.receipt.option.keep-bets-in-betslip'
                        defaultText='Keep placed bets in bet slip'
                    />
                </S_KeepBetsAction>
            </S_BetReceiptActions>
        </div>
    );
};

export default BetReceiptInfo;
