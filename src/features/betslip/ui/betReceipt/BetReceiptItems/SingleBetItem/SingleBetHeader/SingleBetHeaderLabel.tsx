import SingleBuildABetHeaderLabel from '@sc-buildABet/ui/betslip/BetReceipt/SingleBuildABetHeaderLabel/SingleBuildABetHeaderLabel';
import { CrossBetIcon } from '@sc-ui/icons/svg';

import { LegType } from 'src/common/enums';
import { I18n } from 'src/ui/common/Language/I18n';

import { S_MarginBox } from '../styled';

const SingleBetHeaderLabel = ({ legType }: { legType: LegType }) => {
    switch (legType) {
        case LegType.BuildABet:
            return <SingleBuildABetHeaderLabel />;

        case LegType.CrossBet:
            return (
                <>
                    <S_MarginBox>
                        <CrossBetIcon />
                    </S_MarginBox>
                    <I18n langKey='header.crossbetting.label' defaultText='cross bet' />
                </>
            );

        default:
            return <I18n langKey='betslip.receipt.selection.single-bet.label' defaultText='Single bet' />;
    }
};

export default SingleBetHeaderLabel;
