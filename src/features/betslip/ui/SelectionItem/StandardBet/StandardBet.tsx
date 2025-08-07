import { observer } from 'mobx-react-lite';
import { useRecoilValue } from 'recoil';

import { SubKey } from '@sc-features/subscription-manager/subKeys';
import { SubscribeElement } from '@sc-features/subscription-manager/SubscribeElement';

import type { Leg } from '../../../api/types/leg';
import { isSingleTabSelector } from '../../../store/selectors/betslipTab';
import CardStake from '../CardStake/CardStake';

import StandardLeg from './StandardLeg/StandardLeg';
import StandardLegEventInfo from './StandardLegEventInfo/StandardLegEventInfo';
import { NameStakeWrapper, S_StandardBet, S_StandardLeg } from './styled';

interface Props {
    leg: Leg;
    changeStakeInput: (value: number) => void;
}

const StandardBet = ({ leg, changeStakeInput }: Props) => {
    const isSingleTab = useRecoilValue(isSingleTabSelector);
    const marketRevision = leg.marketRevision;

    return (
        <S_StandardBet data-testid='standardLeg'>
            <NameStakeWrapper>
                <S_StandardLeg data-testid='standardLeg'>
                    <StandardLeg leg={leg} />
                    {isSingleTab && <StandardLegEventInfo leg={leg} />}
                </S_StandardLeg>
                <SubscribeElement
                    id={+leg.marketId!}
                    parentId={+leg.eventId!}
                    subKey={SubKey.standard_bet}
                    revision={marketRevision}
                >
                    <CardStake leg={leg} changeStakeInput={changeStakeInput} />
                </SubscribeElement>
            </NameStakeWrapper>
            {!isSingleTab && <StandardLegEventInfo leg={leg} />}
        </S_StandardBet>
    );
};

export default observer(StandardBet);
