import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {HorizontalBar} from 'react-chartjs-2';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { saveAs } from 'file-saver';
import axios from 'axios';

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
    height: theme.spacing(120),
  },
}));


export default function Chart1() {
  const classes = useStyles();
  const ChartJsImage = require('chartjs-to-image');
  const [chartData1, setChartData1] = useState({});

  const [data_chart1, setData_chart1] = useState({
    aircraft_no: "",
    top_value: "",
    from_date: "",
    to_date: ""
  });

  function save(e) {
    //save to png
    const canvasSave = document.getElementById('chart1');
    canvasSave.toBlob(function (blob) {
      saveAs(blob, "Chart1.png")
    })
  }


  function submit(e) {
    e.preventDefault();
    let msgName = [];
    let messageOcc = [];

    //const path = 'http://localhost:8000/chart_one/' + data_chart1.top_value + '/' + data_chart1.aircraft_no + '/' + data_chart1.from_date + '/' + data_chart1.to_date;
    const path = 'http://40.82.160.131/api/chart_one/' + data_chart1.top_value + '/' + data_chart1.aircraft_no + '/' + data_chart1.from_date + '/' + data_chart1.to_date;
    
    axios.post(path)
      .then(res => {
        console.log(res, "response");

        for (const dataObj of JSON.parse(res.data)) {
          msgName.push(dataObj.Equation_ID + "\n" + dataObj.ATA + "\n" + dataObj.LRU);
          messageOcc.push(parseInt(dataObj.total_message));
        }
        setChartData1({
          labels: msgName,
          datasets: [
            {
              label: data_chart1.aircraft_no,
              data: messageOcc,
              backgroundColor: "#d8e4f0",
              borderWidth: 2,
              borderColor: "black"
            }
          ]
        });
      })
      .catch(err => {
        //console.log(err);
      });
    //console.log(msgName, messageOcc);
  }
  function handle(e) {
    const newdata = { ...data_chart1 }
    newdata[e.target.id] = e.target.value
    setData_chart1(newdata)
    //console.log(newdata)

  }




  return (
    <div className={classes.root}>
      <Grid container spacing={12}>
        <Grid item xs={12}>
          <form className={classes.root1}>
            <div><h1 style={{ color: "#001C3E", textAlign: "center" }}>MESSAGE OCCURENCE FOR AIRCRAFT</h1></div>
            <div> <TextField onChange={(e) => handle(e)} id="aircraft_no" value={data_chart1.aircraft_no} label="Aircraft MSN" defaultValue=" " variant="outlined" /></div>
            <br></br>
            <div> <TextField onChange={(e) => handle(e)} id="top_value" value={data_chart1.top_value} label="Top Values" defaultValue=" " variant="outlined" /></div>
            <br></br>
            <div>  <TextField onChange={(e) => handle(e)} id="from_date" value={data_chart1.from_date} label=" SELECT FROM DATE &nbsp; &nbsp;" type="date" defaultValue="2017-05-24" className={classes.textField} InputLabelProps={{ shrink: true, }} />
              <TextField onChange={(e) => handle(e)} id="to_date" value={data_chart1.to_date} label=" SELECT TO DATE " type="date" defaultValue="2017-05-24" className={classes.textField} InputLabelProps={{ shrink: true, }} /></div>
            <br></br>
            <div style={{ paddingBottom: "20px" }}><Button onClick={(e) => submit(e)} variant="contained" style={{ backgroundColor: "#001C3E", color: "WHITE" }}>GENERATE  </Button>
              <Button onClick={(e) => save(e)} variant="contained" style={{ backgroundColor: "#001C3E", color: "WHITE", float: 'right', marginRight: "1200px" }}>SAVE</Button></div>
          </form>
          <Paper className={classes.paper}>
            <HorizontalBar
              id="chart1"
              data={chartData1}
              options={{
                title: {
                  display: true,
                  text: 'Message occurance in ' + data_chart1.aircraft_no,
                  fontSize: 20
                },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        autoSkip: true,
                        beginAtZero: false
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
                        labelString: 'Total Number of Messages',
                        fontStyle: 'bold',
                        fontColor: '#001C3E'
                      },
                      gridLines: {
                        display: false
                      }
                    }
                  ]
                },
                legend: {
                  display: true,
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
