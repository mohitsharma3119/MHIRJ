import React, {useState,useEffect} from 'react';
import MUIDataTable from "mui-datatables";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding:'5px',
    margin:'auto',
    width:'100%',
  },
}));

const CorrelationSubTable = (props) => {
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(()=>{
    /*http://localhost:8000/corelation/11-11-2020/11-12-2020/B1-008003/27*/

    const path = 'http://localhost:8000/corelation/' + props.dateFrom + '/' + props.dateTo + '/' + props.EqID + '/' + props.ATAMain;
    console.log(path);
    console.log(props);
    //const path = 'http://localhost:8000/corelation/2020-11-12/2020-12-13/('B1-005790','B1-005792','B1-005798','B1-005800')/('21','23','22','26','27','30','28')';
    try{
      axios.post(path).then(function (res) {
        var data = JSON.parse(res.data);
        setData(data);
      });
    } catch (err) {
      console.error(err);
    } 
  },[props.responseData])

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

const responseData = [];
if (data){
  data.map((item => {
    responseData.push(
      {
        p_id: item["p_id"], 
        operator: item["Operator"], 
        model: item["Model"], 
        type: item["Type"],  
        serialNo: item["Serial_No"],  
        date: item["date"],  
        failureFlag: item["Failure Flag"],  
        maintTrans: item["Maint Trans"],   
        maintCanc: item["Maintenance Cancellations"],   
        maintDel: item["Maintenance Delays"],  
        inspection: item["Inspection"],  
        campType: item["Camp Type"],   
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
  fixedSelectColumn: true,
  downloadOptions: {
    filename: 'Correlation Report from ' + props.dateFrom + ' to ' + props.dateTo + ' from '+ props.p_id +'.csv',
    separator: ',',
  },
  draggableColumns: {
    enabled: false,
    transitionTime: 300,
  },
  elevation: 3,
  rowsPerPage: 20,
  rowsPerPageOptions: [20, 50],
  selectToolbarPlacement:"none",
};

  return (
    <div className={classes.root}>
      <MUIDataTable
        title={"Correlation Report for PM "+props.p_id+" from " + props.dateFrom + ' to ' + props.dateTo}
        data={responseData}
        columns={columns}
        options={options}
      />
  </div>
  );
  }
}

export default CorrelationSubTable;

