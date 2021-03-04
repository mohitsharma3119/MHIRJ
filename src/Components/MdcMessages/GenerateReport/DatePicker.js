import React,{ Fragment} from 'react';
//$ npm i --save date-fns@next @date-io/date-fns
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
//$ npm install @material-ui/pickers
import {MuiPickersUtilsProvider,KeyboardTimePicker,KeyboardDatePicker,} from '@material-ui/pickers';
import MomentUtils from "@date-io/moment";
import moment from "moment";

const DatePicker = (props) => {
  const [selectedDate, setDate] = React.useState(moment());
  const [inputValue, setInputValue] = React.useState(moment().format("YYYY-MM-DD"));

  const handleDateChange = (date, value) => {
    setDate(date);
    setInputValue(value);
    props.handleDateFrom ? props.handleDateFrom(value) : props.handleDateTo(value);
  };

  const dateFormatter = str => {
    return str;
  };

  return (
    <Fragment>
      <MuiPickersUtilsProvider libInstance={moment} utils={DateFnsUtils}>
        <KeyboardDatePicker 
          style={{margin: "12px 10px 10px"}}
          autoOk={true}
            showTodayButton={false}
            value={selectedDate}
            format="yyyy-mm-dd"
            inputValue={inputValue}
            onChange={handleDateChange}
            rifmFormatter={dateFormatter}
            label={props.label}
            variant="inline"
        /> 
    </MuiPickersUtilsProvider>
    </Fragment>
  );
};

export default DatePicker;