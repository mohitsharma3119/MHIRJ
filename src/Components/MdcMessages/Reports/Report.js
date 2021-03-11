import React, {useState,useEffect} from 'react';
import DailyReport from './DailyReport/DailyReport';
import HistoryReport from './HistoryReport/HistoryReport';
import { makeStyles } from '@material-ui/core/styles';
//Filter Imports
import {EqIDSelector,ACSNSelector} from '../GenerateReport/Selectors'
//Buttons Imports
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
//Axios Imports 
import axios from 'axios';


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
  const [dailyReportData, setDailyReportData] = React.useState('');
  const [historyReportData, setHistoryReportData] = React.useState('');

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
  var flagTitle = <h3 className={classes.flagH3}>Flag Report Conditions</h3>;
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

    useEffect( () => {
        /* Using useEffect so that axios can run only on the first render 
        http://localhost:8000/GenerateReport/{analysis}/{occurences}/{legs}/{intermittent}/{consecutiveDays}/{operator}/{ata}/{messages}/{fromDate}/{toDate}") 
        Example of Daily Path: http://localhost:8000/GenerateReport/daily/2/2/3/0/SKW/28/0/2020-11-14/2020-11-15 */

        const analysis = report.analysis;
        const occurences = report.occurences;
        const legs = report.legs;
        const intermittent = report.intermittent;
        let consecutiveDays;
        let consecutiveDaysDaily;
        let consecutiveDaysHistory;

        if (report.analysis === "daily") {
          consecutiveDays = 0;
        }
        else if (report.analysis === "both") {
          consecutiveDaysDaily = 0;
          consecutiveDaysHistory = report.days;
        }
        else {
          consecutiveDays = report.days;
        }
        const operator = report.operator;
        const ata = report.ata;
        const messages = 0; 
        const fromDate = report.fromDate;
        const toDate = report.toDate;

        if (report.analysis !== "both") {
          const path = 'http://localhost:8000/GenerateReport/' + analysis + '/' + occurences + '/' + legs + '/' + intermittent + '/' +
          consecutiveDays + '/' + operator + '/' + ata + '/' + messages + '/' + fromDate + '/' + toDate;

          try{
            axios.post(path).then(function (res) {
              // console.log(res);
              var data = JSON.parse(res.data);
              if (report.analysis === "daily") {
                setDailyReportData(data);
              }
              else if (report.analysis === "history") {
                setHistoryReportData(data);
              }
            });
          } catch (err) {
            console.error(err);
          }
        }
        else {
          const dailyPath = 'http://localhost:8000/GenerateReport/' + analysis + '/' + occurences + '/' + legs + '/' + intermittent + '/' +
          consecutiveDaysDaily + '/' + operator + '/' + ata + '/' + messages + '/' + fromDate + '/' + toDate;
          const historyPath = 'http://localhost:8000/GenerateReport/' + analysis + '/' + occurences + '/' + legs + '/' + intermittent + '/' +
          consecutiveDaysHistory + '/' + operator + '/' + ata + '/' + messages + '/' + fromDate + '/' + toDate;
          try{
            axios.post(dailyPath).then(function (res) {
              var data = JSON.parse(res.data);
                setDailyReportData(data);
            });
          } catch (err) {
            console.error(err);
          }
          try{
            axios.post(historyPath).then(function (res) {
              var data = JSON.parse(res.data);
              setHistoryReportData(data);
            });
          } catch (err) {
            console.error(err);
          }
        }
    }, [report]);

      if (report.analysis === "daily" && dailyReportData !== "") {
        reportTable = <DailyReport data = {dailyReportData} title = "Daily Report"/>
        historyFilters = '';
        flagTitle = '';
      }
      else if (report.analysis === "history" && historyReportData !== "") {
          reportTable = <HistoryReport data = {historyReportData}  title = "History Report"/>
      }  
      else if (report.analysis === "both" && dailyReportData !== ""  && historyReportData !== "") {
        reportTable = <div><DailyReport data = {dailyReportData} title = "Daily Report"/> <HistoryReport data = {historyReportData}  title = "History Report"/></div>;
      }  
     
  return(
    <div className={classes.root}>
      { report.analysis !== "daily" &&
      <>
        {flagTitle}
        {historyFilters}
      </>
      }
      {reportTable}
  </div>  
  );
    
  };

export default Report;