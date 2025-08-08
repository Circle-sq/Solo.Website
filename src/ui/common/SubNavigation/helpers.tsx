/* eslint-disable @typescript-eslint/naming-convention */
import { AZIcon, BettingRulesIcon, GlobeIcon, LiveScoreIcon, PlayIcon, SearchIcon, GolfIcon } from '@solo-ui/icons/svg';

import { SPORT_ICONS } from 'src/config/sport-icons';

import { S_AlignmentBox, S_SportIcon } from './styled';

export const getSubNavigationIconType = (icon: string, isInHeader: boolean, isDesktop: boolean) => {
    if (SPORT_ICONS.olympicgames === icon) {
        if (isInHeader) {
            return isDesktop ? `${icon} subnavhead_icon` : `${icon} subnavheadmobile_icon`;
        }

        return isDesktop ? `${icon} subnav_icon` : `${icon} subnavmobile_icon`;
    }

    return icon;
};

export const getSubNavigationIcons = (iconType: string, testId: string | undefined) => {
    if (iconType === 'theme-search') {
        return <SearchIcon data-testid={`${testId}Icon`} fontSize='large' />;
    }

    if (iconType === 'betlink-golf') {
        return <GolfIcon data-testid={`${testId}Icon`} fontSize='large' />;
    }

    if (iconType === 'theme-menu') {
        return <AZIcon data-testid={`${testId}Icon`} fontSize='large' />;
    }

    if (iconType === 'theme-icon-livescore') {
        return <LiveScoreIcon data-testid={`${testId}Icon`} fontSize='large' />;
    }

    if (iconType === 'theme-icon-bettingrules') {
        return <BettingRulesIcon data-testid={`${testId}Icon`} fontSize='large' />;
    }

    if (iconType === 'sports-globe') {
        return <GlobeIcon fontSize='large' data-testid={`${testId}Icon`} />;
    }

    if (iconType === 'sports-glyph-video-i') {
        return (
            <S_AlignmentBox>
                <PlayIcon fontSize='large' data-testid={`${testId}Icon`} />
            </S_AlignmentBox>
        );
    }

    return <S_SportIcon data-testid={`${testId}Icon`} className={iconType || SPORT_ICONS.default} />;
};
