import React from 'react';
import { connect } from 'react-redux';
// import Chart from 'chart.js';
import Navigation from './navigation';
import LineGraph from './reportsLineGraph';

export default class Reports extends React.Component {

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
                <LineGraph />
            </div>
        
        )} 
}