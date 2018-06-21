import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Navigation from './navigation';
import AddClientForm from './AddClientForm';
import FilterClients from './FilterClients';


import requiresLogin from './requires-login';

import background from '../media/whiteHoriz.jpg';


const sectionStyle = {
    backgroundSize: "100% 100%",
    height: "100VH",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${background})`
  };

export class Clients extends React.Component {

    componentDidMount() {
        if (this.props.selectedTab === 'dashboard') {
            return <Redirect to='/dashboard' />
        }
    }

    render() {
        return (
            <section style={ sectionStyle }>
                <div>
                    <Navigation/>
                    <AddClientForm />
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
