import { isStandalone } from 'src/infra.client';
import { I18n } from 'src/ui/common/Language/I18n';

import logoBW from './beteast_logo_bw.svg';
import logo from './beteast_logo_color.svg';
import { S_InitAppLoaderMessage, S_Loading, S_LoadingContainer, S_LoadingImg, S_LoadingImgColored } from './styled';

const InitAppLoader = () => {
    if (isStandalone()) {
        return null;
    }

    return (
        <S_Loading>
            <S_LoadingContainer>
                <S_LoadingImg loading='lazy' src={logoBW} />
                <S_LoadingImgColored loading='lazy' data-testid='loadingLogoImage' src={logo} />

                <S_InitAppLoaderMessage data-testid='loadingMessage'>
                    <I18n langKey='loading.message' defaultText='Loading your experience...' />
                </S_InitAppLoaderMessage>
            </S_LoadingContainer>
        </S_Loading>
    );
};

export default InitAppLoader;
