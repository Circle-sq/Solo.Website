import '@emotion/react';

import type { SoloVariablesNamespace } from '@solo-ui/system';

import type { EmotionTheme } from 'src/appState/EnvironmentState';

declare module '@emotion/react' {
    export interface Theme extends EmotionTheme {
        vars: {
            sc: SoloVariablesNamespace;
        };
    }
}
