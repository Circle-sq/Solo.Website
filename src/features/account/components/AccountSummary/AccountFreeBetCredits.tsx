import { useAtomValue } from 'jotai';

import { hasFreeBetCreditsEnabled } from 'src/config/features_flags';
import { I18n } from 'src/ui/common/Language/I18n';
import Loader from 'src/ui/common/Loader/Loader';
import { moneyAccountSymbolBeforeValue } from 'src/utils/format';
import Link from 'src/utils/Router/Link';

import { freebetCreditsAtomWithQuery } from '../../store/queries';
import { currencySelector } from '../../store/selectors';

import { S_AccountSummaryRow, S_GiftIcon, S_HelpIcon } from './styled';

const AccountFreeBetCredits = () => {
    const {
        data: { totalAmount },
        isLoading: isLoadingFreebet,
    } = useAtomValue(freebetCreditsAtomWithQuery);

    const currency = useAtomValue(currencySelector);

    if (!hasFreeBetCreditsEnabled()) {
        return null;
    }

    return (
        <S_AccountSummaryRow>
            <span data-testid='balanceTab-freeBetCreditsLabel'>
                <I18n langKey='account.summary.free-bet-credits.label' defaultText='Free Bet Credits' />
                <Link params={{ account: 'static', static: 'free-bet-credits', parent: 'summary' }}>
                    <S_HelpIcon name='help' />
                </Link>
            </span>

            <div data-testid='balanceTab-freeBetCreditsValue'>
                <S_GiftIcon name='gift' />

                {isLoadingFreebet ? <Loader /> : moneyAccountSymbolBeforeValue(totalAmount, currency)}
            </div>
        </S_AccountSummaryRow>
    );
};

export default AccountFreeBetCredits;
