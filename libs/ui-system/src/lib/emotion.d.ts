import '@emotion/react';

import type { LegacyTheme } from './themed';

export interface EmotionTheme {
    star: LegacyTheme;
}

declare module '@emotion/react' {
    export interface Theme {
        star: LegacyTheme;
    }
}
