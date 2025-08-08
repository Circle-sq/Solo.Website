import isString from 'lodash/isString';
import type { ReactElement } from 'react';
import { isValidElement } from 'react';

import type { BetError } from '@solo-betslip/api/types/error';
import { isBetErrorType } from '@solo-betslip/typeGuards/error';

import { BetslipErrorCode, PriceErrorCode } from 'src/common/enums/error';
import type { BettingErrorsItem } from 'src/common/types/error';

const MESSAGES: Record<string, (getTranslation: (key: string, defaultText: string) => string) => string> = {
    'session:token:invalid_user': (getTranslation) =>
        getTranslation('session:token:invalid_user', 'Provided token is invalid.'),
    'session:token:expired': (getTranslation) => getTranslation('session:token:expired', 'Provided token has expired.'),
    'session:token:user_not_found': (getTranslation) =>
        getTranslation('session:token:user_not_found', 'Token not found in our system.'),
    'session:token:general_system_error': (getTranslation) =>
        getTranslation('session:token:general_system_error', 'Unknown token error'),

    'Event:suspended': (getTranslation) => getTranslation('errors.event-suspended', 'This event is suspended.'),
    'Market:suspended': (getTranslation) => getTranslation('errors.market-suspended', 'This market is suspended.'),
    'Market:crossbetAllowed:crossbet-not-allowed': (getTranslation) =>
        getTranslation(
            'Market:crossbetAllowed:crossbet-not-allowed',
            'Cross bets are not allowed for selected selections.',
        ),
    'Wallet:playableBalance:minimum': (getTranslation) =>
        getTranslation('betslip.balance-warning.description', 'Insufficient funds to place the selected bet(s)'),

    'Market:sp-only': (getTranslation) => getTranslation('errors.market-sp-only', 'This market is SP only.'),
    'Selection:suspended': (getTranslation) =>
        getTranslation('errors.selection-suspended', 'This selection is suspended.'),
    suspended: (getTranslation) => getTranslation('errors.suspended', 'Something is suspended.'),

    'Selection:resulted': (getTranslation) =>
        getTranslation('errors.selection-resulted', 'This selection is resulted.'),
    'Selection:selection-lost': (getTranslation) =>
        getTranslation('errors.selection-lost', 'It is not possible to cashout this bet at this time'),
    'Market:market-resulted': (getTranslation) =>
        getTranslation(
            'errors.market.market-resulted',
            'It is not possible to cashout this bet at this time as settlement of one or more selections is pending.',
        ),
    'Market:tradedInPlay:started': (getTranslation) =>
        getTranslation('errors.market-traded-in-play-started', 'Market event can not be traded in play'),
    'Event:tradedInPlay:started': (getTranslation) =>
        getTranslation('errors.event-traded-in-play-started', 'Started event can not be traded in play.'),
    'Selection:tradedInPlay:unacceptable': (getTranslation) =>
        getTranslation('errors.selection-traded-in-play', 'Event Started'),
    'Event:tradedInPlay:unacceptable': (getTranslation) =>
        getTranslation('errors.event-traded-in-play', 'This event is not traded in play.'),
    'Market:tradedInPlay:unacceptable': (getTranslation) =>
        getTranslation('errors.market-traded-in-play', 'This market is not traded in play.'),
    'Event:started': (getTranslation) =>
        getTranslation('errors.event-started', "This event is already started so you can't bet on starting price."),

    'Event:not-found': (getTranslation) => getTranslation('errors.event-not-found', "This event doesn't exists."),
    'Market:not-found': (getTranslation) => getTranslation('errors.market-not-found', "This market doesn't exists."),
    'Selection:not-found': (getTranslation) =>
        getTranslation('errors.selection-not-found', "This selection doesn't exists."),

    [`Selection:${PriceErrorCode.Increased}`]: (getTranslation) =>
        getTranslation('errors.selection-increased', 'Price of this selection has increased.'),
    [`Selection:${PriceErrorCode.Decreased}`]: (getTranslation) =>
        getTranslation('errors.selection-decreased', 'Price of this selection has decreased.'),

    'Account:pending': (getTranslation) =>
        getTranslation('errors.account-pending', 'Your account is Pending, bet placement is not allowed.'),
    'Account:suspended': (getTranslation) =>
        getTranslation('errors.account-suspended', 'Your account is Suspended, bet placement is not allowed.'),
    'Account:blocked': (getTranslation) =>
        getTranslation('errors.account-blocked', 'Your account is Blocked, bet placement is not allowed.'),
    'Account:closed': (getTranslation) =>
        getTranslation('errors.account-closed', 'Your account is Closed, bet placement is not allowed.'),
    'Bet:unacceptable': (getTranslation) => getTranslation('errors.bet-unacceptable', 'Unacceptable type of bet.'),
    'Bet:declined': (getTranslation) =>
        getTranslation(
            'errors.bet-declined',
            'Your bet has been declined. If you wish to discuss this bet further please call 08000 521 321 or contact a Trader in Trader Chat',
        ),
    'stakePerLine:maximum': (getTranslation) =>
        getTranslation('errors.stake-per-line-maximum', 'You reached maximum bet.'),

    'stakePerLine:minimum': (getTranslation) =>
        getTranslation('errors.stake-per-line-minimum', 'Bet need at least 1.00 of stake.'),

    'SettlementCode:unacceptable': (getTranslation) =>
        getTranslation('errors.settlement-code', "Can't settle bet - something goes wrong."),
    'Bet:eachWay:unacceptable': (getTranslation) =>
        getTranslation('errors.each-way-unacceptable', 'This bet has no each way terms.'),
    'Bet:eachWay:not-found': (getTranslation) =>
        getTranslation('errors.each-way-not-found', 'This bet has no each way terms.'),
    'Leg:priceType:unacceptable': (getTranslation) =>
        getTranslation('errors.price-type-unacceptable', 'This leg price is unacceptable'),
    [`Leg:price:${PriceErrorCode.ExternalPriceMissing}`]: (getTranslation) =>
        getTranslation(
            'algo-sport.bet-validation-error',
            'We cannot accept your bet at this time, please try again later.',
        ),
    [`Leg:price:${PriceErrorCode.ZeroWinExpectation}`]: (getTranslation) =>
        getTranslation(
            `algo-sport.${PriceErrorCode.ZeroWinExpectation}`,
            'Not permitted, try an alternative selection.',
        ),

    'Market:forecastsOffered:bet-type-not-allowed': (getTranslation) =>
        getTranslation('errors.forecasts-not-allowed', 'Forecasts are not allowed for this market.'),
    'Market:tricastsOffered:bet-type-not-allowed': (getTranslation) =>
        getTranslation('errors.tricasts-not-allowed', 'Tricasts are not allowed for this market.'),
    'Market:bet-type-not-allowed': (getTranslation) =>
        getTranslation('errors.bet-type-not-allowed', 'Bet type is not allowed.'),
    'Market:settlement-blocked': (getTranslation) =>
        getTranslation('errors.settlement-blocked', 'Market has blocked settlements.'),
    'Market:cashout-disabled-for-market': (getTranslation) =>
        getTranslation('errors.cashout.disabled-for-market.label', 'Cashout operation is disabled for market'),
    [`Cashout:${BetslipErrorCode.PanicModeEnabled}`]: (getTranslation) =>
        getTranslation('errors.cashout.panic-mode.label', 'Sorry, we are not able to cashout your bet at this time'),
    'Cashout:cashout-disabled-for-account': (getTranslation) =>
        getTranslation('errors.cashout.disabled-for-account.label', 'Cashout operation is disabled'),
    'Cashout:account-is-not-active': (getTranslation) =>
        getTranslation('errors.cashout.account-is-not-active.label', 'Cashout is enabled only for active users'),
    'Cashout:cashout-value-changed': (getTranslation) =>
        getTranslation('errors.cashout.changed', 'Cashout value has changed'),
    'Selection:maximum': (getTranslation) =>
        getTranslation('window.betslip-full.message', 'You have added the maximum number of picks to your bet slip.'),
    missing: (getTranslation) => getTranslation('errors.missing', 'Something is missing.'),

    ERROR_UNKNOWN: (getTranslation) => getTranslation('errors.unknown', 'Unknown error'),
    ERROR_REQUIRED_FIELD: (getTranslation) => getTranslation('errors.required-field', 'This field is required.'),
    ERROR_CHECKED_FIELD: (getTranslation) => getTranslation('errors.checked-field', 'You have to select this field.'),
    ERROR_INVALID_EMAIL: (getTranslation) => getTranslation('errors.invalid-email', 'Incorrect e-mail address.'),
    ERROR_PHONE: (getTranslation) =>
        getTranslation('errors.phone', 'Phone number can contain only spaces and 7-15 numbers.'),
    ERROR_PASSWORD: (getTranslation) =>
        getTranslation(
            'errors.password',
            "8-20 characters with only letters, numbers and few special: !#$%&'()*+,-./:;<=>?@[\\]^_`{|}~",
        ),
    ERROR_PASSWORD_CAR: (getTranslation) =>
        getTranslation(
            'errors.password:carousel',
            'Letters (lowercase, uppercase) and a minimum of 1 alphanumeric or special character(@#$%^&+=); mix of upper and lower case letters; all alphanumeric or symbols (no letters) (@#$%^&+=), between 8 and 20.',
        ),
    ERROR_PASSWORD_CAR_SHORT: (getTranslation) =>
        getTranslation(
            'errors.password-short',
            'Your password should have two of the following options: lowercase, uppercase, numbers or special characters.',
        ),
    ERROR_INVALID_CITY: (getTranslation) => getTranslation('errors.city', "Only letters, numbers and few special: -'&"),
    ERROR_INVALID_ADDRESS: (getTranslation) =>
        getTranslation('errors.address', "Only letters, numbers and few special: !'#$&()*+,-./:;<=>?@[\\]^_`{|}~"),
    ERROR_ALPHA_ONLY: (getTranslation) => getTranslation('errors.alpha-only', 'Only letters are allowed.'),
    ERROR_ALPHA_SPACES_ONLY: (getTranslation) =>
        getTranslation('errors.alpha-spaces-only', 'Only letters and spaces are allowed.'),
    ERROR_ALPHA_SPACES_NUMBERS_ONLY: (getTranslation) =>
        getTranslation('errors.alpha-spaces-numbers-only', 'Only letters, numbers and spaces are allowed.'),
    ERROR_NUMERIC: (getTranslation) => getTranslation('errors.numeric', 'Only digits are allowed.'),
    ERROR_CARD_NUMBER: (getTranslation) => getTranslation('errors.card-number', 'Incorrect card number.'),
    ERROR_CVC: (getTranslation) => getTranslation('errors.cvc', 'Incorrect CVC number.'),
    ERROR_INVALID_POSTCODE: (getTranslation) =>
        getTranslation(
            'errors.invalid-post-code',
            'Postcode can contain only letters, digits and hyphen (up to 10 chars)',
        ),
    ERROR_DECIMAL: (getTranslation) => getTranslation('errors.decimal', 'Incorrect number.'),
    ERROR_CONFIRM_EMAIL: (getTranslation) =>
        getTranslation('errors.confirm-email', 'This e-mail address is not the same.'),
    ERROR_CONFIRM_PASSWORD: (getTranslation) =>
        getTranslation('errors.confirm-password', 'This password is not the same.'),
    ERROR_MAX_LENGTH: (getTranslation) =>
        getTranslation('errors.max-length', 'This field can have maximum %length characters.'),
    ERROR_INVALID_FIRST_NAME: (getTranslation) =>
        getTranslation('errors.first-name', 'First name starts from letter and contains letters and spaces.'),
    ERROR_INVALID_SURNAME: (getTranslation) =>
        getTranslation('errors.surname', 'Surname starts from letter and contains letters, spaces and hyphens.'),
    ERROR_INVALID_DATE: (getTranslation) => getTranslation('errors.date', 'Invalid date.'),
    ERROR_MIN_AGE: (getTranslation) =>
        getTranslation('errors.min-age', 'You must be over 18 to register an account with Star Sports.'),
    ERROR_MIN_AGE_CAR: (getTranslation) =>
        getTranslation('errors.min-age:carousel', 'You must be over 18 to register an account with SportsBetting.'),
    ERROR_MIN_DEPOSIT: (getTranslation) =>
        getTranslation('errors.min-deposit', 'Minimum deposit amount is %currencySymbol%minValue'),

    ERROR_PASSWORD_EQUAL_EMAIL: (getTranslation) =>
        getTranslation('errors.password-same-as-email', 'Password cannot be the same as email address.'),
    ERROR_INCORRECT_FIRST_NAME: (getTranslation) =>
        getTranslation('errors.incorrect-first-name', 'First name can contain only letters'),
    ERROR_INCORRECT_LAST_NAME: (getTranslation) =>
        getTranslation('errors.incorrect-last-name', 'Last name can contain only letters'),
    ERROR_INCORRECT_OLD_EMAIL: (getTranslation) =>
        getTranslation('errors.incorrect-old-email', 'Incorrect old e-mail address'),
    ERROR_OLD_EMAIL_EQUAL_NEW: (getTranslation) =>
        getTranslation('errors.old-email-equal-new', 'New email address and old one are the same'),

    ERROR_INCORRECT_USERNAME_PASSWORD: (getTranslation) =>
        getTranslation('errors.incorrect-username-password', 'Incorrect e-mail or password.'),
    ERROR_INVALID: (getTranslation) => getTranslation('errors.invalid', 'This field is invalid.'),
    ERROR_ALREADY_EXISTS: (getTranslation) => getTranslation('errors.already-exists', 'This e-mail already exists.'),
    ERROR_ACCOUNT_ALREADY_EXISTS: (getTranslation) =>
        getTranslation(
            'errors.account-already-exists',
            'Some of your personal details match an existing customer account. [Link {label="Click Here"}] to Login or click the Live Chat button below to chat with our team.',
        ),
    ERROR_TOO_YOUNG: (getTranslation) => getTranslation('errors.too-young', 'Must be at least 18 years old.'),
    ERROR_UNVERIFIED_CLIENT: (getTranslation) =>
        getTranslation('errors.unauthorized-client', 'Your account is suspended.'),

    ERROR_REQUIRED_TERMS: (getTranslation) => getTranslation('errors.required-terms', 'This must be checked.'),

    INTERNAL_SERVER_ERROR_MESSAGE: (getTranslation) =>
        getTranslation('errors.internal-server', 'Sorry, we seem to have a problem. Please try again.'),

    ERROR_COUNTRY_NOT_ALLOWED: (getTranslation) =>
        getTranslation('errors.country-not-allowed', 'The service is currently not available in your country.'),
    ERROR_INVALID_GRANT: (getTranslation) =>
        getTranslation('errors.invalid-username-or-password', 'Invalid username or password'),
    ERROR_INVALID_PASSWORD: (getTranslation) =>
        getTranslation('errors.invalid-password', 'Provided password is invalid.'),
    ERROR_UNAUTHORIZED_CLIENT: (getTranslation) =>
        getTranslation('errors.unauthorized-client', 'Your account is suspended.'),
};

