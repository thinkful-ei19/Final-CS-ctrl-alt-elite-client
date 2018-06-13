import React from 'react';

export default class Days extends React.Component {
    
    render() {
        return (
            <div className="calendar__days">
                <span className="calendar__days__day">Sun</span>
                <span className="calendar__days__day">Mon</span>
                <span className="calendar__days__day">Tue</span>
                <span className="calendar__days__day">Wed</span>
                <span className="calendar__days__day">Thu</span>
                <span className="calendar__days__day">Fri</span>
                <span className="calendar__days__day">Sat</span>
            </div>
        )
    }

}

//const mapStateToProps = state => ({})

//export default withRouter(connect(mapStateToProps)(Nav))