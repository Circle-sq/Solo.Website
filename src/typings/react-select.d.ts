import type {} from 'react-select/base';

import type { ThemeNames } from 'src/common/enums';

export type ThemeName = (typeof ThemeNames)[keyof typeof ThemeNames];

declare module 'react-select/base' {
    interface Props {
        themeName: ThemeName;
        customTheme: ThemeNames;
        showAllItems: boolean;
        isMarket?: boolean;
    }
}
