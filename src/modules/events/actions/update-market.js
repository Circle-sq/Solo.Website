import { getRecoil, setRecoil } from 'recoil-nexus';
import isEmpty from 'lodash/isEmpty';

import { betslipProblemsAtom } from '@sc-betslip/store/atoms/betslip';

import { syncSuspendedBetslipProblems } from '/src/features/betslip/store/helpers/problems';
import { betslipSelectionsAtom } from '/src/features/betslip/store/atoms/selections';

export function update(evntId, id, market, messageType) {
    market.id = id;

    return (dispatch) => {
        const eventId = +evntId;

        dispatch({
            type: 'EVENTS_UPDATE_MARKET',
            messageType,
            market,
            eventId,
            id,
        });
    };
}

export function updateSuspendedLeg(marketId, market) {
    return () => {
        if (!market.active) {
            return;
        }

        const betslipSelections = getRecoil(betslipSelectionsAtom);

        if (isEmpty(betslipSelections)) {
            return;
        }

        setRecoil(betslipProblemsAtom, syncSuspendedBetslipProblems(betslipSelections, marketId));
    };
}
