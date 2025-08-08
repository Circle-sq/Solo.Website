import { useWindowWidth } from '@solo-hooks';
import find from 'lodash/find';
import isUndefined from 'lodash/isUndefined';
import throttle from 'lodash/throttle';
import type { RefObject } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { useAppStateContext } from 'src/appState/AppState';
import type { TimeOut } from 'src/common/types/main';
import { scrollBarTopPositionAtom } from 'src/ui/containers/MainCustomScrollbar/store/scrollBar';

import type { PopupModalState } from './types';

const TIMEOUT_SCROLL_STARTED_DELAY = 1000;
const TIMEOUT_SCROLL_STOPPED_DELAY = 3000;

interface CountersType {
    counters: {
        count: number;
        id: string;
        displayOrder: number;
        name: string;
    }[];
}

export const useModalRoute = (route: string | string[]): PopupModalState => {
    const { router } = useAppStateContext();
    const {
        route: {
            params: { popup },
        },
    } = router;

    const history = useHistory();
    const [isVisible, setModalVisibility] = useState(false);

    const onClose = () => {
        router.redirect(null, { popup: null });
    };

    const onCloseNoHistory = () => {
        history.go(-1);
    };

    useEffect(() => {
        setModalVisibility(route.includes(`${popup}`));
    }, [popup, route]);

    return { isVisible, onClose, onCloseNoHistory };
};

export const useOnClickOutside = (ref: RefObject<HTMLElement | null>, cb: (event?: Event) => void) => {
    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            if (ref.current !== null && ref.current.contains(event.target as HTMLElement)) {
                return;
            }

            cb(event);
        };

        document.addEventListener('click', handleClickOutside, true);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside, true);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [ref, cb]);
};

export const useOnClickOutsidePreventFirstClick = (ref: RefObject<HTMLElement | null>, cb: (event?: Event) => void) => {
    const isFirstClickRef = useRef(true);

    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            if (isFirstClickRef.current && ref.current !== null && !ref.current.contains(event.target as HTMLElement)) {
                isFirstClickRef.current = false;

                return;
            }

            if (ref.current !== null && ref.current.contains(event.target as HTMLElement)) {
                return;
            }

            cb(event);
        };

        document.addEventListener('click', handleClickOutside, true);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside, true);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [ref, cb]);
};

export const useInterval = (callback: () => void, delay: number | null) => {
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if (!delay && delay !== 0) {
            return;
        }

        const intervalId = setInterval(() => callbackRef.current(), delay);

        return () => clearInterval(intervalId);
    }, [delay]);
};

export function useFullscreenMode(): { fullscreenActive: boolean } {
    const [active, setActive] = useState(false);
    useEffect(() => {
        const handleChange = () => {
            setActive(document.fullscreenElement !== null);
        };
        document.addEventListener('fullscreenchange', handleChange);

        return () => document.removeEventListener('fullscreenchange', handleChange);
    }, []);

    return {
        fullscreenActive: active,
    };
}

export const useEventCounters = () => {
    const { eventsCounter } = useAppStateContext();

    const { counters: eventsCounters }: CountersType = useMemo(() => {
        return eventsCounter.getEventsCounterList('all-count', {});
    }, []);

    const { counters: liveEventsCounters }: CountersType = useMemo(() => {
        return eventsCounter.getEventsCounterList('home-count-live-highlights', {});
    }, []);

    const countEvents = useCallback(
        (sportId: string) => {
            const matchedEvent = find(eventsCounters, { id: sportId });
            const matchedLiveEvent = find(liveEventsCounters, { id: sportId });
            const count = matchedEvent?.count ?? 0;

            return { count, hasLive: !isUndefined(matchedLiveEvent) };
        },
        [eventsCounters, liveEventsCounters],
    );

    return { countEvents };
};

export const useCustomScroll = () => {
    const [isScrollStarted, setIsScrollStarted] = useState(false);
    const [isScrollStopped, setIsScrollStopped] = useState(false);
    const scrollStartedTimeout = useRef<TimeOut | null>(null);
    const scrollStoppedTimeout = useRef<TimeOut | null>(null);
    const { isMobile } = useWindowWidth();

    const setScrollTopPosition = useSetRecoilState(scrollBarTopPositionAtom);

    useEffect(() => {
        const burgerMenu = document.querySelector('#SideMenuWrapper');

        const onScroll = (event: Event) => {
            if (event.target === burgerMenu) {
                return;
            }

            if (isMobile) {
                const top =
                    (event.target as Document).scrollingElement?.scrollTop ?? (event.target as HTMLElement).scrollTop;

                setScrollTopPosition(top);
            }
            setIsScrollStarted(true);
        };

        document.addEventListener('scroll', throttle(onScroll, 300), true);

        return () => {
            setIsScrollStarted(false);
            document.removeEventListener('scroll', onScroll, true);
        };
    }, []);

    useEffect(() => {
        if (isScrollStarted) {
            scrollStartedTimeout.current = setTimeout(() => {
                setIsScrollStopped(true);
            }, TIMEOUT_SCROLL_STARTED_DELAY);
        }

        if (isScrollStopped) {
            if (scrollStartedTimeout.current !== null) {
                clearTimeout(scrollStartedTimeout.current);
            }

            scrollStoppedTimeout.current = setTimeout(() => {
                setIsScrollStopped(false);
                setIsScrollStarted(false);
            }, TIMEOUT_SCROLL_STOPPED_DELAY);
        }

        return () => {
            if (scrollStartedTimeout.current !== null) {
                clearTimeout(scrollStartedTimeout.current);
            }

            if (scrollStoppedTimeout.current !== null) {
                clearTimeout(scrollStoppedTimeout.current);
            }
        };
    }, [isScrollStarted, isScrollStopped]);

    return { isScrollStarted };
};
