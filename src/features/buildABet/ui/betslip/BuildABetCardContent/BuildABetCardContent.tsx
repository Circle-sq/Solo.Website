import get from 'lodash/get';
import { observer } from 'mobx-react-lite';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import type { Leg, MultiBetLeg } from '@solo-betslip/api/types/leg';
import { showFadeInAnimationSelectorFamily } from '@solo-betslip/store/selectors/animation';
import { isSingleTabSelector } from '@solo-betslip/store/selectors/betslipTab';
import { animationEndTask } from '@solo-betslip/store/tasks/betslipBet/animation';
import CardStake from '@solo-betslip/ui/SelectionItem/CardStake/CardStake';
import BuildABetLeg from '@solo-buildABet/ui/BuildABetLeg/BuildABetLeg';

import BuildABetLegEventInfo from './BuildABetLegEventInfo/BuildABetLegEventInfo';
import { S_BuildABetCardContent, S_CardSelection, S_NameStakeWrapper } from './styled';

interface Props {
    leg: Leg;
    changeStakeInput: (value: number) => void;
}

const BuildABetCardContent = ({ leg, changeStakeInput }: Props) => {
    const isSingleTab = useRecoilValue(isSingleTabSelector);

    const { event, marketsAndSelections = [] } = get(leg, 'legs.0') as MultiBetLeg;
    const { id: eventId } = event;

    const showFadeInAnimation = useRecoilValue(showFadeInAnimationSelectorFamily(eventId));

    const endAnimationHandler = useRecoilCallback(animationEndTask, []);

    return (
        <S_BuildABetCardContent
            data-testid={`buildABetSelection-${eventId}`}
            showFadeInAnimation={showFadeInAnimation}
            onAnimationEnd={endAnimationHandler}
        >
            <S_NameStakeWrapper>
                <S_CardSelection>
                    <BuildABetLeg isSingleTab={isSingleTab} marketsAndSelections={marketsAndSelections} />

                    {isSingleTab && <BuildABetLegEventInfo leg={leg} />}
                </S_CardSelection>

                <CardStake leg={leg} changeStakeInput={changeStakeInput} />
            </S_NameStakeWrapper>

            {!isSingleTab && <BuildABetLegEventInfo leg={leg} />}
        </S_BuildABetCardContent>
    );
};

export default observer(BuildABetCardContent);
