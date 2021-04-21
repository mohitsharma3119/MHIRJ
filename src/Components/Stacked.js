import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { HorizontalBar } from 'react-chartjs-2';
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


export default function Stacked() {
  const classes = useStyles();
  const ChartJsImage = require('chartjs-to-image');
  const [chartData1, setChartData1] = useState({});

  function save(e) {
    //save to png
    const canvasSave = document.getElementById('chart1');
    canvasSave.toBlob(function (blob) {
      saveAs(blob, "StackedChart.png")
    })
  }

  const [data_chart1, setData_chart1] = useState({
    from_date: "",
    to_date: "",
    top_value: ""
  });

  function submit(e) {
    e.preventDefault();
    // let aircraftno = [];
    // let ata_main = [];
    // let msg = [];

    //const path = 'http://localhost:8000/Landing_Chart_B/' + data_chart1.top_value + '/' + data_chart1.from_date + '/' + data_chart1.to_date;
  const path = 'http://40.82.160.131/api/Landing_Chart_B/' + data_chart1.top_value + '/' + data_chart1.from_date + '/' + data_chart1.to_date;


    axios.post(path)
      .then(res => {
        //console.log(res,"response");

        let data = JSON.parse(res.data);
        let aircraftNos = Object.keys(data);
        let dataMetaData = {};
        aircraftNos.map(no => {
          let airCraftObj = data[no];
          for (let x in airCraftObj) {
            if (dataMetaData[x]) dataMetaData[x].push(airCraftObj[x]);
            else dataMetaData[x] = [airCraftObj[x]];
          }


        })
        const getUniqueBackgroundColor = (code) => {
          switch (code) {
            case '21':
              return "#ef5350";
            case '22':
              return "#ec407a";
            case '23':
              return "#ab47bc";
            case '24':
              return "#7e57c2"
            case '26':
              return "#5c6bc0";
            case '27':
              return "#42a5f5";
            case '28':
              return "#29b6f6";
            case '30':
              return "#26c6da";
            case '31':
              return "#26a69a";
            case '32':
              return "#66bb6a";
            case '33':
              return "#9ccc65";
            case '34':
              return "#d4e157";
            case '36':
              return "#ffee58";
            case '38':
              return "#ffca28";
            case '45':
              return "#ffa726";
            case '49':
              return "#8d6e63";
            case '71':
              return "#bdbdbd";
            case '77':
              return "#9e9d24";
            case '78':
              return "#ff7043";
          }
        }

        const intiDataSet = (dataMetaData) => {
          let codes = Object.keys(dataMetaData);
          let finalDataset = [];
          codes.map(code => {
            let dataObj = {};
            dataObj.label = code;
            dataObj.data = dataMetaData[code];
            dataObj.backgroundColor = getUniqueBackgroundColor(code);
            finalDataset.push(dataObj);
            dataObj.borderWidth = 0.5;
            dataObj.borderColor = "black";
          });
          return finalDataset;
        }
        // console.log("aircraftNos=",aircraftNos);
        setChartData1({
          labels: aircraftNos,
          datasets: intiDataSet(dataMetaData)

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
            <div><h1 style={{ color: "#001C3E", textAlign: "center" }}>Stacked Chart for Magnitude of Messages in data</h1></div>
            <div> <TextField onChange={(e) => handle(e)} id="top_value" value={data_chart1.top_value} label="Top Values" defaultValue=" " variant="outlined" /></div>
            <br></br>
            <div>  <TextField onChange={(e) => handle(e)} id="from_date" value={data_chart1.from_date} label=" SELECT FROM DATE &nbsp; &nbsp;" type="date" defaultValue=" " className={classes.textField} InputLabelProps={{ shrink: true, }} />
              <TextField onChange={(e) => handle(e)} id="to_date" value={data_chart1.to_date} label=" SELECT TO DATE " type="date" defaultValue=" " className={classes.textField} InputLabelProps={{ shrink: true, }} /></div>
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
                  text: 'Magnitute of messages in data',
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
                    barPercentage: 0.5,
                    scaleLabel: {
                      display: true,
                      labelString: 'Aircraft Serial Number',
                      fontStyle: 'bold',
                      fontColor: '#001C3E'
                    },
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
