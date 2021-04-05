import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { HorizontalBar, Line, Scatter } from 'react-chartjs-2';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: '25px',
    marginTop: '25px',
  },
  root1: {
    paddingTop: '30px',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'center',
    paddingBottom: '60px',
    marginLeft: '500px',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  label: {
    // paddingTop: '20px',
    fontSize: '22px',
    fontWeight: 'bold',
    PaddingBottom: '30px',


  },
}));
const state1 = {
  labels: ['January', 'February', 'March',
    'April', 'May', 'june', 'july', 'August'],
  datasets: [
    {
      label: 'ATA DATASET1',
      backgroundColor: '#d8e4f4',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56, 21, 31, 41]
    },
    {
      label: 'ATA DATASET2',
      backgroundColor: "#416d97",
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [60, 50, 85, 90, 58, 24, 34, 44]
    },
    {
      label: 'ATA DATASET3',
      backgroundColor: '#001C3E',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [61, 51, 81, 71, 91, 28, 39, 48]
    },

  ]
}


const state = {
  labels: ['January', 'February', 'March',
    'April', 'May'],
 
  datasets: [{
    label: ' Dataset',
    data: [{
      x: -10,
      y: 0
    },{
      x: 0,
      y: 10
    },{
      x: 10,
      y: 5
    }, {
      x: 4,
      y: 8
    },{
      x: 3,
      y: 9
    }
    ],
    backgroundColor: '#001C3E',
    pointRadius: 8
  },
  {
    label: ' Dataset2',
    data: [{
      x: -11,
      y: 3
    },{
      x: 5,
      y: 12
    },{
      x: 9,
      y: 4
    }, {
      x: 2,
      y: 9
    },{
      x: 2,
      y: 12
    }
    ],
    backgroundColor: '#416d97',
    pointRadius: 8
  },
  {
    label: ' Dataset2',
    data: [{
      x: -11,
      y: 3
    },{
      x: -5,
      y: 12
    },{
      x: -9,
      y: 4
    }, {
      x: 2,
      y: 9
    },{
      x: -2,
      y: 12
    }
    ],
    backgroundColor: '#d8e4f4',
    pointRadius: 8
  },
  {
    label: ' Dataset2',
    data: [{
      x: -15,
      y: 3
    },{
      x: 2,
      y: 8
    },{
      x: -10,
      y: 4
    }, {
      x: -5,
      y: 9
    },{
      x: -2,
      y: 12
    }
    ],
    backgroundColor: '#416d97',
    pointRadius: 8
  }

],
  options: {
    scales: {
      xAxes: [{
        type: 'linear',
        position: 'bottom'
      }]
    }
  }
}

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>

          <form className={classes.root1} noValidate autoComplete="off">
            <div>  <TextField id="from_date" label=" SELECT FROM DATE &nbsp; &nbsp;" type="date" defaultValue="2017-05-24" className={classes.textField} InputLabelProps={{ shrink: true, }} />
              <TextField id="to_date" label=" SELECT TO DATE " type="date" defaultValue="2017-05-24" className={classes.textField} InputLabelProps={{ shrink: true, }} /></div>
            <br></br>
            <div style={{ paddingBottom: "20px" }}><Button variant="contained" style={{ backgroundColor: "#001C3E", color: "WHITE" }}>GENERATE  </Button>
              <Button variant="contained" style={{ backgroundColor: "#001C3E", color: "WHITE", float: 'right', marginRight: "1200px" }}>SAVE</Button></div>
          </form>
          <Paper className={classes.paper}><Scatter
            data={state}
            options={{
              title: { display: true, text: 'ATA GRAPHS', fontSize: 20 },
              legend: { display: true, position: 'right' }
            }}
          /></Paper>
        </Grid>
        <Grid item xs={12}>
          <form className={classes.root1} noValidate autoComplete="off">
            <div> <TextField id="top_value" label="Top Values" defaultValue=" " variant="outlined" /></div>
            <br></br>
            <div>  <TextField id="from_date" label=" SELECT FROM DATE &nbsp; &nbsp;" type="date" defaultValue="2017-05-24" className={classes.textField} InputLabelProps={{ shrink: true, }} />
              <TextField id="to_date" label=" SELECT TO DATE " type="date" defaultValue="2017-05-24" className={classes.textField} InputLabelProps={{ shrink: true, }} /></div>
            <br></br>
            <div style={{ paddingBottom: "20px" }}><Button variant="contained" style={{ backgroundColor: "#001C3E", color: "WHITE" }}>GENERATE  </Button>
              <Button variant="contained" style={{ backgroundColor: "#001C3E", color: "WHITE", float: 'right', marginRight: "1200px" }}>SAVE</Button></div>
          </form>

          <Paper className={classes.paper}><HorizontalBar
            data={state1}
            options={{
              title: {
                display: true,
                text: 'ATA GRAPHS',
                fontSize: 20
              },
              legend: {
                display: true,
                position: 'right'
              },
              scales: {
                xAxes: [{
                  stacked: true
                }],
                yAxes: [{
                  stacked: true
                }]
              }
            }}
          /></Paper>
        </Grid>
      </Grid>
    </div>
  );
}