function defaultTranslate(_langKey: string, defaultText: string): string {
    return defaultText;
}

function getGlobalTranslateFunction() {
    if (typeof window !== 'undefined') {
        try {
            const appState = window['$appState'];

            return appState.language.getTranslation;
        } catch (e) {
            console.error(e);
        }
    }

    return defaultTranslate;
}

function getMessage(error?: string): string | undefined {
    return error !== undefined && MESSAGES[error] ? MESSAGES[error](getGlobalTranslateFunction()) : undefined;
}

export const INTERNAL_SERVER_ERROR_MESSAGE = 'Sorry, we seem to have a problem. Please try again.';

type Error = BetError | BettingErrorsItem | ReactElement | string | undefined;

export function getErrorMessage(error: Error): string {
    if (isString(error)) {
        return getMessage(error) || error;
    }

    let code;
    let semi;
    let semi2;
    let full;

    if (isBetErrorType(error)) {
        code = error.code;

        semi = `${error.field}:${code}`;

        semi2 = `${error.resource}:${code}`;

        full = `${error.resource}:${semi}`;
    }

    const message: unknown = getMessage(full) || getMessage(semi2) || getMessage(semi) || getMessage(code) || full;

    if (typeof message === 'function') {
        return message(error);
    }

    return message as string;
}

// FIXME: temporary solution, change when errors will be more standarized
export const getError = (error: Error): string | ReactElement => {
    if (isValidElement(error)) {
        return error;
    }

    const message = getErrorMessage(error) ?? '';

    if (/internal server error/i.exec(message)) {
        return getMessage('INTERNAL_SERVER_ERROR_MESSAGE') || INTERNAL_SERVER_ERROR_MESSAGE;
    }

    return message;
};
