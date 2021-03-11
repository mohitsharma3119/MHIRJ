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

    let data = [];
  
    props.data.map((item => {
      console.log(item["AC SN"]); 
      data.push(
        {
          date: item["Date"], 
          ACSN: item["AC SN"], 
          EICASMessages: item["EICAS Message"], 
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

