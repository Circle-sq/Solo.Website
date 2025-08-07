import { useWindowWidth } from '@sc-hooks';
import some from 'lodash/some';
import { useRecoilCallback } from 'recoil';
import { useEventListener } from 'usehooks-ts';

import { SuccessCheckmarkIcon } from '@sc-ui/icons/svg';
import { store } from '@sc-utils/jotai';

import { useAppStateContext } from 'src/appState/AppState';
import { RouteName } from 'src/common/enums';
import { getEventIdFromRoute } from 'src/common/helpers/event';
import { getValue } from 'src/common/recoil/snapshot';
import { routeNameAtom } from 'src/store/common/atoms';
import { resetQuickBetAnimationStateTask } from 'src/ui/betting/store/tasks';
import { I18n } from 'src/ui/common/Language/I18n';

import { usePossibleBets } from '../../api/possibleBets/queries';
import { PossibleBetsTriggeredBy } from '../../enums';
import { betReceiptAtom, keepPlacedBetsAtom } from '../../store/atoms/betReceipt';
import { placeBetStatusAtom } from '../../store/atoms/betslip';
import { betslipActiveTabAtom } from '../../store/atoms/betslipTab';
import { resetBetslipStateTask } from '../../store/tasks/betslip';
import { syncRelationsAfterKeepingPlacedBetsTransaction } from '../../store/transactions/betReceipt';
import { resetBetslipStateTransaction } from '../../store/transactions/betslip';
import { isCrossBetLegType } from '../../typeGuards/leg';

import BetReceiptCardLabel from './BetReceiptCardLabel/BetReceiptCardLabel';
import BetReceiptInfo from './BetReceiptInfo/BetReceiptInfo';
import BetReceiptItems from './BetReceiptItems/BetReceiptItems';
import {
    S_BetReceipt,
    S_BetReceiptCard,
    S_BetReceiptCardContent,
    S_BetReceiptCardHeader,
    S_Button,
    S_CloseBetReceiptButton,
    S_SuccessMessage,
} from './styled';

const BetReceipt = () => {
    const { router } = useAppStateContext();
    const { getPossibleBets } = usePossibleBets();
    const { isLaptop } = useWindowWidth();

    const eventId = getEventIdFromRoute(router.route);

    const resetQuickBetAnimationState = useRecoilCallback(resetQuickBetAnimationStateTask, []);
    const resetBetslipState = useRecoilCallback(resetBetslipStateTask, []);

    const closeBetReceipt = useRecoilCallback(
        ({ reset, snapshot, transact_UNSTABLE: transact }) =>
            async () => {
                const keepPlacedBets = getValue(snapshot, keepPlacedBetsAtom);
                const routeName = store.get(routeNameAtom);
                const isCrossBetPage = routeName === RouteName.CrossBetting;

                if (isLaptop) {
                    await resetQuickBetAnimationState();
                }

                if (keepPlacedBets) {
                    const { legs } = getValue(snapshot, betReceiptAtom);

                    transact(syncRelationsAfterKeepingPlacedBetsTransaction(eventId));
                    getPossibleBets({ triggeredBy: PossibleBetsTriggeredBy.KeepPlacedBets });

                    if (!isCrossBetPage && some(legs, isCrossBetLegType)) {
                        reset(betslipActiveTabAtom);
                    }

                    reset(keepPlacedBetsAtom);
                } else {
                    reset(placeBetStatusAtom);
                    reset(betReceiptAtom);

                    transact(resetBetslipStateTransaction);
                }
            },
        [isLaptop, resetQuickBetAnimationState, getPossibleBets, eventId],
    );

    useEventListener('beforeunload', resetBetslipState);

    return (
        <S_BetReceipt data-testid='betReceipt'>
            <S_SuccessMessage data-testid='betPlaceSuccessfulMessage'>
                <SuccessCheckmarkIcon fontSize='xsmall' />
                <I18n
                    langKey='betslip.receipt.heading.label'
                    defaultText='Your bet(s) have been successfully placed!'
                />
            </S_SuccessMessage>

            <S_BetReceiptCard>
                <S_BetReceiptCardHeader data-testid='betReceipt-nrOfBets'>
                    <BetReceiptCardLabel />
                </S_BetReceiptCardHeader>

                <S_BetReceiptCardContent>
                    <BetReceiptInfo />

                    <BetReceiptItems />

                    <S_Button>
                        <S_CloseBetReceiptButton
                            size='medium'
                            onClick={() => void closeBetReceipt()}
                            testId='closeBetReceipt'
                        >
                            <I18n langKey='betslip.receipt.button.close' defaultText='Close' />
                        </S_CloseBetReceiptButton>
                    </S_Button>
                </S_BetReceiptCardContent>
            </S_BetReceiptCard>
        </S_BetReceipt>
    );
};

export default BetReceipt;
