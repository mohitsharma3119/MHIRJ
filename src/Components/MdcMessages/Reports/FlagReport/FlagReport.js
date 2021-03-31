import React,{useState} from 'react';
import MUIDataTable from "mui-datatables";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    alignItems:"center",
    maxWidth: '92vw',
    margin:  '20px',
  },
}));

const FlagReport = (props) => {
  const history = useHistory();
  // const [flagConditions, setFlagConditions] = useState(history.location.state.flagConditions);
  // const [flagData, setFlagData] = useState(history.location.state.flagData);

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

    let data = [];
  
    // history.location.state.flagData?.map((item => {
      props?.data?.map((item => {
        data.push(
          {
            MSN: item["MSN"], 
            ATA: item["ATA"], 
            code: item["B1-code"], 
            LRU: item["LRU"],  
            message: item["Message"],  
            type: item["Type"],  
            FDE: item["Potential FDE"],  
            dateFrom: item["Date From"],   
            dateTo: item["Date To"],   
            action: item["SKW action WIP"],  
            input: item["ISE Input"],  
            iseRecAct: item["ISE Rec Act"],  
          }
        );
        return data;
      }
      ));

    const options = {
      filter: true,
      filterType: 'multiselect',
      responsive: "standard",
      fixedHeader: true,
      fixedSelectColumn: true,
      downloadOptions: {
        filename: 'Flag Report from ' + props.flagReportConditions.fromDate + ' to ' + props.flagReportConditions.toDate + '.csv',
        separator: ',',
      },
      draggableColumns: {
        enabled: false,
        transitionTime: 300,
      },
      elevation: 4,
      rowsPerPage: 25,
      rowsPerPageOptions: [25,50],
      selectToolbarPlacement:"none",
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

