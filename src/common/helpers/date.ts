import { format, isValid } from 'date-fns';

import { DATE_FORMAT } from 'src/utils/constants';

export const formatDate = (date: Date | string, template: string) => format(new Date(date), template);

export const formatToFullDate = (date: Date | string) => formatDate(date, DATE_FORMAT.NUMERIC_FULL_DATE);

export const formatToFullTime = (date: Date | string) => formatDate(date, DATE_FORMAT.NUMERIC_FULL_TIME);

export const isValidFullDate = (date: Date | string = '') => isValid(formatToFullDate(date));
