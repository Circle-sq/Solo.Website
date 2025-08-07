import type { ErrorMessageProps } from 'src/ui/common/ErrorMessage/types';
import { getError } from 'src/ui/common/InfoAlert/errors';

import { S_InfoHeader, S_InfoIcon, S_InfoMessage, S_Message, S_SingleErrorMessage } from './styled';

const ErrorMessage = (props: ErrorMessageProps) => {
    const { showIcon = false, header, iconColor, error, children, single, testId } = props;

    return single === true ? (
        <S_SingleErrorMessage>{getError(error)}</S_SingleErrorMessage>
    ) : (
        <S_Message>
            {showIcon ? <S_InfoIcon className='theme-error-i' color={iconColor} /> : null}
            <S_InfoMessage data-testid={testId}>
                {header && <S_InfoHeader>{header}</S_InfoHeader>}
                {getError(error)}
                {children}
            </S_InfoMessage>
        </S_Message>
    );
};

export default ErrorMessage;
