import filter from 'lodash/filter';
import keys from 'lodash/keys';
import some from 'lodash/some';

import type { SportsbookProviderErrorCode } from 'src/common/enums/error';
import { PriceErrorCode } from 'src/common/enums/error';

import type { BetError } from '../../api/types/error';
import { sportsbookErrors } from '../../i18n/errors/provider';
import type { BetslipWarning } from '../types';

export const filterAlgoSportErrors = (errors: BetError[]) =>
    filter(errors, { code: PriceErrorCode.ExternalPriceMissing });

export const filterZeroWinExpectationErrors = (errors: BetError[]) =>
    filter(errors, { code: PriceErrorCode.ZeroWinExpectation });

export const filterSportsbookErrorCodes = (errors: BetError[]): SportsbookProviderErrorCode[] =>
    filter(keys(sportsbookErrors) as SportsbookProviderErrorCode[], (code) => some(errors, { code }));

export const getSportsbookErrors = (errorCodes: SportsbookProviderErrorCode[]): BetslipWarning[] => {
    return errorCodes.map((code) => {
        const { key, type, langKey, defaultText } = sportsbookErrors[code];

        return { key, type, langKey, defaultText };
    });
};
