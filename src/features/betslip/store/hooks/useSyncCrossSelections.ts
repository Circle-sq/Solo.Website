import { useRecoilCallback } from 'recoil';

import { RouteName } from 'src/common/enums';

import { usePossibleBets } from '../../api/possibleBets/queries';
import { PossibleBetsTriggeredBy } from '../../enums';
import { betslipSelectionsAtom } from '../atoms/selections';
import { syncLastCrossSelectionByMarketTypes } from '../helpers/selection/sync';

export const useSyncCrossSelections = () => {
    const { getPossibleBets } = usePossibleBets();

    return useRecoilCallback(
        ({ set }) =>
            (routeName: string) => {
                if (routeName === RouteName.CrossBetting) {
                    set(betslipSelectionsAtom, syncLastCrossSelectionByMarketTypes);

                    getPossibleBets({ triggeredBy: PossibleBetsTriggeredBy.RemoveOrphanSelections });
                }
            },
        [getPossibleBets],
    );
};
