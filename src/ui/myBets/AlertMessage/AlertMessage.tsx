import InfoAlert from 'src/ui/common/InfoAlert/InfoAlert';
import { I18n } from 'src/ui/common/Language/I18n';

interface Props {
    isError: boolean;
    isLiveBetsEmpty: boolean;
    isSettledBetsEmpty: boolean;
    hasBets: boolean;
}

const AlertMessage = ({ isError, isLiveBetsEmpty, isSettledBetsEmpty, hasBets }: Props) => {
    if (isError) {
        return (
            <InfoAlert type='error'>
                <I18n
                    langKey='bets.loading.error'
                    defaultText="Sorry, because of temporary issues we can't load bets. Try again."
                />
            </InfoAlert>
        );
    }

    if (isSettledBetsEmpty) {
        return (
            <InfoAlert type='info'>
                <I18n langKey='betslip.tabs.settled.msg' defaultText='Settled bets will be displayed here!' />
            </InfoAlert>
        );
    }

    if (isLiveBetsEmpty) {
        return (
            <InfoAlert type='info'>
                <I18n langKey='betslip.tabs.live.tab.msg' defaultText='Place a live-bet and it will appear here!' />
            </InfoAlert>
        );
    }

    if (!hasBets) {
        return (
            <InfoAlert type='info'>
                <I18n langKey='betslip.tabs.open.tab.msg' defaultText='Place a bet and it will appear here!' />
            </InfoAlert>
        );
    }

    return null;
};

export default AlertMessage;
