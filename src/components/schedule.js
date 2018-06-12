import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ScheduleList from './schedule-list';
import AptForm from './AptForm';

export default function PaperSheet(props) {
  const { classes } = props;
  return (
    <div>
      <Paper >
          <AptForm />
        <Typography variant="headline" component="h3">
          Schedule
        </Typography>
        <ScheduleList />
      </Paper>
    </div>
  );
}