import { useRecoilValue } from 'recoil';

import { ErrorIcon, WarningIcon } from 'src/assets/icons/alertIcons';

import type { Leg } from '../../../api/types/leg';
import { isPossibleBetsLoadingSelector } from '../../../store/selectors/betslip';
import { isMultiTabSelector, isSystemTabSelector } from '../../../store/selectors/betslipTab';
import { hasRelatedSelectionProblemForBetSelectorFamily } from '../../../store/selectors/problems';

const CardAlertIcon = ({ leg }: { leg: Leg }) => {
    const betId = leg.selectionId ?? leg.id;

    const isMultiTab = useRecoilValue(isMultiTabSelector);
    const isSystemTab = useRecoilValue(isSystemTabSelector);
    const isPossibleBetsLoading = useRecoilValue(isPossibleBetsLoadingSelector);
    const hasRelatedSelection = useRecoilValue(hasRelatedSelectionProblemForBetSelectorFamily(betId));

    if (isPossibleBetsLoading) {
        return null;
    }

    if (hasRelatedSelection && (isMultiTab || isSystemTab)) {
        return <ErrorIcon testId='error-icon' />;
    }

    if (isMultiTab && hasRelatedSelection) {
        return <WarningIcon />;
    }

    return null;
};

export default CardAlertIcon;
