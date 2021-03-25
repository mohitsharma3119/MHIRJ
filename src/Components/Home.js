import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Bar, Line } from 'react-chartjs-2';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: '25px',
    marginTop:'25px',
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
  label:{
    // paddingTop: '20px',
    fontSize: '22px',
    fontWeight: 'bold',
    PaddingBottom:'30px',

  
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

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
     
       <form className={classes.container} noValidate> 
        <TextField
          id="date"
          label=" SELECT DATE"
          type="date"
          defaultValue="2017-05-24"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
      />
    </form>
    <form className={classes.label}>  <label>DATE: 2021-02-24</label></form>
      <Grid container spacing={3}>
        <Grid item xs={6}>

        <form className={classes.root1} noValidate autoComplete="off">
            <div> <TextField  id="outlined-required" label="Aircraft to Study" defaultValue=" " variant="outlined" /></div>
            <br></br>
            <div> <TextField  id="outlined-required" label="Top Values" defaultValue=" " variant="outlined" /></div>
            <br></br>
            <div className={classes.root1} style={{paddingBottom:"20px"}}><Button variant="contained" color="primary">GENERATE</Button></div>
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
            <div> <TextField  id="outlined-required" label="ATA to Study" defaultValue=" " variant="outlined" /></div>
            <br></br>
            <div> <TextField  id="outlined-required" label="Top Values" defaultValue=" " variant="outlined" /></div>
            <br></br>
            <div className={classes.root1} style={{paddingBottom:"20px"}}><Button variant="contained" color="primary">GENERATE</Button></div>
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
            <div> <TextField  id="outlined-required" label="AC to Study" defaultValue=" " variant="outlined" /></div>
            <br></br>
            <div> <TextField  id="outlined-required" label="Message to Study" defaultValue=" " variant="outlined" /></div>
            <br></br>
            <div className={classes.root1} style={{paddingBottom:"20px"}}><Button variant="contained" color="primary">GENERATE</Button></div>
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
      </Grid>
    </div>
  );
}


