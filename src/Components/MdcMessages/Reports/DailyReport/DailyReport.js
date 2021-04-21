import React from 'react';
import MUIDataTable from "mui-datatables";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import {DateConverter} from '../../../Helper/Helper';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    alignItems:"center",
    maxWidth: '92vw',
    margin:  '20px',
  },
}));

const DailyReport = (props) => {
  const columns = [
    {
      name: "date",
      label: "Date",
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
    },
    {
      name: 'ACSN', 
      label: 'ACSN',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
    },
    {
      name: 'EICASRelated', 
      label: 'EICAS Related',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap', minWidth: "90px"}})
      }
    },
    {
      name: 'mdcMessages', 
      label: 'MDC Messages',
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
      name: 'ATA', 
      label: 'ATA',
      options: {
       filter: false,
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
    },
    {
      name: 'B1Equation', 
      label: 'B1 Equation',
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
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
    },
    {
      name: 'equationDescription', 
      label: 'Equation Description',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
     },
     {
      name: 'totalOccurences', 
      label: 'Total Occurences',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap',minWidth: "120px"}})
      }
     },
     {
      name: 'ConsecutiveFlights', 
      label: 'Consecutive Flights',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
     },
     {
      name: 'intermittent', 
      label: 'Intermittent',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
     },
     {
      name: 'reasons', 
      label: 'Reasons For Flag',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
     },
     {
      name: 'priority', 
      label: 'Priority',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap',minWidth: "100px"}})
      }
     },
     {
      name: 'topMessage', 
      label: 'MHIRJ Known Message',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
     },
     {
      name: 'recommendation', 
      label: 'MHIRJ Recommended Action',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
     },
     {
      name: 'comments', 
      label: 'MHIRJ Additional Comment',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
     },
     {
      name: 'input', 
      label: 'MHIRJ Input',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
     },
    ];

    let data = [];
      props.data?.map((item => {
        data.push(
          {
            date: DateConverter(item["Date"]), 
            ACSN: item["AC SN"], 
            EICASRelated: item["EICAS Message"], 
            mdcMessages: item["MDC Message"],  
            LRU: item["LRU"],  
            ATA: item["ATA"],  
            B1Equation: item["B1-Equation"],  
            type: item["Type"],   
            equationDescription: item["Equation Description"],   
            totalOccurences: item["Total Occurences"],  
            ConsecutiveFlights: item["Consecutive FL"],  
            intermittent: item["Intermittent"],  
            reasons: item["Reason(s) for flag"],   
            priority: item["Priority"],   
            topMessage: item["Known Top Message - Recommended Documents"],  
            recommendation: item["MHIRJ ISE Recommendation"], 
            comments: item["Additional Comments"],  
            input: item["MHIRJ ISE Input"],  
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
        filename: 'Daily Report from ' + props.reportConditions.fromDate + ' to ' + props.reportConditions.toDate + '.csv',
        separator: ',',
      },
      draggableColumns: {
        enabled: false,
        transitionTime: 300,
      },
      textLabels: {
        body: {
            noMatch: props.loading ? ' Please wait, loading data ...' : "Sorry, there is no matching data to display"
        },
    },
      elevation: 4,
      rowsPerPage: 7,
      rowsPerPageOptions: [7,20,50],
      selectToolbarPlacement:"none",
      tableBodyHeight: props.loading === true || data.length === 0 ? '200px' : '500px'
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
                title={props.title}
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
export default DailyReport;

