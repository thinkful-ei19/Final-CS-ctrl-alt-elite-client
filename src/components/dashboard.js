import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Schedule from './schedule';
import Navigation from './navigation';
import Calendar from './calendar';
import WeeklyView from './weekly-view'
import requiresLogin from './requires-login';

import lightBackground from '../media/laptop.jpg';
import darkBackground from '../media/deskWhite.jpg';

export class Dashboard extends React.Component {

    componentDidMount() {
        if (this.props.selectedTab === 'clients') {
            return <Redirect to='/clients' />
        }
    }

    render() {

        //Put section style in here to be reactive to props.
        let sectionStyle = {
            backgroundSize: "100% 100%",
            height: "100VH",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${lightBackground})`
        };
        const theme = this.props.currentUser.options.theme;
        if (theme === 'dark') {
            sectionStyle = {
                backgroundSize: "100% 100%",
                height: "100VH",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${darkBackground})`
            }
        }
        if (this.props.calendar === 'weekly') {
            return (
                <section style={ sectionStyle }>
                    <div className="dashboard">
                        <Navigation/>
                        <div className="components">
                            <WeeklyView />
                            <Schedule />                            
                        </div>
                    </div>
                </section>
            )
        }
        return (
            <section style={ sectionStyle }>
                <div className="dashboard">
                    <Navigation/>
                    <div className="components">
                    <h2 className="dashboard__welcome">Logged in as {this.props.currentUser.username}</h2>
                        <Calendar />
                        <Schedule />
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.authToken,
        currentUser: state.auth.currentUser,
        selectedDate: state.calendarReducer.selectedDate,
        selectedTab: state.tabsReducer.selectedTab,
        calendar: state.calendarReducer.calendar,

    }
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));