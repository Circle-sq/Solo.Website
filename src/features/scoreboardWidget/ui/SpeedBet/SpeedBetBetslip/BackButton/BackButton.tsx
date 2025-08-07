import { useRecoilValue, useRecoilCallback } from 'recoil';

import { I18n } from 'src/ui/common/Language/I18n';

import { isDisabledNumpadAtom } from '../../../../store/atoms';
import { resetSpeedBetMarketSelectionTask } from '../../../../store/tasks';

import { S_BackButton } from './styled';

const BackButton = () => {
    const isDisabledNumpad = useRecoilValue(isDisabledNumpadAtom);

    const resetSpeedBetMarketSelection = useRecoilCallback(resetSpeedBetMarketSelectionTask, []);

    return (
        <S_BackButton
            data-testid='speedBetBetslipBackButton'
            onClick={resetSpeedBetMarketSelection}
            disabled={isDisabledNumpad}
        >
            <I18n langKey='speedBet.betslip.backButton' defaultText='Go Back' />
        </S_BackButton>
    );
};

export default BackButton;
