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
import { addClient} from '../actions/appointment';

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

    // const buildOptions = this.props.currentUser.clients.map((client) => {
    //   return (
    //     <option key={client.id} value={client.id}>{client.name}</option>
    //   )
    // })

    return (
      <div>
        <Button onClick={this.handleClickOpen}>Add Client</Button>
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
                alert('Please fill out the form entirely (notes optional)')
                return
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
  // console.log('STATE:', state.auth.currentUser.id);
  return {
    authToken: state.auth.authToken,
    currentUser: state.auth.currentUser
  }
};

export default connect(mapStateToProps)(AddClientForm);