import React from 'react';
import {connect} from 'react-redux';
import jwtDecode from 'jwt-decode';
import Calendar from 'react-calendar';
import Schedule from './schedule';
import Navigation from './navigation';
import { getUserInfo } from '../actions/auth';

import requiresLogin from './requires-login';

export class Dashboard extends React.Component {
    constructor(props) {
        super()
        this.state = {
            date: new Date()
        }
    };


    onChange = (date) => 
        this.setState({ date });

    render() {
        return (
            <div>
                <Navigation/>
                <Calendar
                    onChange={this.onChange}
                    value={this.state.date}
                />
                <Schedule />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.authToken,
        currentUser: state.auth.currentUser
    }
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));