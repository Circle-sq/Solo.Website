import type { Combinations } from '../api/types/combination';
import type { Leg } from '../api/types/leg';
import type { PossibleBetsTriggeredBy } from '../enums';

export interface SelectionStateResult {
    eventName: string;
    isLive: boolean;
    isClosed: boolean;
    isLocked: boolean;
    isSuspended: boolean;
    isStakeDisabled: boolean;
    isSelectionDisabled: boolean;
    isFreeBet: boolean;
}

export interface PossibleBetsParams {
    triggeredBy: PossibleBetsTriggeredBy;
    combinations?: Combinations;
    animationKey?: string;
    prevBuildABetId?: string;
}

export interface PossibleOfferBetsParams {
    legs: Leg[];
    triggeredBy: PossibleBetsTriggeredBy;
}
