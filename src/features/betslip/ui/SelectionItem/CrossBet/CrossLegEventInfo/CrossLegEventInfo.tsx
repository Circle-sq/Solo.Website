import { observer } from 'mobx-react-lite';
import { useRecoilValue } from 'recoil';

import { CrossBetIcon } from '@solo-ui/icons/svg';

import { I18n } from 'src/ui/common/Language/I18n';

import type { Leg } from '../../../../api/types/leg';
import useSelectionState from '../../../../hooks/useSelectionState';
import { isSingleTabSelector } from '../../../../store/selectors/betslipTab';
import { S_CardEventName, CardEventWrapper, S_CrossBetIconWrapper, S_LiveName } from '../styled';

const CrossLegEventInfo = ({ leg }: { leg: Leg }) => {
    const isSingleTab = useRecoilValue(isSingleTabSelector);

    const { eventName, isLive } = useSelectionState(leg);

    return (
        <CardEventWrapper isSingleTab={isSingleTab}>
            {!isSingleTab && (
                <S_CrossBetIconWrapper>
                    <CrossBetIcon fontSize='small' />
                </S_CrossBetIconWrapper>
            )}
            {isLive && (
                <S_LiveName>
                    <I18n langKey='betslip.live.label' defaultText='live' />
                </S_LiveName>
            )}
            <S_CardEventName isSingleTab={isSingleTab} title={eventName} data-testid='eventName'>
                {eventName}
            </S_CardEventName>
        </CardEventWrapper>
    );
};

export default observer(CrossLegEventInfo);
