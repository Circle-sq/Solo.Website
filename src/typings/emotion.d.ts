import '@emotion/react';

import type { SkyCityVariablesNamespace } from '@sc-ui/system';

import type { EmotionTheme } from 'src/appState/EnvironmentState';

declare module '@emotion/react' {
    export interface Theme extends EmotionTheme {
        vars: {
            sc: SkyCityVariablesNamespace;
        };
    }
}
