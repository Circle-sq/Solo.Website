import IconButton from '@mui/material/IconButton';
import { useCallback, useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';

import { BoldChartIcon } from '@sc-ui/icons/svg';
import { GenericColors, GreyPalette } from '@sc-ui/system';

import { setMediaEventId } from 'src/modules/media/actions/media';

interface Props {
    eventId: number;
    pageUrl: string;
    rowView?: boolean;
    fontSize?: string;
}

const BetRadarWindowStatistics = ({ eventId, pageUrl, fontSize = 'small' }: Props) => {
    const dispatch = useDispatch();

    const [isInIframe, setIsInIframe] = useState(false);
    const [statisticsWindow, setStatisticsWindow] = useState<Window | null>(null);

    useEffect(() => {
        setIsInIframe(window.self !== window.top);
    }, []);

    const onLinkClick = useCallback(
        (uiEvent: MouseEvent<HTMLButtonElement>) => {
            uiEvent.preventDefault();

            if (!isInIframe) {
                dispatch(setMediaEventId(eventId));
            }

            if (!statisticsWindow || statisticsWindow.closed) {
                const newWindow = window.open(pageUrl, String(eventId), 'width=970, height=590');
                setStatisticsWindow(newWindow);
            } else {
                statisticsWindow.focus();
            }
        },
        [pageUrl, eventId, statisticsWindow],
    );

    return (
        <IconButton
            onClick={onLinkClick}
            sx={{
                padding: 0,
                color: GreyPalette.grey7,
                '&:hover': {
                    color: GenericColors.white,
                },
            }}
        >
            <BoldChartIcon fontSize={fontSize} color='currentcolor' />
        </IconButton>
    );
};

export default BetRadarWindowStatistics;
