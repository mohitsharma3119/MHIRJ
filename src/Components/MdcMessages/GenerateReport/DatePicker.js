import React,{useState,Fragment} from 'react';
//$ npm i --save date-fns@next @date-io/date-fns
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
//$ npm install @material-ui/pickers
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";

const DatePicker = (props) => {
  const [selectedDate, setDate] = useState(moment());
  const [inputValue, setInputValue] = useState(moment().format("YYYY-MM-DD"));

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
      <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
        <KeyboardDatePicker 
          style={{margin: "12px 10px 10px"}}
          autoOk={true}
          //showTodayButton={true}
            value={selectedDate}
            format="YYYY-MM-DD"
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