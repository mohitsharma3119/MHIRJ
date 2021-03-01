import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AnalysisInput from './AnalysisInput';
import AnalysisType from './AnalysisType';
import {ButtonsReport} from './Buttons';
import Paper from '@material-ui/core/Paper';
import ReportType from './ReportType';
import DatePicker from './DatePicker';
import Selectors from './Selectors';
import { useHistory } from "react-router-dom";

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
  button:{
    margin: '30px',
  },
  card:{
    backgroundColor: "#C5D3E0",
    textAlign: 'center',
    justify: 'center',
    padding: '5px',
  },
}));

const Conditions = (props) => {

  const classes = useStyles();
  const [analysis, setAnalysisType] = useState("daily");
  const [report, setReportType] = useState("daily");
  const [inputValue, setinputValue] = useState(
   {
    occurences: 0,
    legs: 0,
    intermittent: 0,
    days: 0,
   });
   const [dateFrom, setDateFrom] = useState();
   const [dateTo, setDateTo] = useState();
   const [airline, setAilineType] = useState();
   const [ATAMain, setATAMain] = React.useState('');
   const [EqID, setEqID] = React.useState('');
   const [messagesChoice, setIncludeMessages] = React.useState('');
   const [reportConditions, setReportConditions] = React.useState(
    {
      analysisType: '',
      reportType: '',
      occurences: '',
      legs: '',
      intermittent: '',
      consecutiveDays: '',
      airlineOperator: '',
      ata: '',
      equationID: '',
      messages: '',
      fromDate: '',
      toDate: '',
    }
   );
  const handleReportChange = (report) => {
    setReportType(report);
  };
  const handleAnalysisChange = (analysis) => {
    setAnalysisType(analysis);
  };
  const handleInputChange = (input) =>{
    setinputValue(input);
  };
  const handleDateFrom = (date) => {
    setDateFrom(date);
  };

  const handleDateTo = (date) => {
    setDateTo(date);
  };

  const handleAirline = (airline) => {
    setAilineType(airline);
  };

  const handleATAChange = (ATAMain) => {
    setATAMain(ATAMain);
  };

  const handleEqIDChange = (EqId) => {
    setEqID(EqId);
  };

  const handleMessagesChange = (messages) => {
    setIncludeMessages(messages);
  };
  
  const history = useHistory();

  const handleGenerateReport = (event) => {
    setReportConditions(
      {
        analysisType: analysis,
        reportType: report,
        occurences: inputValue.occurences,
        legs: inputValue.legs,
        intermittent: inputValue.intermittent,
        consecutiveDays: inputValue.days,
        airlineOperator: airline,
        ata: ATAMain,
        equationID: EqID,
        messages: messagesChoice,
        fromDate: dateFrom,
        toDate: dateTo,
      },
    );
    console.log(reportConditions);
     //history.push('/report');
  };

  return (
    <div>
      <form className={classes.form}>
        <Paper className={classes.paper}>
        <div className ={classes.card}>
          <h2>REPORT ANALYSIS</h2>
        </div>
        <div className={classes.container}>
          <Grid className={classes.Grid} container spacing={1}> 
            <Grid item xs={3}>  
            <h3>Analysis Type</h3>  
              <AnalysisType
                handleAnalysisChange = {handleAnalysisChange}
              />
              <h3>Report Type</h3>        
              <ReportType 
              handleReportChange = {handleReportChange}
              />             
            </Grid>
            <Grid item xs={3}>     
            <h3>Analysis Input</h3>        
              <AnalysisInput 
                handleInputChange = {handleInputChange}
              />  
            </Grid>  
            <Grid item xs={3}>     
            <h3>Conditions</h3>   
              <Selectors            
                handleAirline = {handleAirline}
                handleATAChange = {handleATAChange}
                handleEqIDChange = {handleEqIDChange}
                handleMessagesChange = {handleMessagesChange}
              />  
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
              <ButtonsReport 
               handleGenerateReport={handleGenerateReport}
              />                 
            </Grid>  
        </Grid>
      </div>
        </Paper>
      </form>
    </div>
  );
};

export default Conditions;