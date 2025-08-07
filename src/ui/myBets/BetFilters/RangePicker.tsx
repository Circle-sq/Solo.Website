import { InfoBlueIcon } from '@sc-ui/icons/svg';

import { I18n } from 'src/ui/common/Language/I18n';
import type { DateRange, RangeType } from 'src/ui/myBets/store/types';

import DatePicker from './DatePicker';
import { parseDateFormat } from './helpers';
import { S_RangePicker, S_DateRangeInfo, S_MarginBox } from './styled';

interface Props {
    range: DateRange;
    handleDateChange: (value: Date | null, name: RangeType) => void;
}

const RangePicker = ({ range, handleDateChange }: Props) => {
    const { from = '', to = '', isValid = true } = range;

    return (
        <>
            <S_RangePicker data-testid='rangePicker'>
                <DatePicker
                    label={<I18n langKey='mybets.filter.popup.input.start.date.range.label' defaultText='Start Date' />}
                    name='from'
                    defaultValue={parseDateFormat(from)}
                    handleDateChange={handleDateChange}
                />
                <DatePicker
                    label={<I18n langKey='mybets.filter.popup.input.end.date.range.label' defaultText='End Date' />}
                    name='to'
                    defaultValue={parseDateFormat(to)}
                    handleDateChange={handleDateChange}
                />
            </S_RangePicker>
            {!isValid && (
                <S_DateRangeInfo>
                    <S_MarginBox>
                        <InfoBlueIcon fontSize='small' />
                    </S_MarginBox>
                    <I18n
                        langKey='mybets.filter.popup.range.info.label'
                        defaultText='Maximum date range is 90 days. Your date range has been updated'
                    />
                </S_DateRangeInfo>
            )}
        </>
    );
};

export default RangePicker;
