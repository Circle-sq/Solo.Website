import { useAtom, useAtomValue } from 'jotai';
import type { MouseEvent } from 'react';

import { useSportIconUrlQuerySelector } from '@sc-api/icons/querySelectors';

import { SportType } from 'src/common/enums';
import { SPORT_ICONS } from 'src/config/sport-icons';
import { I18n } from 'src/ui/common/Language/I18n';

import { LHNTimeTab } from '../../../enums';
import { lhnSportAtom, lhnTimeTabAtom } from '../../../store/lhn';
import type { AggregatedSport } from '../../../types';

import {
    S_ContentIcon,
    S_NavEventCounter,
    S_NavIconWrapper,
    S_NavSportName,
    S_NavListItemContentWrapper,
    S_NavLiveIndicator,
    S_NavListItem,
} from './styled';

interface SportListItem {
    sport: AggregatedSport;
    isSecondLevel?: boolean;
}

const SportListItem = ({ sport, isSecondLevel }: SportListItem) => {
    const [lhnSport, setLhnSport] = useAtom(lhnSportAtom);
    const lhnTimeTab = useAtomValue(lhnTimeTabAtom);

    const iconUrl = useSportIconUrlQuerySelector(sport.id);

    const isActive = lhnSport === sport.id;

    const changeLhnSport = (e: MouseEvent) => {
        e.preventDefault();

        if (isActive) {
            return;
        }

        setLhnSport(sport.id);
    };

    if (sport.id === SportType.ESoccer) {
        return null;
    }

    const showLiveLabel = lhnTimeTab === LHNTimeTab.Today && sport.hasLiveEvents;

    return (
        <S_NavListItem
            data-testid={`sport-list-item-${sport.id}`}
            isActive={isActive}
            isSecondLevel={isSecondLevel}
            onClick={changeLhnSport}
        >
            <S_NavListItemContentWrapper>
                {iconUrl ? (
                    <S_ContentIcon src={iconUrl} isLoaded />
                ) : (
                    <S_NavIconWrapper className={SPORT_ICONS[sport.id] ?? SPORT_ICONS.default} />
                )}
                <S_NavSportName>{sport.name}</S_NavSportName>
            </S_NavListItemContentWrapper>

            <S_NavListItemContentWrapper>
                {showLiveLabel && (
                    <S_NavLiveIndicator>{<I18n langKey='live.bar.link.live' defaultText='Live' />}</S_NavLiveIndicator>
                )}
                <S_NavEventCounter>{sport.eventCount}</S_NavEventCounter>
            </S_NavListItemContentWrapper>
        </S_NavListItem>
    );
};

export default SportListItem;
