import useTranslatedCurrency from 'src/appState/customHooks/useTranslatedCurrency';
import { I18n } from 'src/ui/common/Language/I18n';

import type { BetError } from '../../api/types/error';
import { minMaxErrors } from '../../i18n/errors/stake';
import { isMinMaxStakeErrorType } from '../../typeGuards/error';

import { BetSelectionInfoAlert } from './styled';

const MinMaxStakeError = ({ error }: { error?: BetError }) => {
    const translatedCurrency = useTranslatedCurrency();

    if (error === undefined || !isMinMaxStakeErrorType(error)) {
        return null;
    }

    const { key, langKey, defaultText, getParams } = minMaxErrors[error.code];
    const params = getParams?.(error, translatedCurrency);

    return (
        <BetSelectionInfoAlert key={key} data-testid='validationMessage'>
            <I18n langKey={langKey} defaultText={defaultText} params={params} />
        </BetSelectionInfoAlert>
    );
};

export default MinMaxStakeError;
