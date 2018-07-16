import React from 'react';
import {connect} from 'react-redux';
// import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ConfirmDelete from './ConfirmDelete';
import EditForm from './EditForm';
import moment from 'moment';
import AptForm from './AptForm';

function ScheduleList(props) {
  
  let buildList;
  try {    
    let appointments;
    if (props.selectedAppointment !== null && props.calendar === 'weekly') {
      appointments = [props.selectedAppointment];
    } else {
      appointments = props.currentUser.appointments.filter((apt) => {
        if (moment(apt.time).format('YYYY MM DD') === moment(props.selectedDate).format('YYYY MM DD')) {
          return apt;
        }
        return;
      }).sort((a,b) => {return moment(a.time).valueOf() - moment(b.time).valueOf()});
    }
    buildList = appointments.map((apt) => {
      return (
      // <ListItem key={apt.id} button>
      //   <ListItemText
      //   primary={
        <div key={apt.id} className="appointments">
            <ul className="appointments__list schedule-li">
              <li className="appointments__list__time">{moment(apt.time).format('MMMM Do, h:mm A')}</li>              
              <li className="appointments__list__name">{apt.client.name}</li>              
              <li className="appointments__list__phone">{apt.client.phone}</li>
              <li className="appointments__list__email">{apt.client.email}</li>
              <li className="appointments__list__notes">{apt.notes}</li>
            </ul>
            <div className="appointments__list__options">
              <EditForm aptTime={moment(apt.time).format('YYYY MM DD HH mm')} aptInfo={apt} aptId={apt.id} />
              <ConfirmDelete aptId={apt.id} />
            </div>
        </div>
      //   } />
      // </ListItem>
      )
    })
    if (buildList.length === 0) {
      return (
        <div >
          <AptForm />
          <List component="nav">
            <div className="appointments__message">No Appointments</div>
          </List>
        </div>
      );
    } 
    return (
        <div className="appointments-part2">
          <AptForm />
          <List component="nav" className="appointments__schedule-list">
            {buildList}
          </List>
        </div>
      );
  } catch(err){
    return (
      <div >
        <AptForm />
        <List component="nav">
          <span>No Appointments</span>
        </List>
      </div>
    );
  }



}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  selectedDate: state.calendarReducer.selectedDate,
  selectedAppointment: state.appointmentReducer.selectedAppointment,
  calendar: state.calendarReducer.calendar
});

export default connect(mapStateToProps)(ScheduleList);
