import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';


export default class LineGraph extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
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
            name: '',
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
           
           const filterAppts = this.props.user.appointments.map((appointment) => {
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

        const filterApptList = this.props.user.appointments.map((appointment) => {
        const formatTime = moment(appointment.time).format('MMMM');
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
                <li key={appt.id}>
                Date of Appt: {moment(appt.time).format('MMMM Do YYYY')} <br/>
                Client Name: {appt.client.name} <br/>
                Client Email: {appt.client.email} <br/>
                Client Phone: {appt.client.phone} <br/> <br/>
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

        if (this.state.click === true) {
            return(
                <div>
                    <div className="linechart">
                        <ResponsiveContainer width={500} height="65%">
                            <LineChart 
                                
                                width={780} 
                                height={250} 
                                data={data}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                onClick={(e) => {         
                                    if (e !== null) {
                                        this.handleClick(e.activeLabel)
                                    }   
                                }}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip cursor={false} />
                            <Legend 
                                verticalAlign="top" 
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
                    <button 
                        className="btn login-button"
                        onClick={() => this.handleBackClick()}>Back</button>
                    <h1>Monthly Appointments History</h1>
                    <h2>{this.state.name}</h2>
                    <h3>{apptPercentage}% of your appointments were from {this.state.name}</h3> <br />
                    <ul>
                        {apptDataList}
                    </ul>
                 </div>
             );
        } else {
            return(
                <div>
                    <div className="linechart">

                        <LineChart 
                            
                            width={780} 
                            height={250} 
                            data={data}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            onClick={(e) => {         
                                if (e !== null) {
                                this.handleClick(e.activeLabel)
                                }   
                            }}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip cursor={false} />
                        <Legend 
                            verticalAlign="top" 
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
                    </div>
                    <p className="instructions">Click graph to see appointment history per month</p>
                 </div>
             );
        }
    }
}

