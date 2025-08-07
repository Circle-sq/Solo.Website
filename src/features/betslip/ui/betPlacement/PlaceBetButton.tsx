import { useAtomValue } from 'jotai';
import { useRecoilValue } from 'recoil';

import { isAuthenticatedAtom } from '@sc-account/store/atoms';
import { oddsUpdateSelector } from '@sc-account/store/selectors';
import { hasPriceWentDownSelector } from '@sc-betslip/store/selectors/animation';

import { BetslipOdds } from 'src/common/enums';
import { I18n } from 'src/ui/common/Language/I18n';

import useAcceptOffer from '../../hooks/offer/useAcceptOffer';
import { useAcceptLegChanges } from '../../store/hooks/useAcceptLegChanges';
import { hasChangedLegSelector, suspendedBetsCountSelector } from '../../store/selectors/betslipBets';
import { algoSportErrorsCountSelector, hasSummaryStakeErrorSelector } from '../../store/selectors/errors';
import { isOfferedSelector, isOfferRequestedSelector, isOfferTimeoutSelector } from '../../store/selectors/offer';
import {
    isPlaceBetButtonDisabledSelector,
    isPlaceBetErrorSelector,
    isPlaceBetLoadingSelector,
} from '../../store/selectors/placeBet';
import { hasStakePerLineSelector } from '../../store/selectors/stake';
import {
    hasBetslipWarningsSelector,
    hasDontAcceptOddsChangesSettingSelector,
    hasRelatedAndNonCombinableBetsWarningSelector,
} from '../../store/selectors/warnings';

import LoginButton from './LoginButton/LoginButton';
import { GapUp, GrayContainer, Label, PlaceButton, S_PlaceBetButton, Value } from './styled';

interface Props {
    placeBetHandler: () => void;
}

export const PlaceBetButton = ({ placeBetHandler }: Props) => {
    const algoSportErrorsCount = useRecoilValue(algoSportErrorsCountSelector);
    const suspendedBetsCount = useRecoilValue(suspendedBetsCountSelector);
    const oddsUpdate = useAtomValue(oddsUpdateSelector);

    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const isAcceptHigherOdds = oddsUpdate === BetslipOdds.AcceptHigherOdds;
    const isOffered = useRecoilValue(isOfferedSelector);
    const isOfferExpired = useRecoilValue(isOfferTimeoutSelector);
    const isOfferRequested = useRecoilValue(isOfferRequestedSelector);
    const isPlaceBetButtonDisabled = useRecoilValue(isPlaceBetButtonDisabledSelector);
    const isPlaceBetLoading = useRecoilValue(isPlaceBetLoadingSelector);
    const isPlaceBetError = useRecoilValue(isPlaceBetErrorSelector);
    const hasBetslipWarnings = useRecoilValue(hasBetslipWarningsSelector);
    const hasChangedLeg = useRecoilValue(hasChangedLegSelector);
    const hasDontAcceptOddsChangesSetting = useRecoilValue(hasDontAcceptOddsChangesSettingSelector({ oddsUpdate }));
    const hasMinMaxStakeError = useRecoilValue(hasSummaryStakeErrorSelector);
    const hasStakePerLine = useRecoilValue(hasStakePerLineSelector);
    const hasRelatedAndNonCombinableBetsWarning = useRecoilValue(hasRelatedAndNonCombinableBetsWarningSelector);
    const hasPriceWentDown = useRecoilValue(hasPriceWentDownSelector);

    const { acceptOfferMutation, isAcceptOfferLoading } = useAcceptOffer();
    const acceptLegChanges = useAcceptLegChanges();

    const isOddsOrAvailabilityChanged = hasChangedLeg && hasDontAcceptOddsChangesSetting && hasStakePerLine;
    const canAcceptAndPlaceBet = isOddsOrAvailabilityChanged || (isAcceptHigherOdds && hasPriceWentDown);

    const isLoading = isPlaceBetLoading || isOfferRequested;
    const isDisabled =
        isOfferExpired ||
        (isPlaceBetButtonDisabled && !canAcceptAndPlaceBet) ||
        hasMinMaxStakeError ||
        hasBetslipWarnings ||
        hasRelatedAndNonCombinableBetsWarning;
    const isDisabledAccept =
        isOfferRequested || isAcceptOfferLoading || (isPlaceBetButtonDisabled && !canAcceptAndPlaceBet);

    const placeBetTestId = canAcceptAndPlaceBet ? 'acceptAndPlaceBet' : isLoading ? 'processingBet' : 'placeBet';

    if (!isAuthenticated) {
        return <LoginButton />;
    }

    if (isOffered) {
        return (
            <PlaceButton
                color='green'
                testId='acceptOfferedBet'
                onClick={() => acceptOfferMutation()}
                disabled={isDisabledAccept}
            >
                <I18n langKey='betslip.offer.accept-and-place-button' defaultText='ACCEPT & PLACE BET' />
            </PlaceButton>
        );
    }

    if (!isLoading && (suspendedBetsCount > 0 || (algoSportErrorsCount > 0 && isPlaceBetError))) {
        return (
            <PlaceButton size='large' color='grey' onClick={acceptLegChanges}>
                <GrayContainer data-testid='acceptChanges'>
                    <Value>
                        <I18n langKey='betslip.accept-changes-button' defaultText='ACCEPT CHANGES' />
                    </Value>
                    <GapUp />
                    <Label>
                        <I18n
                            langKey='betslip.locked.closed.bets.message'
                            defaultText='{count} locked/closed bet(s) will be removed'
                            params={{ count: algoSportErrorsCount + suspendedBetsCount }}
                        />
                    </Label>
                </GrayContainer>
            </PlaceButton>
        );
    }

    return (
        <S_PlaceBetButton>
            <PlaceButton
                type='button'
                color='green'
                testId={placeBetTestId}
                disabled={isDisabled}
                onClick={placeBetHandler}
                loading={isLoading}
                size='large'
            >
                {canAcceptAndPlaceBet ? (
                    <I18n langKey='betslip.offer.accept-and-place-button' defaultText='ACCEPT & PLACE BET' />
                ) : isLoading ? (
                    <I18n langKey='betslip.button.inprogress' defaultText='Processing bet' />
                ) : (
                    <I18n langKey='betslip.bet-now' defaultText='PLACE BET' />
                )}
            </PlaceButton>
        </S_PlaceBetButton>
    );
};

export default PlaceBetButton;
