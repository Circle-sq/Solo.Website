import { useSelector } from 'react-redux';

import { IconCategory } from 'src/common/enums';
import useHighlightCompetitions from 'src/common/hooks/useHighlightCompetitions/useHighlightCompetitions';
import { SPORT_ICONS } from 'src/config/sport-icons';
import { iconUrlSelector } from 'src/modules/content/selectors/icons';
import type { LinkItem } from 'src/ui/common/NavigationPanel/types';

export const useHighlightCompetitionsLinks = () => {
    const { highlightCompetitions } = useHighlightCompetitions();

    const highlightIconUrl = useSelector(
        (state) => (platformObjectId: string) =>
            iconUrlSelector(state, { platformObjectId, category: IconCategory.Competitions }),
    );

    const highlightItems = highlightCompetitions?.map((competition) => {
        const imageUrl = highlightIconUrl(competition['platformObject.id']);

        return {
            label: competition.name,
            params: {
                id: competition.id,
                slug: competition['sport.id'],
            },
            route: 'competition',
            ...(imageUrl !== null
                ? { imageUrl }
                : { iconName: SPORT_ICONS[competition['sport.id']] ?? SPORT_ICONS['default'] }),
        } as LinkItem;
    });

    return { highlightItems };
};
