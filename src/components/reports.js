import React from 'react';

import { connect } from 'react-redux';
import requiresLogin from './requires-login';
// import Chart from 'chart.js';
import Navigation from './navigation';
import LineGraph from './reportsLineGraph';

class Reports extends React.Component {

    render() {
    //     const ctx = "myChart";
    //     const myChart = new Chart(ctx, {
    //         type: 'line',
    //         data: {
    //             labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //             datasets: [{
	// 				label: 'Filled',
	// 				fill: false,
			
    //             }],
    //         }
    // });
    //     return (
    //         <div>
                
    //             <canvas id="lineChart" width="400" height="400"></canvas>
    //             <script>
    //             { myChart }
                    

    //             </script>
    //         </div>
    //     )
    // }

        return(
            <div>
                <Navigation />
                <h1>Yearly Appointments</h1>
                <LineGraph user={this.props.currentUser}/>
            </div>
        
        )} 
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.authToken,
        currentUser: state.auth.currentUser,
        selectedDate: state.calendarReducer.selectedDate,
        selectedTab: state.tabsReducer.selectedTab
    }
};

export default requiresLogin()(connect(mapStateToProps)(Reports));