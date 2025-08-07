import type { ReactElement } from 'react';

import { useAppStateContext } from 'src/appState/AppState';
import Panel from 'src/ui/common/Panel';

import NavigationItem from './NavigationItem';
import { S_SportsWrapper } from './styled';
import type { TopSportsLinks } from './types';

interface Props {
    id: string;
    isToggle: boolean;
    links: TopSportsLinks[];
    testId: string;
    title: ReactElement;
}

const TopSportsNavigationPanel = (props: Props) => {
    const {
        router: { route },
    } = useAppStateContext();
    const { params: routeParams } = route;

    const { title, links, id, isToggle, testId = 'topSports' } = props;
    const { sport: routeParamsId } = routeParams;

    if (!links) {
        return null;
    }

    const forwardPropsToPanel = typeof id === 'string' && isToggle === true;
    const panelProps = forwardPropsToPanel ? { id, routeParamsId } : {};

    return (
        <Panel {...panelProps} title={title} testId={testId}>
            <S_SportsWrapper data-testid='sportList'>
                {links.map((sportLink: TopSportsLinks) => {
                    return <NavigationItem key={sportLink.sportId} link={sportLink} />;
                })}
            </S_SportsWrapper>
        </Panel>
    );
};

export default TopSportsNavigationPanel;
