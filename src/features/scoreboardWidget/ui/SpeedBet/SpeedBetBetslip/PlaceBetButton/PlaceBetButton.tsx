import { useAtomValue } from 'jotai';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { isAuthenticatedAtom } from '@sc-account/store/atoms';
import { openLoginPopupTask } from '@sc-account/store/tasks';
import { useJotaiCallback } from '@sc-utils/jotai';

import { isStandalone } from 'src/infra.client';
import { I18n } from 'src/ui/common/Language/I18n';
import { relogin } from 'src/utils/portal-commands';

import usePlaceBet from '../../../../hooks/usePlaceBet';
import { speedBetBetslipErrorListAtom, isPossibleBetsLoadingAtom, speedBetStakeAtom } from '../../../../store/atoms';
import { setIsDisabledNumpadTask } from '../../../../store/tasks';

import Spinner from './Spinner';
import { S_PlaceBetButton } from './styled';

const PlaceBetButton = () => {
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);

    const openLoginPopup = useJotaiCallback(openLoginPopupTask);

    const betslipErrorList = useRecoilValue(speedBetBetslipErrorListAtom);
    const isPossibleBetsLoading = useRecoilValue(isPossibleBetsLoadingAtom);
    const setIsDisabledNumpad = useRecoilCallback(setIsDisabledNumpadTask, []);
    const speedBetStake = useRecoilValue(speedBetStakeAtom);

    const isDisabled = !speedBetStake || isPossibleBetsLoading || betslipErrorList.length > 0;

    const handlePlaceBet = () => {
        setIsDisabledNumpad(true);
        placeBetHandler();
    };

    const { placeBetHandler, isPending } = usePlaceBet();

    if (isStandalone() && !isAuthenticated) {
        return (
            <S_PlaceBetButton data-testid='speedBetBetslipLoginButton' onClick={relogin}>
                <I18n langKey='speedBet.betslip.loginButton' defaultText='Log In' />
            </S_PlaceBetButton>
        );
    }

    if (!isAuthenticated) {
        return (
            <S_PlaceBetButton
                data-testid='speedBetBetslipLoginButton'
                onClick={(e) => {
                    e.preventDefault();
                    openLoginPopup();
                }}
            >
                <I18n langKey='speedBet.betslip.loginButton' defaultText='Log In' />
            </S_PlaceBetButton>
        );
    }

    if (isDisabled) {
        return (
            <S_PlaceBetButton disabled={isDisabled} data-testid='speedBetBetslipDisabledButton'>
                <I18n langKey='speedBet.betslip.confirm' defaultText='Confirm' />
            </S_PlaceBetButton>
        );
    }

    if (isPending) {
        return (
            <S_PlaceBetButton isLoading={isPending} data-testid='speedBetBetslipLoadingButton'>
                <Spinner />
            </S_PlaceBetButton>
        );
    }

    return (
        <S_PlaceBetButton data-testid='speedBetBetslipConfirmButton' onClick={handlePlaceBet}>
            <I18n langKey='speedBet.betslip.confirm' defaultText='Confirm' />
        </S_PlaceBetButton>
    );
};

export default PlaceBetButton;
