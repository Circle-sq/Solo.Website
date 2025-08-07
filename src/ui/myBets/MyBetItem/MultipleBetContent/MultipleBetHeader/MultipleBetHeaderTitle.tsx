import { isMultipleBetType } from '@sc-betslip/helpers/combinations';

import { I18n } from 'src/ui/common/Language/I18n';

const MultipleBetHeaderTitle = ({ betType }: { betType: string }) => {
    if (isMultipleBetType(betType)) {
        return <I18n langKey='bets.selection.multibet.label' defaultText='Multi Bet' />;
    }

    return <I18n langKey={betType} defaultText={betType} />;
};

export default MultipleBetHeaderTitle;
