import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import orderBy from 'lodash/orderBy';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRecoilValue } from 'recoil';

import { sportIconsSelector } from 'src/common/store/icons/selectors';
import { request as getCompetitionLocations } from 'src/modules/sports/actions/get-competitions-locations-list';
import { I18n } from 'src/ui/common/Language/I18n';

import { useGenerationNavigationTree } from './hooks/useGenerationNavigationTree';
import TopSportsNavigationPanel from './TopSportsNavigationPanel';

const TopSportsNavigationSidebar = () => {
    const dispatch = useDispatch();

    const generationNavigationTree = useGenerationNavigationTree();

    const sportsList = generationNavigationTree.map((tree) => tree.sportId);

    const orderedLinks = orderBy(generationNavigationTree, ['displayOrder', 'label'], ['desc', 'asc']);
    const sportIcons = useRecoilValue(sportIconsSelector);
    const navigationLinks = orderedLinks.map((link) => {
        const id = link.params.sport;
        const sportIcon = get(sportIcons, id);

        return {
            ...link,
            ...(!isUndefined(sportIcon) ? { imageUrl: sportIcon?.url } : {}),
        };
    });

    useEffect(() => {
        sportsList.forEach((sport) => {
            dispatch(getCompetitionLocations({ sport }));
        });
    }, [JSON.stringify(sportsList)]);

    return (
        <div className='navigation-sidebar__content'>
            {!isEmpty(navigationLinks) && (
                <TopSportsNavigationPanel
                    title={<I18n langKey='left-menu.sports-top.title' defaultText='Top Sports' />}
                    links={navigationLinks}
                    id='sports-countries'
                    isToggle={false}
                    testId='topSports'
                />
            )}
        </div>
    );
};

export default observer(TopSportsNavigationSidebar);
