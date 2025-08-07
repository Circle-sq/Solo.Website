import { translateTokens, type LanguageTokenType } from 'src/appState/LanguagesState/LanguagesUtils';
import { isProduction } from 'src/infra.client';
import { I18n } from 'src/ui/common/Language/I18n';
import { relogin } from 'src/utils/portal-commands';
import { isStandAlone } from 'src/utils/stand-alone-detector';

import { S_MediaStream, S_PlayerPseudoLink, S_PlayerLink } from '../styled';

interface Props {
    message: string;
}

const LoginMessage = ({ message }: Props) => {
    const getLoginLink = ({ tag }: LanguageTokenType) => {
        if (tag !== 'loginLink') {
            return;
        }

        if (!isStandAlone()) {
            return (
                <S_PlayerPseudoLink key={`link-${tag}`} onClick={relogin}>
                    <I18n langKey='media.stream.video.account.login' defaultText='log in' />
                </S_PlayerPseudoLink>
            );
        }

        if (isProduction()) {
            return (
                <span>
                    &nbsp;
                    <I18n langKey='media.stream.video.account.login' defaultText='log in' />
                </span>
            );
        }

        return (
            <S_PlayerLink key={`link-${tag}`} params={{ account: 'login', static: null }}>
                <I18n langKey='media.stream.video.account.login' defaultText='log in' />
            </S_PlayerLink>
        );
    };

    return <S_MediaStream isAuthenticated={false}>{translateTokens(message, getLoginLink)}</S_MediaStream>;
};

export default LoginMessage;
