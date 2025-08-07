import isEqual from 'lodash/isEqual';
import { useState } from 'react';

import { useAppStateContext } from 'src/appState/AppState';
import type { LinkItem } from 'src/ui/common/AllCountries/types';
import { buildQueryUrl } from 'src/utils/Router/url';

import SportItem from './SportItem/SportItem';
import type { TopSportsLinks } from './types';

const NavigationItem = (props: { link: TopSportsLinks }) => {
    const {
        router,
        router: {
            route: { name: routeName },
            routes: routerRoutes,
        },
    } = useAppStateContext();

    const { params } = router.route;
    const { ...routeParams } = params;
    const { link } = props;
    const linkHref = buildQueryUrl(routerRoutes, routeName, {
        ...routeParams,
        ...link.params,
    });
    const activeHighlightCompetitionLink = buildQueryUrl(routerRoutes, routeName, { ...params });

    const activeLink = isEqual(linkHref, activeHighlightCompetitionLink);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <SportItem
            key={link?.params?.countryId ?? link?.params?.id ?? link.imageUrl}
            activeLink={activeLink}
            isOpen={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            link={link as LinkItem}
        />
    );
};

export default NavigationItem;
