import SingleBuildABetHeaderLabel from '@solo-buildABet/ui/betslip/BetReceipt/SingleBuildABetHeaderLabel/SingleBuildABetHeaderLabel';

import { LegType } from 'src/common/enums';
import { I18n } from 'src/ui/common/Language/I18n';

const SingleBetHeaderLabel = ({ legType }: { legType: LegType }) => {
    switch (legType) {
        case LegType.BuildABet:
            return <SingleBuildABetHeaderLabel />;

        default:
            return <I18n langKey='betslip.receipt.selection.single-bet.label' defaultText='Single bet' />;
    }
};

export default SingleBetHeaderLabel;
