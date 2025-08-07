import { breakpoints, dynamicSelections } from './breakpoints';
import type { LegacyTheme } from './themed';

export const BeteastTheme: LegacyTheme = Object.freeze({
    dynamicSelections,
    breakpoints,
} as const);
