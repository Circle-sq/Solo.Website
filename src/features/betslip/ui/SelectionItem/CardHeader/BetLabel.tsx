import BuildABetCardHeaderLabel from '@solo-buildABet/ui/betslip/CardHeaderLabel/CardHeaderLabel';

import { I18n } from 'src/ui/common/Language/I18n';

import type { Leg } from '../../../api/types/leg';
import useBetType from '../../../hooks/useBetType';

const BetLabel = ({ leg }: { leg: Leg }) => {
    const { isBuildABet } = useBetType(leg);

    if (isBuildABet) {
        return <BuildABetCardHeaderLabel />;
    }

    return <I18n langKey='betslip.selection.single-bet.label' defaultText='Single bet' />;
};

export default BetLabel;
