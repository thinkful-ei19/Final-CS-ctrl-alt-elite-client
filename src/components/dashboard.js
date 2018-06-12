import React from 'react';
import HeaderBar from './header-bar';
import Calendar from 'react-calendar';
import Schedule from './schedule';

export default class Dashboard extends React.Component {
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
                <HeaderBar />
                {/*This is the Dashboard*/}
                <Calendar
                    onChange={this.onChange}
                    value={this.state.date}
                />
                <Schedule />
            </div>
        )
    }
}