import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Bar, HorizontalBar, Line } from 'react-chartjs-2';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { saveAs } from 'file-saver';
import axios from 'axios';
import { Avatar } from '@material-ui/core';


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

}));

export default function Chart2() {
  const classes = useStyles();

  const [chartData2, setChartData2] = useState({});


  const [data_chart2, setData_chart2] = useState({
    ata:"",
    top_value:"",
    from_date:"",
    to_date:""
  });

 
  function save(e) {
    //save to png
    const canvasSave = document.getElementById('chart2');
    canvasSave.toBlob(function (blob) {
        saveAs(blob, "Chart2.png")
    })
}
  


  function submit_chart2(e){
    e.preventDefault();
    let aircraft_no = [];
    let ataOcc = [];
    
    
    const path='http://localhost:8000/chart_two/' +data_chart2.top_value+ '/' +data_chart2.ata+ '/' +data_chart2.from_date+ '/' +data_chart2.to_date;
    axios.post(path)
      .then(res => {
        //console.log(res,"response");
        for (const dataObj of JSON.parse(res.data)) {
          aircraft_no.push(dataObj.aircraft);
          ataOcc.push(parseInt(dataObj.ataOcc));
        }
        setChartData2({
          labels: aircraft_no,
          datasets: [
            {
              label: data_chart2.ata,
              data: ataOcc,
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


  function handle_chart2(e){
    const newdata={...data_chart2}
    newdata[e.target.id] = e.target.value
    setData_chart2(newdata)
    //console.log(newdata)

  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>

        <Grid item xs={12}>

          <form className={classes.root1} noValidate autoComplete="off">
          <div><h1 style={{color:"#001C3E" , textAlign: "center" }}>TOP AIRCRAFT BY ATA</h1></div>   
            <div> <TextField onChange= {(e)=>handle_chart2(e)} id="ata" value={data_chart2.ata} label="ATA" defaultValue=" " variant="outlined" /></div>
            <br></br>
            <div> <TextField onChange= {(e)=>handle_chart2(e)} id="top_value" value={data_chart2.top_value} label="Top Values" defaultValue=" " variant="outlined" /></div>
            <br></br>
            <div>  <TextField onChange= {(e)=>handle_chart2(e)} id="from_date" value={data_chart2.from_date} label=" SELECT FROM DATE &nbsp; &nbsp;" type="date" defaultValue="2017-05-24" className={classes.textField} InputLabelProps={{shrink: true, }} />
              <TextField onChange= {(e)=>handle_chart2(e)} id="to_date" value={data_chart2.to_date} label=" SELECT TO DATE " type="date" defaultValue="2017-05-24" className={classes.textField} InputLabelProps={{ shrink: true,  }} /></div>
            <br></br>
            <div  style={{ paddingBottom: "20px" }}><Button onClick={(e) => submit_chart2(e)} variant="contained" style={{backgroundColor:"#001C3E", color:"WHITE"}}>GENERATE  </Button>
            <Button onClick={(e) => save(e)}  variant="contained"style={{backgroundColor:"#001C3E", color:"WHITE",float:'right', marginRight:"1200px"}}>SAVE</Button></div>
          </form>

          <Paper className={classes.paper}>
            <HorizontalBar
            id="chart2"
            data={chartData2}
            options={{
              // indexAxis: "y",
              title: {
                display: true,
                text: 'ATA ' +data_chart2.ata+ ' occurence in each AC',
                fontSize: 20
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      autoSkip: false,
                      // maxTicksLimit: 10,
                      beginAtZero: true
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
                      labelString: 'ATA ' +data_chart2.ata+ ' occurence in each AC',
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
