import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Bar, Line } from 'react-chartjs-2';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  // root1: {
  //   '& > *': {
  //     margin: theme.spacing(1),
  //     width: '25ch',
  //     height: '10ch',
  //   },
  // },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

}));
const state = {
  labels: ['January', 'February', 'March',
    'April', 'May'],
  datasets: [
    {
      label: 'ATA data',
      backgroundColor: '#d8e4f0',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56]
    }
  ]
}

export default function Graphs() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>

          <form className={classes.root1} noValidate autoComplete="off">
            <label>Aircraft to Study</label>
            <div> <TextField id="filled-basic" label="Enter Your Values" variant="filled" /></div>
            <br></br>
            <label>Top Values</label>
            <div> <TextField id="filled-basic" label="Enter Your Values" variant="filled" /></div>
            <br></br>
            <div className={classes.root1}><Button variant="contained" color="primary">GENERATE</Button></div>
          </form>

          <Paper className={classes.paper}><Line
            data={state}
            options={{
              title: { display: true, text: 'ATA GRAPHS', fontSize: 20 },
              legend: { display: true, position: 'right' }
            }}
          /></Paper>
        </Grid>
        <Grid item xs={6}>
          <form className={classes.root1} noValidate autoComplete="off">
            <label>ATA to Study</label>
            <div> <TextField id="filled-basic" label="Enter Your Values" variant="filled" /></div>
            <br></br>
            <label>Top Values</label>
            <div> <TextField id="filled-basic" label="Enter Your Values" variant="filled" /></div>
            <br></br>
            <div className={classes.root1}><Button variant="contained" color="primary">GENERATE</Button></div>
          </form>

          <Paper className={classes.paper}><Bar
            data={state}
            options={{
              title: {
                display: true,
                text: 'ATA GRAPHS',
                fontSize: 20
              },
              legend: {
                display: true,
                position: 'right'
              }
            }}
          /></Paper>
        </Grid>
        <Grid item xs={6}>
          <form className={classes.root1} noValidate autoComplete="off">
            <label>AC to Study</label>
            <div> <TextField id="filled-basic" label="Enter Your Values" variant="filled" /></div>
            <br></br>
            <label>Message to Study</label>
            <div> <TextField id="filled-basic" label="Enter Your Values" variant="filled" /></div>
            <br></br>
            <div className={classes.root1}><Button variant="contained" color="primary">GENERATE</Button></div>
          </form>
          <Paper className={classes.paper}><Line
            data={state}
            options={{
              title: {
                display: true,
                text: 'ATA GRAPHS',
                fontSize: 20
              },
              legend: {
                display: true,
                position: 'right'
              }
            }}
          /></Paper>
        </Grid>
        <Grid item xs={6}>
          <form className={classes.root1} noValidate autoComplete="off">
            <label>Report Choosen</label>
            <div> <TextField id="filled-basic" label="Enter Your Values" variant="filled" /></div>
            <br></br>
            <label>Top Count</label>
            <div> <TextField id="filled-basic" label="Enter Your Values" variant="filled" /></div>
            <br></br>
            <div className={classes.root1}><Button variant="contained" color="primary">GENERATE</Button></div>
          </form>
          <Paper className={classes.paper}><Bar
            data={state}
            options={{
              title: {
                display: true,
                text: 'ATA GRAPHS',
                fontSize: 20
              },
              legend: {
                display: true,
                position: 'right'
              }
            }}
          /></Paper>
        </Grid>
      </Grid>
    </div>
  );
}
