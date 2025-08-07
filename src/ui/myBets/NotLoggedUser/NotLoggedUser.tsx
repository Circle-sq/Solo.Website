import { IconPositionTypes } from 'src/common/enums';
import InfoAlert from 'src/ui/common/InfoAlert/InfoAlert';
import { I18n } from 'src/ui/common/Language/I18n';

const NotLoggedUser = () => {
    return (
        <InfoAlert
            type='info'
            iconPosition={IconPositionTypes.TOP}
            header={<I18n langKey='betslip.login.title' defaultText='Please log in' />}
        >
            <I18n
                langKey='betslip.login.instruction'
                defaultText='To view your bets, you need to log in to your account.'
            />
        </InfoAlert>
    );
};

export default NotLoggedUser;
