import { useAtomValue } from 'jotai';
import { useRecoilValue } from 'recoil';

import { oddsFormatSelector } from '@solo-account/store/selectors';

import { I18n } from 'src/ui/common/Language/I18n';
import { formatDecimalPart } from 'src/utils/format';

import { DASH } from '../../../configs';
import {
    hasBetWithoutPriceSelector,
    hasMultipleBetsCountSelector,
    hasSuspendedBetSelector,
} from '../../../store/selectors/betslipBets';
import { totalOddsSelector } from '../../../store/selectors/combinations';
import { S_StakeAmount, S_SummaryTotal } from '../styled';

const TotalOdds = () => {
    const oddsFormat = useAtomValue(oddsFormatSelector);
    const totalOdds = useRecoilValue(totalOddsSelector({ oddsFormat }));
    const hasBetWithoutPrice = useRecoilValue(hasBetWithoutPriceSelector);
    const hasMultipleBetsCount = useRecoilValue(hasMultipleBetsCountSelector);
    const hasSuspendedBet = useRecoilValue(hasSuspendedBetSelector);

    const visualTotalOdds =
        hasMultipleBetsCount && !hasSuspendedBet && !hasBetWithoutPrice ? formatDecimalPart(totalOdds) : DASH;

    return (
        <S_SummaryTotal>
            <I18n langKey='betslip.system.total-odds' defaultText='Total odds' />
            <S_StakeAmount data-testid='totalOdds'>{visualTotalOdds}</S_StakeAmount>
        </S_SummaryTotal>
    );
};

export default TotalOdds;
