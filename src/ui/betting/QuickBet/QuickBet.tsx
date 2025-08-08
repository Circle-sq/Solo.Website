import { Portal } from '@mui/base';
import { Box } from '@mui/material';
import { useEffect, useRef } from 'react';
import { Transition } from 'react-transition-group';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import Betslip from '@solo-betslip/ui/Betslip';
import { DarkBluePalette } from '@solo-ui/system';

import { useAppStateContext } from 'src/appState/AppState';

import { quickBetAnimationStateSelector } from '../store/selectors';
import { closeQuickBetTask } from '../store/tasks';
import { QuickBetAnimationState } from '../store/types';
import { ANIMATION_DURATION_MS, ANIMATIONS_STYLES } from '../utils/constants';
import { disableScroll, dispatchStateEvent, enableScroll, getAnimationDuration } from '../utils/quickBet';

import QuickBetHighlights from './QuickBetHighlights';
import { S_QuickBet, S_QuickBetBackdrop } from './styled';

const QuickBet = () => {
    const {
        language: { getTranslation },
    } = useAppStateContext();

    const betslipRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);

    const quickBetAnimationState = useRecoilValue(quickBetAnimationStateSelector);
    const previousQuickBetAnimationState = useRef<QuickBetAnimationState>(quickBetAnimationState);

    const isOpen = quickBetAnimationState === QuickBetAnimationState.Open;
    const animationStyles = ANIMATIONS_STYLES[quickBetAnimationState];
    const animationDuration = getAnimationDuration(previousQuickBetAnimationState.current, quickBetAnimationState);

    const closeQuickBet = useRecoilCallback(closeQuickBetTask, []);

    useEffect(() => {
        previousQuickBetAnimationState.current = quickBetAnimationState;
    }, [quickBetAnimationState]);

    useEffect(() => {
        const handler = (open: boolean) => {
            if (open) {
                disableScroll();
            } else {
                enableScroll();
            }

            dispatchStateEvent(open);
        };

        handler(isOpen);

        return () => {
            handler(false);
        };
    }, [isOpen]);

    useEffect(() => {
        return () => {
            closeQuickBet();
        };
    }, [closeQuickBet]);

    return (
        <Portal>
            <S_QuickBet
                data-testid='quickbet'
                className='quickbet'
                style={animationStyles}
                duration={animationDuration}
            >
                <QuickBetHighlights />

                <Transition nodeRef={betslipRef} in={isOpen} enter={false} timeout={ANIMATION_DURATION_MS}>
                    {(state) => (
                        <Box
                            id='quickbet-scrollable'
                            ref={betslipRef}
                            sx={{
                                flex: 1,
                                overflowY: 'auto',
                                display: state === 'exited' ? 'none' : 'block',
                                scrollbarWidth: 'thin',
                                scrollbarColor: `${DarkBluePalette.darkBlue4} ${DarkBluePalette.darkBlue2}`,
                                overscrollBehavior: 'none',
                            }}
                        >
                            <Betslip />
                        </Box>
                    )}
                </Transition>
            </S_QuickBet>

            <Transition unmountOnExit nodeRef={backdropRef} in={isOpen} enter={false} timeout={ANIMATION_DURATION_MS}>
                <S_QuickBetBackdrop
                    ref={backdropRef}
                    role='button'
                    aria-label={getTranslation('navigation.frame.title.close', 'Click to close')}
                    tabIndex={-1}
                    onClick={closeQuickBet}
                />
            </Transition>
        </Portal>
    );
};

export default QuickBet;
