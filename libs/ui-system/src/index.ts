import './theme.d.ts';

export { SoloTheme } from './lib/solo-theme.js';
export type { EmotionTheme } from './lib/emotion';
export type { LegacyTheme } from './lib/themed';
export * from './lib/palettes';
export * from './lib/sizing';
export * from './lib/opacities';
export * from './lib/breakpoints';
export * from './lib/typography';

export * from './lib/colors/blue-dark';
export * from './lib/colors/io-blue-dark';
export * from './lib/colors/grey';
export * from './lib/colors/red';
export * from './lib/colors/io-blue-light';
export * from './lib/colors/blue-light';

export type { SoloVariablesNamespace } from './theme';

export { ThemeNames, getThemeOptions } from './lib/theme-names.js';
export { ThemeSelect } from './lib/ThemeSelect.js';
export { ThemeSwitchProvider, useThemeSwitchContext } from './lib/ThemeProvider';
export { renderWithTheme } from './lib/test-utils';

export { cssColor } from './lib/theme-v2/utilities';
export { type Variable } from './lib/theme-v2/variables';
