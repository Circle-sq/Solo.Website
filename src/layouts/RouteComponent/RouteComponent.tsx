import { memo } from 'react';

import { RouteName } from 'src/common/enums';
import WithCustomScrollbarHoc from 'src/layouts/RouteComponent/withCustomScrollbarHoc';
import Homepage from 'src/ui/layouts/Homepage/Homepage';
import Event from 'src/ui/layouts/Event';
import InPlay from 'src/ui/layouts/InPlay/InPlay';
import AllCountriesPage from 'src/ui/layouts/AllCountriesPage';
import LeftSideNavigation from 'src/ui/layouts/LeftSideNavigation/LeftSideNavigation';
import Error from 'src/ui/layouts/Error';

const RouteComponent = ({ routeName }: { routeName: string }) => {
    switch (routeName) {
        case RouteName.Homepage:
            return <Homepage />;

        case RouteName.Competition:
            return <LeftSideNavigation />;

        case RouteName.Event:
            return <Event />;

        case RouteName.Sport:
            return <LeftSideNavigation />;

        case RouteName.Country:
            return <LeftSideNavigation />;

        case RouteName.InPlay:
            return <InPlay />;

        case RouteName.AllCountries:
            return <AllCountriesPage />;

        case RouteName.Error:
            return <Error />;

        default:
            return <Error />;
    }
};

export default memo(WithCustomScrollbarHoc(RouteComponent));
