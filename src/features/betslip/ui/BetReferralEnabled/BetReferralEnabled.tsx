import { CoinsPileIcon } from '@sc-ui/icons/svg';

import { I18n } from 'src/ui/common/Language/I18n';

const BetReferralEnabled = () => {
    return (
        <>
            <CoinsPileIcon fontSize='small' />
            <I18n langKey='betslip.selection.betreferral-enabled.label' defaultText='Stake can be higher on request' />
        </>
    );
};

export default BetReferralEnabled;
