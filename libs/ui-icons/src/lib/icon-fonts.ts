import fontEot from '../assets/fonts/icons.eot';
import fontWoff from '../assets/fonts/icons.woff';
import fontTtf from '../assets/fonts/icons.ttf';

import fontSportsIconsEot from '../assets/fonts/sportsicons.eot';
import fontSportsIconWoff from '../assets/fonts/sportsicons.woff';
import fontSportsIconTtf from '../assets/fonts/sportsicons.ttf';

export const fontCssForIcon = `
    @font-face {
        font-family:"icons";
        font-weight:normal;
        src:url(${fontEot}) format("eot");
        src:url("${fontEot}?#iefix") format("eot"),
        url(${fontWoff}) format("woff"),
        url(${fontTtf}) format("truetype"),
        url("/static/undefined#icons") format("svg");
        font-display: block;
    }
`;

export const fontCssSportIcons = `
    @font-face {
        font-family:"sportsicons";
        font-weight:normal;
        src:url(${fontSportsIconsEot}) format("eot");
        src:url("${fontSportsIconsEot}?#iefix") format("eot"),
        url(${fontSportsIconWoff}) format("woff"),
        url(${fontSportsIconTtf}) format("truetype"),
        url("/static/undefined#icons") format("svg");
        font-display: swap;
    }
`;
