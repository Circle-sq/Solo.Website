import filter from 'lodash/filter';
import includes from 'lodash/includes';
import keys from 'lodash/keys';
import some from 'lodash/some';

import type { SportsbookProviderErrorCode } from 'src/common/enums/error';
import { BetslipErrorCode, PriceErrorCode } from 'src/common/enums/error';

import type { BetError } from '../../api/types/error';
import type { Legs } from '../../api/types/leg';
import type { Problem } from '../../api/types/problem';
import { splitIds } from '../../helpers/multiBet';
import { sportsbookErrors } from '../../i18n/errors/provider';
import { isCrossBetType } from '../../typeGuards/bet';
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

export const hasStartedError = (problems: Problem[]): boolean => some(problems, { code: BetslipErrorCode.Started });

export const hasStartedCrossBetError = (problems: Problem[], bets: Legs): boolean => {
    if (!hasStartedError(problems)) {
        return false;
    }

    return some(bets, (bet) => {
        if (isCrossBetType(bet)) {
            const crossBetSelectionIds = splitIds(bet.id);

            return some(
                problems,
                ({ code, selectionIds = [] }) =>
                    code === BetslipErrorCode.Started &&
                    some(selectionIds, (selectionId) => includes(crossBetSelectionIds, selectionId)),
            );
        }

        return false;
    });
};
