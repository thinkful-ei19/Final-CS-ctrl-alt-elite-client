import React from 'react';
import {connect} from 'react-redux';
// import Calendar from 'react-calendar';
import {Redirect} from 'react-router-dom';
import Schedule from './schedule';
import Navigation from './navigation';
// import { setDate } from '../actions/appointment';
import Calendar from './calendar';
import WeeklyView from './weekly-view'
import background from '../media/oceanBlue.jpg';
import requiresLogin from './requires-login';
import AptForm from './AptForm';



const sectionStyle = {
    backgroundSize: "100% 100%",
    height: "100VH",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${background})`
  };

export class Dashboard extends React.Component {

    componentDidMount() {
        if (this.props.selectedTab === 'clients') {
            return <Redirect to='/clients' />
        }
    }

    render() {
        if (this.props.calendar === 'weekly') {
            return (
                <section style={ sectionStyle }>
                    <div>
                        <Navigation/>
                        <div className="components">
                            <WeeklyView />
                            <AptForm />
                            <Schedule />
                        </div>
                    </div>
                </section>
            )
        }
        return (
            <section style={ sectionStyle }>
                <div>
                    <Navigation/>
                    <div className="components">
                        <Calendar />
                        <AptForm />
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
        calendar: state.calendarReducer.calendar
    }
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));