import usePrevious from '@react-hook/previous';
import { useLazyEffect, useWindowWidth } from '@solo-hooks';
import { useAtomValue } from 'jotai';
import { useEffect, useRef } from 'react';
import { useRecoilCallback, useRecoilValue, useResetRecoilState } from 'recoil';

import { isAuthenticatedAtom } from '@solo-account/store/atoms';
import { enabledBuildABetIdsAtom } from '@solo-buildABet/store/atoms';

import { setShowBackdropTask } from 'src/ui/betting/store/tasks';

import useDefineBetslipActiveTab from '../hooks/useDefineBetslipActiveTab';
import { showBetReceiptSelector } from '../store/selectors/betReceipt';
import { betslipBetsCounterSelector } from '../store/selectors/betslipBets';

import BetReceipt from './betReceipt/BetReceipt';
import BetslipContent from './BetslipContent/BetslipContent';
import BetslipEmptyContent from './BetslipEmptyContent/BetslipEmptyContent';
import BetslipTabs from './BetslipTabs/BetslipTabs';
import { S_BetslipWrapper } from './styled';

const Betslip = () => {
    const betslipRef = useRef<HTMLDivElement>(null);

    const resetEnabledBuildABetEvents = useResetRecoilState(enabledBuildABetIdsAtom);
    const setShowBackdrop = useRecoilCallback(setShowBackdropTask, []);

    const betsCount = useRecoilValue(betslipBetsCounterSelector);
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const showBetReceipt = useRecoilValue(showBetReceiptSelector);

    const prevBetsCount = usePrevious(betsCount, 0);
    const { isTabletSmall } = useWindowWidth();

    useDefineBetslipActiveTab(showBetReceipt);

    useLazyEffect(() => {
        if (!isAuthenticated) {
            resetEnabledBuildABetEvents();
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (showBetReceipt && betslipRef.current !== null && isTabletSmall) {
            betslipRef.current.scrollIntoView({ block: 'start' });
        }
    }, [showBetReceipt]);

    useEffect(() => {
        if (betsCount === 0 && prevBetsCount > 0) {
            setShowBackdrop(false);
        }
    }, [betsCount]);

    if (showBetReceipt) {
        return (
            <S_BetslipWrapper ref={betslipRef}>
                <BetslipTabs />
                <BetReceipt />
            </S_BetslipWrapper>
        );
    }

    if (betsCount === 0) {
        return (
            <S_BetslipWrapper>
                <BetslipEmptyContent />
            </S_BetslipWrapper>
        );
    }

    return (
        <S_BetslipWrapper data-testid='betslip'>
            <BetslipContent />
        </S_BetslipWrapper>
    );
};

export default Betslip;
