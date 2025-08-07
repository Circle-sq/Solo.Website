import filter from 'lodash/filter';
import get from 'lodash/get';
import includes from 'lodash/includes';
import indexOf from 'lodash/indexOf';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import orderBy from 'lodash/orderBy';
import size from 'lodash/size';
import take from 'lodash/take';

import { BetslipErrorCode, ErrorResource } from 'src/common/enums/error';
import { AlertIcon } from 'src/ui/common/InfoAlert/types';

import type { BetError } from '../../api/types/error';
import { skipErrors, skipErrorsSingles, skipPlaceBetErrors } from '../configs';
import type { BetslipWarning } from '../types';

const orderRules = [BetslipErrorCode.Related, BetslipErrorCode.PanicModeEnabled];
const allowedNotifications = 2;

export const getNotificationMessages = (problems: BetError[], isSingleTab: boolean): BetslipWarning[] => {
    if (isEmpty(problems)) {
        return [];
    }

    const alreadyFoundError: string[] = [];
    const betslipErrors = filter(problems, ({ code = '' }) => !includes(skipPlaceBetErrors, code));

    const collectedErrors = filter(betslipErrors, (error: BetError | string) => {
        const code = isString(error) ? error : get(error, 'code', '');
        const resource = isString(error) ? error : get(error, 'resource', '');

        if (
            (resource !== ErrorResource.Account && includes(skipErrors, code)) ||
            includes(alreadyFoundError, code) ||
            (isSingleTab && includes(skipErrorsSingles, code))
        ) {
            return false;
        }

        alreadyFoundError.push(code);

        return true;
    });

    return collectedErrors.map((error, index) => {
        const key = get(error, 'pointer') ?? String(index);
        const type = error.code === BetslipErrorCode.SinglesOnly ? AlertIcon.Warning : AlertIcon.Error;

        return { key, type, error, defaultText: '', langKey: '' };
    });
};

export const getOrderedErrors = (warnings: BetslipWarning[]) => {
    const orderedErrors = orderBy(warnings, ({ key }) => {
        const index = indexOf(orderRules, key);

        return index === -1 ? size(orderRules) + 1 : index;
    });

    return take(orderedErrors, allowedNotifications);
};
