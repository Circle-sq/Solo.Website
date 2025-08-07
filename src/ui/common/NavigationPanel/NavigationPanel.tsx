import some from 'lodash/some';
import { observer } from 'mobx-react-lite';
import type { PropsWithChildren, ReactElement } from 'react';

import { useAppStateContext } from 'src/appState/AppState';
import { NavPanels } from 'src/common/enums';
import CountryListItem from 'src/ui/common/CountryListItem';
import NavigationList from 'src/ui/common/NavigationList/NavigationList';
import Panel from 'src/ui/common/Panel';
import { NAV_IDS, PAGE_ROUTE_NAME } from 'src/utils/constants';
import type { Testable } from 'src/utils/Testable/types';

import { S_CountryList } from './styled';
import type { LinkItem, NestedLinkItem } from './types';

interface Props extends Testable {
    title: string | ReactElement;
    links: LinkItem[];
    id?: string;
    isToggle?: boolean;
    disabled?: boolean;
}

const NavigationPanel = ({
    title,
    links,
    id,
    isToggle,
    children,
    disabled = false,
    testId = 'allCountries',
}: PropsWithChildren<Props>) => {
    const {
        router: { route },
    } = useAppStateContext();
    const { id: routeParamsId } = route.params;

    const isLinkOpen = ({ children }: NestedLinkItem): boolean => {
        const { name: routeName, params: routeParams } = route;

        if (children !== undefined) {
            if (routeName === PAGE_ROUTE_NAME.competition) {
                const { slug, id } = routeParams;

                return some(children, { params: { slug, id } });
            }

            if (routeName === PAGE_ROUTE_NAME.country) {
                const { sportId, countryId } = routeParams;

                return some(children, { params: { sportId, countryId } });
            }
        }

        return false;
    };

    if (links === undefined) {
        return null;
    }

    const forwardPropsToPanel = typeof id === 'string' && isToggle === true;
    const panelProps = forwardPropsToPanel ? { id, isToggle, routeParamsId } : {};

    const isTopSportsPanel = id === NavPanels.Sports;

    return (
        <Panel {...panelProps} disabled={disabled} title={title} testId={testId} isCollapsible={!isTopSportsPanel}>
            {id === NAV_IDS.sportsCountries ? (
                <S_CountryList data-testid='countryList'>
                    {links.map((link: NestedLinkItem) => (
                        <li key={link.label?.toString()}>
                            <CountryListItem
                                key={JSON.stringify(link.params)}
                                link={link}
                                open={isLinkOpen(link)}
                                data-testid={link.label?.toString()}
                                sportId={link.params?.sportId}
                            />
                        </li>
                    ))}
                </S_CountryList>
            ) : (
                <NavigationList links={links}>{children}</NavigationList>
            )}
        </Panel>
    );
};

export default observer(NavigationPanel);
