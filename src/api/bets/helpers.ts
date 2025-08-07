import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import set from 'lodash/set';

import { BetStatus, MyBetsTab } from 'src/common/enums';
import { SETTLED_STATUSES } from 'src/ui/myBets/store/configs';
import { TabStatus } from 'src/ui/myBets/store/types';

import type { MyBetsQueryKeyParams } from './types';

export const getMyBetsParams = ({
    tab,
    queryStatus,
    statusFilter,
    range = {},
}: Omit<MyBetsQueryKeyParams, 'sort' | 'cash_out'>) => {
    const query = {
        aggregations: {
            total: { type: 'count' },
        },
    };

    if (tab === MyBetsTab.Settled) {
        set(query, 'settledAt', {
            lte: range.to,
            gte: range.from,
        });
    } else {
        set(query, 'cashOut.eq', false);
    }

    if (!isEmpty(queryStatus)) {
        if (queryStatus === BetStatus.Cancelled) {
            set(query, 'status.in', SETTLED_STATUSES);
        } else {
            const key = isArray(queryStatus) ? 'in' : 'eq';

            set(query, `status.${key}`, queryStatus);

            if (statusFilter === TabStatus.Lost) {
                set(query, 'operatorPayout.eq', 0);
            } else if (statusFilter === TabStatus.Settled) {
                set(query, 'operatorPayout.gt', 0);
            }
        }
    }

    return query;
};
