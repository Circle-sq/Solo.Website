import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import isUndefined from 'lodash/isUndefined';
import { memo, type PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { PlayIcon, HighlightsCupIcon, GolfIcon } from '@solo-ui/icons/svg';

import { useAppStateContext } from 'src/appState/AppState';
import type { SportCount } from 'src/appState/sportsList/types';
import { SportType, IconCategory, RouteName, SportTab } from 'src/common/enums';
import type { HighlightCompetition } from 'src/common/hooks/useHighlightCompetitions/useHighlightCompetitions';
import { sportIconsSelector } from 'src/common/store/icons/selectors';
import type { EventItem } from 'src/common/types/event';
import { SPORT_ICONS } from 'src/config/sport-icons';
import { iconUrlSelector } from 'src/modules/content/selectors/icons';
import { eventSelector } from 'src/modules/events/selectors';
import { sportsSportsItemsSelector } from 'src/modules/sports/selectors';
import { closeMyBetsAndQuickBetTask } from 'src/ui/betting/store/tasks';
import { I18n } from 'src/ui/common/Language/I18n';
import { S_SportIcon } from 'src/ui/common/SportsModal/styled';
import ArrowIcon from 'src/ui/events/EventGroupHeader/ArrowIcon';
import { useBetlinkGolf } from 'src/ui/sports/useBetlinkGolfFlag';

import { S_ContentIcon, S_LinkLabel } from '../../NavigationList/styled';

import {
    S_LiveLabel,
    S_MobileSportIconWrapper,
    S_NoEventsRow,
    S_SportCounter,
    S_SportRow,
    S_ExpandIconWrapper,
    S_CompetitionIconWrapper,
} from './styled';
import { isActiveSportRow } from './utils';

interface Props {
    activeTab: string;
    counters: SportCount[];
    isHighlightsExpanded: boolean;
    highlightCompetitions: HighlightCompetition[];
    streamsCounter: number;
    toggleBurgerMenu: () => void;
    toggleHighlightsExpanded: () => void;
}

const propsAreEqual = (prevProps: Props, nextProps: Props): boolean => {
    return (
        prevProps.activeTab === nextProps.activeTab &&
        prevProps.isHighlightsExpanded === nextProps.isHighlightsExpanded &&
        prevProps.streamsCounter === nextProps.streamsCounter &&
        prevProps.counters.length === nextProps.counters.length &&
        isEqual(prevProps.counters, nextProps.counters) &&
        isEqual(prevProps.highlightCompetitions, nextProps.highlightCompetitions)
    );
};

const SportsList = ({
    activeTab,
    children,
    counters,
    isHighlightsExpanded,
    highlightCompetitions,
    streamsCounter,
    toggleBurgerMenu,
    toggleHighlightsExpanded,
}: PropsWithChildren<Props>) => {
    const { router } = useAppStateContext();
    const sports = useSelector(sportsSportsItemsSelector);
    const closeMyBetsAndQuickBet = useRecoilCallback(closeMyBetsAndQuickBetTask, []);

    const sportIcons = useRecoilValue(sportIconsSelector);

    const event: EventItem = useSelector(eventSelector(+router?.route?.params?.id));

    const highlightIconUrl = useSelector(
        (state) => (platformObjectId: string) =>
            iconUrlSelector(state, { platformObjectId, category: IconCategory.Competitions }),
    );

    const { openBetlinkGolf, i18nGolfOutrights, i18nGolf } = useBetlinkGolf();

    if (!counters.length) {
        return (
            <div>
                <S_NoEventsRow>
                    <span>
                        <I18n
                            langKey='burger-menu.sports-list.no-events'
                            defaultText="Sorry, we haven't found any events with such criteria."
                        />
                    </span>
                </S_NoEventsRow>
            </div>
        );
    }

    const closeBurgerMenu = () => {
        closeMyBetsAndQuickBet();
        toggleBurgerMenu();
    };

    const isActiveCompetition = (competition: HighlightCompetition): boolean =>
        router?.route?.params?.id === competition.id && RouteName.Competition === router.route?.name;

    const redirectToCompetition = (competition: HighlightCompetition) => () => {
        if (isActiveCompetition(competition)) {
            return;
        }

        router.redirect(RouteName.Competition, {
            id: competition.id,
            slug: competition['sport.id'],
        });
        closeBurgerMenu();
    };

    const redirectToSport = (id: string) => () => {
        if (router?.route?.params?.sport === id && activeTab === router.route?.name) {
            return;
        }

        if (activeTab === SportTab.Sports || activeTab === SportTab.Live) {
            router.redirect(activeTab, {
                id,
            });
            closeBurgerMenu();
        }
    };

    const redirectToHighlights = () => {
        router.redirect(SportTab.Live, {
            id: RouteName.Betting,
        });
        closeBurgerMenu();
    };

    const redirectToStreams = () => {
        router.redirect(SportTab.Live, {
            id: RouteName.LiveStream,
        });
        closeBurgerMenu();
    };

    const getIconUrl = (name: string) => get(sportIcons, name)?.url;

    const isActiveHighlights = router.route?.name === SportTab.Live && router.route?.params?.id === RouteName.Betting;
    const isActiveStreams = router.route?.name === SportTab.Live && router.route?.params?.id === RouteName.LiveStream;
    const allSportsIconUrl = getIconUrl('sports-all');

    return (
        <div data-testid='burgerMenuMain'>
            {activeTab === SportTab.Live && (
                <>
                    <S_SportRow key='highlights' isActive={isActiveHighlights} onClick={redirectToHighlights}>
                        <S_MobileSportIconWrapper>
                            {allSportsIconUrl !== undefined ? (
                                <S_ContentIcon src={allSportsIconUrl} isLoaded />
                            ) : (
                                <S_SportIcon className={SPORT_ICONS[SportType.All]} />
                            )}
                        </S_MobileSportIconWrapper>
                        <span>
                            <I18n langKey='left-menu.highlights.title' defaultText='Highlights' />
                        </span>
                    </S_SportRow>
                    {streamsCounter > 0 && (
                        <S_SportRow key='live-streams' isActive={isActiveStreams} onClick={redirectToStreams}>
                            <S_MobileSportIconWrapper>
                                <PlayIcon fontSize='small' />
                            </S_MobileSportIconWrapper>
                            <span>
                                <I18n langKey='livefilter.live-streaming.title' defaultText='Live Streaming' />
                            </span>
                            <S_LiveLabel></S_LiveLabel>
                            <S_SportCounter>{streamsCounter}</S_SportCounter>
                        </S_SportRow>
                    )}
                </>
            )}
            {highlightCompetitions.length > 0 && (
                <>
                    <S_SportRow
                        key={'highlights'}
                        data-testid='burgerMenuHighlights'
                        onClick={toggleHighlightsExpanded}
                    >
                        <S_MobileSportIconWrapper>
                            <HighlightsCupIcon fontSize={'small'} />
                        </S_MobileSportIconWrapper>
                        <span>
                            <I18n langKey='left-menu.highlights.title' defaultText='Highlights' />
                        </span>
                        <S_LiveLabel data-testid='liveLabelSection'>
                            {highlightCompetitions.some((competition) => competition.isLive) && (
                                <I18n langKey='live.bar.link.live' defaultText='LIVE' />
                            )}
                        </S_LiveLabel>
                        <S_SportCounter data-testid='sectionCounter'>
                            {highlightCompetitions.reduce((acc, current) => acc + current.count, 0)}
                        </S_SportCounter>
                        <S_ExpandIconWrapper>
                            <ArrowIcon isOpen={isHighlightsExpanded} fontSize='xsmall' />
                        </S_ExpandIconWrapper>
                    </S_SportRow>
                    {isHighlightsExpanded &&
                        highlightCompetitions.map((competition) => {
                            const competitionIconUrl = highlightIconUrl(competition['platformObject.id']);
                            const sportId = competition['sport.id'];
                            const sportIcon = get(sportIcons, sportId as string);

                            return (
                                <S_SportRow
                                    key={competition.id}
                                    isActive={isActiveCompetition(competition)}
                                    onClick={redirectToCompetition(competition)}
                                >
                                    <S_CompetitionIconWrapper>
                                        {competitionIconUrl || sportIcon?.url ? (
                                            <S_ContentIcon src={competitionIconUrl || sportIcon?.url} isLoaded />
                                        ) : (
                                            <S_SportIcon className={SPORT_ICONS[sportId] ?? SPORT_ICONS.default} />
                                        )}
                                    </S_CompetitionIconWrapper>
                                    <S_LinkLabel title={`${competition.name}`}>{competition.name}</S_LinkLabel>
                                    <S_LiveLabel>
                                        {competition.isLive && (
                                            <I18n
                                                langKey='live.bar.link.live'
                                                defaultText='LIVE'
                                                data-testid={`liveLabel-${competition.name}`}
                                            />
                                        )}
                                    </S_LiveLabel>
                                    <S_SportCounter data-testid='eventCounter'>{competition.count}</S_SportCounter>
                                </S_SportRow>
                            );
                        })}
                </>
            )}

            {counters.map((sport) => {
                const id = sport.id as SportType;
                const name = get(sports, `${id}.name`);

                if (isUndefined(name) && id !== SportType.BetlinkGolf) {
                    return null;
                }

                const isActive = isActiveSportRow(
                    router.route,
                    activeTab,
                    id,
                    event?.sport,
                    event?.timeSettings?.started,
                );
                const sportIcon = get(sportIcons, id as string);
                let sportName: string | undefined = name;

                if (id === SportType.Golf) {
                    sportName = i18nGolfOutrights;
                }

                if (id === SportType.BetlinkGolf) {
                    sportName = i18nGolf;

                    return (
                        <S_SportRow
                            key={id}
                            onClick={() => {
                                openBetlinkGolf();
                                toggleBurgerMenu();
                            }}
                        >
                            <S_MobileSportIconWrapper>
                                <GolfIcon fontSize='small' />
                            </S_MobileSportIconWrapper>
                            <span>{sportName}</span>
                        </S_SportRow>
                    );
                }

                return (
                    <S_SportRow key={id} isActive={isActive} onClick={redirectToSport(id)}>
                        <S_MobileSportIconWrapper>
                            {sportIcon?.url ? (
                                <S_ContentIcon src={sportIcon.url} isLoaded />
                            ) : (
                                <S_SportIcon className={SPORT_ICONS[id] ?? SPORT_ICONS.default} />
                            )}
                        </S_MobileSportIconWrapper>
                        <span>{sportName}</span>
                        <S_LiveLabel>
                            {sport.live && <I18n langKey='live.bar.link.live' defaultText='LIVE' />}
                        </S_LiveLabel>
                        <S_SportCounter>{sport.count}</S_SportCounter>
                    </S_SportRow>
                );
            })}
            {children}
        </div>
    );
};

export default memo(SportsList, propsAreEqual);
