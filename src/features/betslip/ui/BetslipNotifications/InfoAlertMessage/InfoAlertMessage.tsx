import InfoAlert from 'src/ui/common/InfoAlert/InfoAlert';
import { I18n } from 'src/ui/common/Language/I18n';
import type { Testable } from 'src/utils/Testable/types';

import type { BetError, MessageParams } from '../../../api/types/error';

interface Props extends MessageParams, Testable {
    error?: BetError;
    params?: Record<string, string | number>;
}

const InfoAlertMessage = ({ type, langKey, defaultText, params, testId, error }: Props) => {
    if (error !== undefined) {
        return <InfoAlert type={type} testId={testId} error={error} />;
    }

    return (
        <InfoAlert type={type} testId={testId}>
            <I18n langKey={langKey} defaultText={defaultText} params={params} />
        </InfoAlert>
    );
};

export default InfoAlertMessage;
