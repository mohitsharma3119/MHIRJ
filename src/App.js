import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InfoSharpIcon from '@material-ui/icons/InfoSharp';
import EqualizerSharpIcon from '@material-ui/icons/EqualizerSharp';
import ShowChartSharpIcon from '@material-ui/icons/ShowChartSharp';
import Button from '@material-ui/core/Button';
import TableChartSharpIcon from '@material-ui/icons/TableChartSharp';
import AssessmentSharpIcon from '@material-ui/icons/AssessmentSharp';
import mhirjLogoColored from './mhirjLogoColored.svg';
import ListSubheader from '@material-ui/core/ListSubheader';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import TocSharpIcon from '@material-ui/icons/TocSharp';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Components/Home';
import Corr from './Components/Corr';
import Chart1 from './Components/Chart1';
import Chart2 from './Components/Chart2';
import Chart3 from './Components/Chart3';
import Chart4 from './Components/Chart4';
import Chart5 from './Components/Chart5';
import Scatter1 from './Components/Scatter1';
import Stacked from './Components/Stacked';
import Analysis from './Components/MdcMessages/GenerateReport/Analysis';
import Report from './Components/MdcMessages/Reports/Report';
import Correlation from './Components/Correlation/Correlation';
import FlagReport from './Components/MdcMessages/Reports/FlagReport/FlagReport';
import TimelineSharpIcon from '@material-ui/icons/TimelineSharp';
import Rawdata from './Components/MdcMessages/Reports/Rawdata/RawMdcMessages';
import TrendingUpSharpIcon from '@material-ui/icons/TrendingUpSharp';

const drawerWidth = 330;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',

  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,

    }),
    backgroundColor: "#c5d3e0",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: "#c5d3e0",
  },
  menuButton: {
    marginRight: 36,
    color: "#001c3e",
  },
  hide: {
    display: 'none',

  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',

  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: "#c5d3e0",
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(9) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(8) + 1,
    },
    backgroundColor: "#c5d3e0",

  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    height: "78px",
    backgroundColor: "#f3f2f1",
  },
  content: {
    flexGrow: -1,
    padding: theme.spacing(0),

  },
  tabContent: {
    width: "100%",
    padding: "15px 5px 15px 20px",
  },
  icon: {
    paddingRight: "10px",
    width: "30px",
    height: "50px",
    color: "#001c3e",

  },
  typography: {
    useNextVariants: true,
    color: "#272727",
  },
  nested: {
    paddingLeft: theme.spacing(3),
  },
  nested_1: {
    paddingLeft: theme.spacing(3),
  },
}));



