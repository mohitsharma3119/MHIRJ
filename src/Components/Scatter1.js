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

  let pmMessage = [];

  const path='http://localhost:8000/scatter_chart_MDC_PM'
  
  axios.post(path)
    .then(res => {
      //console.log(res,"response");
      
      for (const dataObj of JSON.parse(res.data)) {
        let mdc = parseInt(dataObj. MDC_Message_Cnt)
        let pm = parseInt(dataObj.MX_actions)
        pmMessage.push({"x": mdc, "y": pm})
        
      }
      //console.log(mdcMessage);
      setChartData2({
        labels:pmMessage,
        datasets: [
          {
            label:"Fleet Status- Last 7 days",
            data:pmMessage,
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
 
 
  

 function save(e) {
    //save to png
    const canvasSave = document.getElementById('chart1');
    canvasSave.toBlob(function (blob) {
        saveAs(blob, "Chart1.png")
    })
}

const [data_chart1, setData_chart1] = useState({
  select_date:""
  });

  function submit(e){
    e.preventDefault();
    let mdcMessage = [];
    

    const path='http://localhost:8000/scatter_chart_MDC_PM/'+data_chart1.select_date;
    //console.log(path);
    axios.post(path)
      .then(res => {
       // console.log(res,"response");
        
        for (const dataObj of JSON.parse(res.data)) {
          let mdc = parseInt(dataObj. MDC_Message_Cnt)
          let pm = parseInt(dataObj.MX_actions)
          mdcMessage.push({"x": mdc, "y": pm})
         
        }
        console.log(mdcMessage);
        setChartData1({
          labels:mdcMessage,
          datasets: [
            {
              label:"Fleet Status- Last 7 days",
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
  function handle(e){
    const newdata={...data_chart1}
    newdata[e.target.id] = e.target.value
    setData_chart1(newdata)
    //console.log(newdata)

  }

  


  return (
    
    <div className={classes.root}>
      <Grid container spacing={12}>
      <Grid item xs={12}>
      {/* <Paper className={classes.paper}>
      <Scatter
                    id="chart1"
                    data={chartData2}
                    options={{
                      scales: {
                        xAxes: [{
                            type: 'linear',
                            position: 'bottom'
                        }],
                      title: { display: true, text: 'Scatter Plot', fontSize: 20 },
                      legend: { display: true, position: 'right' }
                    }}}
                  />
      </Paper> */}
      <form className={classes.root1} noValidate autoComplete="off">
            <div>
              <TextField  onChange= {(e)=>handle(e)} value={data_chart1.select_date} id="select_date" label=" SELECT DATE " type="date" defaultValue="2017-05-24" className={classes.textField} InputLabelProps={{ shrink: true, }} /></div>
            <br></br>
            <div style={{ paddingBottom: "20px" }}><Button id="Button" onClick={(e) => submit(e)} variant="contained" style={{ backgroundColor: "#001C3E", color: "WHITE" }}>GENERATE  </Button>
              <Button  onClick={(e) => save(e)} variant="contained" style={{ backgroundColor: "#001C3E", color: "WHITE", float: 'right', marginRight: "1200px" }}>SAVE</Button></div>
          </form>
          
      
                  <Paper className={classes.paper}>
                  <Scatter
                      id="chart1"
                      data={chartData1}
                      options={{
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
                          yAxes: [ {
                            display: true,
                            scaleLabel: {
                              display: true,
                              labelString: '# of MX Actions- Last 7 days',
                              fontStyle: 'bold',
                                    fontColor: '#001C3E'
                            }
                          } ],
                          title: { display: true, text: 'Scatter Plot', fontSize: 20 },
                          legend: { display: true, position: 'right' }
                        }
                      }}
                    />
                    
                 
                    
               </Paper>
     
     
          {/* <Paper className={classes.paper}>
            <Scatter
             id="chart1"
            data={chartData1}
            options={{
              scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom'
                }],
              title: { display: true, text: 'Scatter Plot', fontSize: 20 },
              legend: { display: true, position: 'right' }
            }}}
          />
          </Paper> */}
         
        </Grid>
        </Grid>
    </div>
  );
}