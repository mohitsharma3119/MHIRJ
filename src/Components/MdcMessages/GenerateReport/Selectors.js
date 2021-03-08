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

const AirlineList = ['SKW'];
const ATAMainList = ['Not Applicable', 'All' , 21,22,23,24,26,27,28,30,31,32,33,34,36,38,45,49,71,78];
const ACSNList = ['Not Applicable', 'AC10201','AC10242','AC15092'];
const EqList = ['Not Applicable','B1-006902'];
const MessagesList = ['Include', 'Exclude'];

export const AirlineOperatorSelector = (props) => {
  const classes = useStyles();
  const [airline, setAirline] = React.useState('');

  const handleAirlineChange = (event) => {
    setAirline(event.target.value);
    props.handleAirlineChange(event.target.value);
  };

  return(
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">Airline Operator</InputLabel>
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
  );
}

export const ATAMainSelector = (props) => {
  const classes = useStyles();
  const [ATAMain, setATAMain] = React.useState('');

  const handleATAChange = (event) => {
    setATAMain(event.target.value);
    props.handleATAChange(event.target.value);
  };

  return(
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
  );
}

export const EqIDSelector = (props) => {
  const classes = useStyles();
  const [EqID, setEqID] = React.useState('');

  const handleEqIDChange = (event) => {
    setEqID(event.target.value);
    props.handleEqIDChange(event.target.value);
  };

  return(
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
  );
}

export const MessagesSelector = (props) => {
  const classes = useStyles();
  const [messages, setIncludeMessages] = React.useState('');

  const handleMessagesChange = (event) => {
    setIncludeMessages(event.target.value);
    props.handleMessagesChange(event.target.value);
  };

  return(
    <FormControl variant="outlined" className={classes.formControl}>
    <InputLabel id="demo-simple-select-outlined-label">Current Messages</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={messages}
        onChange={handleMessagesChange}
        label="Current Messages"
      >
      <MenuItem value="none"> </MenuItem>
      {MessagesList.map( item => 
        <MenuItem value={item}> {item} </MenuItem>
      )};
      </Select>
    </FormControl>
  );
}

export const ACSNSelector = (props) => {
  const classes = useStyles();
  
  const [ACSN, setACSN] = React.useState('');

  const handleACSNChange = (event) => {
    setACSN(event.target.value);
    props.handleACSNChange(event.target.value);
  };

  return(
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">ACSN</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={ACSN}
        onChange={handleACSNChange}
        label="ACSN"
      >
      <MenuItem value="none"> </MenuItem>
      {ACSNList.map( item => 
        <MenuItem value={item}> {item} </MenuItem>
      )};
      </Select>
    </FormControl> 
  );
}

const Selectors = (props) => {

  return (
    <div></div>
  );
};

  export default Selectors;