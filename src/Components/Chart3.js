import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Line } from 'react-chartjs-2';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { saveAs } from 'file-saver';
import axios from 'axios';
import { DateConverter } from './Helpercharts';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: '25px',
    marginTop: '25px',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: theme.spacing(185),
    height: theme.spacing(150),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 215,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },

}));

export default function Chart3() {
  const classes = useStyles();
  const [chartData3, setChartData3] = useState({});
  const [flightphase, setflightphase] = React.useState('');
  const [data_chart3, setData_chart3] = useState({
    aircraft_no: "",
    equation_id: "",
    flight_phase: "",
    from_date: "",
    to_date: ""
  });


  function save(e) {
    //save to png
    const canvasSave = document.getElementById('chart3');
    canvasSave.toBlob(function (blob) {
      saveAs(blob, "Chart3.png")
    })
  }

  function submit_chart3(e) {
    e.preventDefault();
    let Dates = [];
    let OccperDay = [];

    const path = 'http://localhost:8000/chart_three/' + data_chart3.aircraft_no + '/' + data_chart3.equation_id + '/' + flightphase+ '/' + data_chart3.from_date + '/' + data_chart3.to_date;
    //const path = 'http://40.82.160.131/api/chart_three/' + data_chart3.aircraft_no + '/' + data_chart3.equation_id + '/' + data_chart3.flight_phase + '/' + data_chart3.from_date + '/' + data_chart3.to_date;


    axios.post(path)
      .then(res => {
        //console.log(res,"response");
        for (const dataObj of JSON.parse(res.data)) {
          Dates.push(DateConverter(dataObj.Dates));
          OccperDay.push(parseInt(dataObj.OccurencesPerDay));
        }
        setChartData3({
          labels: Dates,
          datasets: [
            {
              label: data_chart3.aircraft_no,
              data: OccperDay,
              backgroundColor: "#d8e4f0",
              borderWidth: 1,
              borderColor: "black"
            }
          ]
        });
      })
      .catch(err => {
        //console.log(err);
      });
  }

  function handle_chart3(e) {
    const newdata = { ...data_chart3 }
    newdata[e.target.id] = e.target.value
    setData_chart3(newdata)
    console.log(newdata)

  }
  const handleflightphase = (event) => {
    setflightphase(event.target.value)
    
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>

        <Grid item xs={12}>

          <form className={classes.root1} noValidate autoComplete="off">
            <div><h1 style={{ color: "#001C3E", textAlign: "center" }}>MESSAGE TREND BY AIRCRAFT</h1></div>
            <div> <TextField onChange={(e) => handle_chart3(e)} id="aircraft_no" value={data_chart3.aircraft_no} label="Aircraft MSN" defaultValue=" " variant="outlined" /></div>
            <br></br>
            <div> <TextField onChange={(e) => handle_chart3(e)} id="equation_id" value={data_chart3.equation_id} label="Equation ID" defaultValue=" " variant="outlined" /></div>
            <br></br>
            <div><FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Current Messages</InputLabel>
              <Select labelId="demo-simple-select-outlined-label"  id="flight_phase" value={flightphase} onChange={handleflightphase}  label="Current Messages">
                <MenuItem value={0}>Include</MenuItem>
                <MenuItem value={1}>Exclude</MenuItem>
              </Select>
            </FormControl></div>
            <br></br>
            <div>  <TextField onChange={(e) => handle_chart3(e)} id="from_date" value={data_chart3.from_date} label=" SELECT FROM DATE &nbsp; &nbsp;" type="date" defaultValue="2017-05-24" className={classes.textField} InputLabelProps={{ shrink: true, }} />
              <TextField onChange={(e) => handle_chart3(e)} id="to_date" value={data_chart3.to_date} label=" SELECT TO DATE " type="date" defaultValue="2017-05-24" className={classes.textField} InputLabelProps={{ shrink: true, }} /></div>
            <br></br>
            <div style={{ paddingBottom: "20px" }}><Button onClick={(e) => submit_chart3(e)} variant="contained" style={{ backgroundColor: "#001C3E", color: "WHITE" }}>GENERATE  </Button>
              <Button onClick={(e) => save(e)} variant="contained" style={{ backgroundColor: "#001C3E", color: "WHITE", float: 'right', marginRight: "1200px" }}>SAVE</Button></div>
          </form>

          <Paper className={classes.paper}>
            <Line
              id="chart3"
              data={chartData3}
              options={{
                title: {
                  display: true,
                  text: 'Date Trend for ' + data_chart3.aircraft_no + ' and message ' + data_chart3.equation_id,
                  fontSize: 20
                },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        autoSkip: false,
                        beginAtZero: true
                      },
                      scaleLabel: {
                        display: true,
                        labelString: 'Occurence Per Day',
                        fontStyle: 'bold',
                        fontColor: '#001C3E'

                      },
                      gridLines: {
                        display: true
                      }

                    }
                  ],
                  xAxes: [
                    {
                      ticks: {
                        beginAtZero: true
                      },
                      scaleLabel: {
                        display: true,
                        labelString: 'Occurence Dates',
                        fontStyle: 'bold',
                        fontColor: '#001C3E'

                      },
                      gridLines: {
                        display: true
                      }
                    }
                  ]
                },
                legend: {
                  display: false,
                  position: 'right'
                }
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}