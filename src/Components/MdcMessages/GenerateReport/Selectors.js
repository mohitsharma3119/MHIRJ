import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width:'90%',
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
  container:{
    margin: '0px 50px 0px 0px',
  },
}));

const AirlineList = ['Not Applicable','SKW'];
const ATAMainList = ['Not Applicable', 21,22,23,24,26,27,28,30,31,32,33,34,36,38,45,49,71,78];
const EqList = ['Not Applicable','B1-006902'];
const MessagesList = ['Not Applicable','Include Current Messages', 'Not Include Current Messages'];

const Selectors = (props) => {
  const classes = useStyles();

  const [airline, setAirline] = React.useState('');
  const [ATAMain, setATAMain] = React.useState('');
  const [EqID, setEqID] = React.useState('');
  const [messages, setIncludeMessages] = React.useState('');

  const handleAirlineChange = (event) => {
    setAirline(event.target.value);
    props.handleAirline(event.target.value);
  };

  const handleATAChange = (event) => {
    setATAMain(event.target.value);
    props.handleATAChange(event.target.value);
  };

  const handleEqIDChange = (event) => {
    setEqID(event.target.value);
    props.handleEqIDChange(event.target.value);
  };

  const handleMessagesChange = (event) => {
    setIncludeMessages(event.target.value);
    props.handleMessagesChange(event.target.value);
  };

  return (
    <div className={classes.container}>
          <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Airline</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={airline}
            onChange={handleAirlineChange}
            label="Airline Operator"
          >
          <MenuItem value="none"> </MenuItem>
          {AirlineList.map( item => 
            <MenuItem value={item}> {item} </MenuItem>
          )};
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">ATA Main</InputLabel> 
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={ATAMain}
            onChange={handleATAChange}
            label="ATA Main"
          >
          <MenuItem value="none"> </MenuItem>
          {ATAMainList.map( item => 
            <MenuItem value={item}> {item} </MenuItem>
          )};
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Equation ID</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={EqID}
            onChange={handleEqIDChange}
            label="Exclude Equation ID"
          >
          <MenuItem value="none"> </MenuItem>
          {EqList.map( item => 
            <MenuItem value={item}> {item} </MenuItem>
          )};
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Messages</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={messages}
            onChange={handleMessagesChange}
            label="Messages"
          >
          <MenuItem value="none"> </MenuItem>
          {MessagesList.map( item => 
            <MenuItem value={item}> {item} </MenuItem>
          )};
          </Select>
        </FormControl>
    </div>
  );
};

  export default Selectors;