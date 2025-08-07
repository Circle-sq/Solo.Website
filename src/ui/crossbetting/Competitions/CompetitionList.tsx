import { addDays } from 'date-fns';
import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';

import { useAppStateContext } from 'src/appState/AppState';
import { I18n } from 'src/ui/common/Language/I18n';
import { WeekDayName } from 'src/utils/date';

import { selectedDayAtom } from '../store/atoms';

import Competitions from './Competitions';
import { S_CompetitionListItemHeader } from './styled';
import type { GroupedCrossBetEvent } from './utils';

interface Props {
    list: GroupedCrossBetEvent[];
}

const CompetitionList = ({ list }: Props) => {
    const {
        router: { route },
    } = useAppStateContext();
    const selectedDay = useRecoilValue(selectedDayAtom);
    const weekDayName = WeekDayName(addDays(new Date(), selectedDay ?? Number(route.params.day)));

    return (
        <>
            {list.map((item) => (
                <Fragment key={item.weekDayName}>
                    {weekDayName !== item.weekDayName ? (
                        <S_CompetitionListItemHeader>
                            <I18n
                                langKey={`crossbetting.competition-list.date.${item.weekDayName}`}
                                defaultText={item.weekDayName}
                            />
                            {` | ${item.date} | ( ${item.events?.length} )`}
                        </S_CompetitionListItemHeader>
                    ) : null}
                    <Competitions groupedEvents={item.events} />
                </Fragment>
            ))}
        </>
    );
};

export default CompetitionList;
