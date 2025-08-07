import { Box, Stack, Typography } from '@mui/material';
import { useAtomValue } from 'jotai';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { currencySelector } from '@sc-account/store/selectors';
import { tabTotalStakeSelector } from '@sc-betslip/store/selectors/stake';
import { DownArrowIcon, UpArrowIcon } from '@sc-ui/icons/svg';
import { cssColor, fontWeight, typographyColor } from '@sc-ui/system';

import useTranslatedCurrency from 'src/appState/customHooks/useTranslatedCurrency';
import { I18n } from 'src/ui/common/Language/I18n';
import { amountFormatter, formatStrAmount } from 'src/utils/format';

import { useIsInitializing } from '../hooks/useIsInitializing';
import { useStableWinnings } from '../hooks/useStableWinnings';
import { quickBetAnimationStateSelector } from '../store/selectors';
import { toggleQuickBetTask } from '../store/tasks';
import { QuickBetAnimationState } from '../store/types';
import {
    ROTATION_DURATION_MS,
    ROTATION_HIGHLIGHT_COUNT,
    ROTATION_HIGHLIGHT_HEIGHT,
    ROTATION_INTERVAL_MS,
} from '../utils/constants';

import QuickBetTitle from './QuickBetTitle';
import { S_QuickBetHighlights } from './styled';

const HighlightEntry = ({ children }: { children: ReactNode }) => (
    <Typography
        noWrap
        component='span'
        variant='body2'
        sx={{ display: 'block', color: typographyColor.success, fontWeight: fontWeight.medium }}
    >
        {children}
    </Typography>
);

const QuickBetHighlights = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const interval = useRef<NodeJS.Timeout | null>(null);

    const quickBetAnimationState = useRecoilValue(quickBetAnimationStateSelector);
    const currency = useAtomValue(currencySelector);
    const translatedCurrency = useTranslatedCurrency();
    const totalStake = useRecoilValue(tabTotalStakeSelector);
    const stableWinnings = useStableWinnings();

    const formattedWinnings = formatStrAmount(amountFormatter(stableWinnings, false, currency), undefined, currency);
    const formattedTotalStake = formatStrAmount(amountFormatter(totalStake, false, currency), undefined, currency);

    const isInitializing = useIsInitializing();
    const isOpen = quickBetAnimationState === QuickBetAnimationState.Open;
    const isPreview = quickBetAnimationState === QuickBetAnimationState.Preview;

    const toggleQuickBet = useRecoilCallback(toggleQuickBetTask, []);

    const onToggle = () => {
        if (isInitializing) {
            return;
        }

        toggleQuickBet();
    };

    useEffect(() => {
        if (isPreview && totalStake && stableWinnings) {
            interval.current = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % ROTATION_HIGHLIGHT_COUNT);
            }, ROTATION_INTERVAL_MS);
        } else {
            setCurrentIndex(0);
        }

        return () => {
            if (interval.current !== null) {
                clearInterval(interval.current);
            }
        };
    }, [isPreview, totalStake, stableWinnings]);

    return (
        <S_QuickBetHighlights data-testid='footer-mobile' disabled={isInitializing} onClick={onToggle}>
            <Box
                component='span'
                sx={{
                    overflow: 'hidden',
                    flex: 1,
                    height: ROTATION_HIGHLIGHT_HEIGHT,
                    display: 'block',
                }}
            >
                <Box
                    component='span'
                    sx={{
                        display: 'block',
                        transform: `translate3d(0, -${currentIndex * ROTATION_HIGHLIGHT_HEIGHT}px, 0)`,
                        transition: `transform ${ROTATION_DURATION_MS}ms ease`,
                    }}
                >
                    <QuickBetTitle />

                    <HighlightEntry>
                        <I18n langKey='betslip.system.total-stake' defaultText='Total stake' />
                        :&nbsp;
                        <strong>
                            {formattedTotalStake} {translatedCurrency}
                        </strong>
                    </HighlightEntry>

                    <HighlightEntry>
                        <I18n langKey='betslip.system.possible.winnings' defaultText='Possible winnings' />
                        :&nbsp;
                        <strong>
                            {formattedWinnings} {translatedCurrency}
                        </strong>
                    </HighlightEntry>
                </Box>
            </Box>

            <Stack component='span' sx={{ position: 'absolute', right: 8, justifyContent: 'center' }}>
                {isOpen ? (
                    <DownArrowIcon color={cssColor('--icon-light-color')} />
                ) : (
                    <UpArrowIcon color={cssColor('--icon-light-color')} />
                )}
            </Stack>
        </S_QuickBetHighlights>
    );
};

export default QuickBetHighlights;
