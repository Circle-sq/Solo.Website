import type { GroupCompetitionsByCountry } from 'src/ui/crossbetting/NavigationSidebar/types';
import type { CrossSportLink } from '../../CrossBetingSports/types';

export interface GenerationNavigationTreeType extends CrossSportLink {
    children: GroupCompetitionsByCountry[];
    imageUrl: string;
}
