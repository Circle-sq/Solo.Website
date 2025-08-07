import { I18n } from 'src/ui/common/Language/I18n';

import { FreeBetsLabel, FreeBetsLabelElWrapper, FreeBetsSelect } from '../dropdown/styled';

const FreeBetBadge = () => {
    return (
        <FreeBetsSelect component='myBets'>
            <FreeBetsLabel data-testid='freebet-dropdown' component='myBets'>
                <FreeBetsLabelElWrapper>
                    <I18n langKey='betslip.free-bets.freebet-label' defaultText='Free bet!' />
                </FreeBetsLabelElWrapper>
            </FreeBetsLabel>
        </FreeBetsSelect>
    );
};

export default FreeBetBadge;
