import React from 'react';
import {connect} from 'react-redux';
// import Calendar from 'react-calendar';
import {Redirect} from 'react-router-dom';
import Schedule from './schedule';
import Navigation from './navigation';
import { setDate } from '../actions/appointment';

import requiresLogin from './requires-login';

export class Clients extends React.Component {

    // componentDidMount() {
    //     if (this.props.selectedTab === 'clients') {
    //         return <Redirect to='/clients' />
    //     }
    // }

    render() {
        console.log('CLIENTS PROPS:', this.props);
        return (
            <div>
                This is the client Page
                <Navigation/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.authToken,
        currentUser: state.auth.currentUser,
        selectedDate: state.calendarReducer.selectedDate,
        selectedTab: state.tabsReducer.selectedTab
    }
};

export default requiresLogin()(connect(mapStateToProps)(Clients));
