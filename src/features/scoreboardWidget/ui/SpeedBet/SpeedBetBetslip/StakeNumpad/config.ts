import { STAKE_INPUT_MAX_LENGTH } from '../../../../constants';
import { PresetActions } from '../../../../enums';

export const numpadKeypad = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
export const floatValue = '00';

export const KRW_CURRENCY_PREFIX = 1000;
export const presets = [5, 10, 50, 100, 500, 1000];

export const formatPresetValue = (preset: number) => {
    const value = preset * KRW_CURRENCY_PREFIX;

    return {
        value,
        label: formatPresetLabel(preset),
    };
};

const formatPresetLabel = (preset: number) => {
    let label: string;

    if (preset >= KRW_CURRENCY_PREFIX) {
        label = `+${(preset / KRW_CURRENCY_PREFIX).toFixed(0)}M`;
    } else {
        label = `+${preset}K`;
    }

    return label;
};

export const willExceedMaxDigits = (stake: string, value: number | PresetActions): boolean => {
    const exceedsMaxDigits = (newValue: number) => {
        return String(newValue).length > STAKE_INPUT_MAX_LENGTH;
    };

    const stakeNumber = Number(stake) || 0;

    if (value === PresetActions.Double) {
        return exceedsMaxDigits(stakeNumber * 2);
    }

    const newValue = stakeNumber + Number(value);

    return exceedsMaxDigits(newValue);
};
