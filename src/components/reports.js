import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import Navigation from './navigation';
import LineGraph from './reportsLineGraph';
import background from '../media/deskSide.jpg';


const sectionStyle = {
    backgroundSize: "100% 100%",
    height: "100VH",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${background})`
  };


class Reports extends React.Component {

    render() {
        return (
            <section style={ sectionStyle }>
                <div className="report">
                    <Navigation />
                    <h1 className="report__title">Annual Report</h1>
                    <LineGraph user={this.props.currentUser}/>
                </div>
            </section>
        );
    }
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