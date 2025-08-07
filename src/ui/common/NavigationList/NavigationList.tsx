import isEqual from 'lodash/isEqual';
import { observer } from 'mobx-react-lite';
import type { PropsWithChildren } from 'react';

import { useAppStateContext } from 'src/appState/AppState';
import { SportType } from 'src/common/enums';
import { buildQueryUrl } from 'src/utils/Router/url';

import type { LinkItem } from '../AllCountries/types';

import BetLinkNavComponent from './BetLinkNavComponent';
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

                if (link.params?.id === SportType.BetlinkGolf) {
                    return (
                        <BetLinkNavComponent
                            key={link.params.id}
                            testId={`competition-${link.label}`}
                            label={link.label as string}
                            onClick={() => link.onClick?.()}
                        />
                    );
                }

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