export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState("main");
  const [openMDC, setOpenMDC] = React.useState(false);
  const [openMAIN, setOpenMAIN] = React.useState(false);
  const [openGraphs, setOpenGraphs] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleOnClick = (page) => {
    setPage(page);

  };
  const handleClick = () => {
    setOpenMDC(!openMDC);
  };
  const handleMainClick = () => {
    setOpenMAIN(!openMAIN);
  };
  const handleGraphsClick = () => {
    setOpenGraphs(!openGraphs);
  };
  return (

    <div className={classes.root}>
      <Router>
        <CssBaseline />
        <AppBar
          color="primary"
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}>
              <MenuIcon />
            </IconButton>
            <img src={mhirjLogoColored} style={{ height: 78, width: 150 }} />
            <typography style={{ color: "#001c3e", fontSize: "24px", fontFamily: "Times New Roman" }}>MDC Trend Analysis Tool</typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}>
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon style={{ color: "#001c3e" }} /> : <ChevronLeftIcon style={{ color: "#001c3e" }} />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button onClick={handleMainClick} disablePadding>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <ListItemIcon>
                  <InfoSharpIcon style={{ color: "#001c3e" }} />
                </ListItemIcon>
                <Button variant="contained" color="#92A0AD">
                  <typography>Main</typography>
                  {openMAIN ? <ExpandLess /> : <ExpandMore />}
                </Button>
              </Link>
            </ListItem>
            <Collapse in={openMAIN} timeout="auto" unmountOnExit>

              <List component="div" disablePadding>
                <Link to="/Scatter1" style={{ textDecoration: 'none' }}>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <TrendingUpSharpIcon style={{ color: "#001c3e" }} />
                    </ListItemIcon>
                    <ListItemText primary="SCATTER" style={{ color: "#001c3e" }} />
                  </ListItem>
                </Link>
              </List>

              <List component="div" disablePadding>
                <Link to="/Stacked" style={{ textDecoration: 'none' }}>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <TrendingUpSharpIcon style={{ color: "#001c3e" }} />
                    </ListItemIcon>
                    <ListItemText primary="STACKED" style={{ color: "#001c3e" }} />
                  </ListItem>
                </Link>
              </List>
            </Collapse>

            <ListItem button onClick={handleClick} disablePadding>
              <ListItemIcon>
                <TableChartSharpIcon style={{ color: "#001c3e" }} />
              </ListItemIcon>
              <Button variant="contained" color="#001c3e">
                <typography>MDC</typography>
                {openMDC ? <ExpandLess /> : <ExpandMore />}
              </Button>
            </ListItem>

            <Collapse in={openMDC} timeout="auto" unmountOnExit>

              <List component="div" disablePadding>
                <Link to="/analysis" style={{ textDecoration: 'none' }}>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <TrendingUpSharpIcon style={{ color: "#001c3e" }} />
                    </ListItemIcon>
                    <ListItemText primary="ANALYSIS" style={{ color: "#001c3e" }} />
                  </ListItem>
                </Link>
              </List>

              <List component="div" disablePadding>

                <ListItem button className={classes.nested} button onClick={handleGraphsClick}>
                  <ListItemIcon>
                    <TimelineSharpIcon style={{ color: "#001c3e" }} />
                  </ListItemIcon>
                  <Button color="#001c3e" style={{ fontSize: "16px" }}>
                    <typography>Graphs </typography>
                    {openGraphs ? <ExpandLess /> : <ExpandMore />}
                  </Button>
                </ListItem>

                <Collapse in={openGraphs} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <Link to="/Chart1" style={{ textDecoration: 'none' }}>
                      <ListItem button className={classes.nested_1}>
                        <ListItemIcon>
                          <EqualizerSharpIcon style={{ color: "#001c3e" }} />
                        </ListItemIcon>
                        <ListItemText primary="Message Logged per Aircraft" style={{ color: "#001c3e" }} />
                      </ListItem>
                    </Link>
                  </List>

                  <List component="div" disablePadding>
                    <Link to="/Chart2" style={{ textDecoration: 'none' }}>
                      <ListItem button className={classes.nested_1}>
                        <ListItemIcon>
                          <EqualizerSharpIcon style={{ color: "#001c3e" }} />
                        </ListItemIcon>
                        <ListItemText primary="Top Aircraft by ATA" style={{ color: "#001c3e" }} />
                      </ListItem>
                    </Link>
                  </List>

                  <List component="div" disablePadding>
                    <Link to="/Chart3" style={{ textDecoration: 'none' }}>
                      <ListItem button className={classes.nested_1}>
                        <ListItemIcon>
                          <ShowChartSharpIcon style={{ color: "#001c3e" }} />
                        </ListItemIcon>
                        <ListItemText primary="Message Trend by Aircraft" style={{ color: "#001c3e" }} />
                      </ListItem>
                    </Link>
                  </List>

                  {/* <List component="div" disablePadding>
                      <Link to="/Chart4" style={{ textDecoration: 'none' }}>
                        <ListItem button className={classes.nested_1}>
                          <ListItemIcon>
                            <ShowChartSharpIcon style={{ color: "#001c3e" }} />
                          </ListItemIcon>
                          <ListItemText primary="Top ATA in Reports" style={{ color: "#001c3e" }} />
                        </ListItem>
                      </Link>
                    </List> */}

                  <List component="div" disablePadding>
                    <Link to="/Chart5" style={{ textDecoration: 'none' }}>
                      <ListItem button className={classes.nested_1}>
                        <ListItemIcon>
                          <ShowChartSharpIcon style={{ color: "#001c3e" }} />
                        </ListItemIcon>
                        <ListItemText primary="Message Intermittency per Aircraft" style={{ color: "#001c3e" }} />
                      </ListItem>
                    </Link>
                  </List>
                </Collapse>
              </List>


              <List component="div" disablePadding>
                <Link to="/rawdata" style={{ textDecoration: 'none' }}>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <TocSharpIcon style={{ color: "#001c3e" }} />
                    </ListItemIcon>
                    <ListItemText primary="RAW DATA" style={{ color: "#001c3e" }} />
                  </ListItem>
                </Link>
              </List>

            </Collapse>

            <ListItem >
              <Link to="/corr" style={{ textDecoration: 'none' }}>
                <ListItemIcon>
                  <AssessmentSharpIcon style={{ color: "#001c3e" }} />
                </ListItemIcon>
                <Button variant="contained" color="#d8e4f0">
                  <typography>Correlation</typography>
                </Button>
              </Link>
            </ListItem>

          </List>
          <Divider />

        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/Scatter1">
              <Scatter1 />
            </Route>
            <Route path="/Stacked">
              <Stacked />
            </Route>
            <Route path="/rawdata">
              <Rawdata />
            </Route>
            {/* <Route path="/graphs">
            <Graphs />
          </Route> */}
            <Route path="/Chart1">
              <Chart1 />
            </Route>
            <Route path="/Chart2">
              <Chart2 />
            </Route>
            <Route path="/Chart3">
              <Chart3 />
            </Route>
            {/* <Route path="/Chart4">
            <Chart4 />
          </Route> */}
            <Route path="/Chart5">
              <Chart5 />
            </Route>
            <Route path="/analysis">
              <Analysis />
            </Route>
            <Route path="/report">
              <Report />
            </Route>
            <Route path="/flag">
              <FlagReport />
            </Route>
            <Route path="/corr">
              <Correlation />
            </Route>
          </Switch>
        </main>

      </Router>

    </div>
  );
}
