import { useWindowWidth } from '@solo-hooks';
import { useAtomValue } from 'jotai';
import { useRecoilCallback } from 'recoil';

import { isAuthenticatedAtom } from '@solo-account/store/atoms';
import { currencySelector } from '@solo-account/store/selectors';
import { BinIcon } from '@solo-ui/icons/svg';
import { cssColor } from '@solo-ui/system';

import { I18n } from 'src/ui/common/Language/I18n';

import { closeNumpadTask } from '../../store/tasks/numpad';

import { controlFloat, decimalSeparator, formatPresetValue, numpadKeyboard, PRESETS } from './config';
import {
    S_Container,
    S_ControlButton,
    S_ControlFloat,
    S_ControlBackspace,
    S_ControlOkButton,
    S_MaxBetControlButton,
    S_NumpadContainer,
    S_PresetContainer,
    S_PresetControlButton,
} from './styled';

interface Props {
    numpadId: string;
    hasMaxBetButton: boolean;
    onMaxBetClick: () => void;
    onPresetChange: (preset: number) => void;
    onNumpadKeyboardChange: (keyboardDigit: string) => void;
    onNumpadKeyboardClear: () => void;
    resetStakes: () => void;
}

const StakeNumpad = ({
    numpadId,
    onPresetChange,
    onNumpadKeyboardChange,
    onNumpadKeyboardClear,
    onMaxBetClick,
    resetStakes,
}: Props) => {
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);

    const currency = useAtomValue(currencySelector);
    const { isMobile } = useWindowWidth();
    const presetChangeHandler = (value: number) => () => onPresetChange(value);

    const numpadKeyboardChangeHandler = (input: string) => () => onNumpadKeyboardChange(input);

    const closeNumpad = useRecoilCallback(closeNumpadTask, []);

    const precisionType = isMobile ? decimalSeparator : controlFloat;

    return (
        <S_Container data-testid='stakeNumpad'>
            <S_PresetContainer>
                {PRESETS.map((preset: number) => {
                    const { value, label } = formatPresetValue(preset)(currency);

                    return (
                        <S_PresetControlButton
                            key={preset}
                            onClick={presetChangeHandler(value)}
                            data-testid={`preset-${value}`}
                        >
                            <I18n langKey={`betslip.stake.numpad.preset.button.${value}`} defaultText={label} />
                        </S_PresetControlButton>
                    );
                })}
                <S_MaxBetControlButton onClick={onMaxBetClick} disabled={!isAuthenticated}>
                    <I18n langKey='betslip.stake.numpad.maxbet.button.label' defaultText='Max bet' />
                </S_MaxBetControlButton>
                <S_PresetControlButton onClick={resetStakes} data-testid='reset-button'>
                    <BinIcon fontSize='small' color={cssColor('--icon-generic-color')} />
                </S_PresetControlButton>
            </S_PresetContainer>
            <S_NumpadContainer>
                {numpadKeyboard.map((keyboardDigit) => (
                    <S_ControlButton
                        key={keyboardDigit}
                        onClick={numpadKeyboardChangeHandler(keyboardDigit)}
                        data-testid={`numpadDigit-${keyboardDigit}`}
                    >
                        {keyboardDigit}
                    </S_ControlButton>
                ))}

                <S_ControlFloat data-testid='controlFloat' onClick={() => onNumpadKeyboardChange(precisionType)}>
                    {precisionType}
                </S_ControlFloat>

                <S_ControlBackspace onClick={onNumpadKeyboardClear} className='theme-delete-i' />
                <S_ControlOkButton onClick={() => closeNumpad(numpadId)} data-testid='closeNumpad'>
                    <I18n langKey='betslip.stake.numpad.ok.button.label' defaultText='Ok' />
                </S_ControlOkButton>
            </S_NumpadContainer>
        </S_Container>
    );
};

export default StakeNumpad;
