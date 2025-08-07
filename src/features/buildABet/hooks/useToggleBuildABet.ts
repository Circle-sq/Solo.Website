import isNil from 'lodash/isNil';
import { useRecoilCallback } from 'recoil';

import { betReceiptAtom } from '@sc-betslip/store/atoms/betReceipt';
import { showBetReceiptSelector } from '@sc-betslip/store/selectors/betReceipt';
import { resetBetslipStateTransaction } from '@sc-betslip/store/transactions/betslip';

import { getValue } from 'src/common/recoil/snapshot';
import { toggleId } from 'src/common/recoil/updaters';

import { enabledBuildABetIdsAtom } from '../store/atoms';

export const useToggleBuildABet = () => {
    const toggleBuildABetFeature = useRecoilCallback(
        ({ reset, set, snapshot, transact_UNSTABLE: transact }) =>
            (eventId?: number) => {
                const showBetReceipt = getValue(snapshot, showBetReceiptSelector);
                transact(resetBetslipStateTransaction);

                if (!isNil(eventId)) {
                    set(enabledBuildABetIdsAtom, toggleId(eventId));
                }

                if (showBetReceipt) {
                    reset(betReceiptAtom);
                }
            },
        [],
    );

    return { toggleBuildABetFeature };
};
