import isEqual from 'lodash/isEqual';
import { observer } from 'mobx-react-lite';
import type { PropsWithChildren } from 'react';

import { useAppStateContext } from 'src/appState/AppState';
import { buildQueryUrl } from 'src/utils/Router/url';
import type { LinkItem } from '../NavigationPanel/types';

import ContentImage from './ContentImage';
import { S_Wrapper } from './styled';

interface Props {
    links: LinkItem[];
}

const NavigationList = ({ links, children }: PropsWithChildren<Props>) => {
    const {
        router: {
            route: { name: routeName, params: routeParams },
            routes: routerRoutes,
        },
    } = useAppStateContext();

    return (
        <S_Wrapper>
            {links.map((link) => {
                const linkHref = buildQueryUrl(routerRoutes, routeName, { ...routeParams, ...link.params });
                const activeHighlightCompetitionLink = buildQueryUrl(routerRoutes, routeName, { ...routeParams });

                const activeLink = isEqual(linkHref, activeHighlightCompetitionLink);

                return (
                    <ContentImage
                        key={link?.params?.countryId ?? link?.params?.id ?? link.imageUrl}
                        activeLink={activeLink}
                        link={link}
                    />
                );
            })}

            {children}
        </S_Wrapper>
    );
};

export default observer(NavigationList);
