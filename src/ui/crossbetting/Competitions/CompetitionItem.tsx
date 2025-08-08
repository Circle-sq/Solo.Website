import get from 'lodash/get';
import isNull from 'lodash/isNull';
import sortBy from 'lodash/sortBy';
import { observer } from 'mobx-react-lite';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRecoilValue } from 'recoil';

import { DownArrowIcon, UpArrowIcon } from '@solo-ui/icons/svg';
import { cssColor } from '@solo-ui/system';

import { useAppStateContext } from 'src/appState/AppState';
import type { EventModel } from 'src/appState/models/models/EventModel';
import { getCompetitionLocationInfoFromTags } from 'src/appState/utils';
import CompetitionLocationIcon from 'src/assets/icons/competitionLocationIcon/CompetitionLocationIcon';
import { IconCategory, RouteName, SportType } from 'src/common/enums';
import { competitionLocationIconUrlSelectorFamily, sportIconUrlSelectorFamily } from 'src/common/store/icons/selectors';
import { iconUrlSelector } from 'src/modules/content/selectors/icons';
import { S_ContentIcon } from 'src/ui/common/NavigationList/styled';
import {
    S_CompetitionIcon,
    S_CompetitionIconContainer,
    S_CompetitionItem,
    S_Content,
    S_Header,
} from 'src/ui/crossbetting/Competitions/styled';
import { getSportIconClassName } from 'src/ui/crossbetting/CrossBetingSports/utils';
import EventCardMobile from 'src/ui/crossbetting/EventCardMobile/EventCardMobile';
import {
    S_EventsCount,
    S_GroupName,
    S_GroupNameSeparator,
    S_GroupNameWrapper,
} from 'src/ui/events/EventGroupHeader/styled';
import { TAGS } from 'src/utils/constants';
import type { Testable } from 'src/utils/Testable/types';

import { S_CompetitionName, S_CountryName, S_SportIcon } from './styled';

interface Props extends Testable {
    competitionId: number;
    eventsList: EventModel[];
}

const CompetitionItem = ({ competitionId, eventsList }: Props) => {
    const {
        models,
        router: { route },
    } = useAppStateContext();

    const competition = models.getCompetitionModel(competitionId);
    const platformObjectId = competition?.platformObject?.id ?? null;

    const iconUrl = useSelector((state) =>
        iconUrlSelector(state, { platformObjectId, category: IconCategory.Competitions }),
    );

    const [isOpen, setIsOpen] = useState(true);

    const sortedEvents = useMemo(() => sortBy(eventsList, ['timeSettingsStartTime', 'name']), [eventsList]);

    const sportId = get(sortedEvents, '0.sport', '');
    const countryCode = get(sortedEvents, '0.tagsCountry', '');
    const eventRawData = sortedEvents[0].getRawData();

    const { tag, category, categoryLabel } = getCompetitionLocationInfoFromTags(eventRawData?.tags);

    const locationIconUrl = useRecoilValue(competitionLocationIconUrlSelectorFamily({ tag, category }));
    const sportIconUrl = useRecoilValue(sportIconUrlSelectorFamily(sportId));

    const sportIconClassName = getSportIconClassName(sportId as SportType);

    const onToggleCompetition = () => {
        setIsOpen((prevState) => !prevState);
    };

    const currentRoute = route.name as RouteName;
    const sportType = route.params.sport as SportType;
    const isSportIconForCrossBetHidden = currentRoute === RouteName.CrossBetting && sportType !== SportType.All;
    const competitionName = get(competition, 'name', '');

    return (
        <S_CompetitionItem data-testid='eventsGroup' isOpen={isOpen}>
            <S_Header data-testid='groupHeader' isOpen={isOpen} onClick={onToggleCompetition}>
                <S_GroupNameWrapper>
                    <S_GroupName>
                        {!isSportIconForCrossBetHidden && (
                            <>
                                {sportIconUrl ? (
                                    <S_ContentIcon className='crossbet-sub-nav' src={sportIconUrl} isLoaded />
                                ) : (
                                    <S_SportIcon className={sportIconClassName} />
                                )}
                                <S_GroupNameSeparator data-testid='groupNameSeparator' />
                            </>
                        )}
                        <CompetitionLocationIcon
                            sport={sportId}
                            location={tag === TAGS.Country ? countryCode : undefined}
                            locationIcon={locationIconUrl}
                        />
                        <S_CountryName data-testid='eventCountry'>{categoryLabel}</S_CountryName>
                        <S_GroupNameSeparator data-testid='groupNameSeparator' />
                        {!isNull(iconUrl) && (
                            <S_CompetitionIconContainer>
                                <S_CompetitionIcon data-testid='competitionIcon' url={iconUrl} />
                            </S_CompetitionIconContainer>
                        )}
                        <S_CompetitionName data-testid='competitionName' title={competitionName}>
                            {competitionName}
                        </S_CompetitionName>
                    </S_GroupName>
                    <S_EventsCount data-testid='eventsListCount'>( {sortedEvents.length} )</S_EventsCount>
                </S_GroupNameWrapper>
                {isOpen ? (
                    <UpArrowIcon
                        data-testid='expandEventGroup'
                        fontSize='small'
                        color={cssColor('--icon-generic-color')}
                    />
                ) : (
                    <DownArrowIcon
                        data-testid='expandEventGroup'
                        fontSize='small'
                        color={cssColor('--icon-generic-color')}
                    />
                )}
            </S_Header>

            {isOpen && (
                <S_Content data-testid='eventList'>
                    {sortedEvents.map((event) => (
                        <EventCardMobile key={event.id || event.sport} event={event} />
                    ))}
                </S_Content>
            )}
        </S_CompetitionItem>
    );
};

export default observer(CompetitionItem);
