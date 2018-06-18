import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import { selectWeek, toggleCalendar } from '../actions/calendar';
import Hourly from './hourly';
import WeeklyDays from './weekly-days';
import Dates from './dates';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';

class WeeklyView extends React.Component {

    toggleCalendar() {
        this.props.dispatch(toggleCalendar('monthly'))
    }
    
    render() {
        const currentYear = String(this.props.selectedYear);
        const currentMonth = String(this.props.selectedMonth)
        
        const maxDays = moment(`${currentYear}-${currentMonth}-01`).daysInMonth()

        const currentDay = moment().format('DD');
        const monthYear = moment(String(`${currentYear}-${currentMonth}-01`)).format('MMMM YYYY');

        const firstDayOfMonth = moment(`${currentYear}-${currentMonth}-01`).startOf('month').format('e');
        const previousMonthDate = moment(`${currentYear}-${currentMonth}-01`).subtract(1, 'months').endOf('month').format('YYYY-MM-DD')
        const maxDaysPrevious = moment(`${previousMonthDate}`).daysInMonth();
        const previousMonth = previousMonthDate.slice(5, 7);

        let dateArray = [];
        //First Push the previous month's days
        let monthBuffer = 0;
        for (let i=maxDaysPrevious; i>maxDaysPrevious-firstDayOfMonth; i--) {
            monthBuffer ++;
            dateArray.push({
                value: `${currentYear}-${previousMonth}-${i}`,
                day: `${i}`,
                ref: 'previous'
            });
        }
        dateArray.reverse();

        //Push the amount of days in current month
        for (let i=1; i<=maxDays; i++) {
            if (i<10) {
                dateArray.push({value: `${currentYear}-${currentMonth}-0${i}`, day: `0${i}`, ref: 'current'})
            } else {
                dateArray.push({value: `${currentYear}-${currentMonth}-${i}`, day: `${i}`, ref: 'current'})
            }
        }

        //Push the days for the next month
        let nextMonth = String(Number(currentMonth) + 1);
        const remainingBlocks = 35 - dateArray.length;
        if (nextMonth < 10) {
            nextMonth = '0' + nextMonth;
        }
        for (let i=1; i<=remainingBlocks; i++) {
            dateArray.push(
            {
                value: `${currentYear}-${nextMonth}-0${i}`,
                day: `${i}`,
                ref: 'next'
            }
            )
        }
        //Force Stop at 35 blocks
        dateArray = dateArray.slice(0, 35);

        const currentDayValue = Number(monthBuffer) + Number(currentDay);
        const weekOne = dateArray.slice(0, 7)
        const weekTwo = dateArray.slice(7, 14)
        const weekThree = dateArray.slice(14, 21)
        const weekFour = dateArray.slice(21, 28)
        const weekFive = dateArray.slice(28, 35)

        const component = this;

        if (!this.props.selectedWeek) {
            if (currentDayValue <= 7) {
                component.props.dispatch(selectWeek(1))
            } else if (currentDayValue <= 14) {
                component.props.dispatch(selectWeek(2))
            } else if (currentDayValue <= 21) {
                component.props.dispatch(selectWeek(3))
            } else if (currentDayValue <= 28) {
                component.props.dispatch(selectWeek(4))
            } else if (currentDayValue <= 35) {
                component.props.dispatch(selectWeek(5))
            }
        }

        function incrementWeek() {
            component.props.dispatch(selectWeek('increment'))
        }

        function decrementWeek() {
            component.props.dispatch(selectWeek('decrement'))
        }

        let renderSelectedWeek;
        if (this.props.selectedWeek === 1) {
            renderSelectedWeek = weekOne
        } else if (this.props.selectedWeek === 2) {
            renderSelectedWeek = weekTwo
        } else if (this.props.selectedWeek === 3) {
            renderSelectedWeek = weekThree
        } else if (this.props.selectedWeek === 4) {
            renderSelectedWeek = weekFour
        } else if (this.props.selectedWeek === 5) {
            renderSelectedWeek = weekFive
        } 
        let buildJSX = [];
        renderSelectedWeek.forEach((day) => {
            buildJSX.push(
                <li key={day.value} className="weekly-view__weekly__li">
                    <p id={day.value} className="weekly-view__weekly__date">{moment(day.value).format('DD')}</p>
                </li>
            )
        })

        return (
            <div className="weekly-view">
                <div className="weekly-view__weekly">
                    <button onClick={() => this.toggleCalendar()} className="weekly-view__toggle-button">Change View</button>                                    
                    <div className="weekly-view__weekly__header">
                        <button onClick={decrementWeek} className="weekly-view__weekly__previous">&#8592;</button>
                        <h2 className="weekly-view__weekly__month">{monthYear}</h2>
                        <button onClick={incrementWeek} className="weekly-view__weekly__next">&#8594;</button>
                    </div>
                    <WeeklyDays />                                                
                    <ul className="weekly-view__weekly__ul" >
                        <li key='placeholder' className="weekly-view__weekly__li"></li>
                        {buildJSX}
                    </ul>
                </div>
                <Hourly dates={renderSelectedWeek}/>                
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
        selectedWeek: state.calendarReducer.selectedWeek,
        calendar: state.calendarReducer.calendar
    }
};

export default connect(mapStateToProps)(WeeklyView);