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
import MDC from './Components/MDC';
import PM from './Components/PM';
import Corr from './Components/Corr';
import Graphs from './Components/Graphs';
import Analysis from './Components/MdcMessages/GenerateReport/Analysis';
import Report from './Components/MdcMessages/Reports/Report';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TimelineSharpIcon from '@material-ui/icons/TimelineSharp';
import Rawdata from './Components/MdcMessages/Reports/Rawdata/RawMdcMessages';
import TrendingUpSharpIcon from '@material-ui/icons/TrendingUpSharp';

const drawerWidth = 300;

const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#044269",
        light: "#416d97",
        dark: "#001c3e",
      },
      secondary: {
        main: "#c5d3e0",
        light: "#d8e4f0",
      },
      default: {
        light: "#f3f2f1",
        main: "#e0e0e0",
        dark: "#92A0AD",
      },
      success: {
        main: "#044269",
      },
      text: {
        primary: "#272727",
        secondary: "#757575",
        title1: "#044269",
        title2: "#2c3942",
      },
      background: {
        tabContent: "#f3f2f1",
      },
      typography: {
      useNextVariants: true,
    },
  }
});


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
    color:"#001c3e",
  
  },
  typography: {
    useNextVariants: true,
    color: "#272727", 
    
  },
  nested: {
    paddingLeft: theme.spacing(3),
  },
}));



export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState("main");
  const [openMDC, setOpenMDC] = React.useState(false);
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
  return (

    <div className={classes.root}>
      <Router>
      <CssBaseline />
      <AppBar
        color="primary"
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <img src={mhirjLogoColored} style={{ height: 78, width: 150 }} />
          <typography style={{color:"#001c3e", fontSize:"24px", fontFamily:"Times New Roman"}}>MDC Trend Analysis Tool</typography>

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
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon style={{ color:"#001c3e"}} /> : <ChevronLeftIcon style={{ color:"#001c3e"}} />}
          </IconButton>
        </div>
        <Divider />
        <List>
            
              <ListItem>
              <Link to="/" style={{ textDecoration: 'none'}}> 
                <ListItemIcon>
                  <InfoSharpIcon style={{ color:"#001c3e"}} />
                </ListItemIcon> 
                <Button variant="contained" color="#92A0AD">
                 <typography>Main</typography>
                </Button>
              </Link>
            </ListItem> 
          
            
            <ListItem button onClick={handleClick} disablePadding>
            <ListItemIcon>
               <TableChartSharpIcon style={{ color:"#001c3e"}} />
            </ListItemIcon>
            <Button variant="contained" color="#001c3e">
            <typography>MDC</typography> 
            {openMDC ? <ExpandLess /> : <ExpandMore />}
            </Button>
            </ListItem>
           


            <Collapse in={openMDC} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            <Link to="/rawdata" style={{ textDecoration: 'none'}}> 
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <TocSharpIcon style={{ color:"#001c3e"}} />
                </ListItemIcon>
                <ListItemText primary="Raw Data"  style={{color:"#001c3e"}}/>
              </ListItem>
              </Link>
            </List>

            <List component="div" disablePadding>
            <Link to="/graphs" style={{ textDecoration: 'none'}}>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <TimelineSharpIcon style={{ color:"#001c3e"}} />
                </ListItemIcon>
                <ListItemText primary="Graphs" style={{color:"#001c3e"}}/>
              </ListItem>
            </Link>
            </List>


            <List component="div" disablePadding>
            <Link to="/analysis" style={{ textDecoration: 'none'}}>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <TrendingUpSharpIcon style={{ color:"#001c3e"}} />
                </ListItemIcon>
                <ListItemText primary="Analysis" style={{color:"#001c3e"}}/>
              </ListItem>
              </Link>
            </List>
          </Collapse>

            
            
          
            
            
              {/* <ListItem>
              <Link to="/mdc" style={{ textDecoration: 'none' }}>
                <ListItemIcon>
                <TableChartSharpIcon style={{ color:"#001c3e"}} />
                </ListItemIcon>
                <Button variant="contained" color="#001c3e" open={open} onClick={handleClick}>
                 MDC Messages
                </Button>
                <ListItem>
                </ListItem>
                </Link>
                </ListItem> */}

                
            
            
              {/* <ListItem>
              <Link to="/pm" style={{ textDecoration: 'none' }}>
                <ListItemIcon>
                <TableChartSharpIcon style={{ color:"#001c3e"}}/>
                </ListItemIcon>
                <Button variant="contained" color="#d8e4f0">
                PM Messages
                </Button>
                </Link>
                </ListItem> */}
            
            
              <ListItem >
              <Link to="/corr" style={{ textDecoration: 'none' }}>
                <ListItemIcon>
                <AssessmentSharpIcon style={{ color:"#001c3e"}}/>
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
          <Route path="/rawdata">
            <Rawdata />
          </Route>
          <Route path="/graphs">
            <Graphs />
          </Route>
          <Route path="/analysis">
            <Analysis />
          </Route>
          <Route path="/report">
            <Report />
          </Route>
          {/* <Route path="/pm">
            <PM />
          </Route> */}
          <Route path="/corr">
            <Corr />
          </Route>
        </Switch>  
      </main>
      
      </Router>
      
    </div>
  );
}