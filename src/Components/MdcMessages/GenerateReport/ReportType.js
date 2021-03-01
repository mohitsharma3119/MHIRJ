import React, {useState} from 'react'
//Radio Button Imports
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const ReportType = (props) => {
  const [report, setReport] = useState("history");

  const handleRadioChange = (event) => {
    setReport(event.target.value);
    console.log(report);
  };
  
  props.handleReportChange(report);

  return (
    <div>
      <FormControl component="fieldset" className="form">
        <FormLabel component="legend"></FormLabel>
        <RadioGroup 
          // row={true} 
          aria-label="analysis" 
          name="analysis" 
          value={report} 
          onChange={handleRadioChange} 
          >
          <FormControlLabel value="history" control={
            <Radio 
            size="medium"
            color='default'
            />} label="History Report" />
          <FormControlLabel value="daily" control={
            <Radio 
              size="medium"
              color='default'
            />} label="Daily Report" />
        </RadioGroup>
      </FormControl>    
    </div>
  );
}
export default ReportType;
