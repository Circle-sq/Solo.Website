import { useSelector } from 'react-redux';

import SportIcon from '@solo-ui/icons/config/SportIcon';

import { IconCategory } from 'src/common/enums';
import useHighlightCompetitions from 'src/common/hooks/useHighlightCompetitions/useHighlightCompetitions';
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
                : { Icon: <SportIcon fontSize='small' sport={competition['sport.id']} /> }),
        } as LinkItem;
    });

    return { highlightItems };
};
