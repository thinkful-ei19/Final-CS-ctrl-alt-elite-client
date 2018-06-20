import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { addClient} from '../actions/appointment';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';
import { createTextMask } from 'redux-form-input-masks';


const phoneMask = createTextMask({
  pattern: '(999) 999-9999',
});

class AddClientForm extends React.Component {
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
    this.setState({
         open: false,
         name: '',
         phone: '',
         email: ''
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
      <div className="filter">
        <IconButton aria-label="weekly calendar" onClick={this.handleClickOpen}>
            <SvgIcon>
            <path xmlns="http://www.w3.org/2000/svg" d="M15,12c2.21,0,4-1.79,4-4s-1.79-4-4-4s-4,1.79-4,4S12.79,12,15,12z M6,10V8c0-0.55-0.45-1-1-1h0C4.45,7,4,7.45,4,8v2H2   c-0.55,0-1,0.45-1,1v0c0,0.55,0.45,1,1,1h2v2c0,0.55,0.45,1,1,1h0c0.55,0,1-0.45,1-1v-2h2c0.55,0,1-0.45,1-1v0c0-0.55-0.45-1-1-1H6   z M15,14c-2.67,0-8,1.34-8,4v1c0,0.55,0.45,1,1,1h14c0.55,0,1-0.45,1-1v-1C23,15.34,17.67,14,15,14z"/>
            </SvgIcon>
        </IconButton>
        {/* <Button onClick={this.handleClickOpen}>Add Client</Button> */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          onChange={(event) => this.handleSubmitValue(event)}
        >
          <DialogTitle id="form-dialog-title">Add New Client</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Client Name"
              type="name"
              fullWidth
              value={this.state.name}
            />
            <TextField
              autoFocus
              margin="dense"
              id="phone"
              label="Phone Number"
              name="phone"
              component="input"
              type="tel"
              {...phoneMask}
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
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => {
              const values = {
                name: this.state.name,
                phone: this.state.phone,
                email: this.state.email
              }
              if (values.name === '') {
                alert('Please fill out the form entirely.')
                return
              }
              let check = false;
              this.props.currentUser.clients.forEach((client) => {
                if (client.name === values.name) {
                  check = true;
                }
              })
              if (check === true) {
                alert('This client name already exists! Please choose a different client name.')
                return;
              }
            this.props.dispatch(addClient(this.props.authToken, values, this.props.currentUser.id))
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
  return {
    authToken: state.auth.authToken,
    currentUser: state.auth.currentUser
  }
};

export default connect(mapStateToProps)(AddClientForm);