import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { DesktopDatePicker as MuiDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { enGB } from 'date-fns/locale';
import type { ReactElement } from 'react';

import DatePickerIcon from 'src/assets/icons/DatePickerIcon';
import type { RangeType } from 'src/ui/myBets/store/types';
import { DATE_FORMAT } from 'src/utils/constants';

import { StyledPopper, StyledTextField } from './styled';

const theme = createTheme({});

interface Props {
    defaultValue?: Date | null;
    label: string | ReactElement;
    name: RangeType;
    handleDateChange: (value: Date | null, name: RangeType) => void;
}

const DatePicker = ({ label, name, defaultValue, handleDateChange }: Props) => {
    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
                <MuiDatePicker
                    defaultValue={defaultValue}
                    label={label}
                    format={DATE_FORMAT.NUMERIC_DATE}
                    slots={{
                        openPickerIcon: DatePickerIcon,
                        textField: StyledTextField,
                        popper: StyledPopper,
                    }}
                    onChange={(value) => handleDateChange(value, name)}
                />
            </LocalizationProvider>
        </ThemeProvider>
    );
};

export default DatePicker;
