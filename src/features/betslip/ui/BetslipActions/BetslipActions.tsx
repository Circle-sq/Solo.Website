import { useCallback } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { I18n } from 'src/ui/common/Language/I18n';

import { usePossibleBets } from '../../api/possibleBets/queries';
import { PossibleBetsTriggeredBy } from '../../enums';
import { hasUncheckedBetSelector } from '../../store/selectors/betslipBets';
import { hasOfferSelector } from '../../store/selectors/offer';
import { toggleAllBetslipBetsTask } from '../../store/tasks/betslipBet/toggle';

import ActionButtons from './ActionButtons';
import { S_ActionButtons, S_BetslipActions, S_CheckboxIcon, S_CheckboxSection, S_CheckboxWrapper } from './styled';

const BetslipActions = () => {
    const hasOffer = useRecoilValue(hasOfferSelector);
    const hasUncheckedBet = useRecoilValue(hasUncheckedBetSelector);

    const { getPossibleBets } = usePossibleBets();

    const toggleAllBetslipBets = useRecoilCallback(toggleAllBetslipBetsTask, []);

    const onToggleAllBets = useCallback(() => {
        toggleAllBetslipBets();
        getPossibleBets({ triggeredBy: PossibleBetsTriggeredBy.ToggleAllBetslipBets });
    }, [toggleAllBetslipBets, getPossibleBets]);

    return (
        <S_BetslipActions isDisabled={hasOffer}>
            <S_CheckboxWrapper>
                <S_CheckboxIcon
                    isChecked={!hasUncheckedBet}
                    className={hasUncheckedBet ? 'theme-checkbox-off' : 'theme-check'}
                    onClick={onToggleAllBets}
                    data-testid='allSelectionsCheckbox'
                />
                <S_CheckboxSection>
                    <I18n langKey='betslip.select.all' defaultText='Select all / Unselect All' />
                </S_CheckboxSection>
            </S_CheckboxWrapper>

            <S_ActionButtons>
                <ActionButtons />
            </S_ActionButtons>
        </S_BetslipActions>
    );
};

export default BetslipActions;
