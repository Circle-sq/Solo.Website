import get from 'lodash/get';
import orderBy from 'lodash/orderBy';
import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';

import { useCompetitionIconUrlQuerySelector } from '@solo-api/icons/querySelectors';

import { useAppStateContext } from 'src/appState/AppState';
import { SportType } from 'src/common/enums';
import EventsFilter from 'src/ui/common/EventsFilter/EventsFilter';
import type { EventFilterOption } from 'src/ui/common/EventsFilter/types';
import { I18n } from 'src/ui/common/Language/I18n';
import FilterDropdown from 'src/ui/crossbetting/FilterDropdown';
import { useDataCountryCompetitions } from 'src/ui/crossbetting/hooks/useDataCountryCompetitions';
import type { Competition } from 'src/ui/crossbetting/NavigationSidebar/types';
import { EVENT_FILTERS } from 'src/utils/constants';

import DefaultCupIcon from './components/DefaultCupIcon';
import { S_CustomCompetitionIcon } from './styled';

interface Props {
    styles?: Record<string, unknown>;
    className?: string;
}

const CompetitionFilter = ({ className, styles }: Props) => {
    const { router } = useAppStateContext();
    const appState = useAppStateContext();

    const { sport, countryId, competitionId } = router.route.params;

    const { competitions } = useDataCountryCompetitions();

    const defaultOption = useMemo(
        () => ({
            label: <I18n langKey='crossbetting.filter.default.label' defaultText='All' />,
            icon: <DefaultCupIcon />,
            value: undefined,
        }),
        [],
    );

    const selectedCompetition = useMemo(
        () => competitions?.find((competition) => competition.id === competitionId),
        [competitionId, competitions],
    );

    const competitionLabel = selectedCompetition?.name || (
        <I18n langKey='crossbetting.filter.default.label' defaultText='All' />
    );

    const competition = appState.models.getCompetitionModel(Number(selectedCompetition?.id));
    const platformObjectId = get(competition, ['platformObject', 'id'], '');
    const iconUrl = useCompetitionIconUrlQuerySelector(platformObjectId);

    const competitionValue = {
        value: competitionId,
        icon: iconUrl !== undefined ? <S_CustomCompetitionIcon url={iconUrl} /> : <DefaultCupIcon />,
        label: competitionLabel,
    };

    const [allCompetitionOption, ...competitionOptions] = useMemo(() => {
        const filteredEmptyCompetitions = competitions?.filter(
            (x: Competition) => x.country === countryId || countryId === undefined,
        );

        const competitionList =
            filteredEmptyCompetitions?.map((competition: Competition) => {
                const competitionModel = appState.models.getCompetitionModel(Number(competition.id));
                const platformObjectId = get(competitionModel, ['platformObject', 'id'], null);
                const iconUrl = appState.reduxState.competitionIcons.getIn([platformObjectId, 'url']);

                const icon = iconUrl !== undefined ? <S_CustomCompetitionIcon url={iconUrl} /> : <DefaultCupIcon />;

                return {
                    label: competition.name,
                    value: competition.id,
                    icon,
                    globalDisplayOrder: Number(competition.globalDisplayOrder),
                };
            }) ?? [];

        return [
            {
                ...defaultOption,
            },
            ...competitionList,
        ];
    }, [competitions, countryId, defaultOption]);

    const sortedCompetitions =
        sport === SportType.All
            ? orderBy(competitionOptions, ['globalDisplayOrder', 'label'], ['desc', 'asc'])
            : competitionOptions;

    const orderedCompetitionOptions = [allCompetitionOption, ...sortedCompetitions];

    return (
        <EventsFilter
            name={EVENT_FILTERS.competition}
            options={orderedCompetitionOptions as EventFilterOption[]}
            value={competitionValue}
            placeholder={<I18n langKey='crossbetting.filters.dropdown.placeholder' defaultText='All' />}
            component={FilterDropdown}
            maxMenuHeight={1000}
            minMenuHeight={0}
            className={className}
            styles={styles}
        />
    );
};

export default observer(CompetitionFilter);
