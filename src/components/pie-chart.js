import React from 'react';
import moment from 'moment';

// import { Chart } from 'chart.js';


export default class PieChartComp extends React.Component{
    constructor(props) {
        super(props);
            this.state = {
                month: '',
                appointments: null
            }
        
    }
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
       console.log('APPT ARRAY', this.props.user.appointments);
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

  	return (
          <div>
              LOOK HERE
    
        </div>
    );
}
}
