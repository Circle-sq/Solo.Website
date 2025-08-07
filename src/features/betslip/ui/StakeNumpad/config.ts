import { Currency } from 'src/common/enums';

export const numpadKeyboard: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
export const controlFloat = '00';
export const decimalSeparator = '.';
export const KRW_CURRENCY_PREFIX = 1000;
export const PRESETS: number[] = [5, 10, 50, 100, 500, 1000];

export const formatPresetValue =
    (preset: number) =>
    (currency: string): { value: number; label: string } => {
        if (currency === Currency.KRW) {
            const amount = preset * KRW_CURRENCY_PREFIX;

            return {
                value: amount,
                label: formatPresetLabel(preset),
            };
        }

        return { value: preset, label: String(preset) };
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
