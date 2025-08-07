import { useAtomValue } from 'jotai';

import { hasAlternativeBalancesVisible } from 'src/config/features_flags';
import { I18n } from 'src/ui/common/Language/I18n';
import { moneyAccountSymbolBeforeValue } from 'src/utils/format';

import { walletSelector } from '../../store/selectors';

import { S_AccountSummaryRow } from './styled';

const AccountCreditBalance = () => {
    const wallet = useAtomValue(walletSelector);

    if (wallet === null) {
        return null;
    }

    const { currency, balance, playableBalance } = wallet;

    if (hasAlternativeBalancesVisible()) {
        return (
            <S_AccountSummaryRow>
                <div data-testid='balanceTab-creditBalanceLabel'>
                    <I18n langKey='account.summary.credit-balance.label' defaultText='Credit balance' />
                </div>
                <div data-testid='balanceTab-creditBalanceValue'>
                    {moneyAccountSymbolBeforeValue(playableBalance, currency)}
                </div>
            </S_AccountSummaryRow>
        );
    }

    return (
        <>
            <S_AccountSummaryRow>
                <div data-testid='balanceTab-cashBalanceLabel'>
                    <I18n langKey='account.summary.cash-balance.label' defaultText='Cash balance' />
                </div>
                <div data-testid='balanceTab-cashBalanceValue'>{moneyAccountSymbolBeforeValue(balance, currency)}</div>
            </S_AccountSummaryRow>

            <S_AccountSummaryRow>
                <div data-testid='balanceTab-playableBalanceLabel'>
                    <I18n langKey='account.summary.playable-balance.label' defaultText='Playable balance' />
                </div>
                <div data-testid='balanceTab-playableBalanceValue'>
                    {moneyAccountSymbolBeforeValue(playableBalance, currency)}
                </div>
            </S_AccountSummaryRow>
        </>
    );
};

export default AccountCreditBalance;
