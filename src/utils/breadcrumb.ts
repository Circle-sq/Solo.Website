import type { NestedItem } from 'src/appState/redux/ReduxStateTypes';
import { RouteName } from 'src/common/enums';

export function getCompetitionsParams(groupsList: NestedItem[], activeSport: string) {
    const defaultGroup = {
        countryId: 'N/A',
        children: [],
        competitions: 0,
        eventNumber: 0,
        key: '0',
        uuid: 'e3690dfe-b143-4395-b008-e84a45b37923',
        label: '',
    } satisfies NestedItem;
    const firstGroup = groupsList.length > 0 ? groupsList[0] : defaultGroup;
    const groupId = firstGroup.countryId;

    if (firstGroup.competitions >= 1) {
        return {
            route: RouteName.Country,
            sportId: activeSport,
            countryId: groupId,
        };
    } else {
        const firstCompetitionId = firstGroup?.children?.[0]?.id ?? '';

        return {
            route: RouteName.Competition,
            id: firstCompetitionId,
            slug: activeSport,
        };
    }
}
