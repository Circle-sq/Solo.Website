import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import isEmpty from 'lodash/isEmpty';
import orderBy from 'lodash/orderBy';
import uniqBy from 'lodash/uniqBy';
import { observer } from 'mobx-react-lite';
import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useAppStateContext } from 'src/appState/AppState';
import { getCompetitionLocation } from 'src/appState/utils';
import CompetitionLocationIcon from 'src/assets/icons/competitionLocationIcon/CompetitionLocationIcon';
import { SportType } from 'src/common/enums';
import { countriesById } from 'src/config/countries';
import { request as getCompetitionLocations } from 'src/modules/sports/actions/get-competitions-locations-list';
import { competitionLocationItemsSelector } from 'src/modules/sports/selectors';
import EventsFilter from 'src/ui/common/EventsFilter/EventsFilter';
import type { EventFilterOption } from 'src/ui/common/EventsFilter/types';
import { I18n } from 'src/ui/common/Language/I18n';
import FilterDropdown from 'src/ui/crossbetting/FilterDropdown';
import { useDataCountryCompetitions } from 'src/ui/crossbetting/hooks/useDataCountryCompetitions';
import { buildCrossBetNavigationLinks } from 'src/ui/crossbetting/NavigationSidebar/buildNavigationLinks';
import type { Country } from 'src/ui/crossbetting/NavigationSidebar/types';
import { isValidCountry } from 'src/utils/common';
import { EVENT_FILTERS, SPORTS_WITH_TOURNAMENTS, TAGS, LHN_SPORTS_ORDER } from 'src/utils/constants';

interface Props {
    styles?: Record<string, unknown>;
    className?: string;
}

const CountryFilter = ({ className, styles }: Props) => {
    const {
        router,
        reduxState,
        language: { getTranslation, getTranslationsReverse },
    } = useAppStateContext();

    const dispatch = useDispatch();

    const { day, sport, countryId, sortBy } = router.route.params;
    const { countries = [], competitions = [] } = useDataCountryCompetitions();

    const competitionLocation = getCompetitionLocation(sport);

    const competitionLocations = useSelector(competitionLocationItemsSelector);

    const crossBetLinks = buildCrossBetNavigationLinks(
        competitions,
        competitionLocations,
        sport as SportType,
        getTranslation,
        getTranslationsReverse,
    );

    useEffect(() => {
        if (sport !== SportType.All) {
            dispatch(getCompetitionLocations({ sport }));
        }
    }, [sport]);

    useEffect(() => {
        const {
            params: { sport, day, countryId, sortBy },
            name,
        } = router.route;

        router.redirect(name, { sport, day, countryId, sortBy });
    }, [sport, day, countryId, router, sortBy]);

    const defaultOption = useMemo(
        () => ({
            label: getTranslation('crossbetting.filter.default.label', 'All'),
            icon: <CompetitionLocationIcon location={undefined} sport={sport} />,
            value: undefined,
        }),
        [sport],
    );

    const countriesDependency = JSON.stringify(countries);
    const crossBetLinksDependency = JSON.stringify(crossBetLinks.map((link) => link.key));

    const [allCountryOption, ...countryOptions] = useMemo(() => {
        const countryList =
            countries?.map((item: Country) => ({
                label: getTranslation(countriesById[item.id], countriesById[item.id]),
                value: item.id,
                count: item.count,
                icon: (
                    <CompetitionLocationIcon
                        location={item.id}
                        sport={sport}
                        locationIcon={reduxState.getCompetitionLocationIconUrl(competitionLocation.tag, item.id)}
                    />
                ),
            })) || [];

        return [{ ...defaultOption }, ...countryList] as EventFilterOption[];
    }, [countriesDependency, defaultOption]);

    const allSportsOptions = useMemo(() => {
        const uniqueCountries = uniqBy(countryOptions, 'value');

        const {
            first = [],
            second = [],
            rest = [],
        } = groupBy(uniqueCountries, (country) => {
            if (country.value === LHN_SPORTS_ORDER.WRL) {
                return 'first';
            }

            if (country.value === LHN_SPORTS_ORDER.KOR) {
                return 'second';
            }

            return 'rest';
        });

        return [allCountryOption, ...first, ...second, ...orderBy(rest, ['count'], ['desc'])];
    }, [countriesDependency]);

    const selectedSportOptions: EventFilterOption[] = useMemo(
        () =>
            crossBetLinks.reduce(
                (acc: EventFilterOption[], link) => {
                    const label = get(link, 'label', '');
                    const value = get(link, 'countryId', '');
                    const count = get(link, 'totalEventsCounter', 0);
                    const sportResult = sport || get(link, 'children[0].params.sport', '');

                    const isCategoryCompetition =
                        !SPORTS_WITH_TOURNAMENTS.includes(sportResult) && !isValidCountry(label);

                    let competitionTag = competitionLocation.tag;

                    if (typeof label === 'string' && isCategoryCompetition) {
                        competitionTag = TAGS.Category;
                    }

                    acc.push({
                        label,
                        value,
                        count,
                        icon: (
                            <CompetitionLocationIcon
                                location={value}
                                sport={sport}
                                locationIcon={reduxState.getCompetitionLocationIconUrl(competitionTag, value)}
                            />
                        ),
                    });

                    return acc;
                },
                [{ ...defaultOption, icon: <CompetitionLocationIcon location={undefined} sport={sport} /> }],
            ),
        [crossBetLinksDependency, sport],
    );

    const selectedCountry = useMemo(
        () => selectedSportOptions.find((item) => item.value === countryId),
        [countryId, selectedSportOptions],
    );

    const countryLabel = countryId
        ? getTranslation(countriesById[countryId], countriesById[countryId])
        : getTranslation('crossbetting.filter.default.label', 'All');

    const countryValue = !isEmpty(selectedCountry)
        ? selectedCountry
        : {
              label: countryLabel,
              value: countryId,
              icon: (
                  <CompetitionLocationIcon
                      location={countryId}
                      sport={sport}
                      locationIcon={reduxState.getCompetitionLocationIconUrl(competitionLocation.tag, countryId)}
                  />
              ),
          };

    const countryFilterOptions = sport === SportType.All ? allSportsOptions : selectedSportOptions;

    return (
        <EventsFilter
            name={EVENT_FILTERS.country}
            options={countryFilterOptions}
            value={countryValue}
            maxMenuHeight={1000}
            minMenuHeight={0}
            placeholder={<I18n langKey='crossbetting.filters.dropdown.placeholder' defaultText='All' />}
            component={FilterDropdown}
            styles={styles}
            className={className}
        />
    );
};

export default observer(CountryFilter);
