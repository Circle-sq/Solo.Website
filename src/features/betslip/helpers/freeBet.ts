import find from 'lodash/find';
import isNull from 'lodash/isNull';

import type { FreeBetAssignment, FreeBetCredit } from '../api/types/freeBet';

export const pickFreeBetCredit = (
    { credits, selectedId }: FreeBetAssignment,
    creditId?: number,
): FreeBetCredit | null => {
    const targetId = creditId ?? selectedId;

    if (isNull(targetId)) {
        return null;
    }

    return find(credits, { id: targetId }) ?? null;
};
