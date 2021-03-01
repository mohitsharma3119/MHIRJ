import React, {useState} from 'react'
//Radio Button Imports
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const AnalysisType = (props) => {
  const [analysisType, setAnalysisType] = useState("history");
  
  const handleRadioChange = (event) => {
    setAnalysisType(event.target.value);
    props.handleAnalysisChange(event.target.value);
    console.log(event.target.value);
    console.log('logged');
  };

  props.handleAnalysisChange(analysisType);



  return (
    <div
    style={{
        marginBottom: "30px",
        }}
        >
      <FormControl component="fieldset" className="form" >
        <FormLabel component="legend"></FormLabel>
        <RadioGroup 
          // row={true} 
          aria-label="analysis" 
          name="analysis" 
          value={analysisType} 
          onChange={handleRadioChange} 
          >
          <FormControlLabel value="daily" className="RadioButton" control={
            <Radio 
              size="medium"
              color = 'default'
            />} label="Daily Analysis" />
          <FormControlLabel value="history" control={
            <Radio 
            size="medium"
            color = 'default'
            />} label="History Analysis" />
          <FormControlLabel value="full" control={
            <Radio 
              size="medium"
              color='default'
            />} label="Full Analysis" />
        </RadioGroup>
      </FormControl>    
    </div>
  );
}
export default AnalysisType;
