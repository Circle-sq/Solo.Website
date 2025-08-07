import FastTimeIcon from 'src/ui/common/Icons/FastTimeIcon';
import { I18n } from 'src/ui/common/Language/I18n';

import SwitchButton from '../SwitchButton/SwitchButton';

import {
    S_AcceptOddsNotification,
    S_FastTimeIcon,
    S_NotificationHeader,
    S_NotificationText,
    S_NotificationTextContent,
} from './styled';

const AcceptOddsNotification = ({ langKey, defaultText }: { langKey: string; defaultText: string }) => {
    return (
        <S_AcceptOddsNotification>
            <S_FastTimeIcon>
                <FastTimeIcon />
            </S_FastTimeIcon>

            <S_NotificationTextContent>
                <S_NotificationHeader>
                    <I18n langKey='betslip.faster-betting-head-message' defaultText='Want faster betting?' />
                </S_NotificationHeader>
                <S_NotificationText>
                    <I18n langKey={langKey} defaultText={defaultText} />
                </S_NotificationText>
            </S_NotificationTextContent>

            <div>
                <SwitchButton />
            </div>
        </S_AcceptOddsNotification>
    );
};

export default AcceptOddsNotification;
