import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
//Multiple select filters
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

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
  autocomplete:{
    margin: theme.spacing(0),
    width:'90%',
    minWidth: 120,
  }
}));

const AirlineList = ['SKW'];
const ATAMainList = ['ALL' , '21','22','23','24','26','27','28','30','31','32','33','34','36','38','45','49','71','78'];
const EqList = ['NONE','B1-007553','B1-246748','B1-007061','B1-006952','B1-113037','B1-005970'];
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
        <MenuItem value={item} key={item}> {item} </MenuItem>
      )};
      </Select>
    </FormControl>
  );
}

export const ATAMainSelector = (props) => {
  const classes = useStyles();
  const [ATAMain, setATAMain] = React.useState([]);

  const handleATAChange = (event, values) => {
    setATAMain(values);
    if(values.includes("ALL")){
      props.handleATAChange("ALL");
    }else{
      let ataList =  "('"+ values.join("','") +"')";
      props.handleATAChange(ataList);
    }
  };

  return(
    <Autocomplete
    className={classes.autocomplete}
    multiple
    options={ATAMainList}
    getOptionLabel={(item => item)}
    value = {ATAMain}
    filterSelectedOptions
    onChange = {handleATAChange}
    renderInput={(params) => (
      <TextField
        {...params}
        variant="outlined"
        label="ATA Main"
        placeholder="ATA Main"
        />
    )}
  />
  );
}

export const EqIDSelector = (props) => {
  const classes = useStyles();
  const [EqID, setEqID] = React.useState([]);

  const handleEqIDChange = (event, values) => {
    setEqID(values);
    if(values.includes("ALL")){
      props.handleEqIDChange("ALL");
    }
    else{
      let eqIDLIST =  "('"+ values.join("','") +"')";
      props.handleEqIDChange(eqIDLIST);
    }
  };

  return(

    <Autocomplete
        className={classes.autocomplete}
        multiple
        options={EqList}
        getOptionLabel={(item => item)}
        value = {EqID}
        filterSelectedOptions
        onChange = {handleEqIDChange}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Exclude Equation ID"
            placeholder="EqID"
            />
        )}
      />
  );
};

export const MessagesSelector = (props) => {
  const classes = useStyles();
  const [messages, setIncludeMessages] = React.useState('');

  const handleMessagesChange = (event) => {
    let value = 0;
    if(event.target.value == 'Include'){
      value = 1;
    }
    setIncludeMessages(event.target.value);
    props.handleMessagesChange(value);
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
        <MenuItem value={item} key={item} >{item} </MenuItem>
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