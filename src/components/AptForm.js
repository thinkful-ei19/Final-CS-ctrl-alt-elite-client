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
import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';

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
        <IconButton aria-label="add appointment" onClick={this.handleClickOpen}>
            <SvgIcon>
            <path xmlns="http://www.w3.org/2000/svg" d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M16,13h-3v3c0,0.55-0.45,1-1,1h0c-0.55,0-1-0.45-1-1   v-3H8c-0.55,0-1-0.45-1-1v0c0-0.55,0.45-1,1-1h3V8c0-0.55,0.45-1,1-1h0c0.55,0,1,0.45,1,1v3h3c0.55,0,1,0.45,1,1v0   C17,12.55,16.55,13,16,13z"/>
            </SvgIcon>
        </IconButton>
        {/* <IconButton aria-label="add appointment" onClick={this.handleClickOpen}>
            <SvgIcon>
            <path xmlns="http://www.w3.org/2000/svg" d="M12,7L12,7c-0.55,0-1,0.45-1,1v3H8c-0.55,0-1,0.45-1,1v0c0,0.55,0.45,1,1,1h3v3c0,0.55,0.45,1,1,1h0c0.55,0,1-0.45,1-1v-3   h3c0.55,0,1-0.45,1-1v0c0-0.55-0.45-1-1-1h-3V8C13,7.45,12.55,7,12,7z M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10   S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20z"/>
            </SvgIcon>
        </IconButton> */}
        {/* <IconButton aria-label="add appointment" onClick={this.handleClickOpen}>
            <SvgIcon>
            <path xmlns="http://www.w3.org/2000/svg" d="M18,13h-5v5c0,0.55-0.45,1-1,1h0c-0.55,0-1-0.45-1-1v-5H6c-0.55,0-1-0.45-1-1v0c0-0.55,0.45-1,1-1h5V6c0-0.55,0.45-1,1-1h0   c0.55,0,1,0.45,1,1v5h5c0.55,0,1,0.45,1,1v0C19,12.55,18.55,13,18,13z"/>
            </SvgIcon>
        </IconButton>  */}

        <Dialog
          className="appointments__dialog"
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          onChange={(event) => this.handleSubmitValue(event)}
        >
          <DialogTitle id="form-dialog-title">Appointment Form</DialogTitle>
          <DialogContent>
            <DialogContentText className="appointments__text">
              Fill out this form with client information in order to create a new appointment.
            </DialogContentText>
              {dropDownMenu}
            <TextField
              className="appointments__input"
              autoFocus
              margin="dense"
              id="name"
              label="Client Name"
              type="name"
              fullWidth
              value={this.state.name}
            />
            <TextField
              className="appointments__input"
              autoFocus
              margin="dense"
              // name="phoneMask"
              id="phone"
              label="Phone Number"
              type="tel" 
              // {...phoneMask}
              fullWidth
              value={this.state.phone}
            />
            <TextField
              className="appointments__input"
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              value={this.state.email}
            />
            <TextField
              className="appointments__input"
              type="date"
              id="date"
            />
            <TimePicker props={this.state.time}/>
            <TextField
              className="appointments__input"
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
            <label className="appointments__label">Save this client for future appointments</label>
            <input onChange={(event) => this.setState({ checked: event.target.checked })} type="checkbox" />
            <Button className="appointments__button" onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button className="appointments__button" onClick={() => {
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