import { useAtomValue } from 'jotai';
import { Box } from '@mui/material';

import { GiftIcon, HelpIcon } from '@solo-ui/icons/src/icons';
import { cssColor } from '@solo-ui/system';

import { hasFreeBetCreditsEnabled } from 'src/config/features_flags';
import { I18n } from 'src/ui/common/Language/I18n';
import Loader from 'src/ui/common/Loader/Loader';
import { moneyAccountSymbolBeforeValue } from 'src/utils/format';
import Link from 'src/utils/Router/Link';

import { freebetCreditsAtomWithQuery } from '../../store/queries';
import { currencySelector } from '../../store/selectors';

import { S_AccountSummaryRow } from './styled';

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
            <Box data-testid='balanceTab-freeBetCreditsLabel' sx={{ display: 'flex', alignItems: 'center' }}>
                <I18n langKey='account.summary.free-bet-credits.label' defaultText='Free Bet Credits' />
                <Link params={{ account: 'static', static: 'free-bet-credits', parent: 'summary' }}>
                    <HelpIcon
                        fontSize='small'
                        color={cssColor('--icon-generic-color')}
                        style={{ marginLeft: '5px', opacity: '0.7' }}
                    />
                </Link>
            </Box>

            <Box data-testid='balanceTab-freeBetCreditsValue' sx={{ display: 'flex', alignItems: 'center' }}>
                <GiftIcon fontSize='small' style={{ marginRight: '5px' }} />

                {isLoadingFreebet ? <Loader /> : moneyAccountSymbolBeforeValue(totalAmount, currency)}
            </Box>
        </S_AccountSummaryRow>
    );
};

export default AccountFreeBetCredits;
