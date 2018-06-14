import React from 'react';
import {connect} from 'react-redux';
// import Calendar from 'react-calendar';
import {Redirect} from 'react-router-dom';
import Schedule from './schedule';
import Navigation from './navigation';
import { setDate } from '../actions/appointment';

import requiresLogin from './requires-login';

export class Clients extends React.Component {

    componentDidMount() {
        if (this.props.selectedTab === 'dashboard') {
            return <Redirect to='/dashboard' />
        }
    }

    render() {
        const clientList = this.props.currentUser.clients.map((client, index) => {
           return (
                <li key={index}>
                    Name: {client.name}
                    Phone: {client.phone}
                    Email: {client.email}
                </li>
           )
        });
        console.log('CLIENTS PROPS:', this.props.currentUser.clients);
        return (
            <div>
                This is the client Page
                <Navigation/>
                <div>
                    <ul>
                        {clientList}
                    </ul>
                </div>
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
