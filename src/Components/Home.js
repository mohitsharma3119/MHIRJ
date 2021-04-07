import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Scatter, HorizontalBar } from 'react-chartjs-2';
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
  const [chartData2, setChartData2] = useState({});
  const [chartData3, setChartData3] = useState({});

  let pmMessage = [];

  const path = 'http://localhost:8000/scatter_chart_MDC_PM'

  axios.post(path)
    .then(res => {
      //console.log(res,"response");

      for (const dataObj of JSON.parse(res.data)) {
        let mdc = parseInt(dataObj.MDC_Message_Cnt)
        let pm = parseInt(dataObj.MX_actions)
        pmMessage.push({ "x": mdc, "y": pm })

      }
      //console.log(mdcMessage);
      setChartData2({
        labels: pmMessage,
        datasets: [
          {
            label: "Fleet Status- Last 7 days",
            data: pmMessage,
            backgroundColor: "#d8e4f0",
            borderWidth: 2,
            borderColor: "black",
            pointRadius: 5
          }
        ]
      });
    })
    .catch(err => {
      //console.log(err);
    });



  let aircraftno = [];
  let ata_main = [];
  let msg = [];

  const path1 = 'http://127.0.0.1:8000/stackedbar_chart_MDCmessages'

  axios.post(path1)
    .then(res => {
      //console.log(res,"response");

      for (const dataObj of JSON.parse(res.data)) {
        aircraftno.push(dataObj.aircraftno);
        ata_main.push(dataObj.ATA_main);
        msg.push(dataObj.msg);

      }
      setChartData3({
        labels: aircraftno,
        datasets: [
          {
            label: "ata",
            data: ata_main,
            backgroundColor: "#d8e4f0"
          }
        ]
      });
    })
    .catch(err => {
      //console.log(err);
    });



  return (

    <div className={classes.root}>
      <Grid container spacing={12}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Scatter
              id="chart1"
              data={chartData2}
              options={{
                scales: {
                  xAxes: [{
                    type: 'linear',
                    scaleLabel: {
                      display: true,
                      labelString: '# of MDC Messages- Last 7 days',
                      fontStyle: 'bold',
                      fontColor: '#001C3E'
                    },
                    position: 'bottom'
                  }],
                  yAxes: [{
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString: '# of MX Actions- Last 7 days',
                      fontStyle: 'bold',
                      fontColor: '#001C3E'
                    }
                  }],
                  title: { display: true, text: 'Scatter Plot', fontSize: 20 },
                  legend: { display: true, position: 'right' }
                }
              }}
            />
          </Paper>
          <Paper className={classes.paper}>
            <HorizontalBar
              data={chartData3}
              options={{
                title: {
                  display: true,
                  text: 'ATA GRAPHS',
                  fontSize: 20
                },
                legend: {
                  display: true,
                  position: 'right'
                },
                scales: {
                  xAxes: [{
                    stacked: true
                  }],
                  yAxes: [{
                    stacked: true
                  }]
                }
              }}
            /></Paper>
        </Grid>
      </Grid>
    </div>
  );
}