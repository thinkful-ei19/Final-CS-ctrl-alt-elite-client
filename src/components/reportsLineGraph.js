import React from 'react';
// import { connect } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import moment from 'moment';


export default class LineGraph extends React.Component{
	render () {
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
       // console.log('APPT ARRAY', this.props.user.appointments);
        // console.log('PROPS', this.props.user.appointments.time);
       const totalAppointmentsForUser = this.props.user.appointments.length;
       console.log('this is the total amount of appts for user', totalAppointmentsForUser);
       const filterAppts = this.props.user.appointments.map((appointment) => {
           const formatTime = moment(appointment.time).format('MMMM Do YYYY');
           // console.log(formatTime);
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
       console.log(`1: ${janCount}, 2: ${febCount}, .... 6: ${juneCount}, 7: ${julyCount}, 8: ${augCount}, 12 ${decCount}`);
       const data = [
        {name: 'Jan', appointments: janCount},
        {name: 'Feb', appointments: febCount},
        {name: 'March', appointments: marCount},
        {name: 'April', appointments: aprCount},
        {name: 'May', appointments: mayCount},
        {name: 'June', appointments: juneCount},
        {name: 'July', appointments: julyCount},
        {name: 'August', appointments: augCount},
        {name: 'Sept', appointments: septCount},
        {name: 'Oct', appointments: octCount},
        {name: 'Nov', appointments: novCount},
        {name: 'Dec', appointments: decCount}
    ]
       return(
            <LineChart width={780} height={250} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip cursor={false}/>
            <Legend verticalAlign="top" height={36} iconType='rect'/>
            <Line type="monotoneX" dataKey="appointments" stroke="#5DADE2" dot={{ stroke: '#5DADE2', strokeWidth: .5 }}/>
            </LineChart>
        );
    }
}

