import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function ScheduleList(props) {
  const { classes } = props;
  return (
    <div >
      <List component="nav">
        <ListItem button>
          <ListItemText primary="Appt Slot 1" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Appt Slot 2" />
        </ListItem>
      </List>
    </div>
  );
}