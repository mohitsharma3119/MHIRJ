import React,{useEffect, useState} from 'react';
import RawDataTable from './RawDataTable';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import DatePicker from '../../GenerateReport/DatePicker';
import {AirlineOperatorSelector,ATAMainSelector,MessagesSelector,EqIDSelector} from '../../GenerateReport/Selectors';
//Buttons Imports
import Button from '@material-ui/core/Button';
//Axios Imports 
import axios from 'axios';

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
    margin: '50px auto 20px',
    width: '92vw',
  },
  card:{
    backgroundColor: "#C5D3E0",
    textAlign: 'center',
    justify: 'center',
    padding: '5px',
  },
  Grid:{
    margin: 'auto',
    padding:'20px 20px 20px 50px',
  },
  button:{
    margin:'50px 30px',
    // height:'40px',
    padding: '10px',
    backgroundColor:"#C5D3E0",
  },
  EqSelector:{
    marginTop:'9px',
    marginRight:'0px',
    width:'100px',
  },
  ATASelector:{
    // marginTop:'9px',
  },
  h3:{
    marginLeft: '5px',
    fontSize:'20px',
  },
}));

const RawMdcMessages = () => {
  const classes = useStyles();

  // ----- States and handle Functions for Date  ----- 
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();

  const handleDateFrom = (date) => {
    setDateFrom(date);
  };

  const handleDateTo = (date) => {
    setDateTo(date);
  };
// ----- States and handle Functions for Selects  ----- 
const [airline, setAilineType] = useState();
const [ATAMain, setATAMain] = React.useState('');
const [messagesChoice, setIncludeMessages] = React.useState('');
const [EqID, setEqID] = React.useState('');

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

const [rawDataConditions, setRawDataConditions] = React.useState(
  {
    operator: '',
    ata: '',
    eqID: '',
    messages: '',
    fromDate: '',
    toDate: '',
  }
 );
const [rawData, setRawData] = React.useState('');
const [isValid, setIsValid] = React.useState(false);

const handleGenerateReport = (event) => {

  setRawDataConditions(
      {
        operator: airline,
        ata: ATAMain,
        eqID: EqID,
        messages: messagesChoice,
        fromDate: dateFrom,
        toDate: dateTo,
      },
    );

    let flag = isValid;
    for (const item in rawDataConditions) {
      if (Object.hasOwnProperty.call(rawDataConditions, item)) {
        const element = rawDataConditions[item];
        if ( element !== false ) {
          flag = true;
        } else {
          flag = false;
          break;
        }
      }
    }
    setIsValid(flag);
}

useEffect(()=>{
  if (isValid === true) {  
    ///MDCRawData/{ATAMain_list}/{exclude_EqID_list}/{fromDate}/{toDate}"
    //http://localhost:8000/MDCRawData/('32','22')/('B1-007553','B1-246748')/skw/0/2020-11-05/2020-11-12
    
    const path = 'http://40.82.160.131/api/MDCRawData/' + rawDataConditions.ata + '/' + rawDataConditions.eqID + '/' + rawDataConditions.operator + 
    '/' + rawDataConditions.messages + '/' + rawDataConditions.fromDate + '/' + rawDataConditions.toDate;

    try{
      axios.post(path).then(function (res) {
        // console.log(res);
        var data = JSON.parse(res.data);
          setRawData(data);
      });
    } catch (err) {
      console.error(err);
    }
  }
},[rawDataConditions])

  return (
    <div className={classes.root}>   
     <form className={classes.form}>
      <Paper className={classes.paper}>
        <div className ={classes.card}>
          <h2>RAW DATA FILTERS</h2>
        </div>
         <Grid className={classes.Grid} container spacing={0}> 
            <Grid item xs={2}>
            <AirlineOperatorSelector
                handleAirlineChange = {handleAirlineChange}                
              />     
              <MessagesSelector 
                handleMessagesChange = {handleMessagesChange}
              />
            </Grid>
            <Grid className={classes.ATASelector} item xs={6}>
            <ATAMainSelector 
                handleATAChange = {handleATAChange}
              /> 
              <EqIDSelector 
                handleEqIDChange = {handleEqIDChange}
              />   
            </Grid>
            <Grid item xs={2}>
            <DatePicker 
              label = "From"
              handleDateFrom = {handleDateFrom}
            />   
            <DatePicker 
              label = "To"
              handleDateTo = {handleDateTo}
            /> 
            </Grid>
            <Grid item xs={2}>
              <Button 
                variant="contained" 
                onClick = {()=>handleGenerateReport()}
                className={classes.button}>
                  Filter Raw Data
              </Button>                 
            </Grid>
          </Grid>
     </Paper>
     </form>
     <RawDataTable
       data = {rawData}
       rawDataConditions = {rawDataConditions}
     />
    </div> 
  );
};

export default RawMdcMessages;