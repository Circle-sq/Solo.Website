import { useWindowWidth } from '@solo-hooks';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { SportsIcon, LiveSportsIcon, RightArrowIcon } from '@solo-ui/icons/svg';
import { cssColor } from '@solo-ui/system';

import { IconPositionTypes, RouteName, SportTab } from 'src/common/enums';
import { closeQuickBetTask } from 'src/ui/betting/store/tasks';
import InfoAlert from 'src/ui/common/InfoAlert/InfoAlert';
import { I18n } from 'src/ui/common/Language/I18n';
import { PAGE_ROUTE_NAME } from 'src/utils/constants';

import { hasServerSideErrorSelector } from '../../store/selectors/errors';

import { S_NavigationLabel, S_NavigationLink, S_IconWrapper, S_InfoMessage } from './styled';

const mobileLinks = [
    {
        id: SportTab.Sports,
        route: RouteName.Homepage,
        params: { id: PAGE_ROUTE_NAME.homepage },
        Icon: <SportsIcon fontSize='small' />,
        label: <I18n langKey='footer.mobile.sports.label' defaultText='Sports' />,
    },
    {
        id: SportTab.Live,
        route: RouteName.InPlay,
        params: { id: PAGE_ROUTE_NAME.betting },
        Icon: <LiveSportsIcon fontSize='small' />,
        label: <I18n langKey='footer.mobile.live-sports.label' defaultText='Live Sports' />,
    },
];

const MobileNavLinks = () => {
    const closeQuickBet = useRecoilCallback(closeQuickBetTask, []);

    return (
        <>
            {mobileLinks.map((link) => {
                const { route, params, label, id, Icon } = link;

                return (
                    <S_NavigationLink key={id} route={route} params={params} onClick={closeQuickBet}>
                        {Icon}
                        <S_NavigationLabel>{label}</S_NavigationLabel>
                        <S_IconWrapper>
                            <RightArrowIcon fontSize='xsmall' color={cssColor('--icon-generic-color')} />
                        </S_IconWrapper>
                    </S_NavigationLink>
                );
            })}
        </>
    );
};

const BetslipEmptyContent = () => {
    const { isDesktop } = useWindowWidth();

    const hasServerSideError = useRecoilValue(hasServerSideErrorSelector);

    return (
        <>
            <S_InfoMessage data-testid='validationMessage'>
                <InfoAlert
                    type='info'
                    header={<I18n langKey='betslip.header.subject' defaultText='No bets selected!' />}
                    iconPosition={IconPositionTypes.TOP}
                >
                    <I18n
                        langKey='betslip.header.nobets.selected'
                        defaultText='Browse the sportsbook and tap odds to select your bet'
                    />
                </InfoAlert>
                {hasServerSideError && (
                    <InfoAlert key='internal:server:error' type='error'>
                        <I18n
                            langKey='errors.internal-server'
                            defaultText='Sorry, we seem to have a problem. Please try again.'
                        />
                    </InfoAlert>
                )}
            </S_InfoMessage>

            {!isDesktop && <MobileNavLinks />}
        </>
    );
};

export default BetslipEmptyContent;
