import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import { changeMonth, changeYear, toggleCalendar } from '../actions/calendar';
import Days from './days';
import Dates from './dates';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';

class Calendar extends React.Component {

    toggleCalendar() {
        this.props.dispatch(toggleCalendar('weekly'))
    }

    render() {
        let currentMonth = this.props.selectedMonth;
        let currentYear = this.props.selectedYear;
        const component = this;
        const monthYear = moment(String(`${currentYear}-${currentMonth}`)).format('MMMM YYYY');
        function increment() {
            currentMonth ++
            if (currentMonth > 12) {
                currentMonth = 1
                component.props.dispatch(changeYear(Number(currentYear) + 1))
            }
            if (currentMonth < 10) {
                currentMonth = '0' + currentMonth
            }
            component.props.dispatch(changeMonth(currentMonth))
        }
        function decrement() {
            currentMonth --
            if (currentMonth < 1) {
                currentMonth = 12
                component.props.dispatch(changeYear(Number(currentYear) - 1))
            }
            if (currentMonth < 10) {
                currentMonth = '0' + currentMonth
            }
            component.props.dispatch(changeMonth(currentMonth))
        }
        return (
            <div className="calendar">
                <IconButton className="calendar__toggle" aria-label="weekly calendar" onClick={() => this.toggleCalendar()}>
                    <SvgIcon>
                    <path d="M20,3h-1V2c0-0.55-0.45-1-1-1h0c-0.55,0-1,0.45-1,1v1H7V2c0-0.55-0.45-1-1-1h0C5.45,1,5,1.45,5,2v1H4C2.9,3,2,3.9,2,5v16
		            c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V5C22,3.9,21.1,3,20,3z M19,21H5c-0.55,0-1-0.45-1-1V8h16v12C20,20.55,19.55,21,19,21z"/>
                    </SvgIcon>
                </IconButton>
                {/* <button onClick={() => this.toggleCalendar()}className="btn login-button">Weekly</button> */}
                <div className="calendar__header-row">
                <IconButton aria-label="next month" onClick={decrement}>
                    <SvgIcon>
                    <path xmlns="http://www.w3.org/2000/svg" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                    </SvgIcon>
                </IconButton>
                    <h2 className="calendar__header-row__header">{monthYear}</h2>
                <IconButton aria-label="next month" onClick={increment}>
                    <SvgIcon>
                    <path xmlns="http://www.w3.org/2000/svg" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                    </SvgIcon>
                </IconButton>
                </div>
                <Days/>
                <Dates/>         
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.authToken,
        currentUser: state.auth.currentUser,
        selectedMonth: state.calendarReducer.selectedMonth,
        selectedYear: state.calendarReducer.selectedYear,
        calendar: state.calendarReducer.calendar        
    }
};

export default connect(mapStateToProps)(Calendar);