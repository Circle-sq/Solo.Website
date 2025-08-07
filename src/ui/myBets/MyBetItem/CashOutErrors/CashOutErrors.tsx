import get from 'lodash/get';

import type { CashOutError } from 'src/common/types/myBet';
import ErrorMessage from 'src/ui/common/ErrorMessage/ErrorMessage';

import { S_CashOutWrapper } from '../styled';

const CashOutErrors = ({ errors }: { errors?: CashOutError | string }) => {
    const resource = get(errors, 'problems.0.resource');
    const code = get(errors, 'problems.0.code');
    const error = `${resource}:${code}`;

    return (
        <S_CashOutWrapper>
            <div className='bet__errors'>
                <ErrorMessage showIcon error={error} iconColor='red' />
            </div>
        </S_CashOutWrapper>
    );
};

export default CashOutErrors;
