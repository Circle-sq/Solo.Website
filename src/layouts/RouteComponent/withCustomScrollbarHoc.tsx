import { useWindowWidth } from '@sc-hooks';
import includes from 'lodash/includes';
import type { FunctionComponent, PropsWithChildren } from 'react';
import { useCallback } from 'react';

import { RouteName } from 'src/common/enums';
import ScrollTopButton from 'src/ui/common/ScrollTopButton/ScrollTopButton';
import MainCustomScrollbar from 'src/ui/containers/MainCustomScrollbar/MainCustomScrollbar';

const isRouteWithCustomScrollbar = (routeName: string) =>
    includes(
        [RouteName.Event, RouteName.Competition, RouteName.Sport, RouteName.Country, RouteName.CrossBetting],
        routeName,
    );

const WithCustomScrollbarHoc = <P,>(Component: FunctionComponent<PropsWithChildren<P>>) => {
    const WithCustomScrollbarHoc = (props: P & { routeName: string }) => {
        const { isMobile } = useWindowWidth();

        const scrollToTop = useCallback(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, []);

        if (isMobile) {
            return (
                <>
                    <Component {...props} />
                    <ScrollTopButton onClick={scrollToTop} />
                </>
            );
        }

        if (isRouteWithCustomScrollbar(props.routeName)) {
            return <Component {...props} />;
        }

        return (
            <MainCustomScrollbar>
                <Component {...props} />
            </MainCustomScrollbar>
        );
    };

    return WithCustomScrollbarHoc;
};

export default WithCustomScrollbarHoc;
