import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    },
    form:{
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
        marginBottom:10,
    },
    container:{
      display:'flex',
      alignItems:"center",
    },
    h3:{
      marginBottom:0,
    },
  },
}));

const AnalysisInput = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const [value, setValue] = useState();
  const [inputValue, setinputValue] = useState(
    {
     occurences: 0,
     legs: 0,
     intermittent: 0,
     days: 0,
    });
    const [occurences, setOccurences] = useState('');
    const [legs, setLegs] = useState('');
    const [intermittent, setIntermittent] = useState('');
    const [days, setDays] = useState('');

  const handleNegativeValueChange = (event) =>{
    event.target.value < 0 
  ?  setValue(event.target.value = 0) 
  :  setValue(event.target.value);
};

const handleOccurencesChange = (event) => {
  handleNegativeValueChange(event);
  setOccurences(event.target.value);
  changeConditionsState();
};

const handleLegsChange = (event) => {
  handleNegativeValueChange(event);
  setLegs(event.target.value);
  changeConditionsState();
};

const handleIntermittentChange = (event) => {
  handleNegativeValueChange(event);
  setIntermittent(event.target.value);
  changeConditionsState();
};

const handleDaysChange = (event) => {
  handleNegativeValueChange(event);
  setDays(event.target.value);
  changeConditionsState();
};

const changeConditionsState = () => {
  props.handleInputChange(
    {
      occurences: occurences,
      legs: legs,
      intermittent: intermittent,
      days: days,
     }
  );
};

  return (
    <div className={classes.container}>
    <form className={classes.form}>
      <Grid container spacing={0}>   
        <Grid item xs={12}>    
          <TextField
              id="outlined-number"
              label="Max Allowed Occurences"
              type="number"
              onChange = {handleOccurencesChange}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
        </Grid>
        <Grid item xs={12}>
            <TextField
              id="outlined-number"
              label="Max Consecutive Legs"
              type="number"
              onChange = {handleLegsChange}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
        </Grid> 
        <Grid item xs={12}>
            <TextField
              id="outlined-number"
              label="Max Allowed Intermittent"
              type="number"
              onChange = {handleIntermittentChange}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
        </Grid>
        <Grid item xs={12}>
            <TextField
              id="outlined-number"
              label="Max Consecutive Days"
              type="number"
              onChange = {handleDaysChange}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
        </Grid>      
      </Grid>
      </form>
    </div>
  );
};

export default AnalysisInput;