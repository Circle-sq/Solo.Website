import { Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';

import { DownArrowIcon, UpArrowIcon } from '@solo-ui/icons/svg';
import { cssColor } from '@solo-ui/system';

import { useAppStateContext } from 'src/appState/AppState';
import { RouteName } from 'src/common/enums';
import { formatToFullDate } from 'src/common/helpers/date';
import { getWeekdayLabel } from 'src/utils/constants';
import { parseCustomDate } from 'src/utils/date';

import { ToggleButton } from '../styled';

import { S_OutrightHeaderGrouping } from './styled';

interface Props {
    competition: string;
    formattedDate: string;
    locationLabel: string;
    weekDayName: string;
    onChangeIsOpen: () => void;
    isOpenCompetition: boolean;
}

const OutrightHeader = ({
    competition,
    formattedDate,
    locationLabel,
    weekDayName,
    onChangeIsOpen,
    isOpenCompetition,
}: Props) => {
    const {
        language: { getTranslation },
        router: { route },
    } = useAppStateContext();

    const groupType =
        route.name === RouteName.Competition ? `dateGroup-${formattedDate}` : `competitionGroup-${competition}`;

    const headerGroupingName = useMemo(() => {
        if (route.name === RouteName.Competition) {
            const weekdayLabel = getWeekdayLabel(getTranslation);

            const dateObject = parseCustomDate(formattedDate);

            return `${weekdayLabel[weekDayName]} - ${formatToFullDate(dateObject)}`;
        }

        return `${locationLabel} | ${competition}`;
    }, [route.name, competition, formattedDate, locationLabel, weekDayName, getTranslation]);

    return (
        <S_OutrightHeaderGrouping data-testid={groupType} onClick={onChangeIsOpen}>
            <Typography variant='body3' noWrap>
                {headerGroupingName}
            </Typography>

            <ToggleButton data-testid='arrowIndicator'>
                {isOpenCompetition ? (
                    <UpArrowIcon fontSize='xsmall' color={cssColor('--icon-generic-color')} />
                ) : (
                    <DownArrowIcon fontSize='xsmall' color={cssColor('--icon-generic-color')} />
                )}
            </ToggleButton>
        </S_OutrightHeaderGrouping>
    );
};

export default observer(OutrightHeader);
