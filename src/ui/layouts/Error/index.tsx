import get from 'lodash/get';
import type { ReactElement } from 'react';

import { useAppStateContext } from 'src/appState/AppState';
import { S_MainPageWrapper, S_PageContent } from 'src/layouts/MainWrapper/styled';
import { I18n } from 'src/ui/common/Language/I18n';
import NavigationSidebar from 'src/ui/containers/NavigationSidebar/NavigationSidebar';

const MESSAGES: Record<number, ReactElement> = {
    404: <I18n langKey='layouts.errors.not-found' defaultText='Page not found' />,
    403: <I18n langKey='layouts.errors.forbidden' defaultText='Forbidden' />,
    500: <I18n langKey='layouts.errors.internal' defaultText='Internal server error' />,
    503: <I18n langKey='layouts.errors.unavailable' defaultText='Service unavailable' />,
};

const ErrorLayout = () => {
    const { router } = useAppStateContext();
    const { code } = router.route.params;

    return (
        <S_PageContent>
            <NavigationSidebar />

            <S_MainPageWrapper>
                <h1>{code}</h1>
                <p>{get(MESSAGES, code, <I18n langKey='layouts.errors.unknown' defaultText='Unknown error' />)}</p>
            </S_MainPageWrapper>
        </S_PageContent>
    );
};

export default ErrorLayout;
