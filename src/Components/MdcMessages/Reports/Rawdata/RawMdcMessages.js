import React from 'react';
import Table from '../../Table';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const RawMdcMessages = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>   
        <Table 
        />
    </div>
  
  );
};

export default RawMdcMessages;