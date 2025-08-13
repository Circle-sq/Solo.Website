import { breakpoints, dynamicSelections } from './breakpoints';
import type { LegacyTheme } from './themed';

export const SoloTheme: LegacyTheme = Object.freeze({
    dynamicSelections,
    breakpoints,
} as const);
