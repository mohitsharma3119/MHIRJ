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
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const drawerWidth = 240;

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
    backgroundColor: "#92A0AD",
    
    
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
    backgroundColor: "#e0e0e0",
   
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    
  backgroundColor: "#f3f2f1",
    
    
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    
  },
  tabContent: {
    width: "100%",
    padding: "15px 5px 15px 20px",
  
    
  },
  icon: {
    paddingRight: "10px",
    width: "30px",
    height: "30px",
    color:"#001c3e",
  
  },
  typography: {
    useNextVariants: true,
    color: "#272727", 
  },
}));



export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState("main");
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleOnClick = (page) => {
    
    setPage(page);

  }
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
          <img src={mhirjLogoColored} style={{ height: 53, width: 150 }} />

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
            
            
              <ListItem>
              <Link to="/mdc" style={{ textDecoration: 'none' }}>
                <ListItemIcon>
                <TableChartSharpIcon style={{ color:"#001c3e"}} />
                </ListItemIcon>
                <Button variant="contained" color="#001c3e">
                 MDC Messages
                </Button>
                </Link>
                </ListItem>
            
            
              <ListItem>
              <Link to="/pm" style={{ textDecoration: 'none' }}>
                <ListItemIcon>
                <TableChartSharpIcon style={{ color:"#001c3e"}}/>
                </ListItemIcon>
                <Button variant="contained" color="#d8e4f0">
                PM Messages
                </Button>
                </Link>
                </ListItem>
            
            
              <ListItem>
              <Link to="/corr" style={{ textDecoration: 'none' }}>
                <ListItemIcon>
                <AssessmentSharpIcon style={{ color:"#001c3e"}}/>
                </ListItemIcon>
                <Button variant="contained" color="#d8e4f0">
                Correlation
                </Button>
                </Link>
                </ListItem>
          
          
          {/* <ListItem button onClick={() =>handleOnClick("MDC")}>
            <ListItemIcon>
              <TableChartSharpIcon />
            </ListItemIcon>
            <ListItemText primary="MDC Messages" />
          </ListItem>
          <ListItem button onClick={() => handleOnClick("PM")}>
            <ListItemIcon>
              <TableChartSharpIcon />
            </ListItemIcon>
            <ListItemText primary="PM Messages" />
          </ListItem>
        <ListItem button onClick={() =>handleOnClick("Corr")}>
            <ListItemIcon>
              <AssessmentSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Coorelation" />
          </ListItem> */}
        </List>
        <Divider />
        
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* {
          page=="main" && (
            <Typography paragraph>
              This is the main page
            </Typography>
          )
        }
        {
          page=="MDC" && (
            <Typography paragraph>
              This is the MDC page
            </Typography>
          )
        }
        {
          page=="PM" && (
            <Typography paragraph>
              This is the PM page
            </Typography>
          )
        }
        {
          page=="Corr" && (
            <Typography paragraph>
              This is the Correlation page
            </Typography>
          )
        }
        <Typography paragraph>
          
        </Typography> */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/mdc">
            <MDC />
          </Route>
          <Route path="/pm">
            <PM />
          </Route>
          <Route path="/corr">
            <Corr />
          </Route>
        </Switch>  
      </main>
      
      </Router>
      
    </div>
  );
}