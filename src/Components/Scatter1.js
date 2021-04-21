import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Scatter } from 'react-chartjs-2';
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


export default function Scatter1() {
  const classes = useStyles();
  const ChartJsImage = require('chartjs-to-image');
  const [chartData1, setChartData1] = useState({});
  const [chartData2, setChartData2] = useState({});
  let aircraftno_scatter = [];
  let mdcMessage = [];

  function save(e) {
    //save to png
    const canvasSave = document.getElementById('chart1');
    canvasSave.toBlob(function (blob) {
      saveAs(blob, "Chart1.png")
    })
  }

  const [data_chart1, setData_chart1] = useState({
    from_date: "",
    to_date: ""
  });

  function submit(e) {
    e.preventDefault();

    const path = 'http://localhost:8000/scatter_chart_MDC_PM/' + data_chart1.from_date + '/' + data_chart1.to_date;
    //const path = 'http://40.82.160.131/api/scatter_chart_MDC_PM/' + data_chart1.select_date;


    //console.log(path);
    axios.post(path)
      .then(res => {
        for (const dataObj of JSON.parse(res.data)) {
          let mdc = parseInt(dataObj.MDC_Message_Cnt)
          let pm = parseInt(dataObj.MX_actions)
          aircraftno_scatter.push(dataObj.aircraftno)
          mdcMessage.push({ "x": mdc, "y": pm })

        }
        console.log(mdcMessage);
        setChartData1({
          labels: aircraftno_scatter,
          datasets: [
            {
              label: "Fleet Status",
              data: mdcMessage,
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
          <form className={classes.root1} noValidate autoComplete="off">

            <div><h2 style={{ color: "#001C3E", textAlign: "center" }}>FLEET STATUS</h2></div>
            <div>  <TextField onChange={(e) => handle(e)} id="from_date" value={data_chart1.from_date} label=" SELECT FROM DATE &nbsp; &nbsp;" type="date" defaultValue=" " className={classes.textField} InputLabelProps={{ shrink: true, }} />
              <TextField onChange={(e) => handle(e)} id="to_date" value={data_chart1.to_date} label=" SELECT TO DATE " type="date" defaultValue=" " className={classes.textField} InputLabelProps={{ shrink: true, }} /></div>
            <br></br>
            <div style={{ paddingBottom: "20px" }}><Button id="Button" onClick={(e) => submit(e)} variant="contained" style={{ backgroundColor: "#001C3E", color: "WHITE" }}>GENERATE  </Button>
              <Button onClick={(e) => save(e)} variant="contained" style={{ backgroundColor: "#001C3E", color: "WHITE", float: 'right', marginRight: "1200px" }}>SAVE</Button></div>
          </form>

          <Paper className={classes.paper}>
            <Scatter
              id="chart1"
              data={chartData1}
              options={{
                legend: { display: false },
                tooltips: {

                  displayColors: false,
                  backgroundColor: 'black',
                  titleFontColor: 'rgb(255,255,255)',
                  bodyFontColor: 'rgb(255,255,255)',
                  footerFontColor: 'rgb(255,255,255)',
                  footerFontStyle: 'normal',

                  callbacks: {
                    title: function (item, everything) {
                      return;
                    },
                    label: function (item, everything) {
                      console.log(item, everything);
                      let ind = item.index;
                      let aircraft_name = everything.labels[ind];
                      return "Aircraft: " + aircraft_name;
                    },

                    footer: function (item, everything) {
                      console.log(item, everything);
                      let xvalue = item[0].xLabel;
                      let yvalue = item[0].yLabel;
                      return "x =" + xvalue +','+" y = " + yvalue;

                    }
                  }
                },
                scales: {
                  xAxes: [{
                    type: 'linear',
                    position: 'bottom',
                    scaleLabel: {
                      display: true,
                      labelString: '# of MDC Messages- Last 7 days',
                      fontStyle: 'bold',
                      fontColor: '#001C3E'

                    },
                  }],
                  yAxes: [{
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString: '# of log-book entries',
                      fontStyle: 'bold',
                      fontColor: '#001C3E'
                    }
                  }],
                  title: { display: true, text: 'Scatter Plot', fontSize: 20 },

                }
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}