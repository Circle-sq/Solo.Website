interface CssProperty {
    background: string;
    border: string;
    text: string;
}

export interface SkyCityVariablesNamespace {
    accordion: {
        default: Partial<CssProperty>;
    };
}

declare module '@mui/material/styles' {
    interface Theme {
        star: typeof BeteastTheme;
    }

    interface ThemeOptions {
        sc?: SkyCityVariablesNamespace;
        star?: typeof BeteastTheme;
    }

    interface TypographyVariants {
        h1: React.CSSProperties;
        h2: React.CSSProperties;
        h3: React.CSSProperties;
        h4: React.CSSProperties;
        body1: React.CSSProperties;
        body2: React.CSSProperties;
        body3: React.CSSProperties;
        body4: React.CSSProperties;
        body5: React.CSSProperties;
    }

    interface TypographyVariantsOptions {
        h1?: React.CSSProperties;
        h2?: React.CSSProperties;
        h3?: React.CSSProperties;
        h4?: React.CSSProperties;
        body1?: React.CSSProperties;
        body2?: React.CSSProperties;
        body3?: React.CSSProperties;
        body4?: React.CSSProperties;
        body5?: React.CSSProperties;
    }

    interface Palette {
        generic: {
            white: string;
            black: string;
            transparent: string;
        };
    }

    interface PaletteOptions {
        generic?: {
            white?: string;
            black?: string;
            transparent?: string;
        };
    }

    function createTheme(options?: ThemeOptions & { cssVariables?: boolean }, ...args: object[]): Theme;
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        h1: true;
        h2: true;
        h3: true;
        h4: true;
        h5: false;
        h6: false;
        subtitle1: false;
        subtitle2: false;
        body1: true;
        body2: true;
        body3: true;
        body4: true;
        body5: true;
        button: false;
        caption: false;
        overline: false;
    }
}
