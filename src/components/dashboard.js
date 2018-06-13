import React from 'react';
import {connect} from 'react-redux';
// import Calendar from 'react-calendar';
import Schedule from './schedule';
import Navigation from './navigation';
import { setDate } from '../actions/appointment';
import Calendar from './calendar';

import requiresLogin from './requires-login';

export class Dashboard extends React.Component {

    render() {
        return (
            <div>
                <Navigation/>
                <Calendar />
                <Schedule />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.authToken,
        currentUser: state.auth.currentUser,
        selectedDate: state.calendarReducer.selectedDate
    }
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));