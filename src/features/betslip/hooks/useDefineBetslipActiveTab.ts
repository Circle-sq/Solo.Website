import { useEffect } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import type { BetslipTab } from 'src/common/enums';

import { definedTabSelector } from '../store/selectors/betslipTab';
import { updateBetslipTabTransaction } from '../store/transactions/betslipTab';

const useDefineBetslipActiveTab = (showBetReceipt: boolean) => {
    const definedTab = useRecoilValue(definedTabSelector);

    const updateBetslipTab = useRecoilCallback(
        ({ transact_UNSTABLE: transact }) =>
            ({ tab }: { tab: BetslipTab }) => {
                transact(updateBetslipTabTransaction({ tab }));
            },
        [],
    );

    useEffect(() => {
        if (!showBetReceipt) {
            updateBetslipTab({ tab: definedTab });
        }
    }, [definedTab]);
};

export default useDefineBetslipActiveTab;
