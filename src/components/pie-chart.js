import React from 'react';
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
        console.log('APPT ARRAY', this.props.user.appointments);
        // console.log('PROPS', this.props.user.appointments.time);
       const totalAppointmentsForUser = this.props.user.appointments.length;
       console.log('this is the total amount of appts for user', totalAppointmentsForUser);
       const filterAppts = this.props.user.appointments.map((appointment) => {
           let array = [];
            array.push(appointment);
           
           console.log('this is an appointment', array);
           return array;
           
       });
       
  	return (
          <div>
              LOOK HERE
    
        </div>
    );
}
}
