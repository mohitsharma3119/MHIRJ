import React, {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {OccurencesInput,LegsInput,IntermittentInput,DaysInput} from './AnalysisInput';
//import AnalysisType from './AnalysisType';
import Paper from '@material-ui/core/Paper';
//import ReportType from './ReportType';
import DatePicker from './DatePicker';
import {AirlineOperatorSelector,ATAMainSelector,EqIDSelector,MessagesSelector,ACSNSelector} from './Selectors';
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
    margin: 'auto',
    width: '1200px',
  },
  container: {
    padding: '40px',
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
    margin:'30px',
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
   //const [report, setReportType] = useState("daily");

    // const handleReportChange = (report) => {
    //   setReportType(report);
    //   console.log(report);
    // };

    const handleAnalysisChange = (analysis) => {
      setAnalysisType(analysis);
      //console.log(analysis);
    };

   // ----- States and handle Functions for Date  ----- 
    const [dateFrom, setDateFrom] = useState();
    const [dateTo, setDateTo] = useState();

    const handleDateFrom = (date) => {
      setDateFrom(date);
      console.log(date);
    };

    const handleDateTo = (date) => {
      setDateTo(date);
      console.log(date);
    };

  // ----- States and handle Functions for Inputs  ----- 
    const [occurences, setOccurrences] = useState();
    const [legs, setLegs] = useState();
    const [intermittent, setIntermittent] = useState();
    const [days, setDays] = useState();

  const handleOccurencesChange = (occurences) =>{
    setOccurrences(occurences);
    console.log(occurences);
  };
  const handleLegsChange = (legs) =>{
    setLegs(legs);
    console.log(legs);
  };
  const handleIntermittentChange = (intermittent) =>{
    setIntermittent(intermittent);
    console.log(intermittent);
  };
  const handleDaysChange = (days) =>{
    setDays(days);
    console.log(days);
  };

  // ----- States and handle Functions for Selects  ----- 
  const [airline, setAilineType] = useState();
  const [ATAMain, setATAMain] = React.useState('');
  //const [EqID, setEqID] = React.useState('');
  const [messagesChoice, setIncludeMessages] = React.useState('');
  //const [ACSN, setACSN] = React.useState('');

  const handleAirlineChange = (Airline) => {
    setAilineType(Airline);
    console.log(Airline);
  };

  const handleATAChange = (ATA) => {
    setATAMain(ATA);
    console.log(ATA);
  };

  // const handleACSNChange = (ACSN) => {
  //   setACSN(ACSN);
  //   console.log(ACSN);
  // }
  // const handleEqIDChange = (EqID) => {
  //   setEqID(EqID);
  //   console.log(EqID);
  // };
  const handleMessagesChange = (messages) => {
    setIncludeMessages(messages);
    console.log(messages);
  };
  
// ----- States and handle Functions for Generate Report  ----- 

const [reportConditions, setReportConditions] = React.useState(
  {
    analysis: '',
    // report: '',
    occurences: '',
    legs: '',
    intermittent: '',
    days: '',
    operator: '',
    ata: '',
    // eqID: '',
    messages: '',
    // ACSN: '',
    fromDate: '',
    toDate: '',
  }
 );

  const history = useHistory();
  useEffect(() => console.log(reportConditions), [reportConditions]);

  const handleGenerateReport = (event) => {
    setReportConditions(
      {
        analysis: analysis,
        // report: report,
        occurences: occurences,
        legs: legs,
        intermittent: intermittent,
        days: days,
        operator: airline,
        ata: ATAMain,
        // eqID: EqID,
        messages: messagesChoice,
        // ACSN: ACSN,
        fromDate: dateFrom,
        toDate: dateTo,
      },
    );
    //console.log(reportConditions);
     history.push('/report');
  };

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
                <FormControlLabel value="both" control={
                  <Radio 
                    size="medium"
                    color='default'
                    onChange={()=>handleAnalysisChange("both")} 
                  />} label="Both" />
              </RadioGroup>
              </FormControl> 
            </div>
            <div>
              {/* <FormControl component="fieldset" className="form">
                <FormLabel component="legend" className={classes.formLabel}>Report Type</FormLabel>
                <RadioGroup aria-label="analysis" name="analysis" value={report}>
                  <FormControlLabel value="history" control={
                    <Radio 
                    size="medium"
                    color='default'
                    onChange={()=>handleReportChange("history")} 
                    />} label="History" />
                  <FormControlLabel value="daily" control={
                    <Radio 
                      size="medium"
                      color='default'
                      onChange={()=>handleReportChange("daily")} 
                    />} label="Daily" />
                </RadioGroup>
                </FormControl>   */}
            </div>            
            </Grid>
            <Grid item xs={3}>     
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
            <Grid item xs={3}>     
            <div>
              <h3>Raw Data Conditions</h3> 
              <AirlineOperatorSelector
                handleAirlineChange = {handleAirlineChange}  
              />         
              <ATAMainSelector 
                handleATAChange = {handleATAChange}
              /> 
              {/* <EqIDSelector 
                handleEqIDChange = {handleEqIDChange}
              /> */}
              <MessagesSelector 
                handleMessagesChange = {handleMessagesChange}
              />
            </div>                    
            </Grid>      
            <Grid item xs={3}>     
            
            <h3>Report Date</h3> 
            {/* <ACSNSelector 
                handleACSNChange = {handleACSNChange}
            /> */}
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
              onClick = {()=>handleGenerateReport()}
              className={classes.button}>
                Generate Report
            </Button>               
          </Grid>  
        </Grid>
      </div>
        </Paper>
      </form>
    </div>
  );
};

export default Conditions;