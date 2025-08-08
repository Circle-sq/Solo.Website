import BuildABetCardHeaderLabel from '@solo-buildABet/ui/betslip/CardHeaderLabel/CardHeaderLabel';
import { CrossBetIcon } from '@solo-ui/icons/svg';

import { I18n } from 'src/ui/common/Language/I18n';

import type { Leg } from '../../../api/types/leg';
import useBetType from '../../../hooks/useBetType';

import { S_MarginBox } from './styled';

const BetLabel = ({ leg }: { leg: Leg }) => {
    const { isBuildABet, isCrossBet } = useBetType(leg);

    if (isBuildABet) {
        return <BuildABetCardHeaderLabel />;
    }

    if (isCrossBet) {
        return (
            <>
                <S_MarginBox>
                    <CrossBetIcon />
                </S_MarginBox>
                <I18n langKey='header.crossbetting.label' defaultText='cross bet' />
            </>
        );
    }

    return <I18n langKey='betslip.selection.single-bet.label' defaultText='Single bet' />;
};

export default BetLabel;
