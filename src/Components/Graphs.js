import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Bar, HorizontalBar, Line } from 'react-chartjs-2';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
  },

}));
const state = {
  labels: ['January', 'February', 'March',
    'April', 'May'],
  datasets: [
    {
      label: 'ATA data',
      backgroundColor: '#d8e4f0',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56]
    }
  ]
}

export default function Graphs() {
  const classes = useStyles();
  const [chartData1, setChartData1] = useState({});
  const [chartData2, setChartData2] = useState({});
  const [data_chart1, setData_chart1] = useState({
    aircraft_no:"",
    top_value:"",
    from_date:"",
    to_date:""
  });

  const [data_chart2, setData_chart2] = useState({
    ata:"",
    top_value:"",
    from_date:"",
    to_date:""
  });

 

  function submit(e){
    e.preventDefault();
    let msgName = [];
    let messageOcc = [];

    const path='http://localhost:8000/chart_one/' +data_chart1.top_value+ '/' +data_chart1.aircraft_no+ '/' +data_chart1.from_date+ '/' +data_chart1.to_date;
    
    axios.post(path)
      .then(res => {
        console.log(res,"response");
        
        for (const dataObj of JSON.parse(res.data)) {
          msgName.push(dataObj.Equation_ID +"\n"+ dataObj.ATA +"\n"+ dataObj.LRU);
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
              borderWidth: 2,
              borderColor: "black"
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

  function handle_chart2(e){
    const newdata={...data_chart2}
    newdata[e.target.id] = e.target.value
    setData_chart2(newdata)
    //console.log(newdata)

  }

  
  
  
  // const chart2 = () => {
  //   let aircraft_no = [];
  //   let ataOcc = [];
    
  //   axios
  //     .post("http://127.0.0.1:8000/chart_two/15/32/2020-11-05/2020-11-12")
  //     .then(res => {
  //       //console.log(res,"response");
  //       for (const dataObj of JSON.parse(res.data)) {
  //         aircraft_no.push(dataObj.aircraft);
  //         ataOcc.push(parseInt(dataObj.ataOcc));
  //       }
  //       setChartData2({
  //         labels: aircraft_no,
  //         datasets: [
  //           {
  //             label: "10201",
  //             data: ataOcc,
  //             backgroundColor: "#d8e4f0",
  //             borderWidth: 2,
  //             borderColor: "black"
  //           }
  //         ]
  //       });
  //     })
  //     .catch(err => {
  //       //console.log(err);
  //     });
  //   //console.log(msgName, messageOcc);
  // };

  // useEffect(() => {
  //   chart2();
  // }, []);


  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
      <Grid item xs={12}>
          <form  className={classes.root1}>
            <div> <TextField onChange= {(e)=>handle(e)} id="aircraft_no" value={data_chart1.aircraft_no} label="Aicraft to study" defaultValue=" " variant="outlined" /></div>
            <br></br>
            <div> <TextField onChange= {(e)=>handle(e)} id="top_value" value={data_chart1.top_value} label="Top Values" defaultValue=" " variant="outlined" /></div>
            <br></br>
            <div>  <TextField onChange= {(e)=>handle(e)} id="from_date" value={data_chart1.from_date} label=" SELECT FROM DATE &nbsp; &nbsp;" type="date" defaultValue="2017-05-24" className={classes.textField} InputLabelProps={{shrink: true, }} />
              <TextField onChange= {(e)=>handle(e)} id="to_date" value={data_chart1.to_date} label=" SELECT TO DATE " type="date" defaultValue="2017-05-24" className={classes.textField} InputLabelProps={{ shrink: true,  }} /></div>
            <br></br>
            <div className={classes.root1} style={{ paddingBottom: "20px" }}><Button onClick={(e) => submit(e)} variant="contained" color="primary">GENERATE</Button></div>
          </form>
          <Paper className={classes.paper}>
          <HorizontalBar
            data={chartData1}
            options={{
              // indexAxis: "y",
              title: {
                display: true,
                text: 'Message occurance in '+data_chart1.aircraft_no,
                fontSize: 20
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      autoSkip: true,
                      // maxTicksLimit: 10,
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


        <Grid item xs={12}>

          <form className={classes.root1} noValidate autoComplete="off">
            <div> <TextField onChange= {(e)=>handle_chart2(e)} id="ata" value={data_chart2.ata} label="ATA" defaultValue=" " variant="outlined" /></div>
            <br></br>
            <div> <TextField onChange= {(e)=>handle_chart2(e)} id="top_value" value={data_chart2.top_value} label="Top Values" defaultValue=" " variant="outlined" /></div>
            <br></br>
            <div>  <TextField onChange= {(e)=>handle_chart2(e)} id="from_date" value={data_chart2.from_date} label=" SELECT FROM DATE &nbsp; &nbsp;" type="date" defaultValue="2017-05-24" className={classes.textField} InputLabelProps={{shrink: true, }} />
              <TextField onChange= {(e)=>handle_chart2(e)} id="to_date" value={data_chart2.to_date} label=" SELECT TO DATE " type="date" defaultValue="2017-05-24" className={classes.textField} InputLabelProps={{ shrink: true,  }} /></div>
            <br></br>
            <div className={classes.root1} style={{ paddingBottom: "20px" }}><Button onClick={(e) => submit_chart2(e)} variant="contained" color="primary">GENERATE</Button></div>
          </form>

          <Paper className={classes.paper}>
            <HorizontalBar
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
                      autoSkip: true,
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
          /></Paper>
        </Grid>
        
        <Grid item xs={6}>
          <form className={classes.root1} noValidate autoComplete="off">
            <div> <TextField id="outlined-required" label="AC to Study" defaultValue=" " variant="outlined" /></div>
            <br></br>
            <div> <TextField id="outlined-required" label="Message to Study" defaultValue=" " variant="outlined" /></div>
            <br></br>
            <div className={classes.root1} style={{ paddingBottom: "20px" }}><Button variant="contained" color="primary">GENERATE</Button></div>
          </form>

          <Paper className={classes.paper}><Line
            data={state}
            options={{
              title: {
                display: true,
                text: 'ATA GRAPHS',
                fontSize: 20
              },
              legend: {
                display: true,
                position: 'right'
              }
            }}
          /></Paper>
        </Grid>
        <Grid item xs={6}>
          <form className={classes.root1} noValidate autoComplete="off">
            <div> <TextField id="outlined-required" label="Report Choosen" defaultValue=" " variant="outlined" /></div>
            <br></br>
            <div> <TextField id="outlined-required" label="Top Count" defaultValue=" " variant="outlined" /></div>
            <br></br>
            <div className={classes.root1} style={{ paddingBottom: "20px" }}><Button variant="contained" color="primary">GENERATE</Button></div>
          </form>

          <Paper className={classes.paper}><Bar
            data={state}
            options={{
              title: {
                display: true,
                text: 'ATA GRAPHS',
                fontSize: 20
              },
              legend: {
                display: true,
                position: 'right'
              }
            }}
          /></Paper>
        </Grid>
        <Grid item xs={6}>
          <form className={classes.root1} noValidate autoComplete="off">
            <div> <TextField id="outlined-required" label="AC to Study(3)" defaultValue=" " variant="outlined" /></div>
            <br></br>
            <div> <TextField id="outlined-required" label="Message to Study(3)" defaultValue=" " variant="outlined" /></div>
            <br></br>
            <div className={classes.root1} style={{ paddingBottom: "20px" }}><Button variant="contained" color="primary">GENERATE</Button></div>
          </form>

          <Paper className={classes.paper}><Bar
            data={state}
            options={{
              title: {
                display: true,
                text: 'ATA GRAPHS',
                fontSize: 20
              },
              legend: {
                display: true,
                position: 'right'
              }
            }}
          /></Paper>
        
        </Grid>
      </Grid>
    </div>
  );
}