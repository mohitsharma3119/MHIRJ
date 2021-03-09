import React, {useState} from 'react';
import DailyReport from './DailyReport/DailyReport';
import HistoryReport from './HistoryReport/HistoryReport';
import { makeStyles } from '@material-ui/core/styles';
//Filter Imports
import {EqIDSelector,ACSNSelector} from '../GenerateReport/Selectors'
//Buttons Imports
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    margin:'50px auto',
    width:'95vw',
  },
  flagFilters: {
    margin: '20px',
    maxWidth: '100%',
    display: 'flex',
  },  
  flagH3: {
    marginLeft: '24px',
  },
  button:{
    margin:'9px 30px',
    backgroundColor:"#C5D3E0",
    width: '600px',
    height: '51px',
  },
}));

const Report = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [report, setReport] = useState(history.location.state.reportConditions);
  const [EqID, setEqID] = React.useState('');
  const [ACSN, setACSN] = React.useState('');

// ----- States and handle Functions for setting flag report ----- 
const [flagConditions, setFlagConditions] = React.useState(
  {
    analysis: report.analysis,
    occurences: report.occurences,
    legs: report.legs,
    intermittent: report.intermittent,
    days: report.days,
    operator: report.operator,
    ata: report.ata,
    EqID: '',
    messages: report.messages,
    ACSN: '',
    fromDate: report.fromDate,
    toDate: report.toDate,
  }
 );
// ----- States and handle Functions for Buttons -----
const handleGenerateFlagReport = (event) => {
  if (ACSN !== '' && EqID !== '') {  
    setFlagConditions ({ACSN : ACSN});
    setFlagConditions ({EqID : EqID});
    history.push({
      pathname: '/flag',
      state: {flagConditions:flagConditions}
    });
  };
};

// ----- States and handle Functions for Selects  ----- 

const handleACSNChange = (ACSN) => {
  setACSN(ACSN);
};

const handleEqIDChange = (EqID) => {
  setEqID(EqID);
};

  // ----- Report Loading Method ----- 

  var reportTable = '';
  var historyFilters = 
    <div className={classes.flagFilters}>
      <EqIDSelector 
        handleEqIDChange = {handleEqIDChange} /> 
      <ACSNSelector 
        handleACSNChange = {handleACSNChange} />
        <Button 
          variant="contained" 
          onClick = {()=>handleGenerateFlagReport()}
          className={classes.button}>
            Generate Flag Report
        </Button>     
  </div>;

  if (report.analysis === "daily") {
    reportTable = <DailyReport />
    historyFilters = '';
  }
  else if (report.analysis === "history") {
    reportTable = <HistoryReport />
  }  
  else {
    reportTable = <div><HistoryReport /> <DailyReport /></div>;
  }  

  return(
    <div className={classes.root}>
     <h3 className={classes.flagH3}>Flag Report Conditions</h3>
    {historyFilters}
    {reportTable}
  </div>  
  );
    
  };

export default Report;