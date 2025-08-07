import { useEffect } from 'react';

import { StatisticsErrorIcon } from '@sc-ui/icons/svg';

import { I18n } from 'src/ui/common/Language/I18n';

import { S_Statistics, S_Error, S_ErrorLabel } from './styled';

interface Props {
    matchId: string | null;
    height?: number;
    language: string;
}

const StatisticsWidget = ({ matchId, height, language }: Props) => {
    useEffect(() => {
        if (matchId) {
            window.SIR('addWidget', '.sr-widget-2', 'match.generalStatistics', {
                matchId,
                disableWidgetHeader: true,
                disablePeriods: true,
            });
            window.SIR('changeLanguage', language);
        }

        return () => {
            if (matchId) {
                window.SIR('removeWidget', document.querySelector('.sr-widget-2'));
            }
        };
    }, [matchId]);

    return (
        <S_Statistics height={height}>
            {matchId ? (
                <div className='sr-widget sr-widget-2' data-testid='statisticsWidget'></div>
            ) : (
                <S_Error>
                    <StatisticsErrorIcon />
                    <S_ErrorLabel>
                        <I18n langKey='speedBet.statistics.notAvailable' defaultText='No statistics available' />
                    </S_ErrorLabel>
                </S_Error>
            )}
        </S_Statistics>
    );
};

export default StatisticsWidget;
