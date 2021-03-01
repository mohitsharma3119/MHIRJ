import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Icon from './StatisticsIcon';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    margin:'auto',
    backgroundColor: theme.palette.background.paper,
  },
}));

const Statistics = () => {
  const classes = useStyles();

  return (
  <Grid className={classes.root}>
  <h3>Analysis Statistics</h3>
    <List>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <Icon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Total run time"/>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <Icon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Total aircraft analyzed"/>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <Icon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Total in MDC msgs in file"/>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <Icon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Total Daily Flags"/>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <Icon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Total History Flags" />
      </ListItem>
    </List>
      </Grid>
  );
};

export default Statistics;