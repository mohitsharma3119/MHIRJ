import React, {useState,useEffect} from 'react';
import DailyReport from './DailyReport/DailyReport';
import FlagReport from './FlagReport/FlagReport';
import HistoryReport from './HistoryReport/HistoryReport';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
//Buttons Imports
import Button from '@material-ui/core/Button';
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
  buttonFlag:{
    margin:'0px 50px 15px 0px',
    backgroundColor:"#C5D3E0",
    width: '89%',
    // height: '51px',
  },
}));

const Report = (props) => {
  const classes = useStyles();
  const [report, setReport] = useState(props.reportConditions);
  const [dailyReportData, setDailyReportData] = useState([]);
  const [historyReportData, setHistoryReportData] = useState([]);
  const [flagData, setFlagData] = useState('');
  const [ACSNList, setACSNList] = useState([]);
  const [eqList, setEqList] = useState([]);

  const HandleMultipleRowSelectReport = (FlagACArray,FlagB1Array) => {
    setACSNList(FlagACArray);
    setEqList(FlagB1Array);
  }

  const [dailyValue,setDailyValue] = useState(0);
  const [histValue,setHistValue] = useState(0);

  useEffect( () => {
      setReport(props.reportConditions);
      let flag = false;
      for (var item in Object.entries(props.reportConditions)) {
        if ( Object.entries(props.reportConditions)[item][1] === "") {
          flag = true;
          break;
        }
      }
      
    if (flag === false){
      localStorage.setItem("last",JSON.stringify(props.reportConditions)); 
      if(props.reportConditions.analysis === "daily"){
        localStorage.setItem("daily",JSON.stringify(props.reportConditions)); 
      }
      else if(props.reportConditions.analysis === "history"){
        localStorage.setItem("history",JSON.stringify(props.reportConditions));
      } 
    } 
    }, [props.reportConditions]);

  useEffect( () => {
    if (report.ata !== null && report.ata !== undefined &&  report.ata !== ''){
      /* Using useEffect so that axios can run only on the first render 
      http://localhost:8000/"/GenerateReport/{analysisType}/{occurences}/{legs}/{intermittent}/{consecutiveDays}/{ata}/{exclude_EqID}/{airline_operator}/{include_current_message}/{fromDate}/{toDate}") 
      Example of Daily Path: http://localhost:8000/GenerateReport/daily/2/2/3/0/SKW/28/0/2020-11-14/2020-11-15 */

      const {analysis, occurences, legs, intermittent} = report;
      let consecutiveDays;
      if (report.analysis === "daily") {
        consecutiveDays = 0;
      }
      else {
        consecutiveDays = report.days;
      }
      const operator = report.operator;          
      const ata = report.ata;
      const eqid = report.eqID;
      const messages = 0; 
      const fromDate = report.fromDate;
      const toDate = report.toDate;

      if (props.reportConditions.analysis === "daily"){
        setDailyValue(1);
      }
      else if (props.reportConditions.analysis === "history"){
        setHistValue(1);
      }

      if (report.analysis !== "both") {
        /*http://localhost:8000/GenerateReport/history/2/2/2/3/('31','22','24','23')/('B1-007553','B1-005970')/skw/0/2020-11-18/2020-11-22*/

        const path = 'http://localhost:8000/GenerateReport/' + analysis + '/' + occurences + '/' + legs + '/' + intermittent + '/' +
        consecutiveDays + '/' + ata + '/' + eqid + '/'+ operator + '/' + messages + '/' + fromDate + '/' + toDate;

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
    }
  }, [report]);

  const [flagConditions,setFlagConditions] = useState('');

  const handleGenerateFlagReport = (event) => {
  setFlagConditions(
    {         
      analysis: props.reportConditions.analysis,
      occurences: props.reportConditions.occurences,
      legs: props.reportConditions.legs,
      HistExEqID: props.reportConditions.eqID,
      intermittent: props.reportConditions.intermittent,
      days: props.reportConditions.days,
      operator: props.reportConditions.operator,
      HistAta: props.reportConditions.ata,
      messages: props.reportConditions.messages,
      fromDate: props.reportConditions.fromDate,
      toDate: props.reportConditions.toDate,
      // FlagEqID: "('"+ eqList.join("','") +"')",
      // FlagACSN:"('"+ ACSNList.join("','") +"')"
      FlagEqID: eqList[0],
      FlagACSN:ACSNList[0]
    },
  );
  }
  useEffect(() => {
    let flag = false;
    Object.values(flagConditions).map(item => {
      if (item === ""){
        flag = true;
      }
    });

    if (flag === false) {  
      /*
      const path = 'http://localhost:8000/GenerateReport/{analysisType}/{occurences}/{legs}/{intermittent}/{consecutiveDays}/{ata}/
      {exclude_EqID}/{airline_operator}/{include_current_message}/{fromDate}/{toDate}/{acsn}/{bcode}';
      http://127.0.0.1:8000/GenerateReport/history/2/2/2/8/('32','22')/('B1-007553', 'B1-246748')/skw/1/2020-11-11/2020-11-12/15455/B1-006952
      */
      
      const path = 'http://localhost:8000/GenerateReport/' + flagConditions.analysis + '/' + flagConditions.occurences + '/' + 
      flagConditions.legs + '/' + flagConditions.intermittent + '/' + flagConditions.days + '/' + flagConditions.HistAta + '/' + 
      flagConditions.HistExEqID + '/'+ flagConditions.operator + '/' + flagConditions.messages + '/' + flagConditions.fromDate + '/' + 
      flagConditions.toDate + '/' + flagConditions.FlagACSN + '/' + flagConditions.FlagEqID;
      
      try{
        axios.post(path).then(function (res) {
          var data = JSON.parse(res.data);
          // history.push({
          //   pathname: '/flag',
          //   state: {
          //     flagConditions: flagConditions,
          //     flagData: data
          //   }
          // });
          setFlagData(data);
        });
      } catch (err) {
        console.error(err);
      }
    }
  },[flagConditions]);

  return(
    <div className={classes.root}>
      {historyReportData !== "" && historyReportData !== "undefined" && histValue === 1 &&
        <>
          <div>
            <Grid container spacing={0}>
              <Grid item xs={10}></Grid>
              <Grid item xs={2}>
                <Button 
                  variant="contained" 
                  onClick = {()=>handleGenerateFlagReport()}
                  className={classes.buttonFlag}>
                    Generate Flag Report
                </Button>
              </Grid>
              <Grid item xs={12}>
                <HistoryReport data = {historyReportData}  title = "History Report" reportConditions = {report} HandleMultipleRowSelectReport = {HandleMultipleRowSelectReport}/>
              </Grid>
            </Grid>
          </div>
        </>
      }
      {dailyReportData !== "" && dailyReportData !== "undefined" && dailyValue === 1 &&
        <>
          <DailyReport data = {dailyReportData} title = "Daily Report" reportConditions = {report}/>
        </>
      }
      {flagData !== "" && flagData !== "undefined" && 
        <>
          <FlagReport data = {flagData} flagReportConditions = {flagConditions} title = "Flag Report"/>
        </>
      }
    </div>  
  );    
};

export default Report;