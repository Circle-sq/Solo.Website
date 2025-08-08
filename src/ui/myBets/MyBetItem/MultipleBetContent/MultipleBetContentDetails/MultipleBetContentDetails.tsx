import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { observer } from 'mobx-react-lite';

import { S_BetStatusType } from '@solo-buildABet/ui/myBet/styled';

import type { MyBetLeg } from 'src/common/types/myBet';
import type { BetStatus } from 'src/common/enums';
import { LegType } from 'src/common/enums';
import { useAppStateContext } from 'src/appState/AppState';
import { isSettledTabSelector } from 'src/ui/myBets/store/selectors';
import { getBetLegStatus, getMultipleBetLabel } from 'src/ui/myBets/utils/helpers';
import BetStatusIcon from 'src/assets/icons/betStatusIcon/BetStatusIcon';
import { LiveLabelShort } from 'src/ui/common/LiveLabel/LiveLabel';
import { S_BetStatusContainer, S_ContentDetails } from 'src/ui/myBets/MyBetItem/styled';

import MultipleBetContentItem from '../MultipleBetContentItem/MultipleBetContentItem';
import { S_MultipleBetStatus } from '../styled';

interface Props {
    legs: MyBetLeg[];
    betStatus: BetStatus;
    isSettledBet: boolean;
    isOpen: boolean;
}

const MultipleBetContentDetails = ({ legs, betStatus, isSettledBet, isOpen }: Props) => {
    const isSettledTab = useRecoilValue(isSettledTabSelector);

    const { models } = useAppStateContext();

    const multipleBetLabel = useMemo(() => getMultipleBetLabel(legs), [legs]);

    if (isOpen) {
        return (
            <S_ContentDetails>
                {legs.map((leg, index) => {
                    const isLastLeg = index < legs.length - 1;

                    return (
                        <MultipleBetContentItem
                            key={leg.id}
                            leg={leg}
                            betStatus={betStatus}
                            isLastLeg={isLastLeg}
                            isSettledBet={isSettledBet}
                        />
                    );
                })}
            </S_ContentDetails>
        );
    }

    const hasLiveLeg = legs.some((leg) => {
        const event = models.getEvent(Number(leg.event.id));

        return event?.timeSettingsStarted ?? false;
    });

    const showLiveLabel = hasLiveLeg && !isSettledTab;

    return (
        <S_ContentDetails hasPadding>
            {multipleBetLabel}

            <S_BetStatusContainer>
                {showLiveLabel && <LiveLabelShort className='multipleBet-liveLabel' testId='liveLabel' />}

                <S_MultipleBetStatus>
                    {legs.map(({ id, type, result }) => {
                        const legStatus = getBetLegStatus(betStatus, result);

                        if (type === LegType.BuildABet) {
                            return (
                                <S_BetStatusType key={id}>
                                    <BetStatusIcon status={legStatus} />
                                </S_BetStatusType>
                            );
                        }

                        return <BetStatusIcon key={id} status={legStatus} />;
                    })}
                </S_MultipleBetStatus>
            </S_BetStatusContainer>
        </S_ContentDetails>
    );
};

export default observer(MultipleBetContentDetails);
