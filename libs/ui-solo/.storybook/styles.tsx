/* eslint-disable @nx/enforce-module-boundaries */
import { css, Global } from '@emotion/react';

import fontThemeIconsEot from '@solo-sb-assets/fonts/themeicons.eot';
import fontThemeIconsSvg from '@solo-sb-assets/fonts/themeicons.svg';
import fontThemeIconsTtf from '@solo-sb-assets/fonts/themeicons.ttf';
import fontThemeIconsWoff from '@solo-sb-assets/fonts/themeicons.woff';
import { fontCssForIcon, fontCssSportIcons } from '@solo-ui/solo/icons';
import { GreyPalette } from '@solo-ui/system';

export const fontCssThemeIcons = `
    @font-face {
        font-family: "themeicons";
        font-weight: normal;
        src: url(${fontThemeIconsEot}) format("eot");
        src: url("${fontThemeIconsEot}?#iefix") format("eot"),
            url(${fontThemeIconsWoff}) format("woff"),
            url(${fontThemeIconsTtf}) format("truetype"),
            url(${fontThemeIconsSvg}) format("svg");
        font-display: swap;
    }
`;

export const GlobalStyles = () => (
    <Global
        styles={css`
            ${fontCssThemeIcons}
            ${fontCssForIcon}
            ${fontCssSportIcons}
            body {
                font-family: 'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
                background-color: ${GreyPalette.grey8};
                overflow: auto;
            }
        `}
    />
);
