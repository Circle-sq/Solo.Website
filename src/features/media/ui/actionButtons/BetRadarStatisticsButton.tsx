import { setDefaultOptions } from 'date-fns';
import find from 'lodash/find';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { type MouseEvent, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { BoldChartIcon } from '@sc-ui/icons/svg';
import { cssColor } from '@sc-ui/system';

import { useAppStateContext } from 'src/appState/AppState';
import type { EventModel } from 'src/appState/models/models/EventModel';
import type { MediaItem } from 'src/common/types/media';
import { setMediaEventId } from 'src/modules/media/actions/media';
import { S_PositionBox } from 'src/ui/events/MatchLead/styled';
import { getBetRadarStatisticUrl, langToLocale } from 'src/ui/events/MatchLead/utils';

interface Props {
    event?: EventModel | null;
    rowView?: boolean;
    fontSize?: string;
}

const BetRadarStatisticsButton = ({ event, rowView = false, fontSize = 'small' }: Props) => {
    const dispatch = useDispatch();

    const {
        language: { userLang },
    } = useAppStateContext();

    if (userLang === null) {
        const locale = langToLocale(userLang);
        setDefaultOptions({ locale });
    }

    const [hovered, setHovered] = useState(false);
    const toggleHover = () => setHovered(!hovered);

    const eventId = get(event, 'id', 0);
    let requestId: string | number | null = null;
    let statisticsWindow: null | Window = null;

    const getRequestId = (): string | number | null => {
        const betRadarStatistics = find(
            get(event, 'media.statistics'),
            (statistic: MediaItem) => statistic.provider === 'betradar',
        );

        return betRadarStatistics?.id ?? null;
    };

    if (event !== null) {
        requestId = getRequestId();
    }

    const pageUrl = getBetRadarStatisticUrl(requestId || '', userLang);

    const onLinkClick = useCallback(
        (event: MouseEvent<SVGSVGElement>) => {
            event.preventDefault();
            dispatch(setMediaEventId(eventId));

            if (!statisticsWindow || statisticsWindow.closed) {
                statisticsWindow = window.open(pageUrl, String(eventId), 'width=970, height=590');
            } else {
                statisticsWindow.focus();
            }
        },
        [pageUrl],
    );

    if (isEmpty(requestId)) {
        return null;
    }

    const getColor = (rowView: boolean, hovered: boolean): string | undefined => {
        if (!rowView || hovered) {
            return cssColor('--icon-light-color');
        }

        return cssColor('--icon-color');
    };

    return (
        <S_PositionBox rowView={rowView}>
            <BoldChartIcon
                fontSize={fontSize}
                color={getColor(rowView, hovered)}
                style={{ fillRule: hovered ? 'nonzero' : 'evenodd' }}
                onMouseEnter={toggleHover}
                onMouseLeave={toggleHover}
                onClick={onLinkClick}
            />
        </S_PositionBox>
    );
};

export default BetRadarStatisticsButton;
