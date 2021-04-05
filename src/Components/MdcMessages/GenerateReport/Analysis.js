import React from 'react';
import Conditions from './Conditions';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin:'50px auto',
    width:'95vw',
  },
}));

const Analysis = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
        <Conditions />
    </div>
    
  );
};

export default Analysis;