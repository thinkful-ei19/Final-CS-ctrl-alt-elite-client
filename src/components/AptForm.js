import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
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
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: '',
      phone: '',
      email: '',
      date: '',
      time: ''
    };
  }
  

  // componentDidMount() {
  //   const decodedToken = jwtDecode(this.props.authToken)
  //   const username = decodedToken.sub
  //   this.props.dispatch(getUserInfo(this.props.authToken, username));
  // }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmitValue = (event) => {
    if (event.target.id === 'name') {
      this.setState({
        name: event.target.value
      });
    }
    if (event.target.id === 'phone') {
      this.setState({
        phone: event.target.value
      });
    }
    if ( event.target.id === 'email') {
      this.setState({
        email: event.target.value
      });
    }
    if ( event.target.id === 'date') {
      this.setState({
        date: event.target.value
      });
    }
    if ( event.target.id === 'time') {
      this.setState({
        time: event.target.value
      });
    }
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Add Appointment</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          onChange={(event) => this.handleSubmitValue(event)}
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
              id="email"
              label="Email Address"
              type="email"
              fullWidth
            />
             <TextField 
             type="date"
             id="date"
              />
            <TimePicker />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => {
            console.log('submit');
            const values = {
              name: this.state.name,
              phone: this.state.phone,
              email: this.state.email,
              date: this.state.date,
              time: this.state.time
            }
            this.props.dispatch(addAppointment(this.props.authToken, values, this.props.currentUser.id))
            this.handleClose();
          }}
              type="submit"
              color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log('STATE:', state.auth.currentUser.id);
  return {
      authToken: state.auth.authToken,
      currentUser: state.auth.currentUser
  }
};

export default connect(mapStateToProps)(AptForm);