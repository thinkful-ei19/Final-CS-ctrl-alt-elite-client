import React from 'react';

export default class WeeklyDays extends React.Component {
    
    render() {
        return (
            <div className="weekly-view__weekly__days">
                <span className="weekly-view__weekly__days__day"></span>
                <span className="weekly-view__weekly__days__day">SUN</span>
                <span className="weekly-view__weekly__days__day">MON</span>
                <span className="weekly-view__weekly__days__day">TUE</span>
                <span className="weekly-view__weekly__days__day">WED</span>
                <span className="weekly-view__weekly__days__day">THU</span>
                <span className="weekly-view__weekly__days__day">FRI</span>
                <span className="weekly-view__weekly__days__day">SAT</span>
            </div>
        )
    }
}