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

const Table2 = () => {
  const columns = [
    {
      name: "aircraft",
      label: "Aircraft",
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
    },
    {
      name: 'tail', 
      label: 'Tail#',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
    },
    {
      name: 'fightLeg', 
      label: 'Flight Leg',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap', minWidth: "90px"}})
      }
    },
    {
      name: 'ATAMain', 
      label: 'ATAMain',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
    },
    {
      name: 'ATASub', 
      label: 'ATASub',
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
      name: 'ATADesc', 
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
      name: 'date', 
      label: 'Date and Time',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
     },
     {
      name: 'MDCMessages', 
      label: 'MDC Messages',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap',minWidth: "120px"}})
      }
     },
     {
      name: 'status', 
      label: 'Status',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
     },
     {
      name: 'phase', 
      label: 'Phase',
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
      name: 'equationID', 
      label: 'Equation ID',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap',minWidth: "100px"}})
      }
     },
     {
      name: 'diagnostic', 
      label: 'Diagnostic',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
     },
     {
      name: 'data', 
      label: 'Data Used to Determine Msg',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
     },
     {
      name: 'id', 
      label: 'ID',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
     },
     {
      name: 'flightNumber', 
      label: 'Flight Number',
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
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },   
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },   
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },   
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },   
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },  
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },  
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },  
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },  
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },  
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },  
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },  
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },  
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },  
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },  
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },  
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },  
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },  
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },       
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },   
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },   
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },   
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },   
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },  
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },  
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },  
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },  
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },  
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },  
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },  
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },  
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },  
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },  
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },  
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },  
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },  
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },  
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },   
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },   
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },   
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },   
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },  
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },  
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },  
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },  
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },  
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },  
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
      },  
      {
        aircraft: "AC10242", tail: "778SK", fightLeg: 26407, ATAMain: 21,  ATASub: 61, ATA: "21-61",  ATADesc: "TEMPERATURE CONTROL",  LRU: "GALLEY FAN",  date: "11/30/2020 23:59", MDCMessages: "LOW FAN SPEED", status: "FAILED/WIRING",
        phase: "AIR", type: "Service" , intermittent: 0, equationID: "B1-006902",source: "AC102421.SMH", diagnostic: "", data: "350A ACSC 2 100002", id: "40286708765b8d1801765bf51a28048e", flightNumber: 3110       
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
                title={"MDC Raw Data"}
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
export default Table2;

