import get from 'lodash/get';
import some from 'lodash/some';
import { useRecoilValue } from 'recoil';

import { useAppStateContext } from 'src/appState/AppState';
import { BetStatus } from 'src/common/enums';

import type { Leg, MultiBetLeg } from '../api/types/leg';
import { getEventIdPath } from '../helpers/helpers';
import { getMultiBetLegModelsView, getLegModelView } from '../helpers/selectionView';
import { hasLessThanTabLimitBetsSelector } from '../store/selectors/betslipBets';
import { hasAlgoSportErrorSelectorFamily, hasZeroWinExpectationErrorSelector } from '../store/selectors/errors';
import { hasOfferSelector } from '../store/selectors/offer';

import type { SelectionStateResult } from './types';
import useBetType from './useBetType';

const useSelectionState = (leg: Leg): SelectionStateResult => {
    const { models } = useAppStateContext();
    const { isMultiBet, isFreeBet, isBuildABet } = useBetType(leg);

    const hasOffer = useRecoilValue(hasOfferSelector);
    const hasLessThanTabLimitBets = useRecoilValue(hasLessThanTabLimitBetsSelector);

    const eventId = get(leg, getEventIdPath(isMultiBet));
    const hasAlgoSportError = useRecoilValue(hasAlgoSportErrorSelectorFamily(eventId));
    const hasZeroWinExpectationError = useRecoilValue(hasZeroWinExpectationErrorSelector);

    const event = models.getEvent(Number(eventId));
    const eventName = event?.name ?? get(leg, 'event.name') ?? '';

    if (isMultiBet) {
        const multiBetLeg = get(leg, 'legs.0') as MultiBetLeg;
        const multiBetLegModels = getMultiBetLegModelsView(models, multiBetLeg);

        const isSuspended = some(multiBetLegModels, 'suspended');
        const isResulted = some(multiBetLegModels, { state: BetStatus.Resulted });
        const isSettled = some(multiBetLegModels, { state: BetStatus.Settled });
        const isLive = event?.timeSettingsStarted ?? false;
        const isLocked =
            isSuspended || hasAlgoSportError || (isLive && !isBuildABet) || (hasZeroWinExpectationError && isBuildABet);

        return {
            eventName,
            isSuspended,
            isClosed: isResulted || isSettled,
            isLocked,
            isSelectionDisabled: isResulted || isSettled || isSuspended,
            isStakeDisabled: hasAlgoSportError || isFreeBet,
            isLive,
            isFreeBet,
        };
    }

    const modelView = getLegModelView(models, leg);
    const { suspended: isSuspended = false, state = undefined } = modelView ?? {};

    const isResulted = state === BetStatus.Resulted;
    const isSettled = state === BetStatus.Settled;

    return {
        eventName,
        isSuspended,
        isClosed: isResulted || isSettled,
        isLocked: isSuspended || (hasZeroWinExpectationError && isBuildABet),
        isSelectionDisabled: isResulted || isSettled || isSuspended,
        isStakeDisabled: hasOffer || hasLessThanTabLimitBets || isFreeBet,
        isLive: event?.timeSettingsStarted ?? false,
        isFreeBet,
    };
};

export default useSelectionState;
