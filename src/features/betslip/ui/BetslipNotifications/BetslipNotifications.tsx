import { usePathLocation } from '@sc-hooks';
import { useAtomValue } from 'jotai';
import isEmpty from 'lodash/isEmpty';
import { useRecoilValue } from 'recoil';

import { currencySelector, oddsUpdateSelector } from '@sc-account/store/selectors';

import { BetslipErrorCode } from 'src/common/enums/error';
import { moneyAccountSymbolBeforeValue } from 'src/utils/format';

import type { BetslipWarning } from '../../api/types/error';
import { minBetsCountSelector } from '../../store/selectors/betslipBets';
import { neededPlayableBalanceAmountSelector } from '../../store/selectors/errors';
import { betslipNotificationsSelector } from '../../store/selectors/warnings';

import AcceptOddsNotification from './AcceptOddsNotification/AcceptOddsNotification';
import InfoAlertMessage from './InfoAlertMessage/InfoAlertMessage';
import { S_BetslipNotification } from './styled';

const BetslipNotifications = () => {
    const currency = useAtomValue(currencySelector);
    const oddsUpdate = useAtomValue(oddsUpdateSelector);

    const { eventId } = usePathLocation();

    const minBetsCount = useRecoilValue(minBetsCountSelector);
    const neededPlayableBalanceAmount = useRecoilValue(neededPlayableBalanceAmountSelector);
    const betslipNotifications = useRecoilValue(betslipNotificationsSelector({ eventId, oddsUpdate }));

    if (isEmpty(betslipNotifications)) {
        return null;
    }

    return (
        <S_BetslipNotification>
            {betslipNotifications.map(({ key, type, error, langKey, defaultText, getParams }: BetslipWarning) => {
                if (key === BetslipErrorCode.AcceptOdds) {
                    return (
                        <AcceptOddsNotification
                            key='betslip:odds-notification'
                            langKey={langKey}
                            defaultText={defaultText}
                        />
                    );
                }

                let params;

                if (
                    key === BetslipErrorCode.MinimumActiveSelectionsSingleTab ||
                    key === BetslipErrorCode.MinimumActiveSelectionsMultiTab
                ) {
                    params = getParams?.(String(minBetsCount));
                } else if (key === BetslipErrorCode.BalanceWarning) {
                    const amount = moneyAccountSymbolBeforeValue(
                        neededPlayableBalanceAmount,
                        currency,
                        ',',
                        true,
                        true,
                        true,
                    );

                    params = getParams?.(amount);
                }

                return (
                    <InfoAlertMessage
                        key={key}
                        type={type}
                        langKey={langKey}
                        defaultText={defaultText}
                        params={params}
                        error={error}
                    />
                );
            })}
        </S_BetslipNotification>
    );
};

export default BetslipNotifications;
