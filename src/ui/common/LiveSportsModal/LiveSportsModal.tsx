import { useAtom } from 'jotai';
import get from 'lodash/get';
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { useOnClickOutside } from 'usehooks-ts';

import { useAppStateContext } from 'src/appState/AppState';
import type { AggregationItem } from 'src/appState/redux/types';
import { sportIconsSelector } from 'src/common/store/icons/selectors';
import { SPORT_ICONS } from 'src/config/sport-icons';
import { isLiveSportsModalOpenAtom } from 'src/store/common/atoms';
import { useActiveSportCountriesData } from 'src/ui/layouts/InPlay/hooks/useActiveSportCountriesData';
import { useInPlayLinks } from 'src/ui/layouts/InPlay/hooks/useInPlayLinks';
import { useInPlayStreamsCounters } from 'src/ui/layouts/InPlay/hooks/useInPlayStreamsCounters';
import { activeSportsToMap } from 'src/utils/common';
import { PAGE_ROUTE_NAME } from 'src/utils/constants';

import { I18n } from '../Language/I18n';
import { S_ContentIcon } from '../NavigationList/styled';

import { groupSportsByAlphabet } from './config';
import {
    S_LinkWrapper,
    S_EventsCounterContainer,
    S_LinkLabel,
    S_NavigationLink,
    S_DesktopContainer,
    S_Wrapper,
} from './styled';

const LiveSportsModal = () => {
    const {
        language: { userLang },
        reduxState,
        router: {
            route: {
                params: { id: sportId },
            },
        },
    } = useAppStateContext();
    const modalRef = useRef<HTMLDivElement>(null);

    const { streamsCounters, inPlayCounters } = useInPlayStreamsCounters();
    const { activeSports } = useActiveSportCountriesData(inPlayCounters);

    const sportIcons = useRecoilValue(sportIconsSelector);

    const [isVisible, setIsLiveSportsModalOpenAtom] = useAtom(isLiveSportsModalOpenAtom);

    const links = useInPlayLinks(sportId, activeSports, streamsCounters);

    const closeModal = () => {
        setIsLiveSportsModalOpenAtom(false);
    };

    useOnClickOutside(modalRef, closeModal);

    const getNormalizedSportList = (obj: Record<string, AggregationItem[]>) => {
        const arr = [] as AggregationItem[];

        Object.keys(obj).map((prop) => arr.push(...obj[prop]));

        return arr;
    };

    const mappedActiveSports = activeSportsToMap(reduxState);
    const groups = (): Record<string, AggregationItem[]> => groupSportsByAlphabet(mappedActiveSports, userLang);

    const sportList = getNormalizedSportList(groups());

    const isEmpty = sportList.length === 0;

    if (isEmpty) {
        return null;
    }

    const foundLiveStream = links.find((link) => link.params.id === 'live-stream');

    const mainContent = () => (
        <S_Wrapper ref={modalRef} isVisible={isVisible}>
            <S_LinkWrapper>
                {foundLiveStream !== undefined ? (
                    <S_NavigationLink
                        key={foundLiveStream.params.id}
                        route={PAGE_ROUTE_NAME.inplay}
                        params={{ id: foundLiveStream.params.id }}
                        className={foundLiveStream.icon}
                        onClick={closeModal}
                    >
                        <S_LinkLabel>
                            <I18n langKey='livefilter.live-streaming.title' defaultText='Live Streaming' />
                        </S_LinkLabel>
                        <S_EventsCounterContainer>{foundLiveStream.count}</S_EventsCounterContainer>
                    </S_NavigationLink>
                ) : null}
                {sportList.map((sport) => {
                    const { id, count, name } = sport;
                    const sportIcon = get(sportIcons, id);
                    const defaultSportIcon = SPORT_ICONS[id] ?? SPORT_ICONS.default;

                    return (
                        <S_NavigationLink
                            key={id}
                            route={PAGE_ROUTE_NAME.inplay}
                            params={{ id: id }}
                            className={sportIcon?.url ? '' : defaultSportIcon}
                            onClick={closeModal}
                        >
                            {sportIcon?.url !== undefined ? <S_ContentIcon src={sportIcon.url} isLoaded /> : null}
                            <S_LinkLabel data-testid={`nav-activeazsports-${id}`}>{name}</S_LinkLabel>
                            <S_EventsCounterContainer data-testid={`activeazsports-${id}-count`}>
                                {count}
                            </S_EventsCounterContainer>
                        </S_NavigationLink>
                    );
                })}
            </S_LinkWrapper>
        </S_Wrapper>
    );

    return <S_DesktopContainer isVisible={isVisible}>{mainContent()}</S_DesktopContainer>;
};

export default observer(LiveSportsModal);
