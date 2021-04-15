import React, {useState,useEffect} from 'react';
import MUIDataTable from "mui-datatables";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import DatePicker from '../MdcMessages/GenerateReport/DatePicker';
import {ATAMainSelector,EqIDSelector} from '../MdcMessages/GenerateReport/Selectors';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CorrelationSubTable from './CorrelationSubTable';
//Date Imports
import {DateConverter} from '../Helper/Helper';

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
  button:{
    //margin:'40px auto',
    height: '50px',
    width:'100%',
    backgroundColor:"#C5D3E0",
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
  TableGrid:{
    paddingLeft:'11px',
    margin: '0px',
    width:'94vw',
  }
}));

const PMTable = (props) => {
  const classes = useStyles();
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [ATAMain, setATAMain] = useState();
  const [EqID, setEqID] = useState('');
  const [data, setData] = useState([]);
  const [responseData,setResponseData] = useState([]);

  const handleDateFrom = (date) => {
    setDateFrom(date);
    console.log(date);
  };

  const handleDateTo = (date) => {
    setDateTo(date);
    console.log(date);
  };
  const handleATAChange = (ATA) => {
    setATAMain(ATA);
    console.log(ATA);
  };
  const handleEqIDChange = (eqIDList) => {
    setEqID(eqIDList);
    console.log(eqIDList);
  };

  const handleGeneratePMTable = ()=> {
  /*http://localhost:8000/corelation/11-11-2020/11-12-2020/B1-008003/27*/

  const path = 'http://40.82.160.131/api/corelation/' + dateFrom + '/' + dateTo + '/' + EqID + '/' + ATAMain;
  console.log(path);
  try{
    axios.post(path).then(function (res) {
      var data = JSON.parse(res.data);
      setData(data);
    });
  } catch (err) {
    console.error(err);
  } 
  }

const columns = [
  {
    name: "p_id",
    label: "p_id",
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
  },
  {
    name: 'operator', 
    label: 'Operator',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
  },
  {
    name: 'model', 
    label: 'Model',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap', minWidth: "90px"}})
    }
  },
  {
    name: 'type', 
    label: 'Type',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
  },
  {
    name: 'serialNo', 
    label: 'Serial_No',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
  },
  {
    name: 'date', 
    label: 'Date',
    options: {
      filter: false,
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
  },
  {
    name: 'failureFlag', 
    label: 'Failure Flag',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
  },
  {
    name: 'maintTrans', 
    label: 'MaintTrans',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
  },
  {
    name: 'maintCanc', 
    label: 'Maintenance Cancellations',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
    },
    {
    name: 'maintDel', 
    label: 'Maintenance Delays',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap',minWidth: "120px"}})
    }
    },
    {
    name: 'inspection', 
    label: 'Inspection',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
    },
    {
    name: 'campType', 
    label: 'Camp Type',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
    },
    {
    name: 'MRB', 
    label: 'MRB',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap',minWidth: "100px"}})
    }
    },
    {
    name: 'discrepancy', 
    label: 'Discrepancy',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
    },
    {
    name: 'corActions', 
    label: 'Corrective Action',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
    },
    {
    name: 'totalHours', 
    label: 'AC Total Hours',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
    },
    {
    name: 'totalCycles', 
    label: 'AC Total Cycles',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
    },
    {
    name: 'squawkSource', 
    label: 'Squawk Source',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
    },
    {
    name: 'ATA', 
    label: 'ATA',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
    },
    {
    name: 'station', 
    label: 'Station',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
    },
    {
    name: 'ATA_SUB', 
    label: 'ATA SUB',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
    },
    {
    name: 'ATA_Main', 
    label: 'ATA Main',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
    },
];

if (data){
  data.map((item => {
    responseData.push(
      {
        p_id: item["p_id"], 
        operator: item["Operator"], 
        model: item["Model"], 
        type: item["Type"],  
        serialNo: item["Serial_No"],  
        date: DateConverter(item["date"]),  
        failureFlag: item["Failure Flag"],  
        maintTrans: item["Maint Trans"],   
        maintCanc: item["Maintenance Cancellations"],   
        maintDel: item["Maintenance Delays"],  
        inspection: item["Inspection"],  
        campType: item["CampType"],   
        MRB: item["MRB"],   
        discrepancy: item["Discrepancy"],  
        corActions: item["Corrective Action"], 
        totalHours: item["AC Total Hours"],  
        totalCycles: item["AC Total Cycles"],  
        squawkSource:  item["Squawk Source"],
        ATA: item["ATA"],
        station: item["Station"],
        ATA_SUB: item["ATA_SUB"],
        ATA_Main: item["ATA_Main"],
      }
    );
     return responseData
  }
  ));

const options = {
  filter: true,
  filterType: 'multiselect',
  responsive: "standard",
  fixedHeader: true,
  expandableRows: true,
  renderExpandableRow: (rowData, rowMeta) => {
    console.log(rowData, rowMeta, "row data");
    return (    
    <TableRow>
        <TableCell colSpan={rowData.length+1}>
        <CorrelationSubTable
          p_id = {rowData[0]}
          //p_id = "4322"
          dateFrom = {dateFrom}
          dateTo = {dateTo}
          EqID = {EqID}
          ATAMain = {ATAMain}
        />
        </TableCell>
    </TableRow>
    );
  },
  fixedSelectColumn: true,
  downloadOptions: {
    filename: 'PM Report from ' + dateFrom + ' to ' + dateTo + '.csv',
    separator: ',',
  },
  draggableColumns: {
    enabled: false,
    transitionTime: 300,
  },
  elevation: 4,
  rowsPerPage: 20,
  rowsPerPageOptions: [20, 50],
  selectToolbarPlacement:"none",
};

const theme = createMuiTheme({
  palette: {type: 'light'},
  typography: {useNextVariants: true},
});

  return (
    <div className={classes.root}>
    <Paper className={classes.paper}>
        <div className ={classes.card}>
          <h2>Correlation Filters</h2>
        </div>
        <div className={classes.container}>
        <Grid className={classes.Grid} container spacing={3}> 
          <Grid item xs={3}>     
            <ATAMainSelector 
              handleATAChange = {handleATAChange}
            />              
          </Grid>     
          <Grid item xs={3}>     
            <EqIDSelector 
              handleEqIDChange = {handleEqIDChange}
            />                   
          </Grid>    
          <Grid item xs={2}>      
            <DatePicker 
              label = "From"
              handleDateFrom = {handleDateFrom}
            />   
          </Grid>
          <Grid item xs={2}>         
            <DatePicker 
              label = "To"
              handleDateTo = {handleDateTo}
            />   
          </Grid>
          <Grid item xs={2}>  
            <Button 
              variant="contained" 
              onClick = {async()=>handleGeneratePMTable()}
              className={classes.button}>
                Generate Correlation Table
            </Button>  
          </Grid>     
          </Grid>      
          </div>
      </Paper>
        <Grid className={classes.TableGrid} container spacing={3}> 
          <Grid item xs={12}>
            <MuiThemeProvider theme={theme}>
              <MUIDataTable
                title="PM Report"
                data={responseData}
                columns={columns}
                options={options}
              />
            </MuiThemeProvider> 
          </Grid> 
        </Grid> 
  </div>
  );
  }
}

export default PMTable;

