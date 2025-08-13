import map from 'lodash/map';
import { computed, makeObservable } from 'mobx';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import swiperStyle from 'src/assets/style/swiper.min.css?url';
import { fontCssForIcon, fontCssSportIcons, fontCssThemeIcons } from 'src/ui/common/Icon/Icon';

import mainStyle from '../../../src_sassbuild/buildcss/main.css?url';

import getUniverseFont from './font-meta';
import faviconBet_East from './images/bet_east_favicon.webp';

interface HeaderItemMetaType {
    id: string;
    tag: 'meta';
    attr: {
        name: string;
        content: string;
    };
    text: undefined;
}

interface HeaderItemTitleType {
    id: string;
    tag: 'title';
    attr: Record<string, never>;
    text: string;
}

interface HeaderItemCssType {
    id: string;
    tag: 'style';
    attr: {
        type: 'text/css';
    };
    text: string;
}

interface HeaderItemLinkType {
    id: string;
    tag: 'link';
    attr: {
        rel: string;
        type: string;
        href: string;
    };
    text: undefined;
}

interface HeaderItemLinkSimpleType {
    id: string;
    tag: 'link';
    attr: {
        rel: string;
        href: string;
    };
    text: undefined;
}

export type HeaderItemType =
    | HeaderItemTitleType
    | HeaderItemMetaType
    | HeaderItemCssType
    | HeaderItemLinkType
    | HeaderItemLinkSimpleType;

const getFaviconUrl = (): string => faviconBet_East;

const getTitlePage = (): string => 'SOLO';

interface JsxMetaTag {
    key: string;
    'data-header-meta-id': string;
    dangerouslySetInnerHTML?: { __html: string };
}

export class HeaderMeta {
    constructor() {
        makeObservable<
            HeaderMeta,
            | 'title'
            | 'metaScale'
            | 'favicon'
            | 'siteVerification'
            | 'styleMain'
            | 'styleIcon'
            | 'styleSportsIcon'
            | 'styleThemeIcons'
            | 'styleMainFont'
            | 'styleSwiper'
            | 'manifestLink'
            | 'iosIconLink'
        >(this, {
            title: computed.struct,
            metaScale: computed.struct,
            favicon: computed.struct,
            siteVerification: computed.struct,
            styleMain: computed.struct,
            styleIcon: computed.struct,
            styleSportsIcon: computed.struct,
            styleThemeIcons: computed.struct,
            styleMainFont: computed.struct,
            styleSwiper: computed.struct,
            manifestLink: computed.struct,
            iosIconLink: computed.struct,
            metaList: computed.struct,
            metaToStatic: computed,
        });
    }

    private get title(): HeaderItemTitleType {
        return {
            id: 'title',
            tag: 'title',
            text: getTitlePage(),
            attr: {},
        };
    }

    private get metaScale(): HeaderItemMetaType {
        return {
            id: 'metaScale',
            tag: 'meta',
            attr: {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1, user-scalable=no',
            },
            text: undefined,
        };
    }

    private get favicon(): HeaderItemType {
        const faviconSrc = getFaviconUrl();

        return {
            id: 'favicon',
            tag: 'link',
            attr: {
                rel: 'shortcut icon',
                href: faviconSrc,
                type: 'image/png',
            },
            text: undefined,
        };
    }

    private get siteVerification(): HeaderItemMetaType | null {
        const data = {
            name: 'google-site-verification',
            content: '3X8yw6e4RqI-2jQhwZitO8mwv6yXA9J-eGazArVYe-8',
        };

        if (data !== null) {
            return {
                id: 'siteVerification',
                tag: 'meta',
                attr: {
                    name: data.name,
                    content: data.content,
                },
                text: undefined,
            };
        }

        return null;
    }

    private get styleMain(): HeaderItemType {
        return {
            id: 'styleMain',
            tag: 'link',
            attr: {
                rel: 'stylesheet',
                type: 'text/css',
                href: mainStyle,
            },
            text: undefined,
        };
    }

    private get styleIcon(): HeaderItemType {
        return {
            id: 'styleIcon',
            tag: 'style',
            attr: {
                type: 'text/css',
            },
            text: fontCssForIcon,
        };
    }

    private get styleSportsIcon(): HeaderItemType {
        return {
            id: 'styleSportsIcon',
            tag: 'style',
            attr: {
                type: 'text/css',
            },
            text: fontCssSportIcons,
        };
    }

    private get styleThemeIcons(): HeaderItemType {
        return {
            id: 'styleThemeIcons',
            tag: 'style',
            attr: {
                type: 'text/css',
            },
            text: fontCssThemeIcons,
        };
    }

    private get styleMainFont(): HeaderItemType {
        return {
            id: 'styleFont',
            tag: 'style',
            attr: {
                type: 'text/css',
            },
            text: getUniverseFont(),
        };
    }

    private get styleSwiper(): HeaderItemType {
        return {
            id: 'styleSwiper',
            tag: 'link',
            attr: {
                rel: 'stylesheet',
                type: 'text/css',
                href: swiperStyle,
            },
            text: undefined,
        };
    }

    private get manifestLink(): HeaderItemType | null {
        return null;
    }

    private get iosIconLink(): HeaderItemType | null {
        return null;
    }

    get metaList(): HeaderItemType[] {
        const out: HeaderItemType[] = [];

        out.push(this.title);

        out.push(this.metaScale);

        out.push(this.favicon);

        const siteVerification = this.siteVerification;

        if (siteVerification !== null) {
            out.push(siteVerification);
        }

        out.push(this.styleMain);

        out.push(this.styleIcon);

        out.push(this.styleSwiper);

        out.push(this.styleSportsIcon);

        out.push(this.styleThemeIcons);

        out.push(this.styleMainFont);

        const manifestLink = this.manifestLink;

        if (manifestLink !== null) {
            out.push(manifestLink);
        }

        const iosIconLink = this.iosIconLink;

        if (iosIconLink !== null) {
            out.push(iosIconLink);
        }

        return out;
    }

    get metaToStaticJsx() {
        return (
            <>
                {map(this.metaList, (item) => {
                    const metaTag: JsxMetaTag & Record<string, string> = {
                        key: item.id,
                        'data-header-meta-id': item.id,
                        ...item.attr,
                    };

                    if (item.tag === 'style') {
                        metaTag.dangerouslySetInnerHTML = { __html: item.text };
                    }

                    return React.createElement(item.tag, metaTag);
                })}
            </>
        );
    }

    get metaToStatic(): string {
        return renderToStaticMarkup(this.metaToStaticJsx);
    }
}
