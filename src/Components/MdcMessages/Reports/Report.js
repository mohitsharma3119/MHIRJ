import React, {useState} from 'react';
import DailyReport from './DailyReport/DailyReport';
import HistoryReport from './HistoryReport/HistoryReport';
import FlagReport from './FlagReport/FlagReport';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin:'50px auto',
    width:'95vw',
  },
}));
const Report = () => {
  const classes = useStyles();
  const [report, setReportType] = useState("history");
  console.log(report);

const loadingReport = () => {
  if (report === "daily") {
    return <DailyReport /> ;
  }
  else if (report === "history") {
    return <HistoryReport />;
  }  
  else if (report === "flag") {
    return <FlagReport />;
  }  
  else {
    return (<p>Report not found</p>)
  }
};

  return (
    <div className={classes.root}>
      {loadingReport()}
    </div>
    
  );
};

export default Report;