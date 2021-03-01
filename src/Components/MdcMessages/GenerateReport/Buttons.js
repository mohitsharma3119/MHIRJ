import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  button:{
    margin:'30px',
    backgroundColor:"#C5D3E0",
  },
}));

export const ButtonsReport = (props) => {
  const classes = useStyles();
  return (
    
    <Button 
    variant="contained" 
    onClick = {props.handleGenerateReport}
    className={classes.button}>
      Generate Report
    </Button>
  );
}

const Buttons = () => {
  return (
    <div></div>
  );
};

export default Buttons;