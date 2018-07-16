import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import { selectAppointment } from '../actions/appointment';

class Hourly extends React.Component {

    getApt(id) {
        const apt = this.props.currentUser.appointments.find((apt) => {
            return apt.id === id;
        })
        this.props.dispatch(selectAppointment(apt))
    }

    render() {
        try {
            let firstHour = 9;
            let lastHour = 17;   
            const appointments = this.props.currentUser.appointments
                .filter((apt) => {
                    if ((moment(apt.time).valueOf()) >= moment(this.props.dates[0].value).valueOf() 
                    && (moment(apt.time).valueOf()) <= (moment(this.props.dates[6].value).valueOf() + 86400000)) {
                        return apt;
                    }
                    return;
                })
                .sort((a,b) => {return moment(a.time).valueOf() - moment(b.time).valueOf()})
            if (appointments[0]) {
                firstHour = Number(moment(appointments[0].time).format('HH'))
            }
            appointments.forEach((apt) => {
                if (Number(moment(apt.time).format('HH')) < firstHour) {
                    firstHour = Number(moment(apt.time).format('HH'));
                }
                if (Number(moment(apt.time).format('HH')) > lastHour) {
                    lastHour = Number(moment(apt.time).format('HH'))
                }
            })
            if (lastHour - firstHour < 8) {
                lastHour = String(Number(firstHour) + 8);
            }
            let JSXArr = [];
            for (let i=firstHour; i<=lastHour; i++) {
                let arr = []
                for (let j=0; j<7; j++) {
                    let day = <li key={j} className="weekly-view__hourly__li__hour__row__block"></li>;
                    appointments.forEach((apt) => {
                        
                        if (Number(moment(apt.time).format('MM')) === Number(this.props.selectedMonth) && Number(moment(apt.time).format('HH')) === i && moment(apt.time).day() === j) { 
                            day = 
                            <li key={j} className="weekly-view__hourly__li__hour__row__block">
                                <ul className="weekly-view__appointment__ul">
                                    <li className="weekly-view__appointment__li">
                                        <a onClick={(event) => this.getApt(event.target.id)} id={apt.id} className="weekly-view__appointment__client">{apt.client.name}</a>
                                    </li>
                                </ul>
                            </li>
                        }
                    })
                    arr.push(day)                                                                   
                }
                let time = "am";
                let number = i;
                if(i > 12) {
                    time = "pm";
                    number = number - 12;
                }
                if(i === 12) {
                    time = "pm";
                }
                if(i === 0) {
                    number = 12;
                }
                
                JSXArr.push(
                <li key={i} className="weekly-view__hourly__li">
                    <ul className="weekly-view__hourly__li__hour__row">
                        <li className="weekly-view__hourly__li__hour__row__block"><p className="weekly-view__hourly__li__hour__row__time">{number}:00 {time}</p></li>                    
                        {arr}
                    </ul>
                </li>
                )
            }
            return (
                <ul className="weekly-view__hourly__ul">
                {JSXArr}                    
                </ul>
                )
        } catch(err) {
            return (
            <ul className="weekly-view__hourly__ul">
            </ul>
            )
        }


    }
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.authToken,
        currentUser: state.auth.currentUser,
        selectedMonth: state.calendarReducer.selectedMonth,
        selectedYear: state.calendarReducer.selectedYear,
        selectedWeek: state.calendarReducer.selectedWeek
    }
};

export default connect(mapStateToProps)(Hourly);