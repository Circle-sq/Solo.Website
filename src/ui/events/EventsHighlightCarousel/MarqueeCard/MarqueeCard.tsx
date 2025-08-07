import Box from '@mui/material/Box';
import isNull from 'lodash/isNull';
import pick from 'lodash/pick';
import { type ReactNode } from 'react';
import { useSetRecoilState } from 'recoil';

import { SubKey } from '@sc-features/subscription-manager/subKeys';
import { SubscribeElement } from '@sc-features/subscription-manager/SubscribeElement';
import { eventMediaAtom } from '@sc-media/store/atoms';
import { LiveStreamingIcon, CupIcon } from '@sc-ui/icons/svg';
import { RedPalette, useThemeSwitchContext, ThemeNames } from '@sc-ui/system';

import type { EventModel } from 'src/appState/models/models/EventModel';
import { SCORE_SUPPORTED_MARQUEE_SPORTS, SCOREBOARD_SPORTS } from 'src/config/config';
import SpeedBetLabel from 'src/features/scoreboardWidget/ui/SpeedBet/SpeedBetLabel/SpeedBetLabel';
import EventInfographics from 'src/ui/common/EventInfographics/EventInfographics';
import { I18n } from 'src/ui/common/Language/I18n';
import EventPeriod from 'src/ui/events/EventPeriod/EventPeriod';

import CardContent from './CardContent/CardContent';
import { S_Content } from './CardContent/styled';
import {
    S_LiveWrapper,
    S_Link,
    S_Competition,
    S_Footer,
    S_Header,
    S_MarketName,
    S_Time,
    S_Button,
    S_EventName,
    S_GradientLink,
    S_LiveGradientLink,
    S_Label,
    S_GlowingLabel,
    S_GlowingLabelInner,
} from './styled';

interface TeamData {
    url: string;
    name: string;
}

interface MarketProps {
    marketId?: number;
    marketRevision?: number;
}
export interface Props {
    children: ReactNode;
    home: TeamData;
    away: TeamData;
    competitionName: ReactNode;
    isLive: boolean;
    isStreamAvailable: boolean;
    route: string;
    params: {
        id: number;
        slug?: string;
    };
    hasAmericanFormat: boolean;
    marketName?: string;
    event: EventModel;
}
const MARQUEE_CARD_MARKET_MISSING_REVISION = -18;

const MarqueeCard = (props: Props & MarketProps) => {
    const {
        route,
        params,
        children,
        home: { url: homeUrl, name: homeName },
        away: { url: awayUrl, name: awayName },
        competitionName,
        isLive,
        isStreamAvailable,
        hasAmericanFormat,
        marketName,
        event,
        marketId,
        marketRevision = MARQUEE_CARD_MARKET_MISSING_REVISION,
    } = props;

    const setEventMedia = useSetRecoilState(eventMediaAtom);

    const { themeName } = useThemeSwitchContext();

    const isSpeedBet = event.isSpeedBet;
    const isOutright = event?.isOutright ?? false;
    const isLiveOutright = isOutright && isLive;
    const isScoreSupportedEvent = SCORE_SUPPORTED_MARQUEE_SPORTS.includes(event.sport);
    const isScoreBoardEvent = SCOREBOARD_SPORTS.includes(event.sport) && isScoreSupportedEvent && isLive && !isOutright;

    const setCurrentMediaEvent = () => {
        if (isNull(event)) {
            return;
        }
        setEventMedia(pick(event, ['media', 'sport', 'id']));
    };

    const content = isScoreBoardEvent ? (
        <S_Content>
            <EventInfographics event={event} />
        </S_Content>
    ) : isOutright ? (
        <S_Content>
            <CupIcon fontSize='small' />
            <S_EventName>{event.name}</S_EventName>
        </S_Content>
    ) : (
        <CardContent
            scoreSupported={isScoreSupportedEvent}
            score={event.score}
            home={{ url: homeUrl, name: homeName }}
            away={{ url: awayUrl, name: awayName }}
            isLive={isLive}
            hasAmericanFormat={hasAmericanFormat}
        />
    );

    const isNeonTheme = themeName === ThemeNames.Neon;

    let Link = S_Link;

    if (isNeonTheme) {
        Link = isLive ? S_LiveGradientLink : S_GradientLink;
    }

    return (
        <Link route={route} params={params} onClick={setCurrentMediaEvent} testId={`eventCard-${params.id}`}>
            <S_Header>
                <S_Competition>{competitionName ?? 'NO NAME'}</S_Competition>

                {!isScoreBoardEvent && !isLiveOutright && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        {isSpeedBet && !isLive && <SpeedBetLabel isMarqueeCard />}
                        <S_Time isLive={isLive} data-testid='eventTime'>
                            <EventPeriod event={event} isCarousel />
                        </S_Time>
                    </Box>
                )}

                {isLive && (
                    <S_LiveWrapper data-testid='liveLabel'>
                        {isSpeedBet && <SpeedBetLabel isMarqueeCard />}
                        {isStreamAvailable && <LiveStreamingIcon color={RedPalette.red4} fontSize='small' />}
                        {isNeonTheme ? (
                            <S_GlowingLabel>
                                <S_GlowingLabelInner>
                                    <I18n langKey='event.live.label' defaultText='LIVE' />
                                </S_GlowingLabelInner>
                            </S_GlowingLabel>
                        ) : (
                            <S_Label>
                                <I18n langKey='event.live.label' defaultText='LIVE' />
                            </S_Label>
                        )}
                    </S_LiveWrapper>
                )}
            </S_Header>
            {content}
            <SubscribeElement
                parentId={event.id}
                id={marketId}
                subKey={SubKey.market_marquee}
                revision={marketRevision}
            >
                <S_Footer>
                    {Boolean(marketName) && <S_MarketName title={marketName}>{marketName}</S_MarketName>}
                    {isOutright ? (
                        <S_Button>
                            <I18n langKey='event.row.bet-now.label' defaultText='Bet now' />
                        </S_Button>
                    ) : (
                        children
                    )}
                </S_Footer>
            </SubscribeElement>
        </Link>
    );
};

export default MarqueeCard;
