import { Stack, Typography } from '@mui/material';
import { useAtomValue, useSetAtom } from 'jotai';

import { CrossBetIcon, InfoBlueIcon as InfoIcon, LiveSportsIcon, RightArrowIcon, SportsIcon } from '@sc-ui/icons/svg';
import { cssColor } from '@sc-ui/system';
import { useWindowWidth } from '@sc-hooks';

import { useAppStateContext } from 'src/appState/AppState';
import { RouteName } from 'src/common/enums';
import { isSearchModalOpenAtom } from 'src/store/common/atoms';
import { I18n } from 'src/ui/common/Language/I18n';

import { searchWarningAtom } from './store/atoms';
import { S_EmptyResultsWrapper, S_FullWideButton, S_WarningMessageWrapper } from './styled';
import { isStandalone } from 'src/infra.client';

const NoSearchResultsContainer = () => {
    const searchWarning = useAtomValue(searchWarningAtom);

    const { router } = useAppStateContext();
    const { isMobile } = useWindowWidth();

    const setIsSearchModalOpen = useSetAtom(isSearchModalOpenAtom);

    const handleRedirect = (route: RouteName) => {
        setIsSearchModalOpen(false);
        router.redirect(route);
    };

    return (
        <S_EmptyResultsWrapper data-testid='empty-result-container'>
            <S_WarningMessageWrapper>
                <InfoIcon color={cssColor('--alert-warning-filled-color')} fontSize='small' />
                <Typography
                    variant='body2'
                    sx={{ lineHeight: 1.1, color: cssColor('--alert-warning-filled-color') }}
                    data-testid='empty-result-message'
                >
                    {searchWarning !== null ? (
                        <I18n langKey={searchWarning.langKey} defaultText={searchWarning.defaultText} />
                    ) : (
                        <I18n
                            langKey='search.modal.events.empty'
                            defaultText='We are sorry, there are no events currently available for your input'
                        />
                    )}
                </Typography>
            </S_WarningMessageWrapper>

            <Stack spacing='12px' sx={{ alignItems: 'start' }} data-testid='empty-result-links'>
                {/* Sports Link */}
                <S_FullWideButton
                    testId={`empty-result-link-${RouteName.Homepage}`}
                    onClick={() => handleRedirect(RouteName.Homepage)}
                >
                    <SportsIcon fontSize={isMobile ? 'medium' : 'large'} />
                    <Typography variant='h1' data-testid={`empty-result-text-${RouteName.Homepage}`}>
                        <I18n langKey='search.modal.empty.link.sports' defaultText='Sports' />
                    </Typography>
                    <RightArrowIcon color={cssColor('--icon-arrow-right-color')} fontSize='small' />
                </S_FullWideButton>

                {/* Cross Betting Link */}
                {!isStandalone() && (
                    <S_FullWideButton
                        testId={`empty-result-link-${RouteName.CrossBetting}`}
                        onClick={() => handleRedirect(RouteName.CrossBetting)}
                    >
                        <CrossBetIcon fontSize={isMobile ? 'medium' : 'large'} />
                        <Typography variant='h1' data-testid={`empty-result-text-${RouteName.CrossBetting}`}>
                            <I18n langKey='search.modal.empty.link.cross' defaultText='Cross' />
                        </Typography>
                        <RightArrowIcon color={cssColor('--icon-arrow-right-color')} fontSize='small' />
                    </S_FullWideButton>
                )}

                {/* Live Sports Link */}
                <S_FullWideButton
                    testId={`empty-result-link-${RouteName.InPlay}`}
                    onClick={() => handleRedirect(RouteName.InPlay)}
                >
                    <LiveSportsIcon fontSize={isMobile ? 'xsmall' : 'small'} />
                    <Typography variant='h1' data-testid={`empty-result-text-${RouteName.InPlay}`}>
                        <I18n langKey='search.modal.empty.link.liveSports' defaultText='Live Sports' />
                    </Typography>
                    <RightArrowIcon color={cssColor('--icon-arrow-right-color')} fontSize='small' />
                </S_FullWideButton>
            </Stack>
        </S_EmptyResultsWrapper>
    );
};

export default NoSearchResultsContainer;
