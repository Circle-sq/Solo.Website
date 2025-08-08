import has from 'lodash/has';
import type { MultiValue, SingleValue } from 'react-select';

import type { MediaOption } from '@solo-media/ui/videoStream/dropdown/types';

import type { Option } from 'src/ui/crossbetting/FilterDropdown/types';

export const hasIdInValue = (
    value: SingleValue<Option | MediaOption> | MultiValue<Option | MediaOption>,
): value is SingleValue<MediaOption> => has(value, 'id');

export const hasParamsInValue = (
    value: SingleValue<Option | MediaOption> | MultiValue<Option | MediaOption>,
): value is Option => has(value, 'params');

export const hasValueInValue = (
    value: SingleValue<Option | MediaOption> | MultiValue<Option | MediaOption>,
): value is Option => has(value, 'value');
