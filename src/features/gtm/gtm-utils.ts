import type { BetslipSelections, BetslipSelection } from '@sc-betslip/store/types';
import type { GtmSelection, PlacedBet } from '@sc-betslip/api/types/placedBet';
import { currencySelector } from '@sc-account/store/selectors';
import { store as jotaiStore } from 'libs/utils/jotai/src/store';

const PathTypes = {
    HOME: '/',
    SPORT: '/sport/',
    EVENT: '/event/',
    InPlay: '/inplay/',
    COMPETITION: '/competition/',
    COUNTRY: '/country/',
    CROSSBETTING: '/crossbetting',
    ASIANVIEW: '/asianview',
};
const PageTypes = {
    HOME: 'Home',
    SPORT: 'Sport',
    EVENT: 'Event',
    InPlay: 'Live Sports',
    COMPETITION: 'Competition',
    COUNTRY: 'Country',
    CROSSBETTING: 'Crossbetting',
    ASIANVIEW: 'Asian View',
    UNKNOWN: 'Unknown',
};

const getPageType = (pathname: string) => {
    switch (true) {
        case pathname === PathTypes.HOME:
            return PageTypes.HOME;

        case pathname.startsWith(PathTypes.SPORT):
            return PageTypes.SPORT;

        case pathname.startsWith(PathTypes.EVENT):
            return PageTypes.EVENT;

        case pathname.startsWith(PathTypes.InPlay):
            return PageTypes.InPlay;

        case pathname.startsWith(PathTypes.COMPETITION):
            return PageTypes.COMPETITION;

        case pathname.startsWith(PathTypes.COUNTRY):
            return PageTypes.COUNTRY;

        case pathname.startsWith(PathTypes.CROSSBETTING):
            return PageTypes.CROSSBETTING;

        case pathname.startsWith(PathTypes.ASIANVIEW):
            return PageTypes.ASIANVIEW;

        default:
            return PageTypes.UNKNOWN;
    }
};

interface SelectionEventInfo {
    event?: {
        name: string;
    };
}

export const generateGtmSelection = (
    isLive: boolean,
    currentTarget?: EventTarget & Element,
    isExternalCard?: boolean,
): GtmSelection => {
    const pathname = window.location.pathname;
    const pageType = getPageType(pathname);
    const gtmSelection: GtmSelection = {
        pageType: pageType,
        urlPath: pathname + window.location.search,
        isLive: isLive,
    };

    if (isExternalCard) {
        gtmSelection.isHighlight = true;
    } else if (currentTarget != null) {
        const isHighlightParsed = currentTarget.closest('div[data-gtm="event-highlight"]');

        if (isHighlightParsed !== null && isHighlightParsed !== undefined) {
            gtmSelection.isHighlight = true;
        }
    }

    return gtmSelection;
};

export const sendPurchaseToGtm = (bets: PlacedBet[], checkedSelections: BetslipSelections) => {
    if (window.dataLayer.push === undefined) {
        return;
    }

    try {
        const utcNow = new Date().toISOString();
        const currency = jotaiStore.get(currencySelector);
        bets.forEach((bet) => {
            const legsMap = bet.legs.reduce(
                (acc, leg) => {
                    if ('selection' in leg && leg.selection) {
                        acc[leg.selection.id.toString()] = { event: leg.event };
                    } else if (
                        (leg.type === 'crossBet' || leg.type === 'buildABet') &&
                        leg.marketsAndSelections?.length
                    ) {
                        leg.marketsAndSelections.forEach((marketAndSelection) => {
                            if (marketAndSelection.selection?.id) {
                                acc[marketAndSelection.selection.id.toString()] = { event: leg.event };
                            }
                        });
                    }
                    return acc;
                },
                {} as Record<string, SelectionEventInfo>,
            );
            const relevantSelections = Object.fromEntries(
                Object.entries(checkedSelections).filter(([key]) => key in legsMap),
            );

            if (Object.keys(relevantSelections).length === 0) {
                throw new Error('No relevant selections found');
            }
            const collection = Object.values(relevantSelections)
                .filter((selection: BetslipSelection) => selection.gtmSelection !== undefined)
                .map((selection: BetslipSelection) => {
                    const leg = legsMap[selection.selectionId];

                    return {
                        item_id: selection.selectionId,
                        item_name: leg?.event?.name || '',
                        item_created_at: utcNow,
                        item_page: selection.gtmSelection?.pageType || '',
                        item_is_live: selection.gtmSelection?.isLive || false,
                        item_is_highlight: selection.gtmSelection?.isHighlight || false,
                        item_url_path: selection.gtmSelection?.urlPath || '',
                        item_category: selection.gtmSelection?.pageType || '',
                        item_category2: selection.gtmSelection?.isLive || false,
                        item_category3: selection.gtmSelection?.isHighlight || false,
                        item_category4: selection.gtmSelection?.urlPath || '',
                        item_category5: utcNow,
                        price: 1,
                        quantity: 1,
                    };
                });

            window.dataLayer.push({ ecommerce: null });
            const trackPurchase = {
                event: 'purchase',
                ecommerce: {
                    transaction_id: bet.id,
                    value: collection.length,
                    currency: currency,
                    coupon: currency,
                    items: collection,
                },
                noAutoTrack: true,
            };

            window.dataLayer.push(trackPurchase);
        });
    } catch (error) {
        console.error('[GTM_ERROR] Failed to send purchase data', {
            error,
            service: 'gtm',
            action: 'sendPurchaseToGtm',
        });
    }
};
