import React from 'react';
import MUIDataTable from "mui-datatables";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    alignItems:"center",
    maxWidth: '92vw',
    margin:  '20px',
  },
}));

const FlagReport = () => {
  const columns = [
    {
      name: "MSN",
      label: "MSN",
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
      name: 'code', 
      label: 'B1-code',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap', minWidth: "90px"}})
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
      name: 'message', 
      label: 'Message',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
    },
    {
      name: 'type', 
      label: 'Type',
      options: {
       filter: false,
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
    },
    {
      name: 'FDE', 
      label: 'Potential FDE',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
    },
    {
      name: 'dateFrom', 
      label: 'Date From',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
    },
    {
      name: 'dateTo', 
      label: 'Equation Description',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
     },
     {
      name: 'action', 
      label: 'SKW action WIP',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap',minWidth: "120px"}})
      }
     },
     {
      name: 'input', 
      label: 'ISE Input',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
     },
     {
      name: 'iseRecAct', 
      label: 'ISE Rec Act',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
     },
    ];

    const data = [
      {
        MSN: "10330", ATA: "21-61", code: 'B1-005812', LRU: 'ACSC 1',  message: 'INTERNAL FAULT', type: "Fault Message",  FDE: "mdchisotry.csv",  dateFrom: "2020-11-30",  dateTo: "2020-11-30", action: "", 
        input: "Per SL-21-018 (to be revised as of 9/24/20) This is related to pack cycling. Will have to revise SL procedure (by 30 Sept 2020) and the FIM (31 Oct 2020). (Input from specialist Sep/2020) Fleet wide msg in top #10 position Reset SL procedure is not in FIM",
        iseRecAct: "1. Reset per SL procedure: " +
        "a) Reset procedure" +
        "b) Wait for 30 sec., then select L Pack Manual Mode "+
        "c) Wait for 30 sec., and then select Pack Auto Mode."+
        "d) If still cycling Swap ACSC. If not replace ACSC. Do not remove sensors"+
        "2. Follow FIM 21−61−04−810−81:"+
        "NOTE:Bombardier strongly recommends to swap ASCSs before replacing the LRUs. Byswapping LRUs, you will verify the integrity of the ASCSs. Go to Fault Confirmation."+
        "1. Pack Discharge Pressure Sensor (PDPS) MT13 unserviceable."+
        "2. Pack Inlet Flow Sensor (PIFS) MT11 unserviceable."+
        "3. Pack Inlet Pressure Sensor (PIPS) MT9 unserviceable."+
        "4. Defective wiring interface between Air Conditioning System Controller #1 (ACSC 1)and oneof the pressure sensors."
      },
      {
        MSN: "10330", ATA: "21-61", code: 'B1-005812', LRU: 'ACSC 1',  message: 'INTERNAL FAULT', type: "Fault Message",  FDE: "mdchisotry.csv",  dateFrom: "2020-11-30",  dateTo: "2020-11-30", action: "", 
        input: "Per SL-21-018 (to be revised as of 9/24/20) This is related to pack cycling. Will have to revise SL procedure (by 30 Sept 2020) and the FIM (31 Oct 2020). (Input from specialist Sep/2020) Fleet wide msg in top #10 position Reset SL procedure is not in FIM",
        iseRecAct: "1. Reset per SL procedure: " +
        "a) Reset procedure" +
        "b) Wait for 30 sec., then select L Pack Manual Mode "+
        "c) Wait for 30 sec., and then select Pack Auto Mode."+
        "d) If still cycling Swap ACSC. If not replace ACSC. Do not remove sensors"+
        "2. Follow FIM 21−61−04−810−81:"+
        "NOTE:Bombardier strongly recommends to swap ASCSs before replacing the LRUs. Byswapping LRUs, you will verify the integrity of the ASCSs. Go to Fault Confirmation."+
        "1. Pack Discharge Pressure Sensor (PDPS) MT13 unserviceable."+
        "2. Pack Inlet Flow Sensor (PIFS) MT11 unserviceable."+
        "3. Pack Inlet Pressure Sensor (PIPS) MT9 unserviceable."+
        "4. Defective wiring interface between Air Conditioning System Controller #1 (ACSC 1)and oneof the pressure sensors."
      },
      {
        MSN: "10330", ATA: "21-61", code: 'B1-005812', LRU: 'ACSC 1',  message: 'INTERNAL FAULT', type: "Fault Message",  FDE: "mdchisotry.csv",  dateFrom: "2020-11-30",  dateTo: "2020-11-30", action: "", 
        input: "Per SL-21-018 (to be revised as of 9/24/20) This is related to pack cycling. Will have to revise SL procedure (by 30 Sept 2020) and the FIM (31 Oct 2020). (Input from specialist Sep/2020) Fleet wide msg in top #10 position Reset SL procedure is not in FIM",
        iseRecAct: "1. Reset per SL procedure: " +
        "a) Reset procedure" +
        "b) Wait for 30 sec., then select L Pack Manual Mode "+
        "c) Wait for 30 sec., and then select Pack Auto Mode."+
        "d) If still cycling Swap ACSC. If not replace ACSC. Do not remove sensors"+
        "2. Follow FIM 21−61−04−810−81:"+
        "NOTE:Bombardier strongly recommends to swap ASCSs before replacing the LRUs. Byswapping LRUs, you will verify the integrity of the ASCSs. Go to Fault Confirmation."+
        "1. Pack Discharge Pressure Sensor (PDPS) MT13 unserviceable."+
        "2. Pack Inlet Flow Sensor (PIFS) MT11 unserviceable."+
        "3. Pack Inlet Pressure Sensor (PIPS) MT9 unserviceable."+
        "4. Defective wiring interface between Air Conditioning System Controller #1 (ACSC 1)and oneof the pressure sensors."
      },
      {
        MSN: "10330", ATA: "21-61", code: 'B1-005812', LRU: 'ACSC 1',  message: 'INTERNAL FAULT', type: "Fault Message",  FDE: "mdchisotry.csv",  dateFrom: "2020-11-30",  dateTo: "2020-11-30", action: "", 
        input: "Per SL-21-018 (to be revised as of 9/24/20) This is related to pack cycling. Will have to revise SL procedure (by 30 Sept 2020) and the FIM (31 Oct 2020). (Input from specialist Sep/2020) Fleet wide msg in top #10 position Reset SL procedure is not in FIM",
        iseRecAct: "1. Reset per SL procedure: \n" +
        "a) Reset procedure \n" +
        "b) Wait for 30 sec., then select L Pack Manual Mode "+
        "c) Wait for 30 sec., and then select Pack Auto Mode."+
        "d) If still cycling Swap ACSC. If not replace ACSC. Do not remove sensors"+
        "2. Follow FIM 21−61−04−810−81:"+
        "NOTE:Bombardier strongly recommends to swap ASCSs before replacing the LRUs. Byswapping LRUs, you will verify the integrity of the ASCSs. Go to Fault Confirmation."+
        "1. Pack Discharge Pressure Sensor (PDPS) MT13 unserviceable."+
        "2. Pack Inlet Flow Sensor (PIFS) MT11 unserviceable."+
        "3. Pack Inlet Pressure Sensor (PIPS) MT9 unserviceable."+
        "4. Defective wiring interface between Air Conditioning System Controller #1 (ACSC 1)and oneof the pressure sensors."
      },
      {
        MSN: "10330", ATA: "21-61", code: 'B1-005812', LRU: 'ACSC 1',  message: 'INTERNAL FAULT', type: "Fault Message",  FDE: "mdchisotry.csv",  dateFrom: "2020-11-30",  dateTo: "2020-11-30", action: "", 
        input: "Per SL-21-018 (to be revised as of 9/24/20) This is related to pack cycling. Will have to revise SL procedure (by 30 Sept 2020) and the FIM (31 Oct 2020). (Input from specialist Sep/2020) Fleet wide msg in top #10 position Reset SL procedure is not in FIM",
        iseRecAct: "1. Reset per SL procedure: " +
        "a) Reset procedure" +
        "b) Wait for 30 sec., then select L Pack Manual Mode "+
        "c) Wait for 30 sec., and then select Pack Auto Mode."+
        "d) If still cycling Swap ACSC. If not replace ACSC. Do not remove sensors"+
        "2. Follow FIM 21−61−04−810−81:"+
        "NOTE:Bombardier strongly recommends to swap ASCSs before replacing the LRUs. Byswapping LRUs, you will verify the integrity of the ASCSs. Go to Fault Confirmation."+
        "1. Pack Discharge Pressure Sensor (PDPS) MT13 unserviceable."+
        "2. Pack Inlet Flow Sensor (PIFS) MT11 unserviceable."+
        "3. Pack Inlet Pressure Sensor (PIPS) MT9 unserviceable."+
        "4. Defective wiring interface between Air Conditioning System Controller #1 (ACSC 1)and oneof the pressure sensors."
      },   
    ];


    const options = {
      filter: true,
      filterType: 'multiselect',
      responsive: "stacked",
      fixedHeader: true,
      fixedSelectColumn: true,
      rowHover: true,
      //tableBodyMaxHeight: '700px',
      enableNestedDataAccess: true,
      downloadOptions: {
        filename: 'MdcRawData.csv',
        separator: ',',
      },
      draggableColumns: {
        enabled: false,
        transitionTime: 300,
      },
      elevation: 4,
      rowsPerPage: 30,
      rowsPerPageOptions: [50, 100, 250, 500, 1000],
      disableToolbarSelect: true,
      setFilterChipProps: (colIndex, colName, data) => {
        return {
          color: 'primary',
          variant: 'outlined',
          className: 'testClass123',
        };
      }
    };

    const theme = createMuiTheme({
      palette: {type: 'light'},
      typography: {useNextVariants: true},
  });
  
const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
            <MuiThemeProvider theme={theme}>
              <MUIDataTable
                title={"Flag Report"}
                data={data}
                columns={columns}
                options={options}
              />
            </MuiThemeProvider> 
        </Grid> 
      </Grid> 
    </div>
  );
}
export default FlagReport;

