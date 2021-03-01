import React from 'react';
//$ npm i --save date-fns@next @date-io/date-fns
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
//$ npm install @material-ui/pickers
import {MuiPickersUtilsProvider,KeyboardTimePicker,KeyboardDatePicker,} from '@material-ui/pickers';

const DatePicker = (props) => {

  const [selectedDate, setSelectedDate] = React.useState();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    props.handleDateFrom ? props.handleDateFrom(date) : props.handleDateTo(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker 
        style={{marginBottom: "45px"}}
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        id="date-picker-inline"
        label={props.label}
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      /> 
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;