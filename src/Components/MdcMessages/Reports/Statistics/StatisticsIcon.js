import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { blue } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  icon: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
  },
});

const StatisticsIcon = () =>{
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Avatar className={classes.icon}>100</Avatar>
    </div>
  );

};
export default StatisticsIcon;