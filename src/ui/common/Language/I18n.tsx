import { observer } from 'mobx-react-lite';

import { useAppStateContext } from 'src/appState/AppState';

interface Props {
    langKey: string;
    defaultText: string;
    params?: Record<string, string | number>;
}

export const I18n = observer(({ langKey, defaultText, params }: Props) => {
    const {
        language: { getTranslation },
    } = useAppStateContext();

    return getTranslation(langKey, defaultText, params) || '';
});
