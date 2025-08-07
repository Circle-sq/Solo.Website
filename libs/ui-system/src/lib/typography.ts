import { Opacities } from './opacities';
// eslint-disable-next-line
import {
    DarkBluePalette,
    GenericColors,
    GreenPalette,
    GreyPalette,
    LightBluePalette,
    RedPalette,
    YellowPalette,
} from './palettes';

export const typographyVariant = {
    h1: { fontSize: '16px', lineHeight: '24px' },
    h2: { fontSize: '14px', lineHeight: '20px' },
    h3: { fontSize: '12px', lineHeight: '16px' },
    h4: { fontSize: '10px', lineHeight: '12px' },
    body1: { fontSize: '16px', lineHeight: '24px' },
    body2: { fontSize: '14px', lineHeight: '20px' },
    body3: { fontSize: '12px', lineHeight: '16px' },
    body4: { fontSize: '10px', lineHeight: '12px' },
    body5: { fontSize: '8px', lineHeight: '12px' },
} as const;

export const fontWeight = {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
} as const;

export const typographyColor = {
    /** #FFFFFF */
    white: GenericColors.white,
    /** #000000 */
    black: GenericColors.black,
    /** #8BD97F */
    success: GreenPalette.green1,
    /** #FF4333 */
    error: RedPalette.red4,
    /** #008AE6 */
    info: LightBluePalette.lightBlue9,
    /** #FEBE3F */
    warning: YellowPalette.yellow4,
    /** #D6D6D6 */
    textPrimary: GreyPalette.grey7,
    /** #D6D6D6D9 */
    textDimmed: GreyPalette.grey7 + Opacities.opacity85,
    /** #8A8A8A */
    textSecondary: GreyPalette.grey5,
    /** #73768E */
    textDisabled: DarkBluePalette.darkBlue6,
} as const;
