import get from 'lodash/get';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import type { Leg, MultiBetLeg } from '../../../api/types/leg';
import { showFadeInAnimationSelectorFamily } from '../../../store/selectors/animation';
import { isSingleTabSelector } from '../../../store/selectors/betslipTab';
import { animationEndTask } from '../../../store/tasks/betslipBet/animation';
import CardStake from '../CardStake/CardStake';

import CrossBetLeg from './CrossBetLeg/CrossBetLeg';
import CrossLegEventInfo from './CrossLegEventInfo/CrossLegEventInfo';
import { NameStakeWrapper, S_CrossBet, S_CrossBetLeg } from './styled';

interface Props {
    leg: Leg;
    changeStakeInput: (value: number) => void;
}

const CrossBet = ({ leg, changeStakeInput }: Props) => {
    const isSingleTab = useRecoilValue(isSingleTabSelector);

    const { event, marketsAndSelections = [] } = get(leg, 'legs.0') as MultiBetLeg;

    const showFadeInAnimation = useRecoilValue(showFadeInAnimationSelectorFamily(event.id));

    const endAnimationHandler = useRecoilCallback(animationEndTask, []);

    return (
        <S_CrossBet
            data-testid={`crossbetSelection-${event.id}`}
            showFadeInAnimation={showFadeInAnimation}
            onAnimationEnd={endAnimationHandler}
        >
            <NameStakeWrapper>
                <S_CrossBetLeg>
                    <CrossBetLeg
                        isSingleTab={isSingleTab}
                        marketsAndSelections={marketsAndSelections}
                        eventId={event.id}
                    />
                    {isSingleTab && <CrossLegEventInfo leg={leg} />}
                </S_CrossBetLeg>

                <CardStake leg={leg} changeStakeInput={changeStakeInput} />
            </NameStakeWrapper>
            {!isSingleTab && <CrossLegEventInfo leg={leg} />}
        </S_CrossBet>
    );
};

export default CrossBet;
