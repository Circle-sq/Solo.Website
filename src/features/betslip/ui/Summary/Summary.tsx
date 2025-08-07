import { useAtomValue } from 'jotai';
import { memo, useCallback, useEffect } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { isAuthenticatedAtom } from '@sc-account/store/atoms';

import { BetslipTab } from 'src/common/enums';

import { usePossibleBets } from '../../api/possibleBets/queries';
import { PossibleBetsTriggeredBy } from '../../enums';
import { useSummaryStake } from '../../hooks/useSummaryStake';
import { betslipActiveTabAtom } from '../../store/atoms/betslipTab';
import { EMPTY_STAKE } from '../../store/configs';
import { hasMultipleBetsCountSelector } from '../../store/selectors/betslipBets';
import { freeBetsForMultipleTabSelector, showSummaryFreeBetsDropdown } from '../../store/selectors/freeBets';
import { isOfferedSelector, isOfferRequestedSelector } from '../../store/selectors/offer';
import { isPlaceBetLoadingSelector } from '../../store/selectors/placeBet';
import { maxStakeSelector, showNumpadSelectorFamily } from '../../store/selectors/stake';
import { selectSummaryFreeBetTask, toggleSummaryFreeBetTask } from '../../store/tasks/freeBets';
import { closeNumpadTask } from '../../store/tasks/numpad';
import FreeBetsDropdown from '../freeBet/dropdown/FreeBetsDropdown';
import StakeNumpad from '../StakeNumpad/StakeNumpad';

import PossibleWinnings from './PossibleWinnings/PossibleWinnings';
import { FreeBetsSummaryWrapper, S_StakeErrorContainer, StakeContainer, SummaryContainer } from './styled';
import SummaryMaxStake from './SummaryMaxStake';
import SummaryStakeInput from './SummaryStakeInput';
import TotalOdds from './TotalOdds/TotalOdds';
import TotalStake from './TotalStake/TotalStake';

const numpadId = 'summaryStakeNumpad';

export const Summary = () => {
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const isOfferRequested = useRecoilValue(isOfferRequestedSelector);
    const isOffered = useRecoilValue(isOfferedSelector);
    const isPlaceBetLoading = useRecoilValue(isPlaceBetLoadingSelector);
    const hasMultipleBetsCount = useRecoilValue(hasMultipleBetsCountSelector);

    const betslipTab = useRecoilValue(betslipActiveTabAtom);
    const showFreeBetDropdown = useRecoilValue(showSummaryFreeBetsDropdown);
    const showNumpad = useRecoilValue(showNumpadSelectorFamily(numpadId));

    const maxStake = useRecoilValue(maxStakeSelector);
    const { multipleFreeBets } = useRecoilValue(freeBetsForMultipleTabSelector);

    const isMultipleTab = betslipTab === BetslipTab.Multi;

    const closeNumpad = useRecoilCallback(closeNumpadTask, []);

    useEffect(() => {
        closeNumpad(numpadId);
    }, [betslipTab]);

    const showTotalStake = !isMultipleTab && hasMultipleBetsCount;
    const showMaxBetSummary = isAuthenticated && hasMultipleBetsCount;
    const hasMaxBetButton = showMaxBetSummary || maxStake !== EMPTY_STAKE;

    const isLoading = isPlaceBetLoading || isOfferRequested || isOffered;

    const { getPossibleBetsWithCombination } = usePossibleBets();
    const { addNumpadDigit, applyMaxBet, applyPreset, changeStakeInput, numpadBackspace, resetStakes } =
        useSummaryStake();

    const selectSummaryFreeBet = useRecoilCallback(selectSummaryFreeBetTask, []);
    const toggleSummaryFreeBet = useRecoilCallback(toggleSummaryFreeBetTask, []);

    const onSelectFreeBet = useCallback(
        (creditId: number) => {
            selectSummaryFreeBet(creditId);
            getPossibleBetsWithCombination({ triggeredBy: PossibleBetsTriggeredBy.SelectFreeBet });
        },
        [selectSummaryFreeBet, getPossibleBetsWithCombination],
    );

    const onToggleFreeBet = useCallback(() => {
        toggleSummaryFreeBet();
        getPossibleBetsWithCombination({ triggeredBy: PossibleBetsTriggeredBy.ToggleFreeBet });
    }, [toggleSummaryFreeBet, getPossibleBetsWithCombination]);

    return (
        <SummaryContainer>
            <StakeContainer>
                <SummaryStakeInput numpadId={numpadId} changeStakeInput={changeStakeInput} />

                {showFreeBetDropdown && (
                    <FreeBetsSummaryWrapper>
                        <FreeBetsDropdown
                            freeBets={multipleFreeBets}
                            onSelectFreeBet={onSelectFreeBet}
                            onToggleFreeBet={onToggleFreeBet}
                            isDisabled={isLoading}
                        />
                    </FreeBetsSummaryWrapper>
                )}

                <S_StakeErrorContainer>
                    <SummaryMaxStake />
                </S_StakeErrorContainer>

                {showNumpad && (
                    <StakeNumpad
                        numpadId={numpadId}
                        hasMaxBetButton={hasMaxBetButton}
                        onMaxBetClick={applyMaxBet}
                        onPresetChange={applyPreset}
                        onNumpadKeyboardChange={addNumpadDigit}
                        onNumpadKeyboardClear={numpadBackspace}
                        resetStakes={resetStakes}
                    />
                )}
            </StakeContainer>

            {isMultipleTab && <TotalOdds />}
            {showTotalStake && <TotalStake />}
            <PossibleWinnings />
        </SummaryContainer>
    );
};

export default memo(Summary);
