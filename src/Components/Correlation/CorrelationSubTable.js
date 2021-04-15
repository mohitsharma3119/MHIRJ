import React, {useState,useEffect} from 'react';
import MUIDataTable from "mui-datatables";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
//Date Imports
import {DateConverter} from '../Helper/Helper';

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
    /*http://localhost:8000/corelation/29909*/

    const path = 'http://40.82.160.131/api/corelation/' + props.p_id;
    try{
      axios.post(path).then(function (res) {
        var data = JSON.parse(res.data);
        setData(data);
        console.log(path,"path");
        console.log(data,"resdata");
      });
    } catch (err) {
      console.error(err);
    } 
  },[props.p_id])

  const columns = [
  {
    name: "mdc_ID",
    label: "MDC ID",
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
  },
  {
    name: 'EQ_ID', 
    label: 'Equation ID',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
  },
  {
    name: 'aircraftno', 
    label: 'Aircraft Number',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap', minWidth: "90px"}})
    }
  },
  {
    name: 'ATA_Description', 
    label: 'ATA Description',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
  },
  {
    name: 'LRU', 
    label: 'LRU',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
  },
  {
    name: 'DateAndTime', 
    label: 'Date and Time',
    options: {
      filter: false,
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
  },
  {
    name: 'MDC_Date', 
    label: 'MDC Date',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
  },
  {
    name: 'MDC_MESSAGE', 
    label: 'MDC Message',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
  },
  {
    name: 'EQ_DESCRIPTION', 
    label: 'Equation Description',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
    },
    {
    name: 'CAS', 
    label: 'CAS',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap',minWidth: "120px"}})
    }
    },
    {
    name: 'LRU_CODE', 
    label: 'LRU Code',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
    },
    {
    name: 'LRU_NAME', 
    label: 'LRU Name',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
    },
    {
    name: 'FAULT_LOGGED', 
    label: 'Fault Logged',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap',minWidth: "100px"}})
    }
    },
    {
    name: 'MDC_ATA', 
    label: 'MDC ATA',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
    },
    {
    name: 'mdc_ata_main', 
    label: 'MDC ATA MAIN',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
    },
    {
    name: 'mdc_ata_sub', 
    label: 'MDC ATA SUB',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
    },
    {
    name: 'Status', 
    label: 'Status',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
    },
    {
    name: 'mdc_type', 
    label: 'MDC Type',
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
    console.log(item,"item");
    console.log(item.mdc_ID,"mdc_ID");
    responseData.push(
      {
        mdc_ID: item["mdc_ID"],
        EQ_ID: item["EQ_ID"],
        aircraftno: item["aircraftno"],
        ATA_Description: item["ATA_Description"],
        LRU: item["LRU"],
        DateAndTime: DateConverter(item["DateAndTime"]),
        MDC_Date: DateConverter(item["MDC_Date"]),
        MDC_MESSAGE: item["MDC_MESSAGE"], 
        EQ_DESCRIPTION: item["EQ_DESCRIPTION"],   
        CAS: item["CAS"],
        LRU_CODE: item["LRU_CODE"],
        LRU_NAME: item["LRU_NAME"],  
        FAULT_LOGGED: item["FAULT_LOGGED"],  
        MDC_ATA: item["MDC_ATA"], 
        mdc_ata_main: item["mdc_ata_main"],
        mdc_ata_sub: item["mdc_ata_sub"],
        Status: item["Status"],
        mdc_type: item["mdc_type"],
      }
    );
    return responseData
  }));
  }

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

export default CorrelationSubTable;

