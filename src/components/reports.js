import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import Navigation from './navigation';
import LineGraph from './reportsLineGraph';

import lightBackground from '../media/laptop.jpg';
import darkBackground from '../media/deskWhite.jpg';

class Reports extends React.Component {

    render() {
        let sectionStyle = {
            backgroundSize: "100% 100%",
            height: "100VH",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${lightBackground})`
        };
        const theme = this.props.currentUser.options.theme;
        if (theme === 'dark') {
            sectionStyle = {
                backgroundSize: "100% 100%",
                height: "100VH",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${darkBackground})`
            }
        }

        return (
            <section style={ sectionStyle }>
                <span className="overlay">
                    <div className="report">
                        <Navigation />
                        <h1 className="report__title">Annual Report</h1>
                        <LineGraph user={this.props.currentUser}/>
                    </div>
                </span>
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