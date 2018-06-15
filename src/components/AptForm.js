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
      time: '10:00',
      notes: '',
      checked: false
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
    this.setState({ 
      open: false,
      name: '',
      phone: '',
      email: '',
      date: '',
      time: '10:00',
      notes: '',
      checked: false
     });
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
    if (event.target.id === 'email') {
      this.setState({
        email: event.target.value
      });
    }
    if (event.target.id === 'date') {
      this.setState({
        date: event.target.value
      });
    }
    if (event.target.id === 'time') {
      this.setState({
        time: event.target.value
      });
    }
    if (event.target.id === 'notes') {
      this.setState({
        notes: event.target.value
      });
    }
  }

  selectClient(id) {
    console.log('Is running');
    const component = this;
    this.props.currentUser.clients.forEach((client) => {
      if (client.id === id) {
        component.setState({
          name: client.name,
          phone: client.phone,
          email: client.email
        })
      }
    })


  }

  render() {

    let dropDownMenu;
    if (this.props.currentUser.clients.length > 0) {
      const buildOptions = this.props.currentUser.clients.map((client) => {
        return (
          <option key={client.id} value={client.id}>{client.name}</option>
        )
      })
      dropDownMenu = <select onChange={(event) => { this.selectClient(event.target.value) }} defaultValue='blank'>
      <option style={{ display: 'none' }} disabled value='blank'></option>
      {buildOptions}
    </select>

    }


    return (
      <div className="appointments-specify">
        <Button className="appointments__add-appointment" onClick={this.handleClickOpen}>Add Appointment</Button>
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

              {dropDownMenu}


            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Client Name"
              type="name"
              fullWidth
              value={this.state.name}
            /><TextField
              autoFocus
              margin="dense"
              id="phone"
              label="Phone Number"
              type="phonenumber"
              fullWidth
              value={this.state.phone}
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              value={this.state.email}
            />
            <TextField
              type="date"
              id="date"
            />
            <TimePicker props={this.state.time}/>
            <TextField
              autoFocus
              margin="dense"
              id="notes"
              label="Additional Notes"
              type="notes"
              fullWidth
              value={this.state.notes}
            />
          </DialogContent>
          <DialogActions>
            <label>Save this client for future appointments</label>
            <input onChange={(event) => this.setState({ checked: event.target.checked })} type="checkbox" />
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => {
              const values = {
                name: this.state.name,
                phone: this.state.phone,
                email: this.state.email,
                date: this.state.date,
                time: this.state.time,
                checked: this.state.checked,
                notes: this.state.notes
              }
              if (values.name === '' || values.date === '' || values.time === '') {
                alert('Please fill out the form entirely (notes optional)')
                return;
              }
              let check = false;
              this.props.currentUser.appointments.forEach((apt) => {
                if (moment(apt.time).format('YYYY MM DD HH mm') === moment(String(values.date + ' ' + values.time)).format('YYYY MM DD HH mm')) {
                  console.log()
                  check = true;
                }
              })
              if (check === true) {
                alert('This time slot if already taken, please choose another.')
                return;
              }
              if (values.checked === true) {
                check = false;
                this.props.currentUser.clients.forEach((client) => {
                  if (client.name === values.name) {
                    check = true;
                  }
                })
                if (check === true) {
                  alert('This client name already exists! Please choose a different client name.')
                  return;
                }
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