import React from 'react';
import { connect } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const data = [
    {name: 'January', uv:5},
    {name: 'February', uv:4},
    {name: 'March', uv:6},
    {name: 'April', uv:14},
    {name: 'May', uv:9},
    {name: 'June', uv:4},
    {name: 'July', uv:16}
]

export default class LineGraph extends React.Component {
    render() {
    return(
        <LineChart width={730} height={250} data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="uv" stroke="#5DADE2" />
        </LineChart>
    
    )} 

}