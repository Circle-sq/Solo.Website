import { Map } from 'immutable';
import includes from 'lodash/includes';
import keys from 'lodash/keys';
import toUpper from 'lodash/toUpper';
import values from 'lodash/values';

import type { ReduxState } from 'src/appState/redux/ReduxState';
import type { SportModel } from 'src/appState/redux/types';
import type { SportCount } from 'src/appState/sportsList/types';
import { OddsFormat, OddsFormatLong } from 'src/common/enums';
import type { Price } from 'src/common/types/selectionPrice';
import { countriesById } from 'src/config/countries';
import { DASH, MODAL_ROUTE_NAME, shortLocale, SPORT_TYPE } from 'src/utils/constants';

export const getDocumentLang = (): string => {
    return document.documentElement.lang;
};

export const activeSportsToMap = (reduxState: ReduxState): Map<string, SportModel> => {
    const activeSports: SportCount[] = reduxState.getEventsCounter(MODAL_ROUTE_NAME.liveGroupedSports);

    return activeSports.reduce((acc: Map<string, SportModel>, x: SportCount) => {
        const sportName = reduxState.getSportName(x.id);

        return acc.set(x.id, {
            id: x.id,
            count: x.count,
            name: sportName !== null ? sportName : undefined,
            displayOrder: undefined,
        });
    }, Map());
};

export const isValidCountry = (countryId: string): boolean => {
    if (countryId === toUpper(SPORT_TYPE.esoccer)) {
        return true;
    }

    if (countryId === DASH) {
        return false;
    }

    const countryIds = keys(countriesById);
    const countryNames = values(countriesById);

    return includes(countryIds, countryId) || includes(countryNames, countryId);
};

export const getLongOddsFormat = (format: OddsFormat) => {
    if (format === OddsFormat.Decimal) {
        return OddsFormatLong.Decimal;
    }

    return OddsFormatLong.Fractional;
};

export const getShortOddsFormat = (format: OddsFormatLong) => {
    if (format === OddsFormatLong.Decimal) {
        return OddsFormat.Decimal;
    }

    return OddsFormat.Fractional;
};

export const getOddsFormatPrice = (price: Price | null, format: OddsFormat | OddsFormatLong) => {
    if (price === null) {
        return '';
    }

    if (format === OddsFormat.Decimal || format === OddsFormatLong.Decimal) {
        return price.d;
    }

    return price.f;
};

export const getShortLocale = (locale: string | null) => (locale !== null ? shortLocale[locale] : shortLocale.default);

export const exitPictureInPicture = async (): Promise<void> => {
    try {
        if (document.pictureInPictureElement !== null) {
            await document.exitPictureInPicture();
        }
    } catch (error) {
        console.error('Failed to exit Picture-in-Picture mode:', error);
    }
};
