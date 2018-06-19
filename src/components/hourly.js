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
                    if ((moment(apt.time).valueOf()) > moment(this.props.dates[0]).valueOf() 
                    && (moment(apt.time).valueOf()) < moment(this.props.dates[6]).valueOf()) {
                        return apt;
                    }
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
            // let weekApts = [];       
            for (let i=firstHour; i<=lastHour; i++) {
                let arr = []
                for (let j=0; j<7; j++) {
                    let day = <li key={j} className="weekly-view__hourly__li__hour__row__block"></li>;
                    appointments.forEach((apt) => {
                        if (Number(moment(apt.time).format('HH')) === i && moment(apt.time).day() === j) { 
                            switch(moment(apt.time).day()) {
                                case 0:
                                    day = 
                                    <li key={j} className="weekly-view__hourly__li__hour__row__block">
                                        <ul className="weekly-view__appointment__ul">
                                            <li className="weekly-view__appointment__li">
                                                <a onClick={(event) => this.getApt(event.target.id)} id={apt.id} className="weekly-view__appointment__client">{apt.client.name}</a>
                                            </li>
                                        </ul>
                                    </li>
                                    break
                                case 1:
                                    day = 
                                    <li key={j} className="weekly-view__hourly__li__hour__row__block">
                                        <ul className="weekly-view__appointment__ul">
                                            <li className="weekly-view__appointment__li">
                                                <a onClick={(event) => this.getApt(event.target.id)} id={apt.id} className="weekly-view__appointment__client">{apt.client.name}</a>
                                            </li>
                                        </ul>
                                    </li>                            
                                    break
                                case 2:
                                    day = 
                                    <li key={j} className="weekly-view__hourly__li__hour__row__block">
                                        <ul className="weekly-view__appointment__ul">
                                            <li className="weekly-view__appointment__li">
                                                <a onClick={(event) => this.getApt(event.target.id)} id={apt.id} className="weekly-view__appointment__client">{apt.client.name}</a>
                                            </li>
                                        </ul>
                                    </li>     
                                    break
                                case 3:
                                    day = 
                                    <li key={j} className="weekly-view__hourly__li__hour__row__block">
                                        <ul className="weekly-view__appointment__ul">
                                            <li className="weekly-view__appointment__li">
                                                <a onClick={(event) => this.getApt(event.target.id)} id={apt.id} className="weekly-view__appointment__client">{apt.client.name}</a>
                                            </li>
                                        </ul>
                                    </li>     
                                    break
                                case 4:
                                    day = 
                                    <li key={j} className="weekly-view__hourly__li__hour__row__block">
                                        <ul className="weekly-view__appointment__ul">
                                            <li className="weekly-view__appointment__li">
                                                <a onClick={(event) => this.getApt(event.target.id)} id={apt.id} className="weekly-view__appointment__client">{apt.client.name}</a>
                                            </li>
                                        </ul>
                                    </li>     
                                    break
                                case 5:
                                    day = 
                                    <li key={j} className="weekly-view__hourly__li__hour__row__block">
                                        <ul className="weekly-view__appointment__ul">
                                            <li className="weekly-view__appointment__li">
                                                <a onClick={(event) => this.getApt(event.target.id)} id={apt.id} className="weekly-view__appointment__client">{apt.client.name}</a>
                                            </li>
                                        </ul>
                                    </li>     
                                    break
                                case 6:
                                    day = 
                                    <li key={j} className="weekly-view__hourly__li__hour__row__block">
                                        <ul className="weekly-view__appointment__ul">
                                            <li className="weekly-view__appointment__li">
                                                <a onClick={(event) => this.getApt(event.target.id)} id={apt.id} className="weekly-view__appointment__client">{apt.client.name}</a>
                                            </li>
                                        </ul>
                                    </li>     
                                    break
                                default:
                                    day = <li key={j} className="weekly-view__hourly__li__hour__row__block"></li>;
                            } 
                        }
                    })
                    arr.push(day)                                                                   
                }
                JSXArr.push(
                <li key={i} className="weekly-view__hourly__li">
                    <ul className="weekly-view__hourly__li__hour__row">
                        <span className="weekly-view__hourly__li__hour__row__block">{i}:00</span>                    
                        {arr}
                    </ul>
                </li>
                )
            }
            return (
                <div className="weekly-view__hourly">
                    <ul className="weekly-view__hourly__ul">
                    {JSXArr}                    
                    </ul>
                </div>
                )
        } catch(err) {
            return (
            <div className="weekly-view__hourly">
                <ul className="weekly-view__hourly__ul">
                </ul>
            </div>
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