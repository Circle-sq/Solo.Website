import { useRecoilValue } from 'recoil';

import { isAvailableBuildABetFeatureSelectorFamily, isEnabledBuildABetFeatureSelectorFamily } from '../store/selectors';

export const useBuildABetState = (eventId?: number) => {
    const isAvailable = useRecoilValue(isAvailableBuildABetFeatureSelectorFamily(eventId));
    const isEnabled = useRecoilValue(isEnabledBuildABetFeatureSelectorFamily(eventId));

    return {
        isAvailable,
        isEnabled,
    };
};
