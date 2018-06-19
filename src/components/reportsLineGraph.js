import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import moment from 'moment';


export default class LineGraph extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            appointments: ''
        };
    }
    
    handleClick(month) {
        this.setState({
            name: month,
            appointments: this.state.appointments
        });
    }

	render () {
           let apptInfo = [];
           // console.log('typeof apptInfo:', typeof apptInfo);
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
    //    console.log('this is the total amount of appts for user', totalAppointmentsForUser);
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
    //    console.log(`1: ${janCount}, 2: ${febCount}, .... 6: ${juneCount}, 7: ${julyCount}, 8: ${augCount}, 12 ${decCount}`);
       const filterApptList = this.props.user.appointments.map((appointment) => {
        const formatTime = moment(appointment.time).format('MMMM');
        const arrayOfTime = formatTime.split(' ');
        
        //console.log(arrayOfTime[0]);
        if(arrayOfTime[0] === this.state.name) {
            apptInfo.push(appointment);
        }
       });

       console.log('apptinfo!!', apptInfo);
       console.log('typeof apptInfo:', Array.isArray(apptInfo));
       
       const apptDataList = apptInfo.map((appt) => {
           return (
        //    <li>{appt.client}</li>
        <li key={appt.id}>
        Client Name: {appt.client.name}
        Client Email: {appt.client.email}
        Client Phone: {appt.client.phone}
        Appt Notes: {appt.notes}
        </li>
           )
       });

       console.log(apptDataList);
       
       

       const data = [
        {name: 'January', appointments: janCount},
        {name: 'February', appointments: febCount},
        {name: 'March', appointments: marCount},
        {name: 'April', appointments: aprCount},
        {name: 'May', appointments: mayCount},
        {name: 'June', appointments: juneCount},
        {name: 'July', appointments: julyCount},
        {name: 'August', appointments: augCount},
        {name: 'September', appointments: septCount},
        {name: 'October', appointments: octCount},
        {name: 'November', appointments: novCount},
        {name: 'December', appointments: decCount}
    ]
    // console.log('STATE', this.state);
       return(
           <div>
               <div>
            <LineChart 
                width={780} 
                height={250} 
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                onClick={(e) => {
                    this.handleClick(e.activeLabel)
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
            <h1>{this.state.name}</h1>
            <ul>
                {apptDataList}
            </ul>
            </div>
        );
    }
}

