import React, {useState} from 'react';
import BaseLayout from './layoutComponents/BaseLayout';
import StarRate from './StarRate';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
const DateTimePickerValue = () => {
  const ratingResult = 3.8;
  const [value, setValue] = React.useState(dayjs('2022-04-17T15:30'));
   const [errorMessage, setErrorMessage] = useState('');

  const handleDateChange = (newValue) => {
    const currentDate = dayjs();
    if (newValue.isBefore(currentDate)) {
      setErrorMessage('Vui lòng chọn một ngày sau ngày hiện tại.');
    } else {
      setErrorMessage('');
      setValue(newValue);
    }
  };
  return (
    <BaseLayout>
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
            <DateTimePicker
              label="Uncontrolled picker"
              defaultValue={dayjs('2022-04-17T15:30')}
            />
            <DateTimePicker
              label="Controlled picker"
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
        
      </div>
    </BaseLayout>
  );
};

export default DateTimePickerValue;


