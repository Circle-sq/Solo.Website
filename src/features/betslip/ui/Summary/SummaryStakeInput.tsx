import { useRecoilValue } from 'recoil';

import { BetslipTab } from 'src/common/enums';
import { I18n } from 'src/ui/common/Language/I18n';

import { betslipActiveTabAtom } from '../../store/atoms/betslipTab';
import {
    hasMultipleBetsCountSelector,
    hasSuspendedBetSelector,
    totalBetsSelectorFamily,
} from '../../store/selectors/betslipBets';
import { hasSummaryStakeErrorSelector } from '../../store/selectors/errors';
import { hasAppliedFreeBetOnMultipleTabSelector } from '../../store/selectors/freeBets';
import { isSummaryStakeDisabledSelector, summaryStakeInputValueSelector } from '../../store/selectors/stake';
import StakeInput from '../StakeInput/StakeInput';

import { S_CombinationStakeLabel, S_CountBets, S_StakeInputContainer, S_SummaryStakeWrapper } from './styled';

interface Props {
    numpadId: string;
    changeStakeInput: (value: number) => void;
}

const SummaryStakeInput = ({ numpadId, changeStakeInput }: Props) => {
    const betslipTab = useRecoilValue(betslipActiveTabAtom);
    const totalBets = useRecoilValue(totalBetsSelectorFamily(betslipTab));
    const stakeValue = useRecoilValue(summaryStakeInputValueSelector);
    const hasMultipleBetsCount = useRecoilValue(hasMultipleBetsCountSelector);
    const hasSuspendedBet = useRecoilValue(hasSuspendedBetSelector);

    const isStakeDisabled = useRecoilValue(isSummaryStakeDisabledSelector);
    const hasAppliedFreeBet = useRecoilValue(hasAppliedFreeBetOnMultipleTabSelector);
    const hasSummaryStakeError = useRecoilValue(hasSummaryStakeErrorSelector);

    const isMultipleTab = betslipTab === BetslipTab.Multi;

    return (
        <S_SummaryStakeWrapper>
            {isMultipleTab ? (
                <S_CombinationStakeLabel data-testid='stakePerBet'>
                    <I18n langKey='betslip.stake.multiple.bet' defaultText='Stake' />
                </S_CombinationStakeLabel>
            ) : (
                <S_CombinationStakeLabel data-testid='stakePerBet'>
                    <I18n langKey='betslip.stake.per.bet' defaultText='Stake per bet' />
                    {hasMultipleBetsCount && (
                        <S_CountBets data-testid='CountBets'>
                            {totalBets === 0 || hasSuspendedBet ? '--' : totalBets}{' '}
                            <I18n langKey='betslip.bets' defaultText='bets' />
                        </S_CountBets>
                    )}
                </S_CombinationStakeLabel>
            )}

            <S_StakeInputContainer data-testid='stakeSummary'>
                <StakeInput
                    value={stakeValue}
                    hasError={hasSummaryStakeError}
                    isFreeBet={hasAppliedFreeBet}
                    isDisabled={isStakeDisabled}
                    numpadId={numpadId}
                    onChange={changeStakeInput}
                />
            </S_StakeInputContainer>
        </S_SummaryStakeWrapper>
    );
};

export default SummaryStakeInput;
