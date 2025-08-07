import { observer } from 'mobx-react-lite';

import { useAppStateContext } from 'src/appState/AppState';
import { FeaturesFlag } from 'src/config/features_flags';

import { S_DebugPanel } from './styled';

const DebugPanel = () => {
    const debugPanel = FeaturesFlag.debugPanel;

    const {
        language: { translationsDisplayDebug, translationsDisplayDebugShow, translationsDisplayDebugHide },
    } = useAppStateContext();

    const toggleTranslations = () => {
        if (translationsDisplayDebug) {
            translationsDisplayDebugShow();
        } else {
            translationsDisplayDebugHide();
        }
    };

    if (!debugPanel) {
        return null;
    }

    const label = `Translations ${translationsDisplayDebug ? 'hide' : 'show'}`;

    return (
        <S_DebugPanel>
            <div onClick={toggleTranslations}>{label}</div>
        </S_DebugPanel>
    );
};

export default observer(DebugPanel);
