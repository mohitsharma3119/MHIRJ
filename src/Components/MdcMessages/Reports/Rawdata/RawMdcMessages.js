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
  },
},
paper: {
  margin: '50px auto 23px 20px',
  width: '92vw',
},
container: {
  padding: '10px 40px',
},
Grid:{
  padding:'20px 5px 20px 30px',
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
  button:{
    margin:'50px 30px',
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
  const [loading, setLoading] = useState(true);
  const [RDValue,setRDValue] = useState(0);
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
const [rawData, setRawData] = React.useState('');
const [flag,setFlag] = useState(false);

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
  setRawData([]);
  setRDValue(1);
  setLoading(true);
  }

useEffect(() => {
  let flag = false;
 Object.values(rawDataConditions).map(item => {
   if (item === "" || item === "('')"){
     flag = true;
     setLoading(false);
   }
 });

 if (flag === false) {  
    const path = 'http://40.82.160.131/api/MDCRawData/' + rawDataConditions.ata + '/' + rawDataConditions.eqID + '/' + rawDataConditions.operator + 
    '/' + rawDataConditions.messages + '/' + rawDataConditions.fromDate + '/' + rawDataConditions.toDate;

      axios.post(path).then(function (res) {
        var data = JSON.parse(res.data);
          setRawData(data);
          setLoading(false);
      }).catch(function (err){
            console.log(err);
            setLoading(false);
          })
      }
  },[rawDataConditions]);

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
     {rawData !== "" && rawData !== "undefined" && RDValue === 1 &&
        <>
          <RawDataTable
            data = {rawData}
            rawDataConditions = {rawDataConditions}
            loading = {loading}
          />
      </>
     }
    </div> 
  );
};

export default RawMdcMessages;