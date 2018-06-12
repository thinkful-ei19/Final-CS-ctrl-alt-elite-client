import React from 'react';
import {connect} from 'react-redux';
import Calendar from 'react-calendar';
import Schedule from './schedule';
import Navigation from './navigation';


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
        //console.log(this.state);
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

// const mapStateToProps = state => (
// console.log('this is dashboard state', state)
// );

export default requiresLogin()(connect()(Dashboard));