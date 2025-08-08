import { getRecoil, setRecoil } from 'recoil-nexus';

import { updateMainLineMarketIdTask } from '@solo-asianView/store/tasks/mainLine';
import { syncSuspendedBetslipProblemsTransaction } from '@solo-betslip/store/transactions/problems';
import type { CallbackParams } from '@solo-utils/jotai';

import { marketItemAtomFamily } from '../entities';

import type { MarketStatusUpdateBody } from './types';

export const marketStatusesUpdateTask =
    (p: CallbackParams) =>
    ({ active, display, event, market, template }: MarketStatusUpdateBody) => {
        const marketItem = p.get(marketItemAtomFamily(market.id));

        if (marketItem === null) {
            return;
        }

        p.set(marketItemAtomFamily(market.id), {
            ...marketItem,
            active,
            display,
            revision: marketItem.revision + 1,
        });

        updateMainLineMarketIdTask(p)(event.id, template.id);

        if (active) {
            syncSuspendedBetslipProblemsTransaction(market.id)({ get: getRecoil, set: setRecoil });
        }
    };
