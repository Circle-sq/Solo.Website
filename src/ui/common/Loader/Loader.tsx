import type { ReactElement } from 'react';

import { isStandalone } from 'src/infra.client';
import type { Testable } from 'src/utils/Testable/types';

import { S_LoadingPlaceholder, S_LoadingPlaceholderLocal, S_LoaderMessage, S_LoaderContainer } from './styled';

interface Props extends Testable {
    bwinLoading?: boolean;
    message?: ReactElement;
}

const Loader = ({ message, bwinLoading, testId }: Props) => {
    if (bwinLoading) {
        return <S_LoadingPlaceholder className={isStandalone() ? 'loading__standalone' : ''} />;
    }

    return (
        <S_LoaderContainer className={isStandalone() ? 'loading__standalone' : ''}>
            <S_LoadingPlaceholderLocal />
            {message ? <S_LoaderMessage data-testid={testId}>{message}</S_LoaderMessage> : null}
        </S_LoaderContainer>
    );
};

export default Loader;
