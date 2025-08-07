import { memo } from 'react';
import { useRecoilCallback } from 'recoil';

import type { BetslipTab } from 'src/common/enums';
import { getValue } from 'src/common/recoil/snapshot';

import { usePossibleBets } from '../../api/possibleBets/queries';
import { PossibleBetsTriggeredBy } from '../../enums';
import { isDisabledTabSelectorFamily } from '../../store/selectors/tabStatus';
import { updateBetslipTabTransaction } from '../../store/transactions/betslipTab';

import BetslipTabItem from './BetslipTabItem/BetslipTabItem';
import { betslipTabs } from './configs';
import { S_BetslipTabs } from './styled';

const BetslipTabs = () => {
    const { getPossibleBets } = usePossibleBets();

    const changeBetslipTab = useRecoilCallback(
        ({ snapshot, transact_UNSTABLE: transact }) =>
            (tab: BetslipTab) => {
                const isDisabled = getValue(snapshot, isDisabledTabSelectorFamily(tab));

                if (!isDisabled) {
                    transact(updateBetslipTabTransaction({ tab, isSelectedByUser: true }));
                    getPossibleBets({ triggeredBy: PossibleBetsTriggeredBy.ChangeBetslipTab });
                }
            },
        [getPossibleBets],
    );

    return (
        <S_BetslipTabs>
            {betslipTabs.map((item) => (
                <BetslipTabItem key={item.tab} item={item} changeTab={changeBetslipTab} />
            ))}
        </S_BetslipTabs>
    );
};

export default memo(BetslipTabs);
