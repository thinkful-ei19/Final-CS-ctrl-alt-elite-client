import React from 'react';

export default class Days extends React.Component {
    
    render() {
        return (
            <div className="calendar__days">
                <span className="calendar__days__day">SUN</span>
                <span className="calendar__days__day">MON</span>
                <span className="calendar__days__day">TUE</span>
                <span className="calendar__days__day">WED</span>
                <span className="calendar__days__day">THU</span>
                <span className="calendar__days__day">FRI</span>
                <span className="calendar__days__day">SAT</span>
            </div>
        )
    }

}

//const mapStateToProps = state => ({})

//export default withRouter(connect(mapStateToProps)(Nav))