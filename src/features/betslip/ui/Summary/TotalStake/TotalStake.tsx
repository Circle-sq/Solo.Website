import { useAtomValue } from 'jotai';
import { useRecoilValue } from 'recoil';

import { currencySelector } from '@solo-account/store/selectors';

import useTranslatedCurrency from 'src/appState/customHooks/useTranslatedCurrency';
import { I18n } from 'src/ui/common/Language/I18n';
import { amountFormatter, formatStrAmount } from 'src/utils/format';

import { hasSuspendedBetSelector } from '../../../store/selectors/betslipBets';
import { tabTotalStakeSelector } from '../../../store/selectors/stake';
import { S_StakeAmount, S_SummaryTotal } from '../styled';

const TotalStake = () => {
    const currency = useAtomValue(currencySelector);
    const translatedCurrency = useTranslatedCurrency();

    const totalStake = useRecoilValue(tabTotalStakeSelector);
    const hasSuspendedBet = useRecoilValue(hasSuspendedBetSelector);

    const visualTotalStake = formatStrAmount(
        amountFormatter(hasSuspendedBet ? 0 : totalStake, false, currency),
        undefined,
        currency,
    );

    return (
        <S_SummaryTotal>
            <I18n langKey='betslip.system.total-stake' defaultText='Total stake' />
            <S_StakeAmount data-testid='totalStakeAmount'>{`${visualTotalStake} ${translatedCurrency}`}</S_StakeAmount>
        </S_SummaryTotal>
    );
};

export default TotalStake;
