import React from 'react';
import {connect} from 'react-redux';
// import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ConfirmDelete from './ConfirmDelete';
import EditForm from './EditForm';
import moment from 'moment';

function ScheduleList(props) {
  
  let buildList;
  try {
    const appointments = props.currentUser.appointments.filter((apt) => {
      if (moment(apt.time).format('YYYY MM DD') === moment(props.selectedDate).format('YYYY MM DD')) {
        return apt;
      }
    });
    buildList = appointments.map((apt) => {
      return (
      <ListItem className="appointments__div" key={apt.id} button>
        <ListItemText
        primary={
          <div>
            <ul className="appointments__list schedule-li">
              <li className="appointments__list__item">{moment(apt.time).format('MMMM Do YYYY, h:mm:ss A')}</li>              
              <li className="appointments__list__item">Name: {apt.client.name}</li>              
              <li className="appointments__list__item">Phone: {apt.client.phone}</li>
              <li className="appointments__list__item">Email: {apt.client.email}</li>
              <li className="appointments__list__item">Notes: {apt.notes}</li>
            </ul>
          </div>
        } />
        <EditForm aptInfo={apt} aptId={apt.id} />
        <ConfirmDelete aptId={apt.id} />
      </ListItem>
      )
    })
    return (
      <div >
        <List component="nav">
          {buildList}
        </List>
      </div>
    );
  } catch(err){
    return (
      <div >
        <List component="nav">
          <span>No Appointments to show</span>
        </List>
      </div>
    );
  }



}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  selectedDate: state.calendarReducer.selectedDate
});

export default connect(mapStateToProps)(ScheduleList);
