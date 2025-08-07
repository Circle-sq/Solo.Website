import type { BetError } from '@sc-betslip/api/types/error';

import useTranslatedCurrency from 'src/appState/customHooks/useTranslatedCurrency';
import { I18n } from 'src/ui/common/Language/I18n';

import type { MinMaxErrorCode } from '../../../../enums';
import { minMaxErrors } from '../../SpeedBetBetslipWrapper/SpeedBetAlert/alertMessages';

import { S_ValidationError } from './styled';

interface Props {
    error: BetError;
}

const ValidationError = ({ error }: Props) => {
    const translatedCurrency = useTranslatedCurrency();

    const {
        message: { langKey, defaultText },
        getParams,
    } = minMaxErrors[error?.code as MinMaxErrorCode];

    const params = getParams?.(error, translatedCurrency);

    return (
        <S_ValidationError data-testid='speedBetslipValidationError'>
            <I18n langKey={langKey} defaultText={defaultText} params={params} />
        </S_ValidationError>
    );
};

export default ValidationError;
