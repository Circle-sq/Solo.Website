import { useLazyEffect, useWindowWidth } from '@sc-hooks';
import { useRecoilValue } from 'recoil';

import { showBackdropSelector } from 'src/ui/betting/store/selectors';
import { Backdrop } from 'src/ui/betting/styled';

import usePlaceBet from '../../api/placeBet/queries';
import { usePossibleBets } from '../../api/possibleBets/queries';
import { PossibleBetsTriggeredBy } from '../../enums';
import { changedPriceBetIdsAtom } from '../../store/atoms/betslipBets';
import { showBetReferralSelector } from '../../store/selectors/betReceipt';
import { showBettingSettingsSelector } from '../../store/selectors/betslip';
import { isSingleTabSelector, isSystemTabSelector } from '../../store/selectors/betslipTab';
import { hasOfferSelector } from '../../store/selectors/offer';
import { isPlaceBetLoadingSelector, showPlaceBetButtonSelector } from '../../store/selectors/placeBet';
import PlaceBetButton from '../betPlacement/PlaceBetButton';
import BetReferralEnabled from '../BetReferralEnabled/BetReferralEnabled';
import BetslipActions from '../BetslipActions/BetslipActions';
import BetslipNotifications from '../BetslipNotifications/BetslipNotifications';
import BetslipTabs from '../BetslipTabs/BetslipTabs';
import BettingSettings from '../BettingSettings/BettingSettings';
import OfferTimer from '../OfferTimer/OfferTimer';
import BetslipBetList from '../SelectionList/SelectionList';
import { S_BetslipBetList, S_MultipleBetReferralEnabled } from '../SelectionList/styled';
import { S_BetslipContent, S_FooterContainer } from '../styled';
import Summary from '../Summary/Summary';
import SystemToolbar from '../SystemToolbar/SystemToolbar';

const BetslipContent = () => {
    const { isTabletSmall } = useWindowWidth();
    const placeBetHandler = usePlaceBet();
    const { getPossibleBets } = usePossibleBets();
    const isSingleTab = useRecoilValue(isSingleTabSelector);

    const changedPriceBetIds = useRecoilValue(changedPriceBetIdsAtom);
    const hasOffer = useRecoilValue(hasOfferSelector);
    const isPlaceBetLoading = useRecoilValue(isPlaceBetLoadingSelector);
    const isSystemTab = useRecoilValue(isSystemTabSelector);
    const showBackdrop = useRecoilValue(showBackdropSelector);
    const showBetPlaceButton = useRecoilValue(showPlaceBetButtonSelector);
    const showBetReferral = useRecoilValue(showBetReferralSelector);
    const showSettings = useRecoilValue(showBettingSettingsSelector);

    const isBetslipDisabled = isPlaceBetLoading && !hasOffer;

    useLazyEffect(() => {
        getPossibleBets({ triggeredBy: PossibleBetsTriggeredBy.BetPriceChanged });
    }, [changedPriceBetIds.length]);

    return (
        <S_BetslipContent className='betslip__content' disabled={isBetslipDisabled}>
            <BetslipTabs />

            <OfferTimer />

            {isSystemTab && <SystemToolbar />}

            {isTabletSmall && showBackdrop && <Backdrop />}

            <S_BetslipBetList isMultipleSystemTabs={!isSingleTab}>
                <BetslipBetList />

                {showBetReferral && (
                    <S_MultipleBetReferralEnabled>
                        <BetReferralEnabled />
                    </S_MultipleBetReferralEnabled>
                )}
                {showSettings && <BettingSettings />}
            </S_BetslipBetList>

            <BetslipNotifications />

            <BetslipActions />

            <S_FooterContainer>
                <Summary />

                {showBetPlaceButton && <PlaceBetButton placeBetHandler={placeBetHandler} />}
            </S_FooterContainer>
        </S_BetslipContent>
    );
};

export default BetslipContent;
