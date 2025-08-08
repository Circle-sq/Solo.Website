import { useWindowWidth } from '@solo-hooks';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import StatisticsWidget from '@solo-media/ui/widgets/StatisticsWidget/StatisticsWidget';

import { useAppStateContext } from 'src/appState/AppState';

import { SpeedBetTab } from '../../enums';
import { useElementHeight } from '../../hooks/useElementHeight';
import useMediaStatisticsInfo from '../../hooks/useMediaStatisticsInfo';
import { speedBetMarketsAtom } from '../../store/atoms';
import { resetSpeedBetMarketSelectionTask } from '../../store/tasks';

import SpeedBetBetslipWrapper from './SpeedBetBetslipWrapper/SpeedBetBetslipWrapper';
import SpeedBetCollapse from './SpeedBetCollapse/SpeedBetCollapse';
import SpeedBetTabs from './SpeedBetTabs/SpeedBetTabs';
import TabPanel from './SpeedBetTabs/TabPanel';
import { S_SpeedBet, S_SpeedBetContent } from './styled';

const SpeedBet = ({ eventId }: { eventId: number }) => {
    const {
        language: { userLangShort },
    } = useAppStateContext();

    const speedBetMarkets = useRecoilValue(speedBetMarketsAtom);

    const resetSpeedBetMarketSelection = useRecoilCallback(resetSpeedBetMarketSelectionTask, []);

    const [isOpen, setIsOpen] = useState(true);

    const { isTablet } = useWindowWidth();

    const [betslipWrapperHeight, setBetslipWrapperRef] = useElementHeight();

    const { matchId, isActiveEvent, isLiveEvent } = useMediaStatisticsInfo(eventId);

    const hasActiveMarkets = useMemo(
        () => speedBetMarkets.markets.some((market) => market.active && market.display),
        [speedBetMarkets.markets],
    );

    const isToggleEnabled = isLiveEvent || hasActiveMarkets;

    const handleToggleButton = useCallback(() => {
        if (!isToggleEnabled) {
            return;
        }

        if (isOpen) {
            resetSpeedBetMarketSelection();
        }

        setIsOpen(!isOpen);
    }, [isOpen, isToggleEnabled]);

    useEffect(() => {
        setIsOpen(isToggleEnabled);
    }, [isToggleEnabled]);

    useEffect(() => {
        return () => {
            resetSpeedBetMarketSelection();
        };
    }, []);

    return (
        <S_SpeedBet>
            <SpeedBetCollapse
                isOpen={isOpen}
                isToggleEnabled={isToggleEnabled}
                handleToggleButton={handleToggleButton}
            />

            {isOpen && (
                <>
                    {isTablet ? (
                        <>
                            <SpeedBetTabs />
                            <S_SpeedBetContent>
                                <TabPanel tab={SpeedBetTab.Statistics}>
                                    <StatisticsWidget matchId={matchId} language={userLangShort} />
                                </TabPanel>
                                <TabPanel tab={SpeedBetTab.SpeedBet}>
                                    <SpeedBetBetslipWrapper isActiveEvent={isActiveEvent} />
                                </TabPanel>
                            </S_SpeedBetContent>
                        </>
                    ) : (
                        <S_SpeedBetContent>
                            <StatisticsWidget
                                matchId={matchId}
                                height={betslipWrapperHeight}
                                language={userLangShort}
                            />
                            <SpeedBetBetslipWrapper ref={setBetslipWrapperRef} isActiveEvent={isActiveEvent} />
                        </S_SpeedBetContent>
                    )}
                </>
            )}
        </S_SpeedBet>
    );
};

export default SpeedBet;
