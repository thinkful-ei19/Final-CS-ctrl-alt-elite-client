import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import Navigation from './navigation';
import LineGraph from './reportsLineGraph';

class Reports extends React.Component {

    render() {
        return (
            <div>
                <Navigation />
                <h1>Yearly Appointments</h1>
                <LineGraph user={this.props.currentUser}/>
            </div>
        );
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

export default requiresLogin()(connect(mapStateToProps)(Reports));