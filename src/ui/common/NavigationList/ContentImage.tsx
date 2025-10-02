import { CircularProgress } from '@mui/material';
import classNames from 'classnames';
import { useState } from 'react';
import isNil from 'lodash/isNil';

import { useAppStateContext } from 'src/appState/AppState';
import { useEventCounters } from 'src/appState/customHooks';
import { getCompetitionLocationLabel } from 'src/appState/utils';
import CompetitionLocationIcon from 'src/assets/icons/competitionLocationIcon/CompetitionLocationIcon';
import ESoccerIcon from 'src/assets/icons/ESoccerIcon';
import { SportType } from 'src/common/enums';
import NavigationList from 'src/ui/common/NavigationList/NavigationList';
import { S_ContentIcon, S_Counter, S_Icon, S_LinkLabel, NavigationLink } from 'src/ui/common/NavigationList/styled';
import { PAGE_ROUTE_NAME } from 'src/utils/constants';

import type { LinkItem } from '../NavigationPanel/types';

interface Props {
    link: LinkItem;
    activeLink: boolean;
}

const ContentImage = ({ link, activeLink }: Props) => {
    const {
        language: { getTranslation },
    } = useAppStateContext();

    const [isLoaded, setIsLoad] = useState(false);

    const { countEvents } = useEventCounters();
    const eventCount = countEvents(link.params?.id as string)?.count;
    const showEventCount = eventCount !== undefined && eventCount > 0 && link.route === PAGE_ROUTE_NAME.sport;

    const showDefaultESoccerIcon =
        link?.params?.slug === SportType.ESoccer && link.Icon === undefined && link.imageUrl === undefined;

    const label = <S_LinkLabel title={`${link.label}`}>{link.label}</S_LinkLabel>;

    const competitionLocationLabel = getCompetitionLocationLabel(getTranslation, link.locationKey, link.locationLabel);

    return (
        <>
            <NavigationLink
                testId={`competition-${link.label}`}
                {...link}
                className={classNames({ active: activeLink })}
            >
                {link.imageUrl && (
                    <>
                        <S_ContentIcon
                            src={link.imageUrl}
                            isLoaded={isLoaded}
                            alt={link.label as string}
                            onLoad={() => setIsLoad(true)}
                        />
                        {!isLoaded && <CircularProgress size={16} sx={{ mr: '8px' }} />}
                        {label}
                    </>
                )}
                {!isNil(link.Icon) && (
                    <>
                        <S_Icon>{link.Icon}</S_Icon>
                        {label}
                    </>
                )}
                {link.locationIcon && (
                    <>
                        <CompetitionLocationIcon
                            location={link.locationKey}
                            sport={link.sport}
                            locationIcon={link.locationIcon}
                        />
                        <S_LinkLabel title={competitionLocationLabel}>{competitionLocationLabel}</S_LinkLabel>
                    </>
                )}
                {showDefaultESoccerIcon && (
                    <>
                        <ESoccerIcon width='16' />
                        {label}
                    </>
                )}
                <S_Counter>{showEventCount ? eventCount : link.eventNumber}</S_Counter>
            </NavigationLink>
            {link.children && <NavigationList links={link.children} />}
        </>
    );
};

export default ContentImage;
