import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {OccurencesInput,LegsInput,IntermittentInput,DaysInput} from './AnalysisInput';
//import AnalysisType from './AnalysisType';
import Paper from '@material-ui/core/Paper';
//import ReportType from './ReportType';
import DatePicker from './DatePicker';
import {AirlineOperatorSelector,ATAMainSelector,MessagesSelector,EqIDSelector} from './Selectors';
import Report from '../Reports/Report';
import { useHistory } from "react-router-dom";
//Radio Button Imports
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
//Buttons Imports
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
    form:{
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        // width: '25ch',
        // marginBottom:20,
    },
  },
  paper: {
    // margin: 'auto',
    // width: '1200px',
    margin: '20px auto 23px 20px',
    width: '92vw',
  },
  container: {
    padding: '20px 40px',
  },
  h3:{
    margin: 'auto',
    textAlign: 'center',
  },
  Grid:{
    paddingLeft:'30px',
    margin: 'auto',
  },
  card:{
    backgroundColor: "#C5D3E0",
    textAlign: 'center',
    justify: 'center',
    padding: '5px',
  },
  formLabel:{
    fontWeight: 'bold',
    color: 'black',
    marginBottom: '20px',
  },
  analysisType:{
    margin: '20px auto 30px',
  },
  button:{
    margin:'40px auto',
    width:'70%',
    backgroundColor:"#C5D3E0",
  },
  formControl: {
    margin: theme.spacing(1),
    width:'90%',
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
}));

const Conditions = (props) => {
  const classes = useStyles();

   // ----- States and handle Functions for Radio Buttons  ----- 
   const [analysis, setAnalysisType] = useState("daily");
   const [EqID, setEqID] = useState('');

    const handleAnalysisChange = (analysis) => {
      setAnalysisType(analysis);
    };

   // ----- States and handle Functions for Date  ----- 
    const [dateFrom, setDateFrom] = useState();
    const [dateTo, setDateTo] = useState();

    const handleDateFrom = (date) => {
      setDateFrom(date);
    };

    const handleDateTo = (date) => {
      setDateTo(date);
    };

  // ----- States and handle Functions for Inputs  ----- 
    const [occurences, setOccurrences] = useState();
    const [legs, setLegs] = useState();
    const [intermittent, setIntermittent] = useState();
    const [days, setDays] = useState('0');

  const handleOccurencesChange = (occurences) =>{
    setOccurrences(occurences);
  };
  const handleLegsChange = (legs) =>{
    setLegs(legs);
  };
  const handleIntermittentChange = (intermittent) =>{
    setIntermittent(intermittent);
  };
  const handleDaysChange = (days) =>{
    setDays(days);
  };

  // ----- States and handle Functions for Selects  ----- 
  const [airline, setAilineType] = useState();
  const [ATAMain, setATAMain] = React.useState('');
  const [messagesChoice, setIncludeMessages] = React.useState('');

  const handleAirlineChange = (Airline) => {
    setAilineType(Airline);
  };

  const handleATAChange = (ATA) => {
    setATAMain(ATA);
  };

  const handleMessagesChange = (messages) => {
    setIncludeMessages(messages);
  };

  const handleEqIDChange = (eqIDList) => {
    setEqID(eqIDList);
  };
    
// ----- States and handle Functions for Generate Report  ----- 

const [reportConditions, setReportConditions] = useState(
  {
    analysis: '',
    occurences: '',
    legs: '',
    intermittent: '',
    days: '',
    operator: '',
    ata: '',
    eqID: '',
    messages: '',
    fromDate: '',
    toDate: '',
  }
 );

  const handleGenerateReport = (event) => {
    setReportConditions(
    {
      analysis: analysis,
      occurences: occurences,
      legs: legs,
      eqID: EqID,
      intermittent: intermittent,
      days: days,
      operator: airline,
      ata: ATAMain,
      messages: messagesChoice,
      fromDate: dateFrom,
      toDate: dateTo,
    });
    console.log(reportConditions);
  }    

  return (
    <div>
      <form className={classes.form}>
        <Paper className={classes.paper}>
        <div className ={classes.card}>
          <h2>REPORT ANALYSIS</h2>
        </div>
        <div className={classes.container}>
          <Grid className={classes.Grid} container spacing={3}> 
            <Grid item xs={2}>
            <div className={classes.analysisType}>
              <FormControl component="fieldset" className="form" >
              <FormLabel component="legend" className={classes.formLabel}>Analysis Type</FormLabel>
              <RadioGroup aria-label="analysis" name="analysis" value={analysis} >
                <FormControlLabel value="daily" className="RadioButton" control={
                  <Radio 
                    size="medium"
                    color = 'default'
                    onChange={()=>handleAnalysisChange("daily")} 
                  />} label="Daily" />
                <FormControlLabel value="history" control={
                  <Radio 
                  size="medium"
                  color = 'default'
                  onChange={()=>handleAnalysisChange("history")} 
                  />} label="History" />
              </RadioGroup>
              </FormControl> 
            </div>           
            </Grid>
            <Grid item xs={2}>     
              <div>
                <h3>Analysis Input</h3>   
                <OccurencesInput 
                  handleOccurencesChange = {handleOccurencesChange}
                />
                <LegsInput 
                  handleLegsChange = {handleLegsChange}
                />  
                <IntermittentInput 
                  handleIntermittentChange = {handleIntermittentChange}
                />
                <DaysInput analysis = {analysis}  handleDaysChange = {handleDaysChange}/>   
              </div>           
            </Grid>  
            <Grid item xs={5}>     
            <div>
            <h3>Raw Data Conditions</h3> 
            <AirlineOperatorSelector
                handleAirlineChange = {handleAirlineChange}  
              />         
              <MessagesSelector 
                handleMessagesChange = {handleMessagesChange}
              />   
              <ATAMainSelector 
                handleATAChange = {handleATAChange}
              />   
              <EqIDSelector 
                handleEqIDChange = {handleEqIDChange}
              />  
            </div>                    
            </Grid>       
            <Grid item xs={3}>     
            <h3>Report Date</h3> 
        
            <DatePicker 
              label = "From"
              handleDateFrom = {handleDateFrom}
            />   
            <DatePicker 
              label = "To"
              handleDateTo = {handleDateTo}
            />   
            <Button 
              variant="contained" 
              onClick = {async()=>handleGenerateReport()}
              className={classes.button}>
                Generate Report
            </Button>  
            </Grid>          
        </Grid>
      </div>
        </Paper>
      </form>
        <Report reportConditions = {reportConditions}/>
    </div>
  );
};

export default Conditions;