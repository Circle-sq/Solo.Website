import get from 'lodash/get';
import type { MouseEvent } from 'react';
import { useEffect } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { SubKey } from '@solo-features/subscription-manager/subKeys';
import { SubscribeElement } from '@solo-features/subscription-manager/SubscribeElement';

import { BetslipTab } from 'src/common/enums';
import { getValue } from 'src/common/recoil/snapshot';

import { usePossibleBets } from '../../api/possibleBets/queries';
import type { Leg } from '../../api/types/leg';
import { PossibleBetsTriggeredBy } from '../../enums';
import { getEventIdPath } from '../../helpers/helpers';
import { useSelectionStake } from '../../hooks/useSelectionStake';
import { betslipActiveTabAtom } from '../../store/atoms/betslipTab';
import { activeBetsCountSelector } from '../../store/selectors/betslipBets';
import { availableFreeBetsByBetIdSelectorFamily } from '../../store/selectors/freeBets';
import { hasOfferSelector } from '../../store/selectors/offer';
import { showNumpadSelectorFamily } from '../../store/selectors/stake';
import { removeBetslipBetTask } from '../../store/tasks/betslipBet/remove';
import { closeNumpadTask } from '../../store/tasks/numpad';
import { defineBetslipTabAfterRemoveLegTransaction } from '../../store/transactions/betslipTab';
import { isMultiBetType } from '../../typeGuards/bet';
import StakeNumpad from '../StakeNumpad/StakeNumpad';

import CardContent from './CardContent/CardContent';
import CardHeader from './CardHeader/CardHeader';
import { S_SelectionContainer, S_StakeNumpadContainer } from './styled';

const SelectionItem = ({ leg }: { leg: Leg }) => {
    const { maxStake = 0, betReferralEnabled = false, eventRevision } = leg;
    const betId = leg.selectionId ?? leg.id;
    const numpadId = String(betId);

    const eventId: number = get(leg, getEventIdPath(isMultiBetType(leg)));
    const activeBetsCount = useRecoilValue(activeBetsCountSelector);
    const activeTab = useRecoilValue(betslipActiveTabAtom);
    const freeBets = useRecoilValue(availableFreeBetsByBetIdSelectorFamily(betId));
    const hasOffer = useRecoilValue(hasOfferSelector);
    const showNumpad = useRecoilValue(showNumpadSelectorFamily(numpadId));

    const { getPossibleBets } = usePossibleBets();

    const closeNumpad = useRecoilCallback(closeNumpadTask, []);
    const removeBetslipBet = useRecoilCallback(removeBetslipBetTask, []);

    const { addNumpadDigit, applyMaxBet, applyPreset, changeStakeInput, resetStake, numpadBackspace } =
        useSelectionStake(betId);

    const isSingleTab = activeTab === BetslipTab.Single;

    useEffect(() => {
        closeNumpad(numpadId);
    }, [activeTab, activeBetsCount]);

    const onRemoveSelection = useRecoilCallback(
        ({ snapshot, transact_UNSTABLE: transact }) =>
            (event: MouseEvent<HTMLButtonElement>) => {
                event.preventDefault();

                const hasOffer = getValue(snapshot, hasOfferSelector);

                if (hasOffer) {
                    return;
                }

                removeBetslipBet(betId);
                transact(defineBetslipTabAfterRemoveLegTransaction);

                getPossibleBets({ triggeredBy: PossibleBetsTriggeredBy.RemoveBet });
            },
        [betId, getPossibleBets, removeBetslipBet],
    );

    return (
        <S_SelectionContainer
            isDisabled={hasOffer}
            isSingleTab={isSingleTab}
            numpadOpen={showNumpad && !betReferralEnabled}
            data-testid={`betslipEvent-${eventId}`}
        >
            {isSingleTab && <CardHeader leg={leg} onRemoveSelection={onRemoveSelection} />}
            <SubscribeElement id={eventId} subKey={SubKey.selection_item} revision={eventRevision}>
                <CardContent
                    leg={leg}
                    eventId={eventId}
                    onRemoveSelection={onRemoveSelection}
                    changeStakeInput={changeStakeInput}
                    freeBets={freeBets}
                />
            </SubscribeElement>
            {showNumpad && (
                <S_StakeNumpadContainer>
                    <StakeNumpad
                        numpadId={numpadId}
                        hasMaxBetButton={Boolean(maxStake)}
                        onMaxBetClick={applyMaxBet}
                        onPresetChange={applyPreset}
                        onNumpadKeyboardChange={addNumpadDigit}
                        onNumpadKeyboardClear={numpadBackspace}
                        resetStakes={resetStake}
                    />
                </S_StakeNumpadContainer>
            )}
        </S_SelectionContainer>
    );
};

export default SelectionItem;
