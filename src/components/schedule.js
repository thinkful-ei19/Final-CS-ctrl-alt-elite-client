import React from 'react';
// import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import ScheduleList from './schedule-list';
import AptForm from './AptForm';

export default function Schedule(props) {
  // const { classes } = props;
  return (
      <div className="schedule">
        <ScheduleList />
      </div>
  );
}