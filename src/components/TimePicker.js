import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

function TimePicker(props) {
  // const { classes } = props;

  return (
    <form className="appointments-form" noValidate>
      <TextField
        className="appointments__input appointments__time"
        id="time"
        label=" "
        type="time"
        defaultValue='10:00'
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
      />
    </form>
  );
}

TimePicker.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TimePicker);