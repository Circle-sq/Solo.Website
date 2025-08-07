import { memo, useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import { getBetKey } from '../../helpers/bet';
import { betslipSelectionsAtom } from '../../store/atoms/selections';
import { sortBetsByTimestamp } from '../../store/helpers/betslipBet/sort';
import { betslipBetsSelector } from '../../store/selectors/betslipBets';
import SelectionItem from '../SelectionItem/SelectionItem';

const SelectionList = () => {
    const betslipBets = useRecoilValue(betslipBetsSelector);
    const selections = useRecoilValue(betslipSelectionsAtom);

    const sortedBetslipBets = useMemo(() => sortBetsByTimestamp(betslipBets, selections), [betslipBets, selections]);

    return (
        <>
            {sortedBetslipBets.map((leg, index) => {
                const key = getBetKey(leg, index);

                return <SelectionItem key={key} leg={leg} />;
            })}
        </>
    );
};

export default memo(SelectionList);
