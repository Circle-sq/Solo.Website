import type { MouseEvent } from 'react';
import { useRecoilValue } from 'recoil';

import { RedPalette, YellowPalette } from '@sc-ui/system';

import Icon from 'src/ui/common/Icon/Icon';
import { I18n } from 'src/ui/common/Language/I18n';
import useTimer from 'src/utils/hooks/useTimer';

import useRejectOffer from '../../hooks/offer/useRejectOffer';
import { isOfferedSelector, isOfferTimeoutSelector, offerCountdownSelector } from '../../store/selectors/offer';

import { S_OfferMessage, S_OfferTimerWrapper, S_RejectButton } from './styled';

const OfferTimer = () => {
    const offerCountdown = useRecoilValue(offerCountdownSelector);
    const isOfferExpired = useRecoilValue(isOfferTimeoutSelector);
    const isOffered = useRecoilValue(isOfferedSelector);

    const { rejectOfferMutation } = useRejectOffer();

    const { time: countdown, reset } = useTimer({
        step: -1,
        endTime: 0,
        initialTime: offerCountdown,
        autoStart: isOffered && offerCountdown > 0,
    });

    const onRejectOffer = (event: MouseEvent) => {
        event.preventDefault();

        rejectOfferMutation();
        reset();
    };

    if (isOfferExpired) {
        return (
            <S_OfferTimerWrapper bgColor={RedPalette.red7}>
                <Icon name='warning_filled' color={RedPalette.red4} />

                <S_OfferMessage variant='body3' textColor={RedPalette.red4} data-testid='validationMessage'>
                    <I18n langKey='betslip.offer.error.expired' defaultText='This offer has expired' />
                </S_OfferMessage>
            </S_OfferTimerWrapper>
        );
    }

    if (isOffered) {
        return (
            <S_OfferTimerWrapper bgColor={YellowPalette.yellow2}>
                <Icon name='warning_filled' color={YellowPalette.yellow3} />

                <S_OfferMessage variant='body3' textColor={YellowPalette.yellow4} data-testid='validationMessage'>
                    <I18n
                        langKey='betslip.offer.expires-in'
                        defaultText='This offer will expire in {secs}s'
                        params={{ secs: countdown }}
                    />
                    &nbsp;
                    <S_RejectButton onClick={onRejectOffer} data-testid='rejectBetOffer'>
                        <I18n langKey='betslip.offer.expires-in-accept' defaultText='or you may reject it' />
                    </S_RejectButton>
                </S_OfferMessage>
            </S_OfferTimerWrapper>
        );
    }

    return null;
};

export default OfferTimer;
