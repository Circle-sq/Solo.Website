import { useAtomValue } from 'jotai';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { betslipBetsCounterSelector } from '@solo-betslip/store/selectors/betslipBets';
import { possibleWinningsSelector, tabTotalStakeSelector } from '@solo-betslip/store/selectors/stake';
import { CloseIcon } from '@solo-ui/icons/svg';
import { cssColor } from '@solo-ui/system';

import type Application from 'src/app';
import { useAppStateContext } from 'src/appState/AppState';
import { isStandalone } from 'src/infra.client';
import RouteComponent from 'src/layouts/RouteComponent/RouteComponent';
import { isSearchModalOpenAtom } from 'src/store/common/atoms';
import { useBettingScrollLock } from 'src/ui/betting/hooks/useBettingScrollLock';
import QuickBet from 'src/ui/betting/QuickBet/QuickBet';
import { showMyBetsSelector, showQuickBetSelector } from 'src/ui/betting/store/selectors';
import { S_BaseOverlay } from 'src/ui/common/Backdrop/styled';
import BurgerMenu from 'src/ui/common/Header/BurgerMenu/BurgerMenu';
import { S_CloseIconWrapper } from 'src/ui/common/Header/BurgerMenu/styled';
import TabletHeader from 'src/ui/common/Header/TabletHeader';
import NavigationCloser from 'src/ui/common/NavigationCloser/NavigationCloser';
import { useBetlinkGolf } from 'src/ui/sports/useBetlinkGolfFlag';
import { SPORT_BOOK_MESSAGES } from 'src/utils/constants';

import type { BetslipUpdatePostMessage } from '../../types';

import { S_BodyWrapper, S_MainContent, S_MainWrapper, S_SideMenuWrapper } from './styled';

const ANIMATION_DURATION = 500;
const HIDDEN_MENU_OFFSET = -350;
const VISIBLE_MENU_OFFSET = 0;

const TabletMainWrapper = () => {
    const {
        router: {
            route: { name: routeName, params },
        },
    } = useAppStateContext();

    const betsCount = useRecoilValue(betslipBetsCounterSelector);
    const showQuickBet = useRecoilValue(showQuickBetSelector);
    const showMyBets = useRecoilValue(showMyBetsSelector);
    const totalStake = useRecoilValue(tabTotalStakeSelector);
    const totalPotentialReturns = useRecoilValue(possibleWinningsSelector);
    const isSearchModalOpen = useAtomValue(isSearchModalOpenAtom);

    const [showBurgerMenu, setShowBurgerMenu] = useState(false);
    const [renderBurgerMenu, setRenderBurgerMenu] = useState(false);
    const [menuOffset, setMenuOffset] = useState(`${HIDDEN_MENU_OFFSET}px`);

    const { isModalOpen } = useBetlinkGolf();

    const lastMessageRef = useRef<BetslipUpdatePostMessage | null>(null);

    const toggleBurgerMenu = useCallback(() => {
        if (showBurgerMenu) {
            setMenuOffset(`${HIDDEN_MENU_OFFSET}px`);

            setTimeout(() => {
                setRenderBurgerMenu(false);
            }, ANIMATION_DURATION);
        } else {
            setRenderBurgerMenu(true);
            setMenuOffset(`${VISIBLE_MENU_OFFSET}`);
        }

        setShowBurgerMenu((prevState) => !prevState);
    }, [showBurgerMenu]);

    const showBetslipIcon = betsCount > 0 && !showQuickBet && !showMyBets;
    const isEventRoute = !!params?.slug;
    const closeIconWrapperWidth = isModalOpen ? `${window.screen.availWidth}px` : 'auto';

    useBettingScrollLock();

    useEffect(() => {
        if (!isStandalone()) {
            return;
        }
        const app: Application = window.$app;
        const messageData: BetslipUpdatePostMessage = {
            betsCount,
            showIcon: showBetslipIcon,
        };

        if (totalStake > 0 && totalPotentialReturns > 0) {
            Object.assign(messageData, {
                stake: totalStake,
                potentialReturns: totalPotentialReturns,
            });
        }

        const hasChanged =
            !lastMessageRef.current ||
            lastMessageRef.current.betsCount !== messageData.betsCount ||
            lastMessageRef.current.showIcon !== messageData.showIcon ||
            lastMessageRef.current.stake !== messageData.stake ||
            lastMessageRef.current.potentialReturns !== messageData.potentialReturns;

        if (hasChanged) {
            lastMessageRef.current = messageData;
            app.postExternalMessage(SPORT_BOOK_MESSAGES.betslip_update, messageData);
        }
    }, [betsCount, showBetslipIcon, totalStake, totalPotentialReturns]);

    useEffect(() => {
        if (!isStandalone()) {
            return;
        }
        const app: Application = window.$app;
        app.postExternalMessage(SPORT_BOOK_MESSAGES.closed_popup, {
            betslipClosed: !showQuickBet,
            myBetsClosed: !showMyBets,
        });
    }, [showMyBets, showQuickBet]);

    useEffect(() => {
        if (isSearchModalOpen) {
            setMenuOffset(`${HIDDEN_MENU_OFFSET}px`);

            setTimeout(() => {
                setRenderBurgerMenu(false);
                setShowBurgerMenu(false);
            }, ANIMATION_DURATION);
        }
    }, [isSearchModalOpen]);

    return (
        <>
            <S_MainWrapper overlay={showBurgerMenu} isEventRoute={isEventRoute}>
                {showBurgerMenu && !isSearchModalOpen && <S_BaseOverlay />}
                <NavigationCloser />
                <TabletHeader showBurgerMenu={showBurgerMenu} toggleBurgerMenu={toggleBurgerMenu} />

                <S_BodyWrapper>
                    <S_MainContent>
                        <RouteComponent routeName={routeName} />
                    </S_MainContent>
                </S_BodyWrapper>

                <QuickBet />
            </S_MainWrapper>

            <S_SideMenuWrapper id='SideMenuWrapper' style={{ left: menuOffset }}>
                {renderBurgerMenu && (
                    <>
                        <BurgerMenu toggleBurgerMenu={toggleBurgerMenu} showBurgerMenu={showBurgerMenu} />
                        <S_CloseIconWrapper width={closeIconWrapperWidth}>
                            <CloseIcon color={cssColor('--icon-default-color')} fontSize='small' />
                        </S_CloseIconWrapper>
                    </>
                )}
            </S_SideMenuWrapper>

            <div id='modal-root'></div>
        </>
    );
};

export default observer(TabletMainWrapper);
