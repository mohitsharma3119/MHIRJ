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

const HistoryReport = () => {
  const columns = [
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
      name: 'EICASMessages', 
      label: 'EICAS Messages',
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
      name: 'consecutiveDays', 
      label: 'Consecutive Days',
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
      label: 'Reasons for flag',
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
      label: 'Known Top Message - Recommended Documents	MHIRJ ISE',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
     },
     {
      name: 'recommendation', 
      label: 'MHIRJ ISE Recommendation',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
     },
     {
      name: 'comments', 
      label: 'Additional Comments',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
     },
     {
      name: 'input', 
      label: 'MHIRJ ISE Input',
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
        ACSN: "10330", EICASMessages: 'mdctrend.csv', mdcMessages: 'INTERNAL FAULT',  LRU: 'ACSC 1', ATA: "21-61",  B1Equation: "B1-005812",  type: "Fault Message",  equationDescriptions: "Internal Fault", totalOccurences: 2, consecutiveDays: 1, ConsecutiveFlights: 0,
        intermittent: 0, reasons: "Total occurances exceeded 2 occurances" , priority: 1, topMessage: "Known Nuissance: Y / In-Service Document: CRJ7...",recommendation: "1. Reset per SL procedure: na) Reset procedur...", comments: "This is related to pack cycling. Will have to ...", 
        input: "Per SL-21-018 (to be revised as of 9/24/20)n.."      
      },
      {
        ACSN: "10330", EICASMessages: 'mdctrend.csv', mdcMessages: 'INTERNAL FAULT',  LRU: 'ACSC 1', ATA: "21-61",  B1Equation: "B1-005812",  type: "Fault Message",  equationDescriptions: "Internal Fault", totalOccurences: 2, consecutiveDays: 1, ConsecutiveFlights: 0,
        intermittent: 0, reasons: "Total occurances exceeded 2 occurances" , priority: 1, topMessage: "Known Nuissance: Y / In-Service Document: CRJ7...",recommendation: "1. Reset per SL procedure: na) Reset procedur...", comments: "This is related to pack cycling. Will have to ...", 
        input: "Per SL-21-018 (to be revised as of 9/24/20)n.."      
      },
      {
        ACSN: "10330", EICASMessages: 'mdctrend.csv', mdcMessages: 'INTERNAL FAULT',  LRU: 'ACSC 1', ATA: "21-61",  B1Equation: "B1-005812",  type: "Fault Message",  equationDescriptions: "Internal Fault", totalOccurences: 2, consecutiveDays: 1, ConsecutiveFlights: 0,
        intermittent: 0, reasons: "Total occurances exceeded 2 occurances" , priority: 1, topMessage: "Known Nuissance: Y / In-Service Document: CRJ7...",recommendation: "1. Reset per SL procedure: na) Reset procedur...", comments: "This is related to pack cycling. Will have to ...", 
        input: "Per SL-21-018 (to be revised as of 9/24/20)n.."      
      },
      {
        ACSN: "10330", EICASMessages: 'mdctrend.csv', mdcMessages: 'INTERNAL FAULT',  LRU: 'ACSC 1', ATA: "21-61",  B1Equation: "B1-005812",  type: "Fault Message",  equationDescriptions: "Internal Fault", totalOccurences: 2, consecutiveDays: 1, ConsecutiveFlights: 0,
        intermittent: 0, reasons: "Total occurances exceeded 2 occurances" , priority: 1, topMessage: "Known Nuissance: Y / In-Service Document: CRJ7...",recommendation: "1. Reset per SL procedure: na) Reset procedur...", comments: "This is related to pack cycling. Will have to ...", 
        input: "Per SL-21-018 (to be revised as of 9/24/20)n.."      
      },
      {
        ACSN: "10330", EICASMessages: 'mdctrend.csv', mdcMessages: 'INTERNAL FAULT',  LRU: 'ACSC 1', ATA: "21-61",  B1Equation: "B1-005812",  type: "Fault Message",  equationDescriptions: "Internal Fault", totalOccurences: 2, consecutiveDays: 1, ConsecutiveFlights: 0,
        intermittent: 0, reasons: "Total occurances exceeded 2 occurances" , priority: 1, topMessage: "Known Nuissance: Y / In-Service Document: CRJ7...",recommendation: "1. Reset per SL procedure: na) Reset procedur...", comments: "This is related to pack cycling. Will have to ...", 
        input: "Per SL-21-018 (to be revised as of 9/24/20)n.."      
      },
      {
        ACSN: "10330", EICASMessages: 'mdctrend.csv', mdcMessages: 'INTERNAL FAULT',  LRU: 'ACSC 1', ATA: "21-61",  B1Equation: "B1-005812",  type: "Fault Message",  equationDescriptions: "Internal Fault", totalOccurences: 2, consecutiveDays: 1, ConsecutiveFlights: 0,
        intermittent: 0, reasons: "Total occurances exceeded 2 occurances" , priority: 1, topMessage: "Known Nuissance: Y / In-Service Document: CRJ7...",recommendation: "1. Reset per SL procedure: na) Reset procedur...", comments: "This is related to pack cycling. Will have to ...", 
        input: "Per SL-21-018 (to be revised as of 9/24/20)n.."      
      },
      {
        ACSN: "10330", EICASMessages: 'mdctrend.csv', mdcMessages: 'INTERNAL FAULT',  LRU: 'ACSC 1', ATA: "21-61",  B1Equation: "B1-005812",  type: "Fault Message",  equationDescriptions: "Internal Fault", totalOccurences: 2, consecutiveDays: 1, ConsecutiveFlights: 0,
        intermittent: 0, reasons: "Total occurances exceeded 2 occurances" , priority: 1, topMessage: "Known Nuissance: Y / In-Service Document: CRJ7...",recommendation: "1. Reset per SL procedure: na) Reset procedur...", comments: "This is related to pack cycling. Will have to ...", 
        input: "Per SL-21-018 (to be revised as of 9/24/20)n.."      
      },
      {
        ACSN: "10330", EICASMessages: 'mdctrend.csv', mdcMessages: 'INTERNAL FAULT',  LRU: 'ACSC 1', ATA: "21-61",  B1Equation: "B1-005812",  type: "Fault Message",  equationDescriptions: "Internal Fault", totalOccurences: 2, consecutiveDays: 1, ConsecutiveFlights: 0,
        intermittent: 0, reasons: "Total occurances exceeded 2 occurances" , priority: 1, topMessage: "Known Nuissance: Y / In-Service Document: CRJ7...",recommendation: "1. Reset per SL procedure: na) Reset procedur...", comments: "This is related to pack cycling. Will have to ...", 
        input: "Per SL-21-018 (to be revised as of 9/24/20)n.."      
      },
      {
        ACSN: "10330", EICASMessages: 'mdctrend.csv', mdcMessages: 'INTERNAL FAULT',  LRU: 'ACSC 1', ATA: "21-61",  B1Equation: "B1-005812",  type: "Fault Message",  equationDescriptions: "Internal Fault", totalOccurences: 2, consecutiveDays: 1, ConsecutiveFlights: 0,
        intermittent: 0, reasons: "Total occurances exceeded 2 occurances" , priority: 1, topMessage: "Known Nuissance: Y / In-Service Document: CRJ7...",recommendation: "1. Reset per SL procedure: na) Reset procedur...", comments: "This is related to pack cycling. Will have to ...", 
        input: "Per SL-21-018 (to be revised as of 9/24/20)n.."      
      },
      {
        ACSN: "10330", EICASMessages: 'mdctrend.csv', mdcMessages: 'INTERNAL FAULT',  LRU: 'ACSC 1', ATA: "21-61",  B1Equation: "B1-005812",  type: "Fault Message",  equationDescriptions: "Internal Fault", totalOccurences: 2, consecutiveDays: 1, ConsecutiveFlights: 0,
        intermittent: 0, reasons: "Total occurances exceeded 2 occurances" , priority: 1, topMessage: "Known Nuissance: Y / In-Service Document: CRJ7...",recommendation: "1. Reset per SL procedure: na) Reset procedur...", comments: "This is related to pack cycling. Will have to ...", 
        input: "Per SL-21-018 (to be revised as of 9/24/20)n.."      
      },
      {
        ACSN: "10330", EICASMessages: 'mdctrend.csv', mdcMessages: 'INTERNAL FAULT',  LRU: 'ACSC 1', ATA: "21-61",  B1Equation: "B1-005812",  type: "Fault Message",  equationDescriptions: "Internal Fault", totalOccurences: 2, consecutiveDays: 1, ConsecutiveFlights: 0,
        intermittent: 0, reasons: "Total occurances exceeded 2 occurances" , priority: 1, topMessage: "Known Nuissance: Y / In-Service Document: CRJ7...",recommendation: "1. Reset per SL procedure: na) Reset procedur...", comments: "This is related to pack cycling. Will have to ...", 
        input: "Per SL-21-018 (to be revised as of 9/24/20)n.."      
      },
      {
        ACSN: "10330", EICASMessages: 'mdctrend.csv', mdcMessages: 'INTERNAL FAULT',  LRU: 'ACSC 1', ATA: "21-61",  B1Equation: "B1-005812",  type: "Fault Message",  equationDescriptions: "Internal Fault", totalOccurences: 2, consecutiveDays: 1, ConsecutiveFlights: 0,
        intermittent: 0, reasons: "Total occurances exceeded 2 occurances" , priority: 1, topMessage: "Known Nuissance: Y / In-Service Document: CRJ7...",recommendation: "1. Reset per SL procedure: na) Reset procedur...", comments: "This is related to pack cycling. Will have to ...", 
        input: "Per SL-21-018 (to be revised as of 9/24/20)n.."      
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
                title={"History Report"}
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
export default HistoryReport;

