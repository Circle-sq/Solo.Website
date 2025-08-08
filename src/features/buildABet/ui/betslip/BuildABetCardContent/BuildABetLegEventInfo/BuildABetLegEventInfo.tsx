import { observer } from 'mobx-react-lite';
import { useRecoilValue } from 'recoil';

import type { Leg } from '@solo-betslip/api/types/leg';
import useSelectionState from '@solo-betslip/hooks/useSelectionState';
import { isSingleTabSelector } from '@solo-betslip/store/selectors/betslipTab';
import { BuildABetIcon } from '@solo-buildABet/ui';

import { I18n } from 'src/ui/common/Language/I18n';

import { S_BuildABetCardEventName, S_BuildABetIconWrapper, S_CardEventWrapper, S_LiveName } from '../styled';

const BuildABetLegEventInfo = ({ leg }: { leg: Leg }) => {
    const isSingleTab = useRecoilValue(isSingleTabSelector);

    const { eventName, isLive } = useSelectionState(leg);

    return (
        <S_CardEventWrapper isSingleTab={isSingleTab}>
            {!isSingleTab && (
                <S_BuildABetIconWrapper>
                    <BuildABetIcon className='build-a-bet-icon' />
                </S_BuildABetIconWrapper>
            )}

            {isLive && (
                <S_LiveName>
                    <I18n langKey='betslip.live.label' defaultText='live' />
                </S_LiveName>
            )}

            <S_BuildABetCardEventName isSingleTab={isSingleTab} data-testid='eventName'>
                {eventName}
            </S_BuildABetCardEventName>
        </S_CardEventWrapper>
    );
};

export default observer(BuildABetLegEventInfo);
