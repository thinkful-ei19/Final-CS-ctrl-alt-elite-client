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
// import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import { editAppointment } from '../actions/appointment';

class EditForm extends React.Component {
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
            checked: false,
            previousTime: ''
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

    componentWillMount() {
        const aptInfo = this.props.aptInfo
        this.setState({
            name: aptInfo.client.name,
            phone: aptInfo.client.phone,
            email: aptInfo.client.email,
            date: moment(aptInfo.time).format('YYYY-MM-DD'),
            time: moment(aptInfo.time).format('hh:mm'),
            notes: aptInfo.notes,
            previousTime: this.props.aptTime,
        })
    }

    selectClient(id) {
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
            <div className="appointments__edit">
                <IconButton aria-label="Edit" onClick={this.handleClickOpen}>
                    <SvgIcon>
                    <path xmlns="http://www.w3.org/2000/svg" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    </SvgIcon>
                </IconButton>
                <Dialog
                    className="appointments__dialog"
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    onChange={(event) => this.handleSubmitValue(event)}
                >
                    <DialogTitle id="form-dialog-title" className="appointments__dialog__text">Updater Appointment Information</DialogTitle>
                    <DialogContent className="appointments__dialog__content">
                        <DialogContentText className="appointments__dialog__text">
                            Fill out this form with client information in order to update an existing appointment.
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
                        /><TextField
                            className="appointments__input"
                            autoFocus
                            margin="dense"
                            id="phone"
                            label="Phone Number"
                            type="phonenumber"
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
                            autoFocus
                            margin="dense"
                            type="date"
                            id="date"
                            value={this.state.date}
                        />
                        <TimePicker time={this.state.time} />
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
                                return
                            }
                            if (this.props.aptTime !== moment(String(values.date + ' ' + values.time)).format('YYYY MM DD HH mm')) {
                                let check = false;
                                this.props.currentUser.appointments.forEach((apt) => {
                                    if (moment(apt.time).format('YYYY MM DD HH mm') === moment(String(values.date + ' ' + values.time)).format('YYYY MM DD HH mm')) {
                                        check = true;
                                    }
                                  })
                                  if (check === true) {
                                    alert('This time slot if already taken by another appointment, please choose another.')
                                    return;
                                  }
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
                            this.props.dispatch(editAppointment(this.props.authToken, values, this.props.aptId, this.props.currentUser.id))
                            this.handleClose();
                        }}
                            type="submit"
                            color="primary">
                            Save
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.authToken,
        currentUser: state.auth.currentUser
    }
};

export default connect(mapStateToProps)(EditForm);