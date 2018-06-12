import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TimePicker from './TimePicker';
import { addAppointment } from '../actions/appointment';

class AptForm extends React.Component {
  state = {
    open: false,
  };

  // componentDidMount() {

  // }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    console.log('APTFORM PROPS', this.props);
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Add Appointment</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Appointment Form</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Fill out this form with client information in order to create a new appointment.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Client Name"
              type="name"
              fullWidth
            /><TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Phone Number"
            type="phonenumber"
            fullWidth
          />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
            <TimePicker />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => {
              this.props.dispatch(addAppointment())
              this.handleClose
              }} 
              color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}



export default connect()(AptForm);