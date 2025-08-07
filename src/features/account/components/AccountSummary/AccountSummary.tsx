import { useAtomValue, useSetAtom } from 'jotai';

import { userSettingsAtom } from '@sc-account/store/atoms';

import { I18n } from 'src/ui/common/Language/I18n';
import Loader from 'src/ui/common/Loader/Loader';

import { openBetsAtomWithQuery } from '../../store/queries';
import { balanceInHeaderSelector, userIdSelector } from '../../store/selectors';

import AccountCreditBalance from './AccountCreditBalance';
import AccountFreeBetCredits from './AccountFreeBetCredits';
import LoggedInTime from './LoggedInTime';
import OddsFormatSwitcher from './OddsFormatSwitcher';
import { S_AccountSummary, S_AccountSummaryRow, S_BalanceInHeaderCheckbox } from './styled';

const AccountSummary = () => {
    const setUserSettings = useSetAtom(userSettingsAtom);
    const balanceInHeader = useAtomValue(balanceInHeaderSelector);

    const userId = useAtomValue(userIdSelector);

    const { data: openBets, isLoading: isLoadingOpenBets } = useAtomValue(openBetsAtomWithQuery);

    const onChange = () => {
        setUserSettings({ balanceInHeader: !balanceInHeader });
    };

    return (
        <S_AccountSummary>
            <S_AccountSummaryRow>
                <span data-testid='balanceTab-accountNumberLabel'>
                    <I18n langKey='account.summary.account-number.label' defaultText='Account number' />
                </span>

                <span data-testid='balanceTab-accountNumberValue'>{userId}</span>
            </S_AccountSummaryRow>

            <AccountCreditBalance />

            <AccountFreeBetCredits />

            <S_AccountSummaryRow>
                <span data-testid='balanceTab-showBalanceInHeader'>
                    <I18n langKey='account.summary.show-balance-in-header.label' defaultText='Show balance in header' />
                </span>

                <S_BalanceInHeaderCheckbox
                    name='balanceInHeader'
                    isChecked={balanceInHeader}
                    onChange={onChange}
                    field='Checkbox'
                />
            </S_AccountSummaryRow>

            <S_AccountSummaryRow>
                <span data-testid='balanceTab-openBetsLabel'>
                    <I18n langKey='account.summary.open-bets.label' defaultText='Open bets' />
                </span>

                {openBets}
                {isLoadingOpenBets && <Loader />}
            </S_AccountSummaryRow>

            <S_AccountSummaryRow>
                <span data-testid='balanceTab-loggedInTimeLabel'>
                    <I18n langKey='account.summary.logged-in-time.label' defaultText='Logged in time' />
                </span>

                <LoggedInTime />
            </S_AccountSummaryRow>

            <S_AccountSummaryRow>
                <span data-testid='balanceTab-oddsLabel'>
                    <I18n langKey='account.summary.odds-type.label' defaultText='Odds' />
                </span>

                <OddsFormatSwitcher />
            </S_AccountSummaryRow>
        </S_AccountSummary>
    );
};

export default AccountSummary;
