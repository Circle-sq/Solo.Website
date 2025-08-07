import { useRecoilValue } from 'recoil';

import { ErrorIcon, WarningIcon } from 'src/assets/icons/alertIcons';

import type { Leg } from '../../../api/types/leg';
import { isPossibleBetsLoadingSelector } from '../../../store/selectors/betslip';
import { isMultiTabSelector, isSystemTabSelector } from '../../../store/selectors/betslipTab';
import { hasAlgoSportErrorSelectorFamily } from '../../../store/selectors/errors';
import { hasRelatedSelectionProblemForBetSelectorFamily } from '../../../store/selectors/problems';
import { isCrossBetType } from '../../../typeGuards/bet';

const CardAlertIcon = ({ leg, eventId }: { leg: Leg; eventId: number }) => {
    const betId = leg.selectionId ?? leg.id;

    const isMultiTab = useRecoilValue(isMultiTabSelector);
    const isSystemTab = useRecoilValue(isSystemTabSelector);
    const isPossibleBetsLoading = useRecoilValue(isPossibleBetsLoadingSelector);
    const hasAlgoSportError = useRecoilValue(hasAlgoSportErrorSelectorFamily(eventId));
    const hasRelatedSelection = useRecoilValue(hasRelatedSelectionProblemForBetSelectorFamily(betId));

    if (isPossibleBetsLoading) {
        return null;
    }

    if ((isCrossBetType(leg) && hasAlgoSportError) || (hasRelatedSelection && (isMultiTab || isSystemTab))) {
        return <ErrorIcon testId='error-icon' />;
    }

    if (isMultiTab && hasRelatedSelection) {
        return <WarningIcon />;
    }

    return null;
};

export default CardAlertIcon;
