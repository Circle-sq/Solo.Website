import get from 'lodash/get';
import type { NumberFormatValues } from 'react-number-format';
import { useRecoilValue, useRecoilCallback } from 'recoil';

import { getValue } from 'src/common/recoil/snapshot';

import { STAKE_INPUT_MAX_LENGTH } from '../constants';
import { PresetActions } from '../enums';
import { speedBetStakeAtom, previousSpeedBetStakeAtom, possibleBetsAtom } from '../store/atoms';

export const useStakeHandlers = () => {
    const speedBetStake = useRecoilValue(speedBetStakeAtom);
    const previousSpeedBetStake = useRecoilValue(previousSpeedBetStakeAtom);

    const possibleBets = useRecoilValue(possibleBetsAtom);

    const handleValueChange = useRecoilCallback(({ snapshot, set }) => ({ value }: NumberFormatValues) => {
        const currentSpeedBetstake = getValue(snapshot, speedBetStakeAtom);

        if (currentSpeedBetstake !== value) {
            set(speedBetStakeAtom, value);
        }
    });

    const handleNumpadChange = useRecoilCallback(({ set }) => (value: string) => {
        set(speedBetStakeAtom, (prevState) => {
            const newValue = prevState + value;

            if (prevState === '' && (value === '0' || value === '00')) {
                return prevState;
            }

            if (newValue.length > STAKE_INPUT_MAX_LENGTH) {
                return prevState;
            }

            return newValue;
        });
    });

    const handleResetStake = useRecoilCallback(({ set }) => () => {
        set(speedBetStakeAtom, () => {
            return '';
        });
    });

    const handleBackspace = useRecoilCallback(({ set }) => () => {
        set(speedBetStakeAtom, (prevState) => {
            return prevState.slice(0, -1);
        });
    });

    const handlePresetChange = useRecoilCallback(({ snapshot, set }) => (value: number | PresetActions) => {
        const currentSpeedBetstake = getValue(snapshot, speedBetStakeAtom);

        if (typeof value === 'string') {
            switch (value) {
                case PresetActions.Previous:
                    if (previousSpeedBetStake) {
                        set(speedBetStakeAtom, previousSpeedBetStake);
                    }

                    break;

                case PresetActions.Double:
                    set(speedBetStakeAtom, (prevTotal) => {
                        const newValue = prevTotal ? Number(prevTotal) * 2 : 0;

                        if (String(newValue).length > STAKE_INPUT_MAX_LENGTH) {
                            return prevTotal;
                        }

                        return String(newValue);
                    });

                    break;

                case PresetActions.Max:
                    const maxBet = get(possibleBets, 'bets[0].maxStake', 0);

                    set(speedBetStakeAtom, String(maxBet));

                    break;

                default:
                    break;
            }
        } else {
            const newValue = currentSpeedBetstake ? Number(currentSpeedBetstake) + value : value;

            set(speedBetStakeAtom, (prevTotal) => {
                if (String(newValue).length > STAKE_INPUT_MAX_LENGTH) {
                    return prevTotal;
                }

                return String(newValue);
            });
        }
    });

    return {
        speedBetStake,
        handleValueChange,
        handleNumpadChange,
        handleResetStake,
        handleBackspace,
        handlePresetChange,
    };
};
