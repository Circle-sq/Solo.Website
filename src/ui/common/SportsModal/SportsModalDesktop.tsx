import { Box } from '@mui/material';
import { useSetAtom } from 'jotai';
import isUndefined from 'lodash/isUndefined';
import { Fragment, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { useOnClickOutside } from 'usehooks-ts';

import { GolfIcon } from '@sc-ui/icons/svg';

import { useAppStateContext } from 'src/appState/AppState';
import { useEventCounters } from 'src/appState/customHooks';
import type { SportModel } from 'src/appState/redux/types';
import { SportType } from 'src/common/enums';
import { sportIconsSelector } from 'src/common/store/icons/selectors';
import { SPORT_ICONS } from 'src/config/sport-icons';
import { isSportModalOpenAtom } from 'src/store/common/atoms';
import { useBetlinkGolf } from 'src/ui/sports/useBetlinkGolfFlag';
import { MODAL_ROUTE_NAME } from 'src/utils/constants';

import { I18n } from '../Language/I18n';
import { S_ContentIcon } from '../NavigationList/styled';

import { getSportDetails } from './helpers';
import {
    S_Content,
    S_EventsCount,
    S_EventsWrapper,
    S_Label,
    S_LinkWrapper,
    S_LiveText,
    S_PanelLink,
    S_ScrolledContent,
    S_SportIcon,
    S_Window,
} from './styled';

interface Props {
    groups: Record<string, SportModel[]>;
}

const SportsModalDesktop = ({ groups }: Props) => {
    const {
        router: {
            route: {
                params: { popup },
            },
        },
    } = useAppStateContext();
    const { countEvents } = useEventCounters();

    const sportIcons = useRecoilValue(sportIconsSelector);

    const sportGroups = Object.keys(groups);

    const isLivePage = popup === MODAL_ROUTE_NAME.liveGroupedSports;
    const setSportsModal = useSetAtom(isSportModalOpenAtom);
    const sportsModalRef = useRef<HTMLDivElement | null>(null);

    const { openBetlinkGolf } = useBetlinkGolf();

    const toggleSportsModal = () => {
        setSportsModal((prevState: boolean) => !prevState);
    };

    useOnClickOutside(sportsModalRef, () => setSportsModal(false));

    return (
        <S_Window ref={sportsModalRef}>
            <S_Content styleTheme='dark'>
                <S_ScrolledContent>
                    <S_LinkWrapper data-testid='sportsModal'>
                        {sportGroups.map((groupKey: string) => {
                            const sports = groups[groupKey];

                            return (
                                <Fragment key={groupKey}>
                                    {sports.map((sport) => {
                                        const sportDetails = getSportDetails({
                                            sport,
                                            isLivePage,
                                            sportIcons,
                                            countEvents,
                                        });

                                        if (sportDetails === null) {
                                            return null;
                                        }

                                        const { sportId, count, hasLive, route, params, sportIcon, sportName } =
                                            sportDetails;

                                        if (sportId === SportType.BetlinkGolf) {
                                            return (
                                                <S_PanelLink
                                                    key={sportId}
                                                    testId={`sport-${String(sportId)}`}
                                                    onClick={() => {
                                                        setSportsModal(false);
                                                        openBetlinkGolf();
                                                    }}
                                                >
                                                    <S_Label>
                                                        <Box
                                                            sx={{
                                                                mr: '8px',
                                                            }}
                                                        >
                                                            <GolfIcon fontSize='small' />
                                                        </Box>
                                                        {sportName}
                                                    </S_Label>
                                                </S_PanelLink>
                                            );
                                        }

                                        return (
                                            <S_PanelLink
                                                onClick={toggleSportsModal}
                                                key={sportId}
                                                route={route}
                                                params={params}
                                                testId={`sport-${String(sportId)}`}
                                            >
                                                <S_Label>
                                                    {!isUndefined(sportIcon) && (
                                                        <S_ContentIcon src={sportIcon.url} isLoaded />
                                                    )}
                                                    {isUndefined(sportIcon) && (
                                                        <S_SportIcon
                                                            className={SPORT_ICONS[sportId] ?? SPORT_ICONS.default}
                                                        />
                                                    )}
                                                    {sportName}
                                                </S_Label>
                                                <S_EventsWrapper>
                                                    {hasLive && (
                                                        <S_LiveText>
                                                            <I18n langKey='live.bar.link.live' defaultText='LIVE' />
                                                        </S_LiveText>
                                                    )}
                                                    {count > 0 && <S_EventsCount>{count}</S_EventsCount>}
                                                </S_EventsWrapper>
                                            </S_PanelLink>
                                        );
                                    })}
                                </Fragment>
                            );
                        })}
                    </S_LinkWrapper>
                </S_ScrolledContent>
            </S_Content>
        </S_Window>
    );
};

export default SportsModalDesktop;
