import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Navigation from './navigation';
import { ClientsList } from './clients-list';

import requiresLogin from './requires-login';


export class Clients extends React.Component {

    componentDidMount() {
        if (this.props.selectedTab === 'dashboard') {
            return <Redirect to='/dashboard' />
        }
    }

    render() {
        return (
            <div>
                This is the client Page
                <Navigation/>
                <ClientsList user={this.props.currentUser}/>
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
