import { observer } from 'mobx-react-lite';
import type { MouseEvent } from 'react';
import { useRecoilValue } from 'recoil';

import { LockIcon } from '@solo-ui/icons/svg';
import { DarkBluePalette } from '@solo-ui/system';

import type { Leg } from '../../../api/types/leg';
import useGetOddsPrice from '../../../hooks/useGetOddsPrice';
import useSelectionState from '../../../hooks/useSelectionState';
import { isCheckedBetslipBetSelectorFamily } from '../../../store/selectors/betslipBets';
import { prioritisedMinMaxProblemSelectorFamily } from '../../../store/selectors/problems';
import {
    hasStakeErrorSelector,
    hasStakeInputErrorSelector,
    showCardStakeSelector,
    singleBetStakePerLineSelectorFamily,
} from '../../../store/selectors/stake';
import MinMaxStakeError from '../../MinMaxStakeError/MinMaxStakeError';
import { getPossibleReturns } from '../../SelectionList/utils';
import StakeInput from '../../StakeInput/StakeInput';

import MaxStake from './MaxStake/MaxStake';
import PossibleWinnings from './PossibleWinnings/PossibleWinnings';
import SelectionPrice from './SelectionPrice/SelectionPrice';
import { S_CardStake, S_StakeInput } from './styled';

interface Props {
    leg: Leg;
    changeStakeInput: (value: number) => void;
}

const CardStake = ({ leg, changeStakeInput }: Props) => {
    const { maxStake } = leg;
    const betId = leg.selectionId ?? leg.id;

    const showStake = useRecoilValue(showCardStakeSelector);
    const hasStakeError = useRecoilValue(hasStakeErrorSelector(betId));
    const hasStakeInputError = useRecoilValue(hasStakeInputErrorSelector(betId));
    const minMaxStakeProblem = useRecoilValue(prioritisedMinMaxProblemSelectorFamily(betId));
    const stakePerLine = useRecoilValue(singleBetStakePerLineSelectorFamily(betId));
    const isChecked = useRecoilValue(isCheckedBetslipBetSelectorFamily(betId));

    const oddsPrice = useGetOddsPrice(leg);

    const { isClosed, isSuspended, isLocked, isFreeBet, isStakeDisabled, isSelectionDisabled } = useSelectionState(leg);

    const possibleReturns = getPossibleReturns({ leg, isChecked, isFreeBet, isSuspended, stakePerLine });

    const onContainerClick = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    // FIXME: fix type - in standard bet eventId and marketId is not optional

    return (
        <S_CardStake>
            {isLocked ? (
                <LockIcon fontSize='small' data-testid='lockIcon' color={DarkBluePalette.darkBlue5} />
            ) : (
                <SelectionPrice betId={betId} oddsPrice={oddsPrice} isSuspended={isSuspended} isClosed={isClosed} />
            )}

            {showStake && (
                <>
                    <S_StakeInput onClick={onContainerClick}>
                        <StakeInput
                            value={stakePerLine}
                            hasError={hasStakeInputError}
                            isFreeBet={isFreeBet}
                            isDisabled={isStakeDisabled}
                            numpadId={String(betId)}
                            onChange={changeStakeInput}
                        />
                    </S_StakeInput>

                    {hasStakeError ? (
                        <MinMaxStakeError error={minMaxStakeProblem} />
                    ) : (
                        <MaxStake maxStake={maxStake} isDisabled={isSelectionDisabled} />
                    )}

                    <PossibleWinnings possibleReturns={possibleReturns} isDisabled={isSelectionDisabled} />
                </>
            )}
        </S_CardStake>
    );
};

export default observer(CardStake);
