import { useWindowWidth } from '@sc-hooks';
import get from 'lodash/get';
import { useRef, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { I18n } from 'src/ui/common/Language/I18n';

import { BackspaceIcon } from '../../../../assets/icons';
import { PresetActions } from '../../../../enums';
import { useStakeHandlers } from '../../../../hooks/useStakeHandlers';
import { possibleBetsAtom, previousSpeedBetStakeAtom, isDisabledNumpadAtom } from '../../../../store/atoms';

import { numpadKeypad, formatPresetValue, presets, floatValue, willExceedMaxDigits } from './config';
import { S_NumpadContainer, S_Button, S_PresetButton, S_PresetContainer } from './styled';

const StakeNumpad = () => {
    const { isTablet } = useWindowWidth();

    const focusedButtonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        if (focusedButtonRef.current !== null) {
            focusedButtonRef.current.focus();
        }
    }, []);

    const { speedBetStake, handleNumpadChange, handlePresetChange, handleBackspace } = useStakeHandlers();

    const possibleBets = useRecoilValue(possibleBetsAtom);
    const previousSpeedBetStake = useRecoilValue(previousSpeedBetStakeAtom);
    const isDisabledNumpad = useRecoilValue(isDisabledNumpadAtom);

    const isPreviousStake = !!previousSpeedBetStake;
    const isDoubleStake = !!speedBetStake && !willExceedMaxDigits(speedBetStake, PresetActions.Double);
    const isMaxStake = !!get(possibleBets, 'bets[0].maxStake', 0);

    return (
        <>
            <S_PresetContainer data-testid='speedBetBetslipPreset'>
                <S_Button
                    data-testid='speedBetBetslipPreviousStakeButton'
                    onClick={() => handlePresetChange(PresetActions.Previous)}
                    disabled={!isPreviousStake || isDisabledNumpad}
                    ref={isPreviousStake ? focusedButtonRef : null}
                    tabIndex={-1}
                >
                    <I18n langKey='speedBet.betslip.previousStake' defaultText='Previous stake' />
                </S_Button>
                <S_Button
                    data-testid='speedBetBetslipDoubleStakeButton'
                    onClick={() => handlePresetChange(PresetActions.Double)}
                    disabled={!isDoubleStake || isDisabledNumpad}
                    tabIndex={-1}
                >
                    <I18n langKey='speedBet.betslip.doubleStake' defaultText='Double stake' />
                </S_Button>
                <S_Button
                    data-testid='speedBetBetslipMaxBetButton'
                    onClick={() => handlePresetChange(PresetActions.Max)}
                    disabled={!isMaxStake || isDisabledNumpad}
                    tabIndex={-1}
                >
                    <I18n langKey='speedBet.betslip.maxBet' defaultText='Max bet' />
                </S_Button>
                {presets.map((preset: number) => {
                    const { value, label } = formatPresetValue(preset);

                    const buttonRef = !isPreviousStake && preset === presets[0] ? focusedButtonRef : null;

                    const isPresetDisabled = willExceedMaxDigits(speedBetStake, value) || isDisabledNumpad;

                    return (
                        <S_PresetButton
                            data-testid={`speedBetBetslipPreset-${value}`}
                            key={value}
                            onClick={() => handlePresetChange(value)}
                            ref={buttonRef}
                            disabled={isPresetDisabled}
                            tabIndex={-1}
                        >
                            {label}
                        </S_PresetButton>
                    );
                })}
            </S_PresetContainer>

            {isTablet && (
                <S_NumpadContainer data-testid='speedBetBetslipNumpad'>
                    {numpadKeypad.map((item) => (
                        <S_Button
                            key={item}
                            onClick={() => handleNumpadChange(item)}
                            data-testid={`speedBetBetslipNumpadButton-${item}`}
                            disabled={isDisabledNumpad}
                        >
                            {item}
                        </S_Button>
                    ))}
                    <S_Button
                        onClick={handleBackspace}
                        data-testid='speedBetBetslipNumpadButton-Backspace'
                        disabled={isDisabledNumpad}
                    >
                        <BackspaceIcon fontSize='xsmall' />
                    </S_Button>
                    <S_Button
                        onClick={() => handleNumpadChange(floatValue)}
                        data-testid='speedBetBetslipNumpadButton-00'
                        disabled={isDisabledNumpad}
                    >
                        {floatValue}
                    </S_Button>
                </S_NumpadContainer>
            )}
        </>
    );
};

export default StakeNumpad;
