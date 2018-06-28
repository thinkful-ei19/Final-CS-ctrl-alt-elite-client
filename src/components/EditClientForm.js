import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import { editClient } from '../actions/clients';

class EditClientForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            name: '',
            phone: '',
            email: ''
        };
    }


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
    }

    componentWillMount() {
        const clientInfo = this.props.clientInfo
        this.setState({
            name: clientInfo.name,
            phone: clientInfo.phone,
            email: clientInfo.email
        })
    }

    handleCancel() {
        const clientInfo = this.props.clientInfo
        this.setState({
            name: clientInfo.name,
            phone: clientInfo.phone,
            email: clientInfo.email
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
        return (
            <div className="client__edit-form">
                <IconButton aria-label="Edit" onClick={this.handleClickOpen}>
                    <SvgIcon>
                        <path xmlns="http://www.w3.org/2000/svg" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    </SvgIcon>
                </IconButton>
                <Dialog
                    className="client__dialog"
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    onChange={(event) => this.handleSubmitValue(event)}
                >
                    <DialogTitle className="client__dialog__text" id="form-dialog-title">Update Client Information</DialogTitle>
                    <DialogContent>
                        <TextField
                            className="client__text" 
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Client Name"
                            type="name"
                            fullWidth
                            value={this.state.name}
                        /><TextField
                            className="client__text" 
                            autoFocus
                            margin="dense"
                            id="phone"
                            label="Phone Number"
                            type="phonenumber"
                            fullWidth
                            value={this.state.phone}
                        />
                        <TextField
                            className="client__text" 
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            value={this.state.email}
                        />
                        
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            this.handleCancel();
                            this.handleClose();
                            }} 
                            color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => {
                            const values = {
                                name: this.state.name,
                                phone: this.state.phone,
                                email: this.state.email
                            }
                            this.props.dispatch(editClient(this.props.authToken, values, this.props.clientId, this.props.currentUser.id))
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

export default connect(mapStateToProps)(EditClientForm);