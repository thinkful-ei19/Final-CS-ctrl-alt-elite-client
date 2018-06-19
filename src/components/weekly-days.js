import React from 'react';

export default class WeeklyDays extends React.Component {
    
    render() {
        return (
            <ul className="weekly-view__weekly__days">
                <li className="weekly-view__weekly__days__day"></li>
                <li className="weekly-view__weekly__days__day">SUN</li>
                <li className="weekly-view__weekly__days__day">MON</li>
                <li className="weekly-view__weekly__days__day">TUE</li>
                <li className="weekly-view__weekly__days__day">WED</li>
                <li className="weekly-view__weekly__days__day">THU</li>
                <li className="weekly-view__weekly__days__day">FRI</li>
                <li className="weekly-view__weekly__days__day">SAT</li>
            </ul>
        )
    }
}