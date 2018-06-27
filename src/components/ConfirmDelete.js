import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteAppointment } from '../actions/appointment';


class ConfirmDelete extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    // console.log('currentUser id', this.props.currentUser.id);
    // console.log('authToken', this.props.authToken);
    // console.log('this is the aptId to delete', this.props.aptId);
    return (
      <div className="appointments__delete">
        <IconButton className="appointments" aria-label="Delete" onClick={this.handleClickOpen}>
          <DeleteIcon />
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle className="appointments__delete__header" id="alert-dialog-title">{"Confirm Appointment Deletion"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete your appointment?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button className="appointments__delete__cancel" onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button className="appointments__delete__confirm" onClick={() => {
              this.props.dispatch(deleteAppointment(this.props.authToken, this.props.aptId, this.props.currentUser.id));
              this.handleClose();
              }}
              color="primary" 
              autoFocus>
              Confirm
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

export default connect(mapStateToProps)(ConfirmDelete);