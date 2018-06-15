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
            time: '',
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
        })
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
        console.log(this.state)
        const buildOptions = this.props.currentUser.clients.map((client) => {
            return (
                <option key={client.id} value={client.id}>{client.name}</option>
            )
        })

        return (
            <div>
                <IconButton aria-label="Edit" onClick={this.handleClickOpen}>
                    <SvgIcon>
                    <path xmlns="http://www.w3.org/2000/svg" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    </SvgIcon>
                </IconButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    onChange={(event) => this.handleSubmitValue(event)}
                >
                    <DialogTitle id="form-dialog-title">Updater Appointment Information</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Fill out this form with client information in order to update an existing appointment.
            </DialogContentText>
                        <select onChange={(event) => { this.selectClient(event.target.value) }}>
                            <option style={{ display: 'none' }} disabled selected value></option>
                            {buildOptions}
                        </select>
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
                            autoFocus
                            margin="dense"
                            type="date"
                            id="date"
                            value={this.state.date}
                        />
                        <TimePicker time={this.state.time} />
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
                                return
                              }
                              let check = false;
                              this.props.currentUser.appointments.forEach((apt) => {
                                if (moment(apt.time).format('YYYY MM DD HH mm') === moment(String(values.date + ' ' + values.time)).format('YYYY MM DD HH mm')) {
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
                            this.props.dispatch(editAppointment(this.props.authToken, values, this.props.aptId, this.props.currentUser.id))
                            this.handleClose();
                        }}
                            type="submit"
                            color="primary">
                            Edit
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

export default connect(mapStateToProps)(EditForm);