import { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

import { DEFAULT_EXTERNAL_LINK_WINDOW_HEIGHT, DEFAULT_EXTERNAL_LINK_WINDOW_WIDTH } from 'src/utils/constants';

import BettingRulesPage from '../ui/BettingRulesPage';

export const useBettingRules = () => {
    const [bettingRules, setBettingRules] = useState<Window | null>(null);

    const openBettingRules = useCallback(
        (width = DEFAULT_EXTERNAL_LINK_WINDOW_WIDTH, height = DEFAULT_EXTERNAL_LINK_WINDOW_HEIGHT) => {
            if (bettingRules && !bettingRules.closed) {
                bettingRules.focus();
            } else {
                const newBettingRules = window.open('', 'betting-rules', `width=${width}, height=${height}`);

                if (newBettingRules) {
                    setBettingRules(newBettingRules);

                    const root = newBettingRules.document.createElement('div');
                    root.setAttribute('id', 'root');
                    newBettingRules.document.body.appendChild(root);

                    const cache = createCache({ key: 'emotion', container: newBettingRules.document.head });
                    ReactDOM.createRoot(root).render(
                        <CacheProvider value={cache}>
                            <BettingRulesPage />
                        </CacheProvider>,
                    );
                }
            }
        },
        [bettingRules],
    );

    useEffect(() => {
        return () => {
            bettingRules?.close();
        };
    }, [bettingRules]);

    return { bettingRules, openBettingRules };
};
