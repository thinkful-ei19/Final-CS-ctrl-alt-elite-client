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

    componentWillMount() {
        const decodedToken = jwtDecode(this.props.authToken)
        const username = decodedToken.sub
        this.props.dispatch(getUserInfo(this.props.authToken, username))
    }

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

const mapStateToProps = state => ({
    authToken: state.auth.authToken
});

export default requiresLogin()(connect(mapStateToProps)(Dashboard));