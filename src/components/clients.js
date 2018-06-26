import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Navigation from './navigation';
import FilterClients from './FilterClients';


import requiresLogin from './requires-login';

import lightBackground from '../media/whiteHoriz.jpg';
import darkBackground from '../media/laptop.jpg';


export class Clients extends React.Component {

    componentDidMount() {
        if (this.props.selectedTab === 'dashboard') {
            return <Redirect to='/dashboard' />
        }
    }

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
                <div>
                    <Navigation/>
                    <FilterClients user={this.props.currentUser} />
                </div>
            </section>
        )
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

export default requiresLogin()(connect(mapStateToProps)(Clients));
