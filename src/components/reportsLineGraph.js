import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import moment from 'moment';
import SvgIcon from '@material-ui/core/SvgIcon';


export default class LineGraph extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: moment().format('MMM').toUpperCase(),
            click: false
        };
    }
    
    handleClick(month) {
        this.setState({
            name: month,
            click: true
        });
    }

    handleBackClick() {
        this.setState({
            click: false
        });
    }

	render () {
           let apptInfo = []; 
           let janCount = 0;
           let febCount = 0;
           let marCount = 0;
           let aprCount = 0;
           let mayCount = 0;
           let juneCount = 0;
           let julyCount = 0;
           let augCount = 0;
           let septCount = 0;
           let octCount = 0;
           let novCount = 0;
           let decCount = 0;

           const totalAppointmentsForUser = this.props.user.appointments.length;
           
           this.props.user.appointments.map((appointment) => {
           const formatTime = moment(appointment.time).format('MMMM Do YYYY');
           if (formatTime.includes('January')) {
                janCount ++;
           } if (formatTime.includes('February')) {
                febCount ++;
           } if (formatTime.includes('March')) {
                marCount ++;
            } if (formatTime.includes('April')) {
                aprCount ++;
            } if (formatTime.includes('May')) {
                mayCount ++;
            } if (formatTime.includes('June')) {
                juneCount ++;
            } if (formatTime.includes('July')) {
                julyCount ++;
            } if (formatTime.includes('August')) {
                augCount ++;
            } if (formatTime.includes('September')) {
                septCount ++;
            } if (formatTime.includes('October')) {
                octCount ++;
            } if (formatTime.includes('November')) {
                novCount ++;
            } if (formatTime.includes('December')) {
                decCount ++;
            }           
       });

        this.props.user.appointments.map((appointment) => {
        const formatTime = moment(appointment.time).format('MMM').toUpperCase();
        const arrayOfTime = formatTime.split(' ');
        
        if(arrayOfTime[0] === this.state.name) {
            apptInfo.push(appointment);
        }
       });

       const sortedList = apptInfo.sort((a,b) => {
        return moment(a.time).valueOf() - moment(b.time).valueOf()
     });

       const apptDataList = sortedList.map((appt) => {
           return (
                <li className="report__list-block" key={appt.id}>
                    <ul className="report__list-item">
                        <li className="report__list-item__time">{moment(appt.time).format('MMMM Do YYYY')}</li>
                        <li className="report__list-item__name">{appt.client.name}</li>
                        <li className="report__list-item__email">{appt.client.email}</li>
                        <li className="report__list-item__phone">{appt.client.phone}</li>
                    </ul>
                </li>
           );
       });
    
       const data = [
        {name: 'JAN', appointments: janCount},
        {name: 'FEB', appointments: febCount},
        {name: 'MAR', appointments: marCount},
        {name: 'APR', appointments: aprCount},
        {name: 'MAY', appointments: mayCount},
        {name: 'JUN', appointments: juneCount},
        {name: 'JUL', appointments: julyCount},
        {name: 'AUG', appointments: augCount},
        {name: 'SEP', appointments: septCount},
        {name: 'OCT', appointments: octCount},
        {name: 'NOV', appointments: novCount},
        {name: 'DEC', appointments: decCount}
    ]

    const apptPercentage = Math.floor((apptInfo.length / totalAppointmentsForUser) * 100);
            if(this.state.click === true && apptDataList.length === 0) {
                return (
                    <div className="report__right">
                    <Link className="register__back-button" to="/reports">
                        <SvgIcon onClick={() => this.handleBackClick()}>
                            <path xmlns="http://www.w3.org/2000/svg" d="M20,11H6.83l2.88-2.88c0.39-0.39,0.39-1.02,0-1.41l0,0c-0.39-0.39-1.02-0.39-1.41,0l-4.59,4.59 c-0.39,0.39-0.39,1.02,0,1.41l4.59,4.59c0.39,0.39,1.02,0.39,1.41,0l0,0c0.39-0.39,0.39-1.02,0-1.41L6.83,13H20c0.55,0,1-0.45,1-1 v0C21,11.45,20.55,11,20,11z"/>
                        </SvgIcon>
                    </Link>
                        <div className="report__center">
                            <h1>Monthly Appointments History</h1>
                            <h3>There were no appointments during the month of {this.state.name} </h3>
                        </div>
                    </div>
                )
            }
            if(this.state.click === true) {
                return (
                    <div className="report__right">
                    <Link className="register__back-button" to="/reports">
                        <SvgIcon onClick={() => this.handleBackClick()}>
                            <path xmlns="http://www.w3.org/2000/svg" d="M20,11H6.83l2.88-2.88c0.39-0.39,0.39-1.02,0-1.41l0,0c-0.39-0.39-1.02-0.39-1.41,0l-4.59,4.59 c-0.39,0.39-0.39,1.02,0,1.41l4.59,4.59c0.39,0.39,1.02,0.39,1.41,0l0,0c0.39-0.39,0.39-1.02,0-1.41L6.83,13H20c0.55,0,1-0.45,1-1 v0C21,11.45,20.55,11,20,11z"/>
                        </SvgIcon>
                    </Link>
                        <div className="report__center">
                            <h1>Monthly Appointments History</h1>
                            <h2>{this.state.name}</h2> 
                            <h3>{apptPercentage}% of your appointments were from {this.state.name}</h3>
                            <ul className="report__list">
                                {apptDataList}
                            </ul>
                        </div>
                    </div>
                )
            }
            return(
                <div>
                    <div>
                    <p className="report__message">Click graph to see appointment history</p>
                    </div>
                    <ResponsiveContainer minWidth={420} minHeight={300} maxWidth={1960} maxHeight={1280} className="linechart report__left">
                        <LineChart 
                            // width={900} 
                            // height={375} 
                            data={data}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            onClick={(e) => {         
                                if (e !== null) {
                                this.handleClick(e.activeLabel)
                                }   
                            }}>
                             <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip cursor={false} />
                        <Legend 
                            
                            height={36} 
                            iconType='rect'
                        />
                        <Line 
                            type="monotoneX" 
                            dataKey="appointments" 
                            stroke="#5DADE2" 
                            dot={{ 
                                stroke: '#5DADE2', 
                                strokeWidth: .5
                            }}/>
                        </LineChart>
                    </ResponsiveContainer>
                 </div>
             );
        // }
    }
}

