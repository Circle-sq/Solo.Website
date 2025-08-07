import forEach from 'lodash/forEach';
import has from 'lodash/has';
import isEmpty from 'lodash/isEmpty';
import mapValues from 'lodash/mapValues';
import type { TransactionInterface_UNSTABLE as TransactionInterface } from 'recoil';

import { BetslipTab } from 'src/common/enums';
import { MutationStatus } from 'src/common/enums/status';

import type { BaseLeg } from '../../api/types/leg';
import type { PlacedBet } from '../../api/types/placedBet';
import type { ReferredStandardLeg } from '../../api/types/referredBet';
import { isStandardBetLegType } from '../../typeGuards/leg';
import { betReceiptAtom } from '../atoms/betReceipt';
import { placeBetStatusAtom } from '../atoms/betslip';
import { betslipActiveTabAtom } from '../atoms/betslipTab';
import { combinationsAtom, multipleCombinationAtom, systemCombinationAtom } from '../atoms/combinations';
import { freeBetsAtom } from '../atoms/freeBets';
import { offerAtom, standardBetPriceWhileOfferAtomFamily } from '../atoms/offer';
import { multipleBetStakesWhileOfferAtomFamily, singleBetStakesAtom } from '../atoms/stake';
import { EMPTY_STAKE } from '../configs';
import { setBetReceipt, setBetReceiptTypeName } from '../helpers/betReceipt';
import { syncCombinationsWithOffer, syncCombinationWithOffer } from '../helpers/combinations';
import { getAppliedFreeBets } from '../helpers/freeBets';

import { resetBetslipErrorsTransaction } from './betslip';

export const resetStandardBetsPriceWhileOfferTransaction =
    <T extends { legs?: BaseLeg[] }>(bets: T[]) =>
    ({ reset }: Pick<TransactionInterface, 'reset'>) => {
        forEach(bets, ({ legs = [] }) => {
            forEach(legs, (leg) => {
                if (isStandardBetLegType<ReferredStandardLeg>(leg)) {
                    reset(standardBetPriceWhileOfferAtomFamily(String(leg.selection.id)));
                }
            });
        });
    };

export const setStandardBetsPriceWhileOfferTransaction =
    <T extends { legs?: BaseLeg[] }>(bets: T[]) =>
    ({ set }: Pick<TransactionInterface, 'set'>) => {
        forEach(bets, ({ legs = [] }) => {
            forEach(legs, (leg) => {
                if (isStandardBetLegType<ReferredStandardLeg>(leg)) {
                    const { selection, price = null } = leg;

                    set(standardBetPriceWhileOfferAtomFamily(String(selection.id)), price);
                }
            });
        });
    };

export const acceptOfferTransaction =
    (bets: PlacedBet[]) =>
    ({ get, reset, set }: TransactionInterface) => {
        const betslipTab = get(betslipActiveTabAtom);

        if (betslipTab === BetslipTab.Single) {
            const { legs: offerLegs } = get(offerAtom);

            set(singleBetStakesAtom, (singleBetStakes) =>
                mapValues(singleBetStakes, (stake, betId) => {
                    if (!has(offerLegs, String(betId))) {
                        return stake;
                    }

                    const { stakePerLine = EMPTY_STAKE } = offerLegs[betId];

                    return stakePerLine;
                }),
            );
        } else {
            set(combinationsAtom, syncCombinationsWithOffer(bets));
            reset(multipleBetStakesWhileOfferAtomFamily(betslipTab));
        }

        if (betslipTab === BetslipTab.Multi) {
            set(multipleCombinationAtom, syncCombinationWithOffer(bets));
            const multipleCombination = get(multipleCombinationAtom);

            if (multipleCombination !== undefined) {
                set(betReceiptAtom, setBetReceiptTypeName(multipleCombination));
            }
        }

        if (betslipTab === BetslipTab.System) {
            set(systemCombinationAtom, syncCombinationWithOffer(bets));
            const systemCombination = get(systemCombinationAtom);

            if (systemCombination !== undefined) {
                set(betReceiptAtom, setBetReceiptTypeName(systemCombination));
            }
        }

        const hasAppliedFreeBets = !isEmpty(getAppliedFreeBets(get(freeBetsAtom)));
        set(betReceiptAtom, setBetReceipt(bets, hasAppliedFreeBets));

        resetBetslipErrorsTransaction({ reset });

        set(placeBetStatusAtom, MutationStatus.Success);
        reset(offerAtom);
    };
