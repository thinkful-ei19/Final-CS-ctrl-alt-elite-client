import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import LandingPage from './components/landing-page';
import LogIn from './components/login';
import Dashboard from './components/dashboard';
import RegistrationPage from './components/registration-page';
import WeeklyView from './components/weekly-view';
import Reports from './components/reports';

import { refreshAuthToken } from './actions/auth';
import Clients from './components/clients';


// import './app.css';

export class App extends React.Component {
    componentDidUpdate(prevProps) {
        if (!prevProps.loggedIn && this.props.loggedIn) {
            // When we are logged in, refresh the auth token periodically
            this.startPeriodicRefresh();
        } else if (prevProps.loggedIn && !this.props.loggedIn) {
            // Stop refreshing when we log out
            this.stopPeriodicRefresh();
        }
    }

    componentWillUnmount() {
        this.stopPeriodicRefresh();
    }

    startPeriodicRefresh() {
        this.refreshInterval = setInterval(
            () => this.props.dispatch(refreshAuthToken()),
            59 * 60 * 1000 // One hour
        );
    }

    stopPeriodicRefresh() {
        if (!this.refreshInterval) {
            return;
        }

        clearInterval(this.refreshInterval);
    }

    render() {
        return (
            
            <div className="app">
                {/* <HeaderBar /> */}
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/login" component={LogIn} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/weekly" component={WeeklyView} />                
                <Route exact path="/clients" component={Clients} />
                <Route exact path="/register" component={RegistrationPage} />
                <Route exact path="/reports" component={Reports} />
            </div>
            
        );
    }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));
