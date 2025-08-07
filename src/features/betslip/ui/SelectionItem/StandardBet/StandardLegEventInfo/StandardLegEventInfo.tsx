import { observer } from 'mobx-react-lite';
import { useRecoilValue } from 'recoil';

import { I18n } from 'src/ui/common/Language/I18n';

import type { Leg } from '../../../../api/types/leg';
import useSelectionState from '../../../../hooks/useSelectionState';
import { isSingleTabSelector } from '../../../../store/selectors/betslipTab';
import { S_EventDetails, S_EventName, S_LiveName, S_SelectionEvent } from '../styled';

const StandardLegEventInfo = ({ leg }: { leg: Leg }) => {
    const isSingleTab = useRecoilValue(isSingleTabSelector);

    const { eventName, isLive, isSelectionDisabled } = useSelectionState(leg);

    return (
        <S_SelectionEvent isSingleTab={isSingleTab}>
            <S_EventDetails isSingleTab={isSingleTab}>
                {isLive && (
                    <S_LiveName isDisabled={isSelectionDisabled} data-testid='liveLabel'>
                        <I18n langKey='betslip.live.label' defaultText='live' />
                    </S_LiveName>
                )}
                <S_EventName data-testid='eventName' title={eventName}>
                    {eventName}
                </S_EventName>
            </S_EventDetails>
        </S_SelectionEvent>
    );
};

export default observer(StandardLegEventInfo);
