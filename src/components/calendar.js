import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import { changeMonth, changeYear } from '../actions/calendar';
import Days from './days';
import Dates from './dates';

class Calendar extends React.Component {

    render() {
        let currentMonth = this.props.selectedMonth;
        let currentYear = this.props.selectedYear;
        const component = this;

        const monthYear = moment(String(`${currentYear}-${currentMonth}`)).format('MMMM YYYY');
        function increment() {
            currentMonth ++
            if (currentMonth > 12) {
                currentMonth = 1
                currentYear ++
                component.props.dispatch(changeYear(currentYear))
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
                currentYear --
                component.props.dispatch(changeYear(currentYear))
            }
            if (currentMonth < 10) {
                currentMonth = '0' + currentMonth
            }
            component.props.dispatch(changeMonth(currentMonth))
        }
        return (
            <div className="calendar">
                <div className="calendar__header-row">
                    <button onClick={decrement} className="calendar__header-row__previous">&#8592;</button>
                    <h2 className="calendar__header-row__header">{monthYear}</h2>
                    <button onClick={increment} className="calendar__header-row__next">&#8594;</button>
                </div>
                <Days/>
                <div className="calendar__blocks-row">
                    <Dates/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state)
    return {
        authToken: state.auth.authToken,
        currentUser: state.auth.currentUser,
        selectedMonth: state.calendarReducer.selectedMonth,
        selectedYear: state.calendarReducer.selectedYear
    }
};

export default connect(mapStateToProps)(Calendar);