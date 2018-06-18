import React from 'react';
import { connect } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const data = [
    {name: 'January', appointments:5},
    {name: 'February', appointments:4},
    {name: 'March', appointments:6},
    {name: 'April', appointments:14},
    {name: 'May', appointments:9},
    {name: 'June', appointments:4},
    {name: 'July', appointments:16}
]

export default class LineGraph extends React.Component {
    render() {
    return(
        <LineChart width={780} height={250} data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip cursor={false}/>
        <Legend verticalAlign="top" height={36} iconType='rect'/>
        <Line type="monotoneX" dataKey="appointments" stroke="#5DADE2" dot={{ stroke: '#5DADE2', strokeWidth: .5 }}/>
        </LineChart>
    
    )} 

}