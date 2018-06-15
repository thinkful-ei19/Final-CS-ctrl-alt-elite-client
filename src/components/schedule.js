import React from 'react';
// import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import ScheduleList from './schedule-list';

export default function Schedule(props) {
  // const { classes } = props;
  return (
      <Paper className="schedule appointments">
        <ScheduleList />
      </Paper>
  );
}