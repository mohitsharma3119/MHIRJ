import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(5),
        width: theme.spacing(15),
        height: theme.spacing(15),
        backgroundColor:'#001c3e',
      },
    },
    div: {
        padding:'10px',
        textAlign: 'center',
        color: '#f3f2f1',
        fontFamily: 'TimeNewRoman',
        

    },
  }));

function Home (){
    const classes = useStyles();

    return (
      <div  className={classes.root}>
        <Paper elevation={3}>
        <div className={classes.div}>Faults</div>
        <div className={classes.div}>2900</div>
        </Paper>

        <Paper elevation={3}>
        <div className={classes.div}>MDC Messages</div>
        <div className={classes.div}>3000</div>
        </Paper>

        <Paper elevation={3}>
        <div className={classes.div}>PM Messages</div>
        <div className={classes.div}>2149</div>
        </Paper>

        <Paper elevation={3}>
        <div className={classes.div}>Corrective Actions</div>
        <div className={classes.div}>400</div>
        </Paper>

        <Paper elevation={3}>
        <div className={classes.div}>Others</div>
        <div className={classes.div}>340</div>
        </Paper>  

      </div>

    );
  }
export default(Home);