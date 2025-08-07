import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import { useAppStateContext } from 'src/appState/AppState';
import type { SpeedBetTranslation, MarketItem } from 'src/common/types/market';
import { DASH, LANGUAGES } from 'src/utils/constants';

export const useSpeedMarketTranslations = (market: MarketItem | undefined) => {
    const {
        language: { userLang },
    } = useAppStateContext();

    if (!market) {
        return {};
    }

    const lang = userLang?.split(DASH)[0] ?? LANGUAGES.en;
    const translations: SpeedBetTranslation = get(
        market,
        `speedBetContext.translations.${lang}`,
        {} as SpeedBetTranslation,
    );
    const shouldTranslate = !isEmpty(Object.keys(translations));

    const marketName = (shouldTranslate && translations?.title) || market?.name;
    const yesSelectionLabel = shouldTranslate && translations?.Y;
    const noSelectionLabel = shouldTranslate && translations?.N;
    const contextNote = (shouldTranslate && translations?.contextNote) || market?.speedBetContext?.contextNote;

    return { marketName, yesSelectionLabel, noSelectionLabel, contextNote };
};
