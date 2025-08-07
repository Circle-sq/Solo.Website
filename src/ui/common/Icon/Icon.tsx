/* eslint-disable @typescript-eslint/naming-convention */
import styled from '@emotion/styled';
import type { PropsWithChildren } from 'react';

import fontEot from 'src/assets/fonts/icons.eot';
import fontTtf from 'src/assets/fonts/icons.ttf';
import fontWoff from 'src/assets/fonts/icons.woff';
import fontSportsIconsEot from 'src/assets/fonts/sportsicons.eot';
import fontSportsIconTtf from 'src/assets/fonts/sportsicons.ttf';
import fontSportsIconWoff from 'src/assets/fonts/sportsicons.woff';
import fontThemeIconsEot from 'src/assets/fonts/themeicons.eot';
import fontThemeIconsSvg from 'src/assets/fonts/themeicons.svg';
import fontThemeIconsTtf from 'src/assets/fonts/themeicons.ttf';
import fontThemeIconsWoff from 'src/assets/fonts/themeicons.woff';
import type { Testable } from 'src/utils/Testable/types';

const config: Record<string, number> = {
    'arrow-down': 59965,
    'arrow-down-fill': 59941,
    'arrow-left': 59946,
    'arrow-right': 59948,
    'arrow-up': 59918,
    'arrow-up-fill': 60008,
    arrow_down: 59995,
    arrow_up: 59956,
    az: 59955,
    betslip: 59973,
    bog: 59931,
    business_card: 59964,
    calendar_end: 59966,
    cards: 60003,
    'cash-out': 59927,
    check: 60018,
    checkmark: 59996,
    circle: 59988,
    'circle-checkmark': 59929,
    clock: 59999,
    close: 59961,
    'close-fill': 60020,
    'close-white': 60022,
    'close-x': 60002,
    cog: 59981,
    'contact-pref': 59968,
    counter: 59932,
    delete: 59940,
    'double-arrow-right': 59909,
    down: 59922,
    edit: 59970,
    email: 59959,
    envelope: 59983,
    exit: 59926,
    external: 59960,
    facebook: 59920,
    fb: 59977,
    filter: 59985,
    follow: 59906,
    football: 59990,
    gear: 59938,
    gift: 60012,
    hamburger: 59975,
    hand: 59972,
    'heart-fill': 60026,
    'heart-outline': 59976,
    help: 59921,
    horse: 60015,
    'in-play': 59936,
    info: 59950,
    'info-fill': 59945,
    info_2: 59952,
    items: 59980,
    key: 59987,
    keyboard: 60004,
    'left-tin-arrow': 59991,
    left_align: 60017,
    left_top_align: 59962,
    letter: 60019,
    link: 60021,
    list: 59935,
    loader: 60014,
    login: 59989,
    loop: 60013,
    loupe: 59954,
    mark: 59943,
    menu: 59905,
    mobile: 59916,
    news: 59978,
    notebook: 59986,
    notification: 60029,
    noun: 60011,
    page: 59963,
    pen: 59907,
    'pen-edit': 60009,
    phone: 60023,
    'phone-receiver': 59951,
    place: 60000,
    'pounds-limit': 59919,
    primary_down_arrow: 60028,
    'racing-post': 59923,
    'right-tin-arrow': 60001,
    safe_founds: 59934,
    scoreboard: 59971,
    'scores-squat': 59969,
    search: 59998,
    shift: 60007,
    'shift-up': 59925,
    slider: 60005,
    sliders: 59992,
    speed: 59967,
    sports: 59914,
    'star-fill': 60024,
    'star-outline': 59953,
    stopwatch: 59913,
    substitution: 59949,
    'thumb-up': 60006,
    tick: 59982,
    time: 60025,
    trash: 59930,
    twit: 59993,
    twitter: 59958,
    up: 59908,
    user: 59957,
    'user-follo': 59912,
    vs: 59915,
    wallet: 59944,
    warning: 59942,
    'warning-fill': 59911,
    'warning-fill-red': 59979,
    warning_filled: 59910,
};

export const fontCssForIcon = `
    @font-face {
        font-family:"icons";
        font-weight:normal;
        src:url(${fontEot}) format("eot");
        src:url("${fontEot}?#iefix") format("eot"),
        url(${fontWoff}) format("woff"),
        url(${fontTtf}) format("truetype"),
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
        font-display: swap;
    }
`;

export const fontCssThemeIcons = `
    @font-face {
        font-family:"themeicons";
        font-weight:normal;
        src:url(${fontThemeIconsEot}) format("eot");
        src:url("${fontThemeIconsEot}?#iefix") format("eot"),
        url(${fontThemeIconsWoff}) format("woff"),
        url(${fontThemeIconsTtf}) format("truetype"),
        url(${fontThemeIconsSvg}) format("svg");
        font-display: swap;
    }
`;

const SpanWrapper = styled('span')`
    font-family: icons;
    ${(props) => (props.color ? `color: ${props.color};` : '')}

    svg {
        fill: currentColor;
        height: 1em;
        width: auto;
    }
`;

interface Props extends Testable {
    name: string;
    color?: string;
    className?: string;
}

const getIconContent = (name: string) => {
    const charValue = config[name];

    if (!charValue) {
        return null;
    }

    return String.fromCharCode(charValue);
};

const Icon = (props: PropsWithChildren<Props>) => {
    const { name, color, children, className, testId } = props;
    const content = getIconContent(name);

    if (!content) {
        return <span className='icon icon--not-found' />;
    }

    return (
        <SpanWrapper
            aria-label={`${name} icon`}
            className={`icon icon--${name} ${className}`}
            color={color}
            data-testid={testId}
        >
            {children}
            {content}
        </SpanWrapper>
    );
};

export default Icon;
